import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../RequestUrl";

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
    try {
      const { data } = await axiosInstance.get(`note/${id}`, {
      });
      setblog(data);
    } catch (error) {
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
              <h1 style={{}}>{blog.title}</h1>
              <br />
              <h4 style={{textAlign:'center',color:'grey'}}>{blog.content}</h4>


            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SingleNote
