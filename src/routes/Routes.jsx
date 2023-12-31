import React from "react";
import { useRoutes } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import NoteList from "../component/NoteList";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SingleNote from "../pages/SingleNote";
import UserProfile from "../pages/UserProfile";

const Routes = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Navbar />,

      children: [
        {
          index: true,
          element: <NoteList />,
        },
        {
          path: "navbar",
          element: <Navbar />,
        },
        {
          path: "Create-note",
          element: <CreateNote />,
        },
        {
          path: "Edit-note",
          element: <EditNote />,
        },
        {
          path: "note/:id",
          element: <SingleNote />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register />,
        },
        {
          path: "Profile",
          element: <UserProfile />,
        },
        {
          path: "Footer",
          element: <Footer />,
        },
      ],
    },

    
  ]);
  return <div>{routing}</div>;
};

export default Routes;
