import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings, getBooking } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_COUNT } from "../../utils/constants";

export const useFetchAllBookings = () => {
  const queryClient = useQueryClient();
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

  /* PRE-FETCHING */
  const pageCount = Math.ceil(count / PAGE_COUNT);

  // FOR PREVIOUS PAGE
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  // FOR NEXT PAGE
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    });

  return { bookings, isLoading, count };
};

export const useFetchBooking = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
};
