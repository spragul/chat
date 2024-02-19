import React, { useState } from "react";
import { url } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export function AddChatNumber() {
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const userId = sessionStorage.getItem("myid");
  const { v4: uuidv4 } = require("uuid");
  const history = useHistory("");

  //Add new user chat
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && mobile !== "") {
      if (mobile.length === 10) {
        try {
          let roomid = uuidv4().slice(0, 7);
          const number = { name, mobile, userId, roomid };
          const data = await axios.post(`${url}/chat/add`, number);
          console.log(data);
          if (data.data.chatrd === true) {
            toast.success(data.data.message);
            history.push("/");
          } else {
            toast.error(data.data.message);
          }
        } catch (error) {
          toast.error(`error :${error}`);
          alert(`server error ${error}`);
        }
      } else {
        toast.error("without country code add number");
      }
    } else {
      toast.error("type name and mobile number");
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="Number"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
                className="form-control"
              ></input>
            </div>
          </div>

          <div className="card-footer" style={{ textAlign: "left" }}>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>{" "}
            |
            <Link className="btn btn-danger" to={"/dashboard"}>
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
