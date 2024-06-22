import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export const useFetchAllBookings = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  return { bookings, isLoading };
};
