// import { FaUsers } from "react-icons/fa";
// import { SiBookstack } from "react-icons/si";
// import { BarChart } from "./BarChart";
// import {   useDispatch, useSelector } from "react-redux";
// import PieChart from "./PieChart";
// import { useEffect } from "react";
// import { fetchTotalBooks, fetchTotalUsers } from "../../redux/admin/AdminThunkApi";

// export default function AdminHome() {
//   const dispatch = useDispatch();
//   const { totalUsers, adminData, totalBooks } = useSelector(
//     (state) => state.AdminSliceProvider
//   );

//   useEffect(() => {
//     dispatch(fetchTotalUsers());
//     dispatch(fetchTotalBooks());
//   }, [dispatch]);

//   console.log("totalusers:", totalUsers);

//   return (
//     <>
//       <div>
//         <div className="bg-gray-800 text-white p-[10px] rounded-[10px]">
//           <h1 className="text-[30px] font-bold">Welcome To Dashboard</h1>
//           <p className="text-[20px]">
//             Hello {adminData.fname} {adminData.lname}, Welcome To Your Awesome Dashboard!
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-around gap-32 pt-[30px]">
//         <div className="bg-gray-600 text-white w-[50%] flex justify-center h-[80px] items-center rounded-[10px]">
//           <div>
//             <FaUsers className="text-[40px] relative -left-5" />
//           </div>
//           <div>
//             <p className="text-[20px]">Total Users</p>
//             <p className="text-center">{totalUsers}</p>
//           </div>
//         </div>
//         <div className="bg-gray-600 text-white w-[50%] flex justify-center h-[80px] items-center rounded-[10px]">
//           <div>
//             <SiBookstack className="text-[40px] relative -left-5" />
//           </div>
//           <div>
//             <p className="text-[20px]">Total Books</p>
//             <p className="text-center">{totalBooks}</p>
//           </div>
//         </div>
//       </div>
//       <BarChart />
//       <PieChart />
//     </>
//   );
// }

import { FaUsers } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { BarChart } from "./BarChart";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "./PieChart";
import {
  fetchTotalBooks,
  fetchTotalUsers,
} from "../../redux/admin/AdminThunkApi";
import { useEffect } from "react";

export default function AdminHome() {
  const dispatch = useDispatch();
  const { totalUsers, adminData, totalBooks, userData } = useSelector(
    (state) => state.AdminSliceProvider
  );

  useEffect(() => {
    // console.log("Dispatching fetchTotalUsers");
    // dispatch(fetchTotalUsers());
    // console.log("Dispatching fetchTotalBooks");
    // dispatch(fetchTotalBooks());
    // console.log(totalUsers);
  }, []);

  // console.log("totalusers:", totalUsers);

  return (
    <>
      <div>
        <div className="bg-gray-800 text-white p-[10px] rounded-[10px]">
          <h1 className="text-[30px] font-bold">Welcome To Dashboard</h1>
          <p className="text-[20px]">
            Hello {adminData.fname} {adminData.lname}, Welcome To Your Awesome
            Dashboard!
          </p>
        </div>
      </div>

      <div className="flex justify-around gap-32 pt-[30px]">
        <div className="bg-gray-600 text-white w-[50%] flex justify-center h-[80px] items-center rounded-[10px]">
          <div>
            <FaUsers className="text-[40px] relative -left-5" />
          </div>
          <div>
            <p className="text-[20px]">Total Users</p>
            <p className="text-center">{totalUsers.length}</p>
          </div>
        </div>
        <div className="bg-gray-600 text-white w-[50%] flex justify-center h-[80px] items-center rounded-[10px]">
          <div>
            <SiBookstack className="text-[40px] relative -left-5" />
          </div>
          <div>
            <p className="text-[20px]">Total Books</p>
            <p className="text-center">{totalBooks.length}</p>
          </div>
        </div>
      </div>
      <BarChart />
      {/* <PieChart /> */}
    </>
  );
}
