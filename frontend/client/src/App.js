import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import constant from "./utils/constant.js";
import Popup from "./components/Popup";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("env", constant.baseURL);
    axios
      .get(`${constant.baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

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

  const saveToDo = (event) => {
    if (input === "") {
      setError("Should Not empty");
    } else {
      axios
        .post(`${constant.baseURL}/save`, { toDo: input })
        .then((res) => {
          console.log(res.data);
          setUpdateUI((prevState) => !prevState);
          setInput("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Smart ToDo App</h1>

        <div className="input_holder">
          <input
            value={input}
            onChange={onChangeHandler}
            type="text"
            onBlur={onBlurHandler}
            placeholder="Add a ToDo..."
          />

          <button onClick={saveToDo}>Add</button>
        </div>
        {error && <p className="error"> Should not empty!!</p>}
        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
