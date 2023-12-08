import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../RequestUrl";

const NoteList = () => {
  const [blogDatas, setblogDatas] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    history();
  }, []);
  async function history() {
    setloading(true);
    try {
      const { data } = await axiosInstance.get("note/getNote", {});
      console.log(data);
      setblogDatas(data.result);
    } catch (error) {
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
