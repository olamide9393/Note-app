import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axiosInstance from "../RequestUrl";
import './Createnote.css'



const NoteList = () => {
//   const [blogDatas, setblogDatas] = useState([]);
//   const [loading, setloading] = useState(false);

//   useEffect(() => {
//     history();
//   }, []);
//   async function history() {
//     setloading(true);
//     try {
//       const { data } = await axiosInstance.get("note/getNote", {});
//       console.log(data);
//       setblogDatas(data.result);
//     } catch (error) {
//     } finally {
//       setloading(false);
//     }
//   }
const [blog, setblog] = useState();
const navigate = useNavigate();
const [loading, setloading] = useState(false);

useEffect(() => {
  getNote();
}, []);
async function getNote() {
  setloading(true)
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
  if (!tokenString) {
    navigate("/login");
  }
  try {
    const { data } = await axiosInstance.get("note/getNote", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setblog(data);
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

  return (
    <div>
      <div className="container">
        <h1>Notes</h1>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
        />

        <link className="createnotecss" to="/Create-note"> create note</link>

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
                style={{ color: "black" }}
                to={"/note/" + elem._id}
              >
                <h3 style={{ color: "" }}>{elem.title}</h3>
                <p style={{ color: "grey" }}>{elem.content.slice(0, 100)}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
