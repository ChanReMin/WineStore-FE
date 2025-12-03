/**
 * Convert HTTP API URL to WebSocket URL
 * http://localhost:8080 → ws://localhost:8080
 * https://api.example.com → wss://api.example.com
 */
// export const getWebSocketUrl = (token: string): string => {
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
  
//   // Replace http with ws, https with wss
//   let wsProtocol = apiBaseUrl.replace(/^https?:\/\//, "");
  
//   if (apiBaseUrl.startsWith("https://")) {
//     wsProtocol = `wss://${wsProtocol}`;
//   } else {
//     wsProtocol = `ws://${wsProtocol}`;
//   }
  
//   return `${wsProtocol}/ws?token=${token}`;
// };

export const getWebSocketUrl = (token: string): string => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
  
  // Ensure we have HTTP(S) protocol
  const httpUrl = apiBaseUrl.replace(/\/$/, ""); // remove trailing slash if any

  return `${httpUrl}/ws?token=${token}`; // don't change to ws:// or wss://
};