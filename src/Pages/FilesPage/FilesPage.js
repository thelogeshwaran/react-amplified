import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import { Storage } from "aws-amplify";

function FilesPage() {
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  Storage.configure({ level: "private" });

  useEffect(() => {
    Storage.list("")
      .then((result) => {
        setAllFiles(result);
        console.log(result)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  async function handleFileUpload() {
    if (file) {
      const response = await Storage.put(file.name, file, {
        progressCallback(progress) {
          setProgress((progress.loaded / progress.total) * 100);
        },
      });
      setAllFiles([...allFiles, response]);
      setFile("");
      setProgress(0);
    }
  }

  async function getItem(key) {
    const signedURL = await Storage.get(key);
    setUrl(signedURL);
  }

  async function deleteItem(key) {
    await Storage.remove(key);
    const filteredData = allFiles.filter((item) => item.key !== key);
    setAllFiles(filteredData);
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div>
        <input type="file" onChange={handleFileInput} />
        <Button content="Add" onClick={() => handleFileUpload()} />
      </div>
      <div className="w-2/4 ">
        <div
          className="h-3 rounded bg-green-500"
          style={{ width: progress + "%" }}
        ></div>
      </div>
      <div className="m-3">
        <h1 className="text-4xl">Your Files</h1>
      </div>

      {allFiles.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center m-3 border-black border-2 w-2/5 px-5 justify-between break-all"
          >
            <div className="text-2xl">{item.key}</div>
            <Button content="Download" onClick={() => getItem(item.key)} />
            <Button content="Delete" onClick={() => deleteItem(item.key)} />
          </div>
        );
      })}
      {url && (
        <div className="flex items-center">
          <a href={url} className="flex items-center" download>
            <p className="text-2xl">Are you sure do you want to Download?</p>
            <Button content="Yes" onClick={() => setUrl("")} />
          </a>
          <Button content="No" onClick={() => setUrl("")} />
        </div>
      )}
    </div>
  );
}

export default FilesPage;
