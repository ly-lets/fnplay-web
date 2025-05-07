export const AuthenticateUser = async (username, password) => {
  try {
    const response = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const VerifySession = async () => {  
  try {
    const response = await fetch("/api/v1/verify-session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Session verification failed.");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error during session verification:", error);
    throw error; 
  }
}

export const LogoutUser = async () => {
  try {
    const response = await fetch("/api/v1/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error during logout:", error);
    throw error; 
  }
};