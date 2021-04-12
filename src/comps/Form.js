import React, { useState } from "react";

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
      <input type="file" onChange={changeHandler} />
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
};

export default Form;
