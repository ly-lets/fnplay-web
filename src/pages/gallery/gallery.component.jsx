import React, { useState } from "react";
import "./gallery.style.less";
import Spinner from "../../components/spinner/spinner.component";
import LogoComponent from "../../components/logo/logo.component";
import SearchFilter from "./filters/searchFilter.component";
import ProviderFilter from "./filters/providerFilter.component";
import GroupsFilter from "./filters/groupsFilter.component";
import SortingFilter from "./filters/sortingFilter.component";
import StepProgress from "../../components/stepProgress/stepProgress.component";
import { useGames } from "../../services/galleryService";
import { galleryColumnRange } from "~@/utils/constants";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { keysOfFilters, userLogin } from "~@/utils/constants";
import FilteredGames from "./filters/filtered.component";
import avatar from "../../assets/avatar.svg";
import { LogoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [resultCount, setResultCount] = useState(0);
  const [galleryColumn, setGalleryColumn] = useState(galleryColumnRange.at(-1)); // Default number of grid columns
  const { isLoading, isError, error } = useGames();
  const { data: userInfo } = useQuery({
    queryKey: [`${userLogin}`],
    queryFn: async () => {},
    initialData: { username: null, valid: null },
  });

  console.log("Gallery component rendered");
  const handleColumnChange = (value) => {
    if (!isNaN(value) && value > 0) {
      setGalleryColumn(value);
    }
  };

  const updateResultCount = (count) => {
    setResultCount(count);
  }

  const handleLogout = async () => {
    try {
      await LogoutUser();
      queryClient.setQueryData([`${userLogin}`], { username: null, valid: false });
      console.log("User logged out successfully.");
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const resetFilters = () => {
    setGalleryColumn(galleryColumnRange.at(-1));
    queryClient.setQueryData([keysOfFilters.providers], []);
    queryClient.setQueryData([keysOfFilters.groups], []); // Clear groups
    queryClient.setQueryData([keysOfFilters.sorting], null); // Clear sorting
    queryClient.setQueryData([keysOfFilters.search], "");
  };

  const renderBody = () => {
    if (isLoading) {
      return <Spinner message="Loading..." />;
    }

    if (isError) {
      return <Spinner message={error.message} />;
    }

    // if (!filteredGames || filteredGames.length === 0) {
    //   return <Spinner message="No games found." />;
    // }

    return (
      <div className="main-content">
        <div
          className="items"
          style={{ gridTemplateColumns: `repeat(${galleryColumn}, 1fr)` }}
        >
          <FilteredGames onFilteredResultChanged={updateResultCount} />
        </div>

        <div className="filters-panel">
          <SearchFilter />
          <ProviderFilter />
          <GroupsFilter />
          <SortingFilter />
          <div className="filter-group-wrapper">
            <header className="header">Columns</header>
            <div className="filter-group-container">
              <StepProgress
                range={galleryColumnRange}
                initValue={galleryColumn}
                onStepClick={handleColumnChange}
              />
            </div>
          </div>

          <div className="panel-footer">
            <span className="section-title">Games amount:{resultCount}</span>
            <button type="button" className="secondary" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="gallery">
      <div className="info-banner">
        <LogoComponent />
        <div className="user-info">
          <span className="name">{userInfo.username}</span>
          <span className="logout" onClick={handleLogout}>
            <img src={avatar} alt="user-icon" />
             Logout</span>
        </div>
      </div>
      {renderBody()}
    </div>
  );
};

export default Gallery;
