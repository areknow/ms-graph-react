import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { msalConfig, msalRequest } from "./config";
import { getUser, getPresence } from "./graph";

const msalClient = new PublicClientApplication(msalConfig);

export async function signIn() {
  try {
    const authResult = await msalClient.loginPopup(msalRequest);
    console.log(authResult.account.username);
    sessionStorage.setItem(
      "msalAccount",
      JSON.stringify(authResult.account.username)
    );
    const user = await getUser();
    sessionStorage.setItem("graphUser", JSON.stringify(user));
    return await getPresence();
  } catch (error) {
    console.log(error);
  }
}

export function signOut() {
  const account = null;
  sessionStorage.removeItem("graphUser");
  msalClient.logout();
}

export async function getToken() {
  let account = JSON.parse(sessionStorage.getItem("msalAccount"));
  if (!account) {
    throw new Error(
      "User account missing from session. Please sign out and sign in again."
    );
  }
  try {
    const silentRequest = {
      scopes: msalRequest.scopes,
      account: msalClient.getAccountByUsername(account),
    };
    const silentResult = await msalClient.acquireTokenSilent(silentRequest);
    return silentResult.accessToken;
  } catch (silentError) {
    if (silentError instanceof InteractionRequiredAuthError) {
      const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
      return interactiveResult.accessToken;
    } else {
      throw silentError;
    }
  }
}
