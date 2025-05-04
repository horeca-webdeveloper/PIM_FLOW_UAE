 import { baseUrls } from "../utils/apiWrapper";
 export const basePath = baseUrls;
// export const basePath = `https://testpim.thehorecastore.co/api`;

// Categories API's
export const categoriesApiPath = `${basePath}/categories`;
export const allCategoriesApiPath = `${basePath}/allcategories`;
export const ProductsApiPath = `${basePath}/products`;
export const BrandsApiPath = `${basePath}/brands`;
export const StoreApiPath = `${basePath}/stores`;
export const LoginApiPath = `${basePath}/login`;
export const FaqApiPath = `${basePath}/faqs`;
export const SeoManagementApiPath = `${basePath}/seo-management`;
export const FaqCategoriesApiPath = `${basePath}/faq-categories`
export const AiFaqApiPath = `${basePath}/generate-faqs`;
export const AiReviewsApiPath = `${basePath}/generate-reviews`;
export const AiBenefitsFeaturesApiPath = `${basePath}/generate-benefits-features`;
export const ManageBrandsListApiPath = `${basePath}/getbrandsList`;
export const ManageVendorListApiPath = `${basePath}/getStoresList`;
export const ManageConfirmVendorListApiPath = `${basePath}/vendors`;
export const FetchAllCountriesApiPath = `${basePath}/countries`
export const ManagePreEvaluationVendorListApiPath = `${basePath}/pre-onboarding-vendors`;
export const BrandsBrandApiPath = `${basePath}/brands`;
export const DashbaordStatsApiPath = `${basePath}/dashboard/stats`

export const UsersApiPath = `${basePath}/users`;
export const RolesApiPath = `${basePath}/roles`;
export const RolesPermissionApiPath = `${basePath}/permissions`;