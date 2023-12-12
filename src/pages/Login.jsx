import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../RequestUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const [Error, setError] = useState();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...Data, [name]: value });
  }
  //   console.log(Data, 'testing');

  async function handleClick(e) {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("auth/login", Data, {
        headers: { "Content-type": "application/json" },
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data || null));
      }
      // alert(response.data.message);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error);
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }



  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>LOGIN</h1>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {/* <img
              src={signup}
              alt=""
              style={{ width: "100%", height: "50vh" }}
            /> */}
          </div>
          <div className="col-md-6">
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
                      {" "}
                      Your Email :
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
                      Your Password :
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p>New member ? </p>
                    <Link to="/Register" style={{ color: "black" }}>
                      Register here
                    </Link>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-success btn-block mb-4"
                    >
                      LOGIN
                    </button>
                  </div>

                  {/* {Error && <div style={{ color: "red" }}>{Error}</div>} */}
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
