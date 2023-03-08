import { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

export const useUserRoles: { (): null | string[] } = () => {
  const [roles, set_roles] = useState<null | string[]>(null);
  const { instance: MSALinstance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      set_roles(null);
      return;
    }
    const account = MSALinstance.getActiveAccount();
    set_roles((account?.idTokenClaims as any | undefined) || []);
  }, [isAuthenticated, MSALinstance]);

  return roles;
};
