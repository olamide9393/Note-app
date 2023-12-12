import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../RequestUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [Data, setData] = useState();
  // const [loading, setloading] = useState();
  const [Error, setError] = useState();
  const [success, setsuccess] = useState();
  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...Data, [name]: value });
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("auth/signUp", Data, {
        headers: { "Content-type": "application/json" },
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      setsuccess(response.data.msg);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error?.response?.data?.error);
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return (
    <div>
         <h1 style={{textAlign:'center',fontSize:'50px'}}>REGISTER</h1>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            {/* <img
              src={signup}
              alt=""
              style={{ width: "100%", height: "80vh" }}
            /> */}
          </div>
          <div className="col-sm-5">
            <div
              className="tab-content container mt-5"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div
                className="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <form onSubmit={handleClick}>
                  <br />

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                      Full Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginUsername">
                      UserName
                    </label>
                    <input
                      type="username"
                      name="username"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">
                      {" "}
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                    />
                    <br />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <p>Already a member ?</p>
                      <Link to="/Login" style={{ color: "black" }}>
                        Login here
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-block mb-4"
                  >
                    REGISTER
                  </button>
                  {Error && <div style={{ color: "red" }}>{Error}</div>}
                  {success && (
                    <div style={{ color: "green", fontSize: "30px" }}>
                      {success}
                    </div>
                  )}
                </form>
                <ToastContainer/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

