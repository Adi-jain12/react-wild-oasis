import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useFetchAllBookings = () => {
  const [searchParams] = useSearchParams();

  /* FILTER */
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  /* SORT */
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [first, second] = sortByRaw.split("-");
  // const modifier = second === "asc" ? 1 : -1;

  const sortBy = { field: first, direction: second };

  /* PAGE */
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });

  return { bookings, isLoading, count };
};
