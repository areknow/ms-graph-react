import { getToken } from "./auth";
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";

// Create an authentication provider
export const authProvider = {
  getAccessToken: async () => {
    return await getToken();
  },
};

// Initialize the Graph client
const graphClient = Client.initWithMiddleware({ authProvider });

export async function getUser() {
  const me = await graphClient
    .api("/me")
    // Only get the fields used by the app
    .select("id,displayName,mail,userPrincipalName,mailboxSettings")
    .get();
  console.log(me);
  return me;
}

export async function getPresence() {
  const presence = await graphClient.api("/me/presence").get();
  return presence;
}
