export const getWebSocketUrl = (token: string): string => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
  const httpUrl = apiBaseUrl.replace(/\/$/, ""); 
  // Quan trọng: Token phải nằm ở URL query param để lọt qua JwtAuthenticationFilter
  return `${httpUrl}/ws?token=${token}`; 
};