import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import "./gallery.style.less";
import { useNavigate } from "react-router-dom";

import GroupsFilter from "./filters/groupsFilter.component";
import ProviderFilter from "./filters/providerFilter.component";
import SearchFilter from "./filters/searchFilter.component";
import SortingFilter from "./filters/sortingFilter.component";
import avatar from "~@/assets/avatar.svg";
import hamburger from "~@/assets/hamburger.svg";
import LogoComponent from "~@/components/logo/logo.component";
import Spinner from "~@/components/spinner/spinner.component";
import StepProgress from "~@/components/stepProgress/stepProgress.component";
import useMaxInnerWidth from "~@/hooks/useMaxInnerWidth";
import FilteredGames from "~@/pages/gallery/filters/filtered.component";
import { LogoutUser } from "~@/services/authService";
import { useGames } from "~@/services/galleryService";
import { galleryColumnRange } from "~@/utils/constants";
import { keysOfFilters, userLogin } from "~@/utils/constants";
import { getCookie, removeCookie } from "~@/utils/cookieHelper";

const Gallery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isMobileRange = useMaxInnerWidth(428);
  const [foldFilters, setFoldFilters] = useState(isMobileRange);
  const [resultCount, setResultCount] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const [galleryColumn, setGalleryColumn] = useState(galleryColumnRange.at(-1)); // Default number of grid columns
  const { isLoading, isError, error } = useGames();

  useEffect(() => {
    const storedUser = getCookie(userLogin);
    if (storedUser) {
      setUserInfo(storedUser);
    }
  }, []);

  const handleColumnChange = (value) => {
    if (!isNaN(value) && value > 0) {
      setGalleryColumn(value);
    }
  };

  const handleToggleFilters = () => {
    setFoldFilters((prev) => !prev);
  };

  const updateResultCount = (count) => {
    setResultCount(count);
  };

  const handleLogout = async () => {
    try {
      await LogoutUser();
      removeCookie(userLogin); 
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
          <ProviderFilter className={foldFilters ? "m-providers" : ""} />
          <GroupsFilter className={foldFilters ? "m-groups" : ""} />
          <SortingFilter className={foldFilters ? "m-sorting" : ""} />
          <div className="filter-group-wrapper gallery-column">
            <header className="header">Columns</header>
            <div className="filter-group-container">
              <StepProgress
                range={galleryColumnRange}
                initValue={galleryColumn}
                onStepClick={handleColumnChange}
              />
            </div>
          </div>

          <div className={`panel-footer ${foldFilters ? "m-footer" : ""}`}>
            <span className="section-title">Games amount:{resultCount}</span>
            <button type="button" className="secondary" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="mobile toggle-panel" onClick={handleToggleFilters}>
            <img src={hamburger} alt="toggle-filter" />
            {foldFilters ? "Show" : "Hide"} filters
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
          <span className="name">{userInfo}</span>
          <span className="logout" onClick={handleLogout}>
            <img src={avatar} alt="user-icon" />
            Logout
          </span>
        </div>
      </div>
      {renderBody()}
    </div>
  );
};

export default Gallery;
