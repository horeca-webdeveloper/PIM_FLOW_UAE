// src/context/PreVendorManagementContext.js
import React, { createContext, useState } from "react";

// Step 1: Create the context
export const PreVendorManagementContext = createContext();

// Step 2: Create the provider
export const PreVendorManagementProvider = ({ children }) => {
  const [performance, setPerformance] = useState({});
  const [searchVendor, setSearhVendor] = useState("");
  const [searchquery, setSearchQuery] = useState("");

  return (
    <PreVendorManagementContext.Provider
      value={{
        performance,
        setPerformance,
        searchVendor,
        setSearhVendor,
        searchquery,
        setSearchQuery,
      }}
    >
      {children}
    </PreVendorManagementContext.Provider>
  );
};
