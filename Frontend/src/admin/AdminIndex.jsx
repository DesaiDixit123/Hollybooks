import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AdminVelidation } from "../redux/admin/AdminThunkApi";
import AdminLogin from "./components/AdminLogin";
import AdminNav from "./modules/AdminNavigation";

export default function AdminIndex() {
  const dispatch = useDispatch();
  const { loading, isAdmin } = useSelector((state) => state.AdminSliceProvider);

  useEffect(() => {
    dispatch(AdminVelidation());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : isAdmin ? (
        <div className="flex">
          <AdminNav />
          <div className="flex-grow  p-4 overflow-auto h-screen">
            <Outlet />
          </div>
        </div>
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
