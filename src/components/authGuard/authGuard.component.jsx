import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { setCookie } from "../../utils/cookieHelper";
import Spinner from "~@/components/spinner/spinner.component";
import { VerifySession } from "~@/services/authService";
import { userLogin } from "~@/utils/constants";

const AuthGuard = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await VerifySession();
        if (result && result.user) {
          sessionStorage.setItem(`${userLogin}`, JSON.stringify(result.user));
          setCookie(userLogin, result.user, 1); // Set the session cookie
          setIsValidSession(true);
        } else {
          setIsValidSession(false);
        }
      } catch (error) {
        console.error("Session verification failed:", error.message);
        setIsValidSession(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isValidSession) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default AuthGuard;
