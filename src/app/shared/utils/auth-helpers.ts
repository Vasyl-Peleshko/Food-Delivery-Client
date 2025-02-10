import { environment } from "../../../environments/environment";
import { RoutingConstants } from "../constants/routing-constants";

export interface JwtPayload {
    sub?: string;
    name?: string;
    email?: string;
    [key: string]: unknown; 
  }
  
  export interface OAuthResponse {
    credential: string;
  }
  
  export function decodeJWTToken(token: string): JwtPayload | null {
    try {
      const base64Url: string = token.split(".")[1];
      const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded: string = atob(base64);
      return JSON.parse(decoded) as JwtPayload;
    } catch (error) {
      console.error("JWT decoding error:", error);
      return null;
    }
  }
  
  export function handleOauthResponse(response: OAuthResponse): void {
    const responsePayload: JwtPayload | null = decodeJWTToken(response.credential);
    if (!responsePayload) {
      console.error("Invalid OAuth response");
      return;
    }
  
    localStorage.setItem("token", JSON.stringify(responsePayload));
    window.location.href = `${environment.baseUrl}/${RoutingConstants.HOME}`;
}
