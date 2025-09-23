import { useState } from "react";
import { FaUserFriends, FaDatabase, FaCog } from "react-icons/fa";
import { MdDashboard, MdRestaurantMenu, MdReport, MdArrowBack, MdArrowForward } from "react-icons/md";
import DiscussionForum from "../pages/DiscussionForum";

const Sidebar = ({ setActivePage }) => {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard /> },
    { name: "Patients", icon: <FaUserFriends /> },
    { name: "PatientDetails", icon: <MdReport /> },  
    { name: "Discussion Forum", icon: <FaUserFriends /> }, // ✅ merged from other branch
    { name: "Food Database", icon: <FaDatabase /> },
    { name: "Diet Generator", icon: <MdRestaurantMenu /> },
    { name: "Profile", icon: <FaCog /> },
  ];

  const handleClick = (name) => {
    setActive(name);
    setActivePage(name);
  };

  return (
    <div
      className={`min-h-screen bg-[#F8FAF6] border-r border-gray-200 flex flex-col justify-between shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Logo + Collapse Button */}
      <div>
        <div className="flex items-center justify-between px-4 py-6">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-yellow-500 text-white font-bold shadow-md">
                🌿
              </div>
              <span className="text-2xl font-semibold text-green-700">AyuGraph</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-green-700 hover:text-green-900"
          >
            {collapsed ? <MdArrowForward /> : <MdArrowBack />}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left font-medium transition-all duration-200 ${
                active === item.name
                  ? "bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-xl shadow-md"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-xl"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 text-sm text-center text-gray-500 border-t border-gray-200">
        {!collapsed && (
          <>
            <p className="font-medium text-green-700">AyuFit v1.0</p>
            <p className="text-xs">Ayurvedic Diet Platform</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
