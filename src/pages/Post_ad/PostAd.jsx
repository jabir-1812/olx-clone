import { useState, useEffect } from "react";
import {db, auth} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function PostAd(){
    const categories = [
        {
        id: 1,
        name: "Electronic",
        subcategories: ["Mobile", "Laptop", "Camera"]
        },
        {
        id: 2,
        name: "Vehicle",
        subcategories: ["Car", "Bike", "Truck"]
        },
        {
        id: 3,
        name: "Furniture",
        subcategories: ["Sofa", "Bed", "Table"]
        }
    ];

    const [selectedCategory, setSelectedCategory]=useState(null)
    const [selectedSubCategory, setSelectedSubCategory]=useState(null)

    return(
        <>
            Post Ad
            {
                (selectedCategory && selectedSubCategory) ? 
                (
                    <AddPostDetails 
                        selectedCategory={selectedCategory}
                        selectedSubCategory={selectedSubCategory}/>
                )
                :
                (
                    <ChooseCategory 
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        setSelectedSubCategory={setSelectedSubCategory}/>
                )
            }
        </>
    )
}



function ChooseCategory({
        categories,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory
    }){


    return (
    <div className="flex">
        <div className="flex-1">
            Left side
            {categories.map((cat)=>{
                return(
                    <div 
                        onClick={()=>setSelectedCategory(cat)}
                        key={cat.id}>{cat.name}</div>
                )
            })}
        </div>
        <div className="flex-1">
            Right side
            {selectedCategory && (
                selectedCategory.subcategories.map((subCat, i)=>{
                    return (
                        <div 
                            onClick={()=>setSelectedSubCategory(subCat)}
                            key={i}>
                            {subCat}
                        </div>
                    )
                })
            )}
        </div>
    </div>
  );
}



function AddPostDetails({
    selectedCategory,
    selectedSubCategory
}){
    const [title, setTitle]=useState("")
    const [itemImages, setItemImages]=useState(Array(12).fill(null))

    const handleImageChange = (index, file) => {
        const newImages = [...itemImages];
        newImages[index] = file;
        setItemImages(newImages);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...itemImages];
        newImages[index] = null;
        setItemImages(newImages);
    };

    const uploadToCloudinary = async (file)=>{
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "olx_react_app")

        const res=await fetch("https://api.cloudinary.com/v1_1/dpanly8em/image/upload",{
            method:"POST",
            body:data
        });

        const result=await res.json();
        return result.secure_url;
    }

    const handleSubmit = async ()=>{
        try {
            const user = auth.currentUser;

            if(!user){
                alert("login first");
                return;
            }


            const validImages = itemImages.filter((img) => img !== null);

            const imageUrls = await Promise.all(
                validImages.map((file) => uploadToCloudinary(file))
            );



            await addDoc(collection(db, "items"),{
                title,
                category:selectedCategory.name,
                subCategory:selectedSubCategory,
                images: imageUrls,
                userId: user.uid,
                createdAt: new Date()
            })

            alert("Uploaded successfully")
        } catch (error) {
            console.error("error submiting the ad form ===> ", error)
        }
    }

    useEffect(() => {
        return () => {
            itemImages.forEach((img) => {
            if (img) URL.revokeObjectURL(img);
            });
        };
    }, [itemImages]);
    return(
        <div>
            Post your ad
            <div>
                selected category:{selectedCategory.name}/{selectedSubCategory} change
            </div>
            <div>
                include some details:
            </div>
            <div>
                <label htmlFor="">Ad title</label>
                <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Description</label>
                <textarea type="text" />
            </div>
            <div>
                <label htmlFor="">Set a price</label>
                <input type="number" />
            </div>
            <div>
                <h2>Upload Images</h2>

                {itemImages.map((img, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                            }
                        />

                        {/* Preview */}
                        {img && (
                            <div>
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt="preview"
                                    width="150"
                                />
                                {/* 🔴 Remove Button */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <div>Location</div>
                <div>
                    <select name="location" id="">
                        <option value="kerala">Kerala</option>
                        <option value="tamilNadu">Tamil Nadu</option>
                        <option value="karnataka">Karnataka</option>
                    </select>
                </div>
            </div>
            <div>
                <div>Review your details</div>
                <div>Name</div>
                <div>
                    <input type="text" />
                </div>
                <div>Phone number</div>
                <div>
                    <input type="text" />
                </div>
            </div>
            <div>
                <button onClick={handleSubmit}>POST NOW</button>
            </div>
        </div>
    )
}
