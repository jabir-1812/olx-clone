import React, { useContext, useEffect, useState } from "react";
import { categoryContext } from "../../context/categoryContext";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export default function EditAd() {
    const user = auth.currentUser;

    const { subCategories } = useContext(categoryContext);

    const { product_id } = useParams();

    const [product, setProduct] = useState(null);

    

    // 12 image slots
    const [images, setImages] = useState(Array(12).fill(null));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "items", product_id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = {
                        id: docSnap.id,
                        ...docSnap.data(),
                    };

                    console.log("dataaaaaaaaa",data)
                    setProduct(data);

                    // Fill image slots
                    const imageSlots = Array(12).fill(null);
                    console.log("data images==========", data.images)

                    data.images?.forEach((img, index) => {
                        imageSlots[index] = {
                            type: "old",
                            preview: img,
                        };
                    });

                    setImages(imageSlots);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [product_id]);

    // upload image
    function handleImageChange(e, index) {
        const file = e.target.files[0];

        if (!file) return;

        const updatedImages = [...images];

        updatedImages[index] = {
            type: "new",
            file,
            preview: URL.createObjectURL(file),
        };

        setImages(updatedImages);
    }

    // remove image
    function removeImage(index) {
        const updatedImages = [...images];
        updatedImages[index] = null;

        setImages(updatedImages);
    }

    async function uploadToCloudinary(file) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "olx_react_app");

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dpanly8em/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        return data.secure_url;
    }

    async function handleSubmit(e) {
        e.preventDefault();
       console.log("new product data===========", product)
        try {
            const finalImages = [];

            for (const img of images) {

                // empty slot
                if (!img) continue;

                // already uploaded image
                if (img.type === "old") {
                    finalImages.push(img.preview);
                }

                // newly uploaded image
                if (img.type === "new") {

                    const uploadedImage =
                        await uploadToCloudinary(img.file);

                    finalImages.push(uploadedImage);
                }
            }

            const docRef = doc(db, "items", product_id);

            await updateDoc(docRef, {
                category: product.category,
                subCategory: product.subCategory,
                title: product.title,
                description: product.description,
                price: product.price,
                email: product.email,
                location: product.location,
                phoneNumber: product.phoneNumber,
                images: finalImages,
            });

            alert("Updated successfully");

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>Category</div>

            <div>
                <select onChange={(e)=>{setProduct((prev)=>{return {...prev,subCategory:e.target.value }})}} value={product?.subCategory || ""}>
                    {subCategories.map((s, i) => {
                        return (
                            <option key={i}>
                                {s}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div>Title</div>

            <div>
                <input
                    onChange={(e)=>{setProduct((prev)=> {return {...prev, title:e.target.value}})}}
                    value={product?.title || ""}
                    type="text"
                />
            </div>

            <div>Description</div>

            <div>
                <textarea
                    onChange={(e)=>setProduct((prev)=>{return {...prev, description:e.target.value}})}
                    value={product?.description || ""}
                />
            </div>

            <div>Price</div>

            <div>
                <input
                    type="number"
                    step="1"
                    value={product?.price ?? ""}
                    onWheel={(e) => e.currentTarget.blur()}
                    onChange={(e) =>
                        setProduct((prev) => ({
                            ...prev,
                            price:
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value),
                        }))
                    }
                />
            </div>

            <div>Images</div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                }}
            >
                {images.map((img, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                border: "1px solid gray",
                                padding: "10px",
                            }}
                        >
                            {img ? (
                                <>
                                    <img
                                        src={img.preview}
                                        alt=""
                                        width="100%"
                                        height="150px"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                    >
                                        Remove
                                    </button>
                                </>
                            ) : (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(e, index)
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">CONFIRM YOUR LOCATION</div>
                <div>
                    <select onChange={(e)=>setProduct((prev)=>{return {...prev, location:e.target.value}})} className="h-12 border border-black/50 rounded-md w-1/2" name="location" id="">
                        <option value="kerala">Kerala</option>
                        <option value="tamilNadu">Tamil Nadu</option>
                        <option value="karnataka">Karnataka</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">Review your details</div>
                <div className="w-1/2 flex gap-10">
                    <div className="size-16 rounded-full bg-blue-500 text-white flex justify-center items-center font-medium text-lg">U</div>
                    <div className="w-full">
                        <div className="text-xs">Email</div>
                        <input onChange={(e)=>setProduct((prev)=>{return{...prev, email:e.target.value}})} value={product?.email} type="text" className="border border-black/50 w-full h-12 rounded-md" />
                    </div>
                </div>
               
                <div className="w-1/2 flex gap-10">
                    <div>Phone number</div>
                    <input onChange={(e)=>setProduct((prev)=>{return {...prev, phoneNumber:e.target.value}})} type="phone" value={product?.phoneNumber} className="border border-black/50 w-full h-12 rounded-md" />
                </div>
            </div>

            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}