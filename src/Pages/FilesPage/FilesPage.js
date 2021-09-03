import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import { Storage } from "aws-amplify";

function FilesPage() {
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    Storage.list("")
      .then((result) => {
        console.log(result);
        setAllFiles(result);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  async function handleFileUpload() {
    if (file) {
      const response = await Storage.put(file.name, file);
      console.log(response);
      setAllFiles([...allFiles, response])
      setFile("");
    }
  }
  
  async function getItem(key) {
    const signedURL = await Storage.get(key);
    console.log(signedURL);
    setUrl(signedURL);
  }

  async function deleteItem(key){
       await Storage.remove(key)
       const filteredData = allFiles.filter( item => item.key !== key)
       setAllFiles(filteredData)
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div>
        <input type="file" onChange={handleFileInput} />
        <Button content="Add" onClick={() => handleFileUpload()} />
      </div>
      <div className="m-3">
        <h1 className="text-4xl">Your Files</h1>
      </div>
      {allFiles.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center m-3 border-black border-2 w-2/5 px-5 justify-between"
          >
            <div className="text-2xl">{item.key}</div>
            <Button content="Download" onClick={() => getItem(item.key)} />
            <Button content="Delete" onClick={() => deleteItem(item.key)} />
          </div>
        );
      })}
      {url && (
        <div className="flex items-center">
            <a href={url} className="flex items-center" >
          <p className="text-2xl">Are you sure do you want to Download?</p>
          <Button content="Yes" onClick={() => setUrl("")} />
        </a>
        <Button content="No" onClick={()=> setUrl("")}/>
        </div>
      )}
    </div>
  );
}

export default FilesPage;
