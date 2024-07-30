import { Outlet } from "react-router-dom";
import UserContext from "./context/UserProvider";
import Navigation from "./modules/Navigation";
import Footer from "./modules/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoArrowUp } from "react-icons/go";
export default function UserIndex() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <UserContext>
        <Navigation />
        <div
        className="w-[60px] bg-yellow-600 text-[60px] flex justify-center items-center rounded-full h-[60px] fixed bottom-[20px] z-40 right-[20px] cursor-pointer"
        onClick={scrollToTop}
      >
        <GoArrowUp />
      </div>
        <Outlet />
        <Footer/>
      </UserContext>
    </>
  );
}
