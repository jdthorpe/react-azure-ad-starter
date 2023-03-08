/*A navbar with Brand, some protected content, and the beautiful MGT-react login component*/

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProtectedMessage } from "./protected-content";
import { Login } from "@microsoft/mgt-react/dist/es6/index"

// FLEX ROW WITH MAX WIDTH
const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
`

// THE NAV BAR
const Navbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  padding: 0.5rem 1rem;
  background-color: #343a40!important;
`;

// THE BRAND STYLING
const Brand = styled.span`
  color: #fff;
  display: inline-block;
  padding-top: .3125rem;
  padding-bottom: .3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
`

export const NavBar: React.FC = () => {

  return (
    <Navbar className="mgt-dark">
      <Container>

        {/* Brand name with link */}
        <Link to="/">
          <Brand >App Name Here</Brand>
        </Link>

        {/* Message that is conditional on RBAC state / Roles */}
        <ProtectedMessage />

        {/* Beautiful login widget provided by mgt-react */}
        <Login style={{ color: "white" }} />

      </Container>
    </Navbar >
  );
}
