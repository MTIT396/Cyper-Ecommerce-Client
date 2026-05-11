export const googleService = {
   getGoogleAuthUrl: () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
      const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback`

      const params = new URLSearchParams({
         client_id: clientId,
         redirect_uri: redirectUri,
         scope: 'openid email profile',
         response_type: 'code',
         access_type: 'offline',
         prompt: 'consent'
      })

      return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
   },

   initiateGoogleLogin: () => {
      window.location.href = googleService.getGoogleAuthUrl()
   }
}
