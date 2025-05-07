import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGroups } from "../../../services/galleryService";
// import "./groupsFilter.style.less";

const GroupsFilter = ({   }) => {
  const queryClient = useQueryClient();

  // Fetch groups using useGroups hook
  const { data: groups = [], isLoading } = useGroups();

  // Initialize "filter-groups" in React Query
  const { data: selectedGroups = [] } = useQuery({
    queryKey: ["filter-groups"],
    queryFn: () => [],
    initialData: [],
  });

  // Mutation to update "filter-groups"
  const updateGroups = useMutation({
    mutationFn: (newSelection) => {
      queryClient.setQueryData(["filter-groups"], newSelection);
    },
  });

 
  const handleItemClick = (group) => {
    let updatedSelection;

    if (selectedGroups.includes(group)) {
      // Remove group if already selected
      updatedSelection = selectedGroups.filter(
        (selected) => selected !== group
      );
    } else {
      // Add group to the selection
      updatedSelection = [...selectedGroups, group];
    }

    updateGroups.mutate(updatedSelection); // Update React Query state
  };

  return (
    <div className="filter-group-wrapper">
      <header className="header">Groups</header>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="filter-group-container">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`filter-pill ${
                selectedGroups.includes(group) ? "selected" : ""
              }`}
              onClick={() => handleItemClick(group)}
            >
              {group.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsFilter;