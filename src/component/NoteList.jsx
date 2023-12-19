import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axiosInstance from "../RequestUrl";
import "./Createnote.css";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const NoteList = () => {
  const [blogDatas, setblogDatas] = useState();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getNote();
  }, []);
  async function getNote() {
    setloading(true);
    let token; // Declare the token variable in the appropriate scope

    const tokenString = localStorage.getItem("user");

    if (tokenString) {
      try {
        const parsedData = JSON.parse(tokenString);
        if (parsedData && parsedData.token) {
          // Initialize the token variable here
          token = parsedData.token;
          // console.log(token, "hello");
        } else {
          console.log("Token is missing or invalid.");
        }
      } catch (error) {}
    }
    // if (!tokenString) {
    //   navigate("/login");
    // }
    try {
      const { data } = await axiosInstance.get("note/getNote", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setblogDatas(Array.isArray(data.message) ? data.message : []);

      console.log(data);
    } catch (error) {
      // Handle the error appropriately for your application
      if (error.data && error.data.status === 401) {
        // console.error("Request error:", error.message);
        navigate("/login");
      } else {
      }
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    // Check if a token is available in local storage
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token is available
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage on logout
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="container">
        <h1>Notes</h1>

        <ul
          class="nav nav-pills"
          style={{ marginLeft: "700px", fontSize: "30px", marginTop: "-50px" }}
        >
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
              <CgProfile />
            </a>

            {isLoggedIn ? (
              // Display "Logout" if the user is logged in
              <>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/Profile">
                    PROFILE
                  </Link>

                  <Link className="dropdown-item" to="/login">
                    LOGOUT
                  </Link>
                </div>
              </>
            ) : (
              // Display "Login" and "Register" if the user is not logged in
              <>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/login">
                    LOGIN
                  </Link>
                </div>
              </>
            )}
          </li>
        </ul>

        {/* </Link> */}
        <input
          style={{ width: "100%" }}
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
        />
        <div>
          <Link to="/Create-note" className="createnotecss">
            <FaPlusCircle />
          </Link>
        </div>

        {loading ? (
          <h1>
            <div
              className="spinner-border text-muted"
              style={{ width: "100px", height: "100px" }}
            ></div>
          </h1>
        ) : (
          blogDatas?.map((elem) => (
            <div
              className="blog-preview"
              key={elem._id}
              style={{ marginTop: "20px" }}
            >
              <Link
                className="decoration"
                style={{ color: "black" }}
                to={"/note/" + elem._id}
              >
                <h5 style={{ color: "" }}>{elem.title}</h5>
                <p style={{ color: "" }}>{elem.content.slice(0, 100)}</p>
                <p style={{ color: "grey" }}>{elem.createdAt}</p>
              </Link>
              <div style={{ marginLeft: "1000px" }}>
                <FaTrash />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
