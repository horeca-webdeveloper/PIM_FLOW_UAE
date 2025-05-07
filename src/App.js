import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import AddProducts from "./pages/Products/AddProducts";
import Attributes from "./pages/Attributes/Attributes";
import AddAttribute from "./pages/Attributes/AddAttributes/AddAttribute";
import ImportProduct from "./pages/Products/ImportProduct";
import ProtectedRoute from "./components/ProtectedRoute";
// import ProductFamilies from "./pages/Products/ProductFamilies";
import CategoriesList from "./pages/Categories/CategoriesList";
import SubCategoriesList from "./pages/Categories/SubCategoriesList";
import Categories from "./pages/Categories/Categories";
import InnerCategories from "./pages/Categories/InnerCategories";
import ProductFamilies from "./pages/Categories/ProductFamily";
import ProductFamilyDetails from "./pages/Categories/ProductFamilyDetails";
import SecondBrandList from "./pages/BrandPage/SecondBrandList";
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
import BrandManagement from "./pages/BrandManagement/BrandManagement";
import VendorManagement from "./pages/VendorManagement/VendorManagement";
import Faq from "./pages/FAQ/Faq";
import SeoExport from "./pages/SEO/Export/SeoExport";
import SeoImport from "./pages/SEO/Import/SeoImport";
import MediaManagement from "./pages/MediaManagement/MediaManagement";
import SubMediaManagement from "./pages/MediaManagement/SubMediaManagement";
import MediaAsset from "./pages/MediaManagement/MediaAsset";
import MediaFiles from "./pages/MediaManagement/MediaFiles";
import BrandListFirst from "./pages/BrandPage/BrandListFirst";
import BrandListThird from "./pages/BrandPage/BrandListThird";
import PreVendorManagement from "./pages/PreVendorManagement/PreVendorManagement";
import { PreVendorManagementProvider } from "./pages/PreVendorManagement/PreVendorManagementContext";
import { VendorManagementProvider } from "./pages/VendorManagement/VendorManagementContext";
import VendorImport from "./pages/VendorManagement/VendorImport";
import CategoryDragAndDrop from "./pages/Categories/CategoryDragAndDrop";
import AddPermission from "./pages/RoleManagement/AddPermission";
import VendorAsset from "./pages/VendorManagement/Components/VendorAsset";
import VendorMediaFiles from "./pages/VendorManagement/Components/VendorMediaFiles";
import ImportBenifits from "./pages/Products/ImportBenifits";
import ExportBenifits from "./pages/Products/ExportBenifits";
import ImportDocuments from "./pages/Products/ImportDocuments";
import ImportImages from "./pages/Products/ImportImages";
import VendorExport from "./pages/VendorManagement/Components/VendorExport";
import UpdatePermission from "./pages/RoleManagement/UpdatePermission";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, // 👈 wrap all routes that need protection
    children:[
      {
    element: <Layout />, // Wrapping Layout
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/BrandManagement",
        element: < BrandManagement />,
      },
      {
        path: "/VendorManagement",
        element:  <VendorManagementProvider> < VendorManagement /></VendorManagementProvider>,
      },
      {
        path: "/PreVendorManagement",
        element: <PreVendorManagementProvider>
        <PreVendorManagement />
      </PreVendorManagementProvider>,
      },
      {
        path: "/Faq",
        element: < Faq />,
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
        path: "/seoexport",
        element: <SeoExport />,
      },
      {
        path: "/VendorExport",
        element: <VendorExport />,
      },
      {
        path: "/seoimport",
        element: <SeoImport />,
      },
      {path:"/vendor-import",
        element:<VendorImport/>
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
        path: "/MutliAttributes/:id",
        element: <AddAttribute />,
      },
      {
        path: "/create-categories",
        element: <Categories />,
      },
      {
        path: "/category-drag-and-drop",
        element: <CategoryDragAndDrop />,
      },
      {
        path: "/categories",
        element: <CategoriesList />,
      },
      {
        path: "/sub-categories",
        element: <SubCategoriesList />,
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
        path: "/product-families-details/:id",
        element: <ProductFamilyDetails />,
      },
      {
        path: "/attribute-groups",
        element: <AttributeGroups />,
      }
      ,
      {
        path: "/attribute-groups-details/:id",
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
        path: "/add-permission",
        element: <AddPermission />
      },
      {
        path: "/update-permission",
        element: <UpdatePermission />
      },

      {
        path: "/premission-table",
        element: <UserPermission />
      },
      // SubMediaManagement
      {
        path: "/sub-media-management/:id",
        element: <SubMediaManagement />
      },
      {
        path: "/MediaAsset/:id",
        element: <MediaAsset />
      },
      {path:"/VendorAsset/:id",
        element:<VendorManagementProvider><VendorAsset/></VendorManagementProvider>
      },
      {
        path: "/MediaFiles",
        element: < MediaFiles/>
      },
      {
        path: "/VendorMediaFiles",
        element:<VendorManagementProvider> < VendorMediaFiles/></VendorManagementProvider>
      },
      {
        path: "/attribute-privileges",
        element: <AttributePrivileges />
      },
      {
        path: "/user-general-setting",
        element: <UserGeneralSetting />
      },
      // MediaManagement
      {
        path: "/media-management",
        element: <MediaManagement />
      },
      {
        path: "/brand/first",
        element: <BrandListFirst />
      },
      {
        path: "/brand/first-create",
        element: <BrandCustomizationFirst />
      },
      {
        path: "/brand/second",
        element: <SecondBrandList />
      },
      {
        path: "/brand/second-create",
        element: <BrandCustomizationSecond />
      },
      {
        path: "/brand/third",
        element: <BrandListThird />
      },
      {
        path: "/brand/third-create",
        element: <BrandCustomizationThird />
      },
      {
        path: '/log-details/:id',
        element: <LogDetails />
      },
      {
        path: '/import-features-and-benefits',
        element: <ImportBenifits />
      },
      {
        path: '/export-features-and-benefits',
        element: <ExportBenifits />
      },
      {
        path: '/product/import-images',
        element: <ImportImages />
      },
      {
        path: '/product/import-documents',
        element: <ImportDocuments />
      }
    ],
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
