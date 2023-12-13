import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "../component/Navbar";
import NoteList from "../component/NoteList";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SingleNote from "../pages/SingleNote";

const Routes = () => {
  const routing = useRoutes([
    {
      path: "/",
//       element: <Navbar />,

      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "navbar",
          element: <Navbar />,
        },
        {
          path: "NoteList",
          element: <NoteList />,
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
      ],
    },
  ]);
  return <div>{routing}</div>;
};

export default Routes;
