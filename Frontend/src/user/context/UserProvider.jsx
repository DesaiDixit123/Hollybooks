/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UserValidation } from "../../redux/ThunkApi";


export const UserProvider = createContext();

export default function UserContext({ children }) {
  // const [userData, setUserData] = useState();
  const { userData } = useSelector((state) => state.MySliceProvider);

  const [logout, setLogout] = useState(true);

  const dispatch=useDispatch()

  // const verifyUser = async () => {

  //   dispatch(UserValidation({setUserData}))
  
   
  // };

  useEffect(() => {
    // verifyUser();
  }, [logout]);
  return (
    <UserProvider.Provider
      value={{
        userData,
        logout,
        setLogout,
      }}
    >
      {children}
    </UserProvider.Provider>
  );
}
