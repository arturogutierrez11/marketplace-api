export const MegatoneConfig = {
  auth: {
    url: process.env.MEGATONE_AUTH_URL!,
    clientId: process.env.MEGATONE_CLIENT_ID!,
    clientSecret: process.env.MEGATONE_CLIENT_SECRET!,
    scope: process.env.MEGATONE_SCOPE || 'api'
  },
  api: {
    baseUrl: process.env.MEGATONE_API_BASE_URL!
  }
};
