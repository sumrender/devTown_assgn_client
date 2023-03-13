import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMG_UPLOAD, PHOTOS_ROUTE } from "../constants";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePhotosContext } from "../hooks/usePhotosContext";
import { AiOutlineCloudUpload } from "react-icons/ai";

function ImageUploader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pic, setPic] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = usePhotosContext();

  const createPhoto = async (url, caption) => {
    const response = await fetch(PHOTOS_ROUTE, {
      method: "POST",
      body: JSON.stringify({ url, caption }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      setPic(null);
      dispatch({ type: "CREATE_PHOTO", payload: json.photo });
    }
  };


  const handleChange = (event) => {
    const selectedImage = event.target.files[0];
    setPic(selectedImage);
    console.log("img set in state", selectedImage);
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    if (
      pic === undefined ||
      (pic.type !== "image/jpeg" && pic.type !== "image/png")
    ) {
      setError({
        show: true,
        severity: "warning",
        message: "Please Select an Image!",
      });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "sammyoncloud");
    fetch(IMG_UPLOAD, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const picUrl = data.url.toString();
        setLoading(false);
        createPhoto(picUrl, caption).then(() => {
          console.log("post created successfully");
          navigate("/");
        });
      })
      .catch((err) => {
        setLoading(false);
        setError({
          show: true,
          severity: "error",
          message: err.message,
        });
      });
  };

  if (!user) navigate("/login");

  return (
    <div
      className="upload-image"
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "2rem" }}>
        {id ? <h1>Edit image</h1> : <h1>Upload Image</h1>}
      </div>
      <form
        onSubmit={handleImageSubmit}
        style={{
          height: "50vh",
          width: "40vw",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input type="file" accept="image/*" onChange={handleChange} />
        <input
          type="text"
          value={caption}
          style={{
            paddingLeft: "20px",
            width: "15vw",
            margin: "20px",
            height: "2rem",
          }}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="enter caption"
        />
        <button disabled={loading} type="submit" className="auth-button">
          <AiOutlineCloudUpload />
        </button>
      </form>
      {error && (
        <p style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}

export default ImageUploader;
