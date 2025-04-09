import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";

const ProductsTable = ({ productsData, productsLoading }) => {
  const navigate = useNavigate();
  // Sample data for the table also for how much it's complete
  const products = [
    {
      id: 1,
      productName: "Menumaster Stainless Steel...",
      sku: "1234567890",
      image: true,
      vendor: "Rapid Supplies",
      brand: "Hamilton Beach",
      status: "Active",
      productFamily: "Kitchen Equipment",
      inStock: "Yes",
      taxonomyPath: "Mechanical/Electrical equip...",
      lifecycleStage: "Marketing (70%)",
      qualityScore: "A",
    },
    {
      id: 1,
      productName: "Atosa",
      sku: "1234567890",
      image: true,
      vendor: "Rapid Supplies",
      brand: "Hamilton Beach",
      status: "Active",
      productFamily: "Kitchen Equipment",
      inStock: "Yes",
      taxonomyPath: "Mechanical/Electrical equip...",
      lifecycleStage: "Marketing (70%)",
      qualityScore: "A",
    },
    {
      id: 1,
      productName: "Kinemaster",
      sku: "1234567890",
      image: true,
      vendor: "Rapid Supplies",
      brand: "Hamilton Beach",
      status: "In Active",
      productFamily: "Kitchen Equipment",
      inStock: "Yes",
      taxonomyPath: "Mechanical/Electrical equip...",
      lifecycleStage: "Marketing (70%)",
      qualityScore: "A",
    },
    {
      id: 1,
      productName: "Zigota Cheese...",
      sku: "1234567890",
      image: true,
      vendor: "Rapid Supplies",
      brand: "Hamilton Beach",
      status: "Active",
      productFamily: "Kitchen Equipment",
      inStock: "Yes",
      taxonomyPath: "Mechanical/Electrical equip...",
      lifecycleStage: "Marketing (70%)",
      qualityScore: "B",
    },
    {
      id: 1,
      productName: "Blue Cheese.",
      sku: "1234567890",
      image: true,
      vendor: "Rapid Supplies",
      brand: "Hamilton Beach",
      status: "Active",
      productFamily: "Kitchen Equipment",
      inStock: "Yes",
      taxonomyPath: "Mechanical/Electrical equip...",
      lifecycleStage: "Marketing (70%)",
      qualityScore: "C",
    },
    {
      id: 2,
      status: "Active",
      inStock: "Yes",
      lifecycleStage: "Content (30%)",
      qualityScore: "B",
    },
    {
      id: 2,
      status: "Active",
      inStock: "Yes",
      lifecycleStage: "Content (30%)",
      qualityScore: "B",
    },
    {
      id: 2,
      status: "Active",
      inStock: "Yes",
      lifecycleStage: "Content (30%)",
      qualityScore: "B",
    },
    {
      id: 2,
      status: "Active",
      inStock: "Yes",
      lifecycleStage: "Content (30%)",
      qualityScore: "B",
    },
    {
      id: 2,
      status: "Active",
      inStock: "Yes",
      lifecycleStage: "Content (30%)",
      qualityScore: "B",
    },
    { id: 3, lifecycleStage: "Graphics (80%)", qualityScore: "C" },
    { id: 4, lifecycleStage: "Completed (100%)", qualityScore: "A" },
    { id: 5, lifecycleStage: "Marketing (70%)", qualityScore: "B" },
    { id: 6, lifecycleStage: "Content (30%)", qualityScore: "C" },
    { id: 7, lifecycleStage: "Graphics (80%)", qualityScore: "A" },
    { id: 8, lifecycleStage: "Completed (100%)", qualityScore: "B" },
    { id: 9, lifecycleStage: "Content (30%)", qualityScore: "C" },
    { id: 10, lifecycleStage: "Graphics (80%)", qualityScore: "A" },
    { id: 11, lifecycleStage: "Completed (100%)", qualityScore: "B" },
    { id: 12, lifecycleStage: "Content (30%)", qualityScore: "C" },
    { id: 13, lifecycleStage: "Graphics (80%)", qualityScore: "A" },
    { id: 14, lifecycleStage: "Completed (100%)", qualityScore: "B" },
  ];

  // Function to get background color for lifecycle stage
  const getLifecycleBackground = (stage) => {
    if (stage.includes("Marketing")) return "bg-[#8280FF80]";
    if (stage.includes("Content")) return "bg-purple-100";
    if (stage.includes("Graphics")) return "bg-[#8280FF80]";
    if (stage.includes("Completed")) return "bg-[#26683A80]";
    return "";
  };

  const getLifecyclePercentage = (stage) => {
    const match = stage.match(/\((\d+)%\)/); // Extract percentage inside parentheses
    return match ? `${match[1]}%` : "100%"; // Default to full width if no percentage found
  };

  // Function to get background color for quality score
  const getQualityScoreBackground = (score) => {
    if (score === "A") return "bg-[#00B69B]";
    if (score === "B") return "bg-[#FEC53D]";
    if (score === "C") return "bg-[#4AD991]";
    return "";
  };
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      {/* Tab navigation */}
      <div className="flex border-b mb-4">
        <button className="px-4 py-2 font-medium text-gray-700">
          Option One
        </button>
        <button className="px-4 py-2 font-medium text-gray-700">
          Option Two
        </button>
        <button className="px-4 py-2 font-medium text-gray-700">
          Option Three
        </button>
        <button className="px-4 py-2 font-medium text-gray-700">
          Option Four
        </button>
        <div className="ml-auto flex items-center">
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 h-[60px] px-3 py-2 border">
                <input type="checkbox" className="h-4 w-4" />
              </th>
              <th className="px-3 py-2 min-w-[200px] text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  Product Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  SKU
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  Image
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  Vendor
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  Brand
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  Status
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left min-w-[200px] text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  Product Family
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                <div className="flex items-center">
                  In Stock
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </div>
              </th>
              <th className="px-3 py-2 text-left min-w-[200px] text-sm font-medium text-gray-700 border">
                Taxonomy Path
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border">
                Lifecycle Stage
              </th>
              <th className="px-3 py-2 text-center text-sm font-medium text-gray-700 border">
                Quality
                <br />
                Score
              </th>
              <th className="px-3 py-2 text-center text-sm font-medium text-gray-700 border">
                Action
              </th>
            </tr>
          </thead>
          {!productsLoading ? (
            <tbody>
              {productsData.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap border">
                    <input type="checkbox" className="h-4 w-4" />
                  </td>
                  <td className="px-3 py-2 w-[200px] text-sm text-gray-500 border">
                    {product.name || ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    {product.sku || ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    {product.image && (
                      <img
                        src={product.image}
                        alt="Product"
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    {product.store || ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    {product.brand || ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    {product.status && (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-purple-100 text-purple-800">
                        {product.status}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2  text-sm text-gray-500 border">
                    {product.product_family?.join(", ") || ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    {product.inStock && (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-800 text-white">
                        {product.inStock}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2  text-sm text-gray-500 border">
                    {product.taxonomy_path || ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 border relative overflow-hidden">
                    <span className="relative z-10">
                      {product.lifecycleStage}
                    </span>
                  </td>
                  <td
                    className={`flex items-center h-[60px] justify-center px-0 py-0  ${getQualityScoreBackground(
                      product.qualityScore
                    )}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center text-black font-light rounded-full bg-white">
                      {product.qualityScore}
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`/AddProducts/${product.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tr>
              <td colSpan="12" className="text-center py-4">
                <Loader />
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
