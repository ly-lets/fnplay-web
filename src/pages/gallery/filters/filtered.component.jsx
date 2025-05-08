import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import placeholderImage from "~@/assets/img-holder.svg"; // Placeholder image
import { useGames } from "~@/services/galleryService";
import { keysOfFilters } from "~@/utils/constants";

const FilteredGames = ({onFilteredResultChanged = () =>{}}) => {
  const [filteredGames, setFilteredGames] = useState([]);
  const [useLargeImages, setUseLargeImages] = useState(false);
  //   const queryClient = useQueryClient();
  const { data: games = [] } = useGames();
  const { data: providers = [] } = useQuery({
    queryKey: [keysOfFilters.providers],
    queryFn: () => [],
    initialData: [],
    refetchOnWindowFocus: false,
  });
  const { data: groups = [] } = useQuery({
    queryKey: [keysOfFilters.groups],
    queryFn: () => [],
    initialData: [],
    refetchOnWindowFocus: false,
  });
  const { data: sorting = null } = useQuery({
    queryKey: [keysOfFilters.sorting],
    queryFn: () => null,
    initialData: null,
    refetchOnWindowFocus: false,
  });
  const { data: search = "" } = useQuery({
    queryKey: [keysOfFilters.search],
    queryFn: () => "",
    initialData: "",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setUseLargeImages(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!games || games.length === 0) {
      setFilteredGames([]);
      return;
    }
    let filtered = games.filter((game) => {
      const matchesProvider =
        providers.length === 0 ||
        providers.some((provider) => provider.id === game.provider);

      const matchesGroup =
        groups.length === 0 ||
        groups.some((group) => group.games.includes(game.id));

      const matchesSearch =
        search === "" || game.name.toLowerCase().includes(search.toLowerCase());

      return matchesProvider && matchesGroup && matchesSearch;
    });

    // Sort games
    if (sorting) {
      filtered = filtered.sort((a, b) => {
        if (sorting.id === 1) {
          return a.name.localeCompare(b.name); // Sort by name ascending
        } else if (sorting.id === 2) {
          return b.name.localeCompare(a.name); // Sort by name descending
        } else if (sorting.id === 3) {
          return new Date(b.date) - new Date(a.date); // Sort by date descending
        }
        return 0;
      });
    }

    setFilteredGames(filtered);
    onFilteredResultChanged(filtered.length)
  }, [games, providers, groups, search, sorting, onFilteredResultChanged]);

  return (
    <>
      {filteredGames.map((game) => (
        <div key={game.id} className="game-card">
          <img
            src={useLargeImages ? game.coverLarge : game.cover}
            alt={game.name}
            className="game-cover"
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = placeholderImage; 
              }}
          />
           <div className="hover-overlay"></div> 
          <span className="game-name">{game.name}</span>
        </div>
      ))}
    </>
  );
};
export default FilteredGames;
