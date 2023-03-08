/* 

App root, with just the navbar and link to the main page (and a getting
started notice, which should be removed as soon as the `.env` file has been
created)

 */

import { BrowserRouter } from "react-router-dom";

// for bootstrapping MSAL and MGT-React
import { useConnectMGT, RequireAuthentication } from './auth/stateManager';

/* our components */
import { Main, Loading } from "./main";
import { GettingStarted, config_available } from "./getting-started"; // Delete me as soon as you set up your .env file
import { NavBar } from "./components/navbar/navbar";


function App() {
  // booststrap the MGT-React library
  useConnectMGT()

  return (
    <BrowserRouter>
      {/* Navbar */}
      <NavBar />

      {/* RequireAuthentication forces the user to log (i.e. it initializes
        the log in) before displaying the app */}
      {config_available ?
        <RequireAuthentication
          forcingLoginMessage={() => <div>Logging you in...</div>}
          loading={Loading}
          unauthenticated={() => <div>Please Log in.</div>}
          content={Main}
        /> :
        <GettingStarted />}

    </BrowserRouter>
  );
}

export default App;
