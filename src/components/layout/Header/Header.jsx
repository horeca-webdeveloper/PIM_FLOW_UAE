import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";
import Logo from "../../../assets/logo/HorecaFlowLogo.png"; // Adjust path based on your folder structure
import { FaEarthAmericas } from "react-icons/fa6";

const Header = () => {
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
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-80">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="bg-transparent outline-none text-sm px-2 w-full"
          />
        </div>

        <FaEarthAmericas className="text-gray-600 cursor-pointer hover:text-gray-900" />
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
