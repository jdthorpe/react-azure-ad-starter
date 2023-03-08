/* Some protected content to include in the navbar */
import React from "react"
import styled from "styled-components"
import { RBACProtectedComponent } from "../../auth/RBAC-protected-component"

const Text = styled.span`
  color: #fff;
`
export const ProtectedMessage: React.FC = () =>
  <RBACProtectedComponent
    unauthorized={() => <Text>Unauthorized</Text>}
    unauthenticated={() => <Text>Please Login</Text>}
    loading={() => <Text>loading</Text>}
    allowedRoles={["some role"]}
    content={() => <Text>Welcome :)</Text>}
  />