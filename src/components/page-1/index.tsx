/* A Page with some RBAC protected content */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RBACProtectedComponent, PrivateComponent } from "../../auth/RBAC-protected-component"
import { useUserRoles } from "../../auth/userRoles";
import { fetchUserAccessToken } from "../../auth/userAccessToken";

const SOME_ROLE = "SomeRole.view"

const Page = () => {

  // manually check if the user has some role
  const userRoles = useUserRoles()
  const userHasRole = Array.isArray(userRoles) ? (userRoles?.indexOf(SOME_ROLE) !== -1) : false

  return (
    <div>

      <ul>
        <li>
          {/* Manually do the RBAC thing */}
          <p><em>Manual RBAC</em>: User *{userHasRole ? "has" : "has not"}* been assigned the "{SOME_ROLE}" role</p>
        </li>
        <li>
          {/* More Thorough lifecycle... */}
          <RBACProtectedComponent
            requiredRole={SOME_ROLE}
            loading={() => <p><em>Provided RBAC</em>: Loading accounts data...</p>}
            unauthorized={() => <p><em>Provided RBAC</em>: {`User *has not* been assigned the "${SOME_ROLE}" role`}</p>}
            unauthenticated={() => <p><em>Provided RBAC</em>: Logged out</p>}
            content={() => <p><em>Provided RBAC</em>: {`User *has* been assigned the "${SOME_ROLE}" role`}</p>}
          />
        </li>
        <li>
          <PrivateComponent
            loading={() => <p>Loading accounts data...</p>} // string or component
            unauthenticated={() => <p>Please Log IN</p>} // string or component
            content={UserAccessToken}
          />
        </li>
        <li><p><Link to='/private-page'>This page</Link> can only be viewed by users who have been logged in</p></li>
        <li><p><Link to='/protected-page'>This page</Link> can only be viewed by authorized users</p></li>
      </ul>
    </div>
  )

}

const UserAccessToken = () => {
  /* 
   * A helper component, to be wrapped in a protected component, so we know
   * there is a logged-in user if this component is being rendered...
   */

  const [userAccessToken, setUserAccessToken] = useState<string>();

  useEffect(() => {
    fetchUserAccessToken().then(setUserAccessToken)
  }, [setUserAccessToken]);

  return <div>
    {userAccessToken ? `User Access Token: ${userAccessToken.slice(0, 10)}...` : "Loading..."}
  </div>
}

export default Page
