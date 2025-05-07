import { useQuery } from "@tanstack/react-query";

// Fetch games
export const useGames = () => {
  return useQuery({
    queryKey: ["games"], // Unique key for caching
    queryFn: async () => {
      const response = await fetch("/api/v1/games", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Retrieving games failed. Please try again.");
      }

      return response.json(); // Return the games data
    },
  });
};

// Fetch providers
export const useProviders = () => {
  return useQuery({
    queryKey: ["providers"], // Unique key for caching
    queryFn: async () => {
      const response = await fetch("/api/v1/providers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Retrieving providers failed. Please try again.");
      }

      return response.json(); // Return the providers data
    },
  });
};

// Fetch groups
export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"], // Unique key for caching
    queryFn: async () => {
      const response = await fetch("/api/v1/groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Retrieving groups failed. Please try again.");
      }

      return response.json(); // Return the groups data
    },
  });
};