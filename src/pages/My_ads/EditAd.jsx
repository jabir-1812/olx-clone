import React, { useContext, useEffect, useState } from "react";
import { categoryContext } from "../../context/categoryContext";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { ImagePlus, Camera } from "lucide-react";


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
        <div className="border-2 border-black/20 py-5 mx-30">
            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">Category</div>

                <div >
                    <select 
                        className="h-12 border border-black/50 rounded-md w-1/4"
                        onChange={(e)=>{setProduct((prev)=>{return {...prev,subCategory:e.target.value }})}} 
                        value={product?.subCategory || ""}>
                        {subCategories.map((s, i) => {
                            return (
                                <option key={i}>
                                    {s}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">INCLUDE SOME DETAILS</div>
                <div>
                    <div className="text-xs font-medium">Ad title *</div>
                    <input
                        onChange={(e)=>{setProduct((prev)=> {return {...prev, title:e.target.value}})}}
                        value={product?.title || ""}
                        type="text"
                        required 
                        className="h-12 border border-black/50 rounded-md w-1/2" 
                    />
                    {/* <div className="text-red-500 text-sm font-medium">{titleError && titleError}</div> */}
                </div>
                <div>
                    <div className="text-xs font-medium">Description *</div>
                    <textarea 
                        value={product?.description || ""}
                        onChange={(e)=>setProduct((prev)=>{return {...prev, description:e.target.value}})} 
                        className="h-32 border border-black/50 rounded-md w-1/2">

                    </textarea>
                    {/* <div className="text-red-500 text-sm font-medium">{descriptionError && descriptionError}</div> */}
                </div>
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">SET A PRICE</div>
                <div>
                    <div className="text-xs font-medium">Price *</div>
                    <input 
                        placeholder="₹"
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
                        className="h-12 border border-black/50 rounded-md w-1/2" />
                    {/* <div className="text-red-500 text-sm font-medium">{priceError && priceError}</div> */}
                </div>
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b border-black/25">
                <div className="text-xl font-medium">
                    UPLOAD UP TO 12 PHOTOS
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:w-[50%]">
                        {images.map((img, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border border-blue-900 rounded-md overflow-hidden relative"
                                >
                                    {img ? (
                                        <>
                                            <img
                                                src={img.preview}
                                                alt=""
                                               className="object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <label
                                                htmlFor={`image-upload-${index}`}
                                                className="h-20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50">
                                                    <Camera size={25} className="text-blue-900"/>

                                                    <span className="text-sm font-medium text-blue-900">
                                                        Add Photo
                                                    </span>
                                            </label>
                                            <input
                                                id={`image-upload-${index}`}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    handleImageChange(e, index)
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                </div>
                <div className="text-xs text-red-500">
                    {/* {imageError && imageError} */}
                </div>
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

            <div className="py-2 px-5 border-b-1 border-black/25">
                <button className="p-3 rounded-md text-white font-medium bg-blue-400 text-md" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}