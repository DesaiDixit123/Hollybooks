import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./Index";
import UserIndex from "./user/UserIndex";
import UserRegister from "./user/components/Register";
import UserLogin from "./user/components/Login";
import AdminIndex from "./admin/AdminIndex";
import AdminHome from "./admin/components/AdminHome";
import AdminAddBooks from "./admin/components/AdminAddBooks";
import AdminUpdateBooks from "./admin/components/AdminUpdateBooks";
import Home from "./user/components/Home";
import Addbooks from "./user/components/Books/Addbooks";
import Allbooks from "./user/components/Books/Allbooks";
import Aboutus from "./user/components/Aboutus";
import Contactus from "./user/components/Contactus";
import UpdatePassword from "./user/components/Login/UpdatePassword";
import ForgetPassword from "./user/components/Login/ForgetPassword";
import ResetPassword from "./user/components/Login/ResetPassword";
import Wishlist from "./user/components/Wishlist";
import UserTable from "./admin/components/AdminAllUser";
import DeleteProduct from "./admin/components/AdminDeleteBooks";
import AdminProductsList from "./admin/components/AdminAllBooks";
import BookDetails from "./user/components/Books/BooksDetail";
import SearchPage from "./user/components/Books/SearchPage";
import RatingForm from "./user/components/RatingForm";
import TermsOfService from "./user/components/TermsOfServices";
import PrivacyPolicy from "./user/components/PrivacyPolicy";
import Blogs from "./user/components/Blogs";
import AdminBlog from "./admin/components/AdminBlog";
import CartDetails from "./user/components/CartDetails";
import ProcessToCheckout from "./user/components/ProcessToCheckout";
import AdminAddBlog from "./admin/components/AdminAddBlog";
import AdminUpdatedBlog from "./admin/components/AdminUpdatedBlog";
import AdminBlogDelete from "./admin/components/AdminBlogDelete";
import AdminOrders from "./admin/components/AdminOrders";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <UserIndex />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/addbooks", element: <Addbooks /> },
          { path: "/allbooks", element: <Allbooks /> },
          { path: "/aboutus", element: <Aboutus /> },
          { path: "/contactus", element: <Contactus /> },
          { path: "/register", element: <UserRegister /> },
          { path: "/login", element: <UserLogin /> },
          { path: "/updatepass", element: <UpdatePassword /> },
          { path: "/forgetpassword", element: <ForgetPassword /> },
          { path: "/reset-password/:token", element: <ResetPassword /> },
          { path: "/wishlist", element: <Wishlist /> },
          { path: "/bookdetail/:id", element: <BookDetails /> },
          { path: "/search", element: <SearchPage /> },
          { path: "/ratings", element: <RatingForm /> },
          { path: "/termsOfServices", element: <TermsOfService /> },
          { path: "/privacyPolicy", element: <PrivacyPolicy /> },
          { path: "/blogs", element: <Blogs /> },
          { path: "/cartdetails", element: <CartDetails /> },
          { path: "/processToCheckout", element: <ProcessToCheckout /> },
        
        ],
      },
      {
        path: "/admin",
        element: <AdminIndex />,
        children: [
          {
            path: "/admin",
            element: <AdminHome />,
          },
      
          {
            path: "/admin/addbooks",
            element: <AdminAddBooks />,
          },
          {
            path: "/admin/updatebooks",
            element: <AdminUpdateBooks />,
          },
          {
            path: "/admin/delete",
            element: <DeleteProduct />,
          },
          {
            path: "/admin/AllBooks",
            element: <AdminProductsList />,
          },
          {
            path: "/admin/allUsers",
            element: <UserTable />,
          },
          {
            path: "/admin/blogs",
            element: <AdminBlog />,
          },
          {
            path: "/admin/addblog",
            element: <AdminAddBlog />,
          },
          {
            path: "/admin/updateblog",
            element: <AdminUpdatedBlog />,
          },
          {
            path: "/admin/deleteblog",
            element: <AdminBlogDelete />,
          },
          {
            path: "/admin/userorders",
            element: <AdminOrders />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;
