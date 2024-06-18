import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  updateSetting as updateSettingApi,
} from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useSettings = () => {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings };
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,

    onSuccess: () => {
      toast.success("Settings updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
};
