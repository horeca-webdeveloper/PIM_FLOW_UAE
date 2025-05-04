// src/context/PreVendorManagementContext.js
import React, { createContext, useState } from "react";

// Step 1: Create the context
export const VendorManagementContext = createContext();

// Step 2: Create the provider
export const VendorManagementProvider = ({ children }) => {
  const [createData, setCreateData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [vendorName, setVendorName] = useState("");

  return (
    <VendorManagementContext.Provider
      value={{
        createData,
        setCreateData,
        editData,
        setEditData,
        vendorName,
        setVendorName,
      }}
    >
      {children}
    </VendorManagementContext.Provider>
  );
};
