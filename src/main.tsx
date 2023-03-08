/* Main page routing */

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import loadable from "@loadable/component";
import { PrivateComponent, RBACProtectedComponent } from "./auth/RBAC-protected-component";
import styled from "styled-components";

const Page1 = loadable(() => import("./components/page-1/index"));

// ------------------------------
// utility components
// ------------------------------

const Centered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Loading = () => (
    < Centered >
        <span>Loading</span>
    </Centered>
);


export const Main: React.FC = () => {

    return <Routes>
        <Route path="/" element={<Page1 />} />

        <Route path="/unauthorized" element={<div>You don't have the required roles to view that page</div>} />

        {/* A route visible to anyone who has logged in */}
        <Route
            path="/private-page"
            element={
                <PrivateComponent
                    unauthenticated={Loading}
                    loading={Loading}
                    content={() => <div>You must be logged in to view this page</div>}
                />
            }
        />

        {/* An RBAC protected route */}
        <Route
            path="/protected-page"
            element={
                <RBACProtectedComponent
                    /* Send unauthorized users back to the home page */
                    unauthorized={() => <Navigate to="/unauthorized" replace />}
                    unauthenticated={Loading}
                    loading={Loading}
                    allowedRoles={["Some Role", "Another Role"]}
                    content={() => <div>You must have at least one of the allowed roles to view this page</div>}
                />
            }
        />

        {/* Route unknown routes to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
};
