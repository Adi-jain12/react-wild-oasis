import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createEditCabin,
  deleteCabin as deleteCabinApi,
  getCabins,
} from "../../services/apiCabins";

export const useFetchCabins = () => {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins };
};

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast.success("New cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
};

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

    onSuccess: () => {
      toast.success("New cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editCabin, isEditing };
};

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,

    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
};
