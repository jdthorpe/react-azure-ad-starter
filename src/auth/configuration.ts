import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { Providers as MGT_Providers } from "@microsoft/mgt-element/dist/es6";
import { Msal2Provider as MGT_Msal2Provider } from "@microsoft/mgt-msal2-provider/dist/es6";

const configuration: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID!,
    authority: process.env.REACT_APP_AUTHORITY!,
    redirectUri: window.location.origin,
  },
};

export const MSAL_instance = new PublicClientApplication(configuration);
MGT_Providers.globalProvider = new MGT_Msal2Provider({
  publicClientApplication: MSAL_instance,
});
