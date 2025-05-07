import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "../../../components/input/inputField.component";
import magnify from "../../../assets/magnify.svg";


const SearchFilter = () => {
  const queryClient = useQueryClient();

  // Initialize "filter-search" in React Query
  const { data: searchKeyword = "" } = useQuery({
    queryKey: ["filter-search"],
    queryFn: () => "",
    initialData: "",
  });

  // Mutation to update "filter-search"
  const updateSearch = useMutation({
    mutationFn: (newKeyword) => {
      queryClient.setQueryData(["filter-search"], newKeyword);
    },
  });

 
  return (
    <div className="search-filter-wrapper">
      <InputField
        required={true}
        id="search"
        name="search"
        type="text"
        value={searchKeyword}
        onChange={(e) => updateSearch.mutate(e.target.value)}
        label="Search"
        icon={
          <img src={magnify} alt="magnify" style={{ height: "14px" }} />
        }
      />
    </div>
  );
};

export default SearchFilter;