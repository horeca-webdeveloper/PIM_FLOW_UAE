import React, { useState } from "react";

const Technical = () => {
  const [show, setShow] = useState(true);
  const [formState, setFormState] = useState({
    brand: "",
    color: "green",
    material: "",
    certifications: "",
    warranty: "",
    returnPolicy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formState);
    // Handle form submission logic here
  };
  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Techincal Attribute
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">
            6 missing required attribute
          </span>
          <button className="ml-1">
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
              className="inline"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {show && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Power Type
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Wattage
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Voltage
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                No. of Door
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                BTU Rating
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Temprature Range
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Regrigerant Type
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Engery Efficiency Rating
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Control Type
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="brand"
              className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
            >
              Dimension (LxWxH)
            </label>
            <input
              type="text"
              id="Single"
              name="Single"
              value={formState.SupplierName}
              onChange={handleInputChange}
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="brand"
              className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
            >
              Weight (KG)
            </label>
            <input
              type="text"
              id="Single"
              name="Single"
              value={formState.SupplierName}
              onChange={handleInputChange}
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="returnPolicy"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Shipping Class
              </label>
              <button className="ml-1">
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
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <select
              id="returnPolicy"
              name="returnPolicy"
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </form>
      )}
    </div>
  );
};

export default Technical;
