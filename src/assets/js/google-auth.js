function decodeJWTToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("JWT decoding error:", error);
      return null;
    }
  }
  
  function handleOauthResponse(response) {          
    const responsePayload = decodeJWTToken(response.credential);
    console.log(responsePayload);
    localStorage.setItem("token", JSON.stringify(responsePayload));
    window.location.href = "";
}
