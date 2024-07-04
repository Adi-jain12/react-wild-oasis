import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi, login as loginApi } from "../../services/apiAuth";
import { updateCurrentUser } from "../../services/apiAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ user }) => loginApi(user),

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

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address."
      );
    },
  });

  return { signup, isLoading };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
