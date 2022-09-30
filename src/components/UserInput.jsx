import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeName } from "../store/slices/userName.slice";
import { useNavigate } from "react-router-dom";
import ash from "../assets/ashShadow.png";

const UserInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const dispatchUserName = () => {
    if (userName === "") {
      alert("Type your name");
    } else {
      dispatch(changeName(userName));
      navigate("/pokedex");
    }
  };

  return (
    <div className="user-container">
      <div className="user-info-container">
        <div className="user-info">
          <h1>Hello trainer!</h1>
          
            <form onSubmit={dispatchUserName} className="input-container">
              <input
                type="text"
                placeholder="Type your name to start"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          
        </div>
      </div>

      <img className="ash" src={ash} alt="" />
    </div>
  );
};

export default UserInput;
