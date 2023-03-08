import { MSAL_instance } from "../auth/configuration";
import type { AuthenticationResult } from "@azure/msal-browser";

const SCOPES = [
  process.env.REACT_APP_SCOPE ||
    "Please update the .env.local file (See The README!)",
];

export async function fetchUserAccessToken(): Promise<string> {
  const ActiveAccount = MSAL_instance.getActiveAccount();
  let authenticationResult: AuthenticationResult;
  if (ActiveAccount !== null) {
    try {
      authenticationResult = await MSAL_instance.acquireTokenSilent({
        scopes: SCOPES,
        account: ActiveAccount,
      });
    } catch (silent_error) {
      console.log("acquireTokenSilent failed with error: ", silent_error);
      authenticationResult = await MSAL_instance.acquireTokenPopup({
        scopes: SCOPES,
        account: ActiveAccount,
      });
    }
  } else {
    authenticationResult = await MSAL_instance.acquireTokenPopup({
      scopes: SCOPES,
    });
  }
  return authenticationResult.accessToken;
}
