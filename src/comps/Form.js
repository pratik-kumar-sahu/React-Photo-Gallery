import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const Form = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const imgTypes = ["image/png", "image/jpeg", "image/gif"];

  const changeHandler = (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile && imgTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Select a valid image file (png, jpeg or gif)");
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default Form;
