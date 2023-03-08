/* Delete me as soon as you've set up your .env file */
import styled from "styled-components"

const env_contents = `# .env
REACT_APP_CLIENT_ID={{Azure AD app client ID}}}
REACT_APP_AUTHORITY=https://login.microsoftonline.com/{{Azure AD tenant ID}}}
REACT_APP_SCOPE=api://{{Azure AD app client ID}}/{{Role name}}
`
const Pre = styled.pre`
  background-color: #eee;
`

const Code = styled.code`
  background-color: #eee;
  color: #000;
`

export const config_available = (
  typeof process.env.REACT_APP_CLIENT_ID !== "undefined" &&
  typeof process.env.REACT_APP_SCOPE !== "undefined" &&
  typeof process.env.REACT_APP_AUTHORITY !== "undefined"
)

export const GettingStarted = () =>
  <div style={{ padding: "1rem" }}>
    <p>To get started:</p>
    <ol>
      <li>Create an app registration, and collect the ClientID, Tenant, and Scope</li>
      <li>
        <p>create a <Code>.env</Code> file in the root of this repo with the following content</p>
        <Pre>{env_contents}</Pre>
      </li>
      <li>restart this app using <Code>yarn start</Code></li>
    </ol>
  </div>

