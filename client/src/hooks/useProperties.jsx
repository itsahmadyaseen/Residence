import { useQuery } from "react-query";
import { getAllPlotProperties, getAllRentalProperties } from "../utils/api";

const useProperties = () => {
  const plotsQuery = useQuery("plots", getAllPlotProperties, {
    refetchOnWindowFocus: false,
  });

  const rentalsQuery = useQuery("rentals", getAllRentalProperties, {
    refetchOnWindowFocus: false,
  });

  return {
    plots: plotsQuery.data || [],
    rentals: rentalsQuery.data || [],
    isLoading: plotsQuery.isLoading || rentalsQuery.isLoading,
    isError: plotsQuery.isError || rentalsQuery.isError,
    refetchAll: () => {
      plotsQuery.refetch();
      rentalsQuery.refetch();
    },
  };
};

export default useProperties;
