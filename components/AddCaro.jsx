import React, { useState } from "react";

function AddCaro() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  // handle file input
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // handle upload
  const addCaroImg = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://tour-booking-back-end-production.up.railway.app:3001/api/carousel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Uploaded:", res.data);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <p>Upload Carousel Image</p>
      <form onSubmit={addCaroImg}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2"
        />
        <input type="file" onChange={handleChange} className="mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Upload
        </button>
      </form>
    </div>
  );
}

export default AddCaro;
