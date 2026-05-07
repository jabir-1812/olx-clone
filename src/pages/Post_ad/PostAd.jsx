import { useState, useEffect } from "react";
import {db, auth} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
            <div className="font-bold text-2xl flex justify-center w-full py-3 shadow-sm">POST YOUR AD</div>
            {
                (selectedCategory && selectedSubCategory) ? 
                (
                    <div className="lg:px-30">
                        <AddPostDetails 
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}/>
                    </div>
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
        <>
            <div className="text-xl font-medium w-full lg:px-30">CHOOSE A CATEGORY</div>
            <div className="flex lg:px-30">
            <div className="flex-1">
                {categories.map((cat)=>{
                    return(
                        <div 
                            className="flex px-3 py-2 hover:bg-black/25 focus:bg-black/50 border border-black/10"
                            onClick={()=>setSelectedCategory(cat)}
                            key={cat.id}>
                            <div className="flex-1">{cat.name}</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex-1">
                
                {selectedCategory && (
                    selectedCategory.subcategories.map((subCat, i)=>{
                        return (
                            <div 
                                className="flex px-3 py-2 hover:bg-black/25 border border-black/10"
                                onClick={()=>setSelectedSubCategory(subCat)}
                                key={i}>
                                <div>{subCat}</div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
        </>
    );
}



function AddPostDetails({
    selectedCategory,
    selectedSubCategory
}){

    const user = auth.currentUser;
    console.log("user ===> ",user)
    const navigate = useNavigate();
    const [title, setTitle]=useState("");
    const [titleError, setTitleError]=useState('')
    const [description, setDescription]=useState("")
    const [descriptionError, setDescriptionError]=useState("")
    const [price, setPrice]=useState(0);
    const [priceError, setPriceError]=useState("")
    const [location, setLocation]=useState("kerala")
    const [email, setEmail]=useState(user?.email);
    const [phoneNumber, setPhoneNumber]=useState("9988776655")
    const [itemImages, setItemImages]=useState(Array(12).fill(null))
    const [imageError, setImageError]=useState("")

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

            if(title.trim()===""){
                setTitleError("This field is mandatory")
                return;
            }else{
                setTitleError("")
            }

            if(description.trim()===""){
                setDescriptionError("This field is mandatory")
                return;
            }else{
                setDescriptionError("")
            }

            // console.log("price ===> ", typeof price)
            if(price.trim()===""){
                setPriceError("This field is mandatory")
                return;
            }else{
                setPriceError("")
            }

            const validImages = itemImages.filter((img) => img !== null);
            if(validImages.length < 1){
                setImageError("This field is mandatory")
                return;
            }else{
                setImageError("")
            }

            const imageUrls = await Promise.all(
                validImages.map((file) => uploadToCloudinary(file))
            );



            const docRef=await addDoc(collection(db, "items"),{
                title,
                description,
                price,
                email,
                location,
                phoneNumber,
                category:selectedCategory.name,
                subCategory:selectedSubCategory,
                images: imageUrls,
                userId: user.uid,
                createdAt: new Date()
            })

            alert("Uploaded successfully")
            navigate(`/post_ad/success/${docRef.id}`);
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
        <div className="border-2 border-black/20 py-5">
            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">SELECTED CATEGORY</div>
                <div className="flex gap-5 text-sm font-medium">
                    <div className="text-black/50">{selectedCategory.name}/{selectedSubCategory}</div>
                    <div className="text-blue-900 underline">Change</div>
                </div>
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">INCLUDE SOME DETAILS</div>
                <div>
                    <div className="text-xs font-medium">Ad title *</div>
                    <input onChange={(e)=>setTitle(e.target.value)} type="text" required className="h-12 border border-black/50 rounded-md w-1/2" />
                    <div className="text-red-500 text-sm font-medium">{titleError && titleError}</div>
                </div>
                <div>
                    <div className="text-xs font-medium">Description *</div>
                    <textarea onChange={(e)=>setDescription(e.target.value)} name="" id="" className="h-32 border border-black/50 rounded-md w-1/2"></textarea>
                    <div className="text-red-500 text-sm font-medium">{descriptionError && descriptionError}</div>
                </div>
            </div>
            
            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">SET A PRICE</div>
                <div>
                    <div className="text-xs font-medium">Price *</div>
                    <input onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="₹" className="h-12 border border-black/50 rounded-md w-1/2" />
                    <div className="text-red-500 text-sm font-medium">{priceError && priceError}</div>
                </div>
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">UPLOAD UP TO 12 PHOTOS</div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
                    {itemImages.map((img, index) => (
                        <div key={index} className="border border-blue-900 p-5">
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
                <div className="text-xs text-red-500">{imageError && imageError}</div>
            </div>

            <div className="flex flex-col gap-3 py-2 px-5 border-b-1 border-black/25">
                <div className="text-xl font-medium">CONFIRM YOUR LOCATION</div>
                <div>
                    <select onChange={(e)=>setLocation(e.target.value)} className="h-12 border border-black/50 rounded-md w-1/2" name="location" id="">
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
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className="border border-black/50 w-full h-12 rounded-md" />
                    </div>
                </div>
               
                <div className="w-1/2 flex gap-10">
                    <div>Phone number</div>
                    <input onChange={(e)=>setPhoneNumber(e.target.value)} type="phone" value={phoneNumber} className="border border-black/50 w-full h-12 rounded-md" />
                </div>
            </div>

            <div className="py-2 px-5 border-b-1 border-black/25">
                <button className="p-3 rounded-md text-white font-medium bg-blue-400 text-md" onClick={handleSubmit}>POST NOW</button>
            </div>
        </div>
    )
}
