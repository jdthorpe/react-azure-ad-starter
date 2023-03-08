import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import { mockUseUserAccount, __set_roles } from '../__mocks__/UserAccount';
import { RBACProtectedComponent } from '../RBAC-protected-component';
import HomePage from '../../components/main';

jest.mock('../UserAccount', () => ({ useUserAccount: mockUseUserAccount }))

// --------------------
// utility function
// --------------------
const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {
    wrapper: (props) => {
      return (
        <MemoryRouter initialEntries={[{ pathname: route }]} >{window.location.toString()}{props.children}</MemoryRouter>
      )
    }
  })

}

// --------------------
// Test fixture
// --------------------
const __unauthorized = () => <Navigate to="/" />

const Fixture: React.FC<{ required: string }> = ({ required }) => {
  return (
    <Routes>
      <Route path='/'
        element={(<HomePage />)} />

      <Route path='/protected'
        element={
          <RBACProtectedComponent
            unauthorized={__unauthorized}
            unauthenticated={"Please log in."}
            loading={"Loading account data..."}
            allowedRoles={[required]}
            content={() => <div data-testid="protected"></div>}
          />
        } />

      <Route path='*' element={__unauthorized()} />
    </Routes>

  )
}

const roles: string[] = ["FirstRole", "SecondRole"]

describe("Protected Routes", () => {

  describe("User has correct Roles", () => {

    for (let role of roles) {
      it(`should render the the protected route`, async () => {
        __set_roles([role])
        renderWithRouter(<Fixture required={role} />, { route: "/protected" });
        const protectedContent = await screen.findByTestId("protected");
        // screen.debug()
        expect(protectedContent).toBeInTheDocument()
      });
    }
  })


  describe("User does not have route specific permissions", () => {

    const pages: [string, string, string][] = [
      ["Description ", "FirstRole", "/page1"],
    ]

    for (let [text, role, route] of pages)
      it(`should render the home page (without the specified link)`, async () => {
        __set_roles([])
        renderWithRouter(<Fixture required={role} />, { route: "/protected" });

        const homepage = await screen.findByTestId("homepage");
        const noAccessMessage = screen.getByTestId("no-access");
        expect(homepage).toBeInTheDocument()
        expect(noAccessMessage).toBeInTheDocument()
      });

  })


  describe("Homepage should list all the accounts", () => {

    it(`should render the home page (without the specified link)`, async () => {
      __set_roles(["FirstRole", "SecondRole"])
      renderWithRouter(<HomePage />, { route: "/" });

      const pages: [string, string][] = [
        ["Page1", "/page-1"],
      ]
      const homepage = await screen.findByTestId("homepage");
      expect(screen.queryByTestId("no-access")).toBeNull()
      expect(homepage).toBeInTheDocument()
      for (let [text, ref] of pages)
        expect(screen.getByText(text).closest('a')).toHaveAttribute('href', ref)
    });

  })

})
