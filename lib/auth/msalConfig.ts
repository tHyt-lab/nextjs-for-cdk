import { Configuration, RedirectRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AAD_CLIENT_ID ?? "",
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AAD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_DOMAIN_NAME ?? "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
  },
} as const;

export const loginRequest: RedirectRequest = {
  scopes: ["openid", "offline_access"],
};
