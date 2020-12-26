import { getToken } from "./auth";
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";

export const authProvider = {
  getAccessToken: async () => {
    return await getToken();
  },
};

const graphClient = Client.initWithMiddleware({ authProvider });

export async function getUser() {
  const me = await graphClient
    .api("/me")
    .select("id,displayName,mail,userPrincipalName,mailboxSettings")
    .get();
  console.log(me);
  return me;
}

export async function getPresence() {
  const presence = await graphClient.api("/me/presence").get();
  return presence;
}
