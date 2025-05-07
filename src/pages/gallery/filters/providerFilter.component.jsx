import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProviders } from "../../../services/galleryService";
import { keysOfFilters } from "../../../utils/constants";
// import "./providerFilter.style.less";

const ProviderFilter = () => {
  const queryClient = useQueryClient();

  // Fetch providers using useProviders hook
  const { data: providers = [], isLoading } = useProviders();

  // Initialize keysOfFilters.providers in React Query
  const { data: selectedProviders = [] } = useQuery({
    queryKey: [keysOfFilters.providers],
    queryFn: () => [],
    initialData: [],
  });

  // Mutation to update keysOfFilters.providers
  const updateProviders = useMutation({
    mutationFn: (newSelection) => {
      queryClient.setQueryData([keysOfFilters.providers], newSelection);
    },
  });


  const handleItemClick = (provider) => {

    // Fetch the latest selectedProviders from React Query
    const currentSelectedProviders =
      queryClient.getQueryData([keysOfFilters.providers]) || [];
    let updatedSelection;

    if (currentSelectedProviders.includes(provider)) {
      // Remove provider if already selected
      updatedSelection = currentSelectedProviders.filter(
        (selected) => selected !== provider
      );
    } else {
      // Add provider to the selection
      updatedSelection = [...currentSelectedProviders, provider];
    }

    updateProviders.mutate(updatedSelection, {
      onSuccess: (data) => {
        // 更新缓存
        queryClient.setQueryData([keysOfFilters.providers], data);
      },
    }); // Update React Query state
  };

  return (
    <div className="filter-group-wrapper">
      <header className="header">Providers</header>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="filter-group-container">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`filter-pill ${
                selectedProviders.includes(provider) ? "selected" : ""
              }`}
              onClick={() => handleItemClick(provider)}
            >
              {provider.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderFilter;
