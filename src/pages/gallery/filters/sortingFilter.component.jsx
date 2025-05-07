import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sortingFilters } from "../../../utils/constants";

const SortingFilter = ({}) => {
  const queryClient = useQueryClient();

  // Initialize "filter-sorting" in React Query
  const { data: selectedSorting = null } = useQuery({
    queryKey: ["filter-sorting"],
    queryFn: () => null,
    initialData: null,
  });

  // Mutation to update "filter-sorting"
  const updateSorting = useMutation({
    mutationFn: (newSelection) => {
      queryClient.setQueryData(["filter-sorting"], newSelection);
    },
  });

  const handleItemClick = (sorting) => {
    const updatedSelection = selectedSorting === sorting ? null : sorting; // Toggle selection
    updateSorting.mutate(updatedSelection); // Update React Query state
  };

  return (
    <div className="filter-group-wrapper">
      <header className="header">Sorting</header>
      <div className="filter-group-container">
        {sortingFilters.map((filter) => (
          <div
            key={filter.id}
            className={`filter-pill ${
              selectedSorting?.id === filter.id ? "selected" : ""
            }`}
            onClick={() => handleItemClick(filter)}
          >
            {filter.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingFilter;
