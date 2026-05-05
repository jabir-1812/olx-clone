import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 12) {
      alert("Max 12 images allowed");
      return;
    }

    setImages(files);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Login first");
        return;
      }

      // 🔥 Upload all images
      const imageUrls = [];

      for (let file of images) {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      }

      // 🔥 Save to Firestore
      await addDoc(collection(db, "products"), {
        title,
        images: imageUrls,
        userId: user.uid,
        createdAt: new Date(),
      });

      alert("Uploaded successfully");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}