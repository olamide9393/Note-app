import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axiosInstance from "../RequestUrl";
import './Createnote.css'
import { FaPlusCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";



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
const [blogDatas, setblogDatas] = useState();
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
//     setblogDatas(data);
setblogDatas(Array.isArray(data) ? data : []);

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

  return (
    <div>
      <div className="container">
        <h1>Notes</h1>
        <Link style={{marginLeft:"500px"}} to="/Profile">
        <CgProfile />
        </Link>
        <input
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
