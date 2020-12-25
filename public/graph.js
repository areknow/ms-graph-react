// Create an authentication provider
const authProvider = {
  getAccessToken: async () => {
    // Call getToken in auth.js
    return await getToken();
  },
};

// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });

async function getUser() {
  return await graphClient
    .api("/me")
    // Only get the fields used by the app
    .select("id,displayName,mail,userPrincipalName,mailboxSettings")
    .get();
}
