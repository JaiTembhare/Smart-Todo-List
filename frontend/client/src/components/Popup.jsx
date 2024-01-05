import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import constant from "../utils/constant.js";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [input, setInput] = useState(popupContent.text);
  const [error, setError] = useState("");
  const updateToDo = () => {
    if (input === "") {
      setError("Should Not empty");
    } else {
      axios
        .put(`${constant.baseURL}/update/${popupContent.id}`, { toDo: input })
        .then((res) => {
          console.log(res.data);
          setUpdateUI((prevState) => !prevState);
          setShowPopup(false);
        });
    }
  };
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    if (input == "") {
      setError("Should Not empty");
    } else {
      setError("");
    }
  };

  const onBlurHandler = () => {
    if (input === "") {
      setError("Should Not empty");
    }
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update ToDo</h1>

        <div className="popup__input_holder">
          <input
            value={input}
            onChange={onChangeHandler}
            type="text"
            onBlur={onBlurHandler}
            placeholder="Update ToDo..."
          />
          <button onClick={updateToDo}>Update</button>
        </div>
        {error && <p className="error"> Should not empty!!</p>}
      </div>
    </div>
  );
};

export default Popup;
