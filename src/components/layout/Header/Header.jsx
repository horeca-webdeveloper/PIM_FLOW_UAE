import React, { useState } from "react";
import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";
import Logo from "../../../assets/logo/HorecaFlowLogo.png"; // Adjust path based on your folder structure
import { FaEarthAmericas } from "react-icons/fa6";
import { menuItems } from "../../../utils/menuItems";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  activeLink,
  setActiveLink,
  openSubmenus,
  setOpenSubmenus,
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  // Hide suggestions on blur with a small delay to allow click
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };
  const handleNavigation = (item) => {
    setActiveLink(item.link);
    setOpenSubmenus((prev) => {
      const isCurrentlyOpen = !!prev[item.parentMenu];
      // Close all menus and open only the clicked one (if it wasn't already open)
      return isCurrentlyOpen ? {} : { [item.parentMenu]: true };
    });

    navigate(item.link);
  };
  return (
    <header className="fixed top-0 left-0 w-full text-white z-10 flex items-center justify-between bg-white px-[20px] border-[#DFDFDF] border-b-2 py-[5px]">
      {/* Left Section: Logo & Greeting */}
      <div className="flex items-center space-x-4 w-full ">
        <img className="h-[34px] w-[170px] mr-[4%]" src={Logo} />
        <span className="hidden Header:block text-[#303030] ml-[0px] font-light text-[20px] leading-[24px]">
          Good Morning, Shahzaib
        </span>
      </div>

      {/* Right Section: Search Bar, Icons & User Profile */}
      <div className="flex items-center space-x-5">
        {/* Search Bar */}
        <div className="relative w-80">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <FaSearch className="text-gray-500" />
            <input
              type="search"
              placeholder="Search for anything..."
              value={query}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur} // Add a small delay on blur to hide
              className="bg-transparent outline-none text-black text-sm px-2 w-full"
            />
          </div>

          {showSuggestions && query && filteredItems.length > 0 && (
            <ul className="absolute z-10 mt-1 bg-white shadow-md rounded-md w-full max-h-60 overflow-y-auto text-sm">
              {filteredItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent focus loss from input
                      handleNavigation(item); // Manually handle the redirection
                      setShowSuggestions(false); // Hide suggestions after click
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    {item.label} {item.parentMenu ? `- ${item.parentMenu}` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a
          href="https://thehorecastore.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEarthAmericas className="text-gray-600 cursor-pointer hover:text-gray-900" />
        </a>

        <FaBell className="text-gray-600 cursor-pointer hover:text-gray-900" />
        <FaEnvelope className="text-gray-600 cursor-pointer hover:text-gray-900" />

        <div className="flex items-center space-x-2">
          <img
            src="https://media.istockphoto.com/id/1503331050/photo/stylish-woman-enthralled-in-smartphone-use-at-home-exploring-social-media-trends-posting-or.jpg?s=2048x2048&w=is&k=20&c=o6lJNhnFChspRxhubbuCVFxj-aOQHjsSZ8FY77E8RSQ="
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col ">
            <span className="block w-[120px] text-sm font-medium text-black">
              Shahzaib Shoaib
            </span>
            <span className="block text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
