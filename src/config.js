export const msalConfig = {
  auth: {
    clientId: "3570acd4-abb1-458d-850f-7f8fcff94de4",
    redirectUri: "http://localhost:3000",
  },
};

export const msalRequest = {
  scopes: [
    "user.read",
    "mailboxsettings.read",
    "calendars.readwrite",
    "presence.read",
  ],
};
