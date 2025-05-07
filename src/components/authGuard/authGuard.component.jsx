import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { VerifySession } from "../../services/authService";
import Spinner from "../spinner/spinner.component";

const AuthGuard = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const result = await VerifySession();
      console.log("Session result:", result);
      if (result.user) {
        return { username: result.user, valid: true };
      }
      throw new Error("Invalid session");
    },
    onError: () => {
      queryClient.setQueryData(["session"], { username: null, valid: false });
    },
    initialData: { username: null, valid: null },
    refetchOnWindowFocus: false,
  });
console.log("Session data:", session);
  if (isLoading || session.username === null) {
    return <Spinner />;
  }

  return session.valid ? children : <Navigate to="/auth" />;
};

export default AuthGuard;
