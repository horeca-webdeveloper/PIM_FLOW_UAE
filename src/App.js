import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import AddProducts from "./pages/Products/AddProducts";
import Attributes from "./pages/Attributes/Attributes";
import AddAttribute from "./pages/Attributes/AddAttributes/AddAttribute";
import ImportProduct from "./pages/Products/ImportProduct";

// import ProductFamilies from "./pages/Products/ProductFamilies";
import CategoriesList from "./pages/Categories/CategoriesList";
import Categories from "./pages/Categories/Categories";
import InnerCategories from "./pages/Categories/InnerCategories";
import ProductFamilies from "./pages/Categories/ProductFamily";
import ProductFamilyDetails from "./pages/Categories/ProductFamilyDetails";

import AttributeGroups from "./pages/AttributedGroups/AttributeGroups";
import AttributeGroupDetails from "./pages/AttributedGroups/AttributeGroupDetails";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import UserManagement from "./pages/UserManagement/UserManagement";
import UserGeneralSetting from "./pages/UserManagement/UserGeneralSetting";
import UserPermission from "./pages/UserManagement/UserPermission";
import RoleManagement from "./pages/RoleManagement/RoleManagement";
import AttributePrivileges from "./pages/UserManagement/AttributePrivileges";
import Export from "./pages/Attributes/Export";
import Import from "./pages/Attributes/Import";
import BrandCustomizationFirst from "./pages/BrandPage/BrandCustomizationFirst";
import BrandCustomizationSecond from "./pages/BrandPage/BrandCustomizationSecond";
import BrandCustomizationThird from "./pages/BrandPage/BrandCustomizationThird";
import LogDetails from "./pages/Logs/LogDetails";
import ProductExport from "./pages/Products/ProductExport";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {

    element: <Layout />, // Wrapping Layout
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/Products/:id",
        element: <Products />,
      },
      {
        path: "/product/import",
        element: <ImportProduct />,
      },
      {
        path: "/product/export",
        element: <ProductExport/>,
      },
      {
        path: "/export",
        element: <Export />,
      },
      {
        path: "/import",
        element: <Import />,
      },


      // {
      //   path: "/product/families",
      //   element: <ProductFamilies />,
      // },
      {
        path: "/AddProducts/:id",
        element: <AddProducts />,
      },
      {
        path: "/Attributes",
        element: <Attributes />,
      },
      {
        path: "/MutliAttributes",
        element: <AddAttribute />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      
      {
        path: "/sub-categories",
        element: <CategoriesList />,
      },
      {
        path: "/create-sub-categories",
        element: <InnerCategories />,
      },
      {
        path: "/product-families",
        element: <ProductFamilies />,
      },
      {
        path: "/product-families-details",
        element: <ProductFamilyDetails />,
      },
      {
        path: "/attribute-groups",
        element: <AttributeGroups />,
      }
      ,
      {
        path: "/attribute-groups-details",
        element: <AttributeGroupDetails />,
      },
      {
        path: "/user-management",
        element: <UserManagement />,
      },
      {
        path: "/role-management",
        element: <RoleManagement />,
      },
      {
        path: "/premission-table",
        element: <UserPermission />
      },
      {
        path: "/attribute-privileges",
        element: <AttributePrivileges />
      },
      {
        path: "/user-general-setting",
        element: <UserGeneralSetting />
      }
      ,
      {
        path: "/brand/first",
        element: <BrandCustomizationFirst />
      },
      {
        path: "/brand/second",
        element: <BrandCustomizationSecond />
      },
      {
        path: "/brand/third",
        element: <BrandCustomizationThird />
      },
      {
        path: '/log-details/:id',
        element: <LogDetails />
      }
    ],
  },
]);

function App() {

  return (<>
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router} />
  </>);
}

export default App;
