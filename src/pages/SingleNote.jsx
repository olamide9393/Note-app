import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../RequestUrl";
import "./Single.css";


const SingleNote = () => {

           const { id } = useParams();
           const [blog, setblog] = useState();
           const navigate = useNavigate();
           const [loading, setloading] = useState(false);
         
           useEffect(() => {
             getSingleBlog();
           }, []);
           async function getSingleBlog() {
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
               const { data } = await axiosInstance.get(`note/${id}`, {
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
      {loading ? (
        <h1>
          <div
            className="spinner-border text-success"
            style={{ width: "100px", height: "100px" }}
          ></div>
        </h1>
      ) : (
        <div>
          {blog && (
            <div>
              <br />
              <h1>{blog.title}</h1>
              <br />
              <div className="single">

              <h4 style={{color:'grey',lineHeight:'50px'}}>{blog.content}</h4>
              </div>


            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SingleNote
