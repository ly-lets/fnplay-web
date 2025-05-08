
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
    return data; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error; 
  }
};

export const VerifySession = async () => {
  console.log("Verifying session...");
  const response = await fetch("/api/v1/verify-session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Session verification response:", response);
  // if (!response.ok) {
  //   const errorMessage = `Session verification failed with status ${response.status}`;
  //   if (response.status === 401) {
  //     throw new Error("Unauthorized: " + errorMessage);
  //   }
  //   throw new Error(errorMessage);
  // }

  const data = await response.json();
  console.log("Session verification data:", data);
  return data;
};

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
