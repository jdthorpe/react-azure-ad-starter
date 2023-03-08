import React, { useEffect, useRef, useState } from "react";
import {
  useMsal,
  useIsAuthenticated,
  useMsalAuthentication,
} from "@azure/msal-react";
import {
  Providers as MGT_Providers,
  ProviderState,
} from "@microsoft/mgt-element";
import { InteractionType } from "@azure/msal-browser";
import { PrivateComponent } from "./RBAC-protected-component";

type Component =
  | string
  | React.FunctionComponent<any>
  | React.ComponentClass<any, any>;

interface IForceAuthenticationProps {
  forcingLoginMessage: Component
  unauthenticated: Component
  loading: Component
  content?: Component
}

export const RequireAuthentication: React.FC<IForceAuthenticationProps & { children?: React.ReactNode }> = ({
  forcingLoginMessage,
  unauthenticated,
  loading,
  content,
  children,
}) => {
  const forced_login = useForceLogin();

  return React.createElement(
    PrivateComponent,
    {
      unauthenticated: forced_login ? forcingLoginMessage : unauthenticated,
      loading,
      content,
    },
    children
  );
};

export function useConnectMGT() {
  // keep MGT and msal-react in sync
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  useEffect(() => {
    MGT_Providers.globalProvider.setState(
      inProgress !== "none"
        ? ProviderState.Loading
        : isAuthenticated
          ? ProviderState.SignedIn
          : ProviderState.SignedOut
    );
  }, [isAuthenticated, inProgress]);
}

function useForceLogin() {
  // usage:
  // const focingLogin = useForceLogin ()
  const firstLoadRef = useRef(true);

  const { login } = useMsalAuthentication(InteractionType.Redirect);
  const [forced_log_in, set_forced_log_in] = useState(false);

  // keep MGT and msal-react in sync
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  useEffect(() => {
    if (inProgress === "startup") return;
    if (!firstLoadRef.current || isAuthenticated) return;
    firstLoadRef.current = false;
    // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5744
    // note that this ALWAYS results in a interaction_in_progress error reported in the console...
    // not sure if this comes from mgt or other...
    login();
    set_forced_log_in(true);
  }, [firstLoadRef, isAuthenticated, inProgress, login]);

  return forced_log_in;
}
