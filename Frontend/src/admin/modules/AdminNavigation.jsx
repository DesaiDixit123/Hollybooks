import { NavLink } from "react-router-dom";


const AdminNav = () => {


  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 shadow-lg bg-gray-900">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <NavLink to={"/admin"} className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/allUsers"}
              className="block p-2 rounded hover:bg-gray-700"
            >
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/admin/AllBooks"}
              className="block p-2 rounded hover:bg-gray-600"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/Blogs"}
              className="block p-2 rounded hover:bg-gray-600"
            >
              Blogs
            </NavLink>
          </li>

          <li>
            <NavLink to={"/orders"} className="block p-2 rounded hover:bg-gray-700">
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={"/settings"} className="block p-2 rounded hover:bg-gray-700">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
