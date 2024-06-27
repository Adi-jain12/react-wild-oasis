import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ user }) => loginUser(user),

    onSuccess: () => {
      toast.success("User login successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoading };
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: ({ user }) => createUser(user),

    onSuccess: () => {
      toast.success("User created successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createUser, isLoading };
};
