import React, { useEffect, useState } from "react";
import axiosInstance from "../RequestUrl";


const UserProfile = () => {
  const [blogDatas, setblogDatas] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    history();
  }, []);
  async function history() {
    setloading(true); 
    // Retrieve the token string from local storage
    const tokenString = localStorage.getItem("user");
    const { token } = JSON.parse(tokenString);
    try {
      const { data } = await axiosInstance.get("auth/userProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      setblogDatas(data.message);
    } catch (error) {
    } finally {
      setloading(false);
    }
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>Your profile</h1>
      <br />
      {loading ? (
        <h1>
          <div
            className="spinner-border text-muted container d-flex justify-content-center align-items-center"
            style={{ width: "100px", height: "100px" }}
          ></div>
        </h1>
      ) : (
        <div>
          {blogDatas && (
            <div>
              <form className="container mt-5">
                <div>
                  <label htmlFor="name">YOUR NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogDatas.name}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="name">USERNAME</label>
                  <input
                    type="name"
                    className="form-control"
                    value={blogDatas.username}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email">GENDER</label>
                  <input
                    type="name"
                    className="form-control"
                    value={blogDatas.gender}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email">NUMBER</label>
                  <input
                    type="name"
                    className="form-control"
                    value={blogDatas.number}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email">EMAIL</label>
                  <input
                    type="name"
                    className="form-control"
                    value={blogDatas.email}
                  />
                </div>
                <br />
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

