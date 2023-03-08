import { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";

interface IUserAccountInfo {
  account: AccountInfo | null;
  roles?: string[];
}

export function useUserAccount(): IUserAccountInfo & { loading: boolean } {
  const [account_info, set_account_info] = useState<IUserAccountInfo>({
    account: null,
  });
  const { instance: MSALinstance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // note inProgress is of type InteractionStatus -- details below
  useEffect(() => {
    if (isAuthenticated) {
      const account = MSALinstance.getActiveAccount();
      const claims: { roles?: string[] } = account?.idTokenClaims as
        | any
        | undefined;
      set_account_info({ account, roles: claims?.roles });
    } else {
      set_account_info({ account: null });
    }
  }, [isAuthenticated, MSALinstance]);

  return { ...account_info, loading: inProgress !== "none" };
}
