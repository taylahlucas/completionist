import useEditUserData from "@data/hooks/useEditUserData.native";
import useMainState from "@redux/hooks/useMainState";
import { useState } from "react";

export const useSetUsername = () => {
  const { user } = useMainState();
  const [username, setUsername] = useState<string>('');
  const { updateUserData } = useEditUserData();

  return {
    viewModel: {
      user,
      username
    },
    actions: {
      setUsername,
      updateUserData
    }
  }
};