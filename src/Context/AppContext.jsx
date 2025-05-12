// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { useFetchManageAuthPermissions } from "../services/apis/AuthPermission/Hooks";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data, isLoading, error } = useFetchManageAuthPermissions();
  const [AllowedPermissions, setAllowedPermission] = useState(null); // example global state

  useEffect(() => {
    if (data) {
      setAllowedPermission(data);
    }
  }, [data]);

  return (
    <AppContext.Provider value={{ AllowedPermissions, setAllowedPermission,isLoading }}>
      {children}
    </AppContext.Provider>
  );
};
