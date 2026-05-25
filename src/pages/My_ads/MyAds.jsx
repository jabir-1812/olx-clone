import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();

    const [showAdsPopUpMenu, setShowAdsPopUpMenu] = useState(false);
    function toggleAdsPopUpMenu(event, productId){
        console.log("popup menu=====", event)
        console.log("productId=====", productId)
        event.stopPropagation();
        if(showAdsPopUpMenu === productId){
            setShowAdsPopUpMenu(null)
        }else{
            setShowAdsPopUpMenu(productId)
        }
    }

    const [showDeletePopup, setShowDeletePopup] = useState(false)
    function openDeletePopup(productId){
        console.log("workingggggg....")
        setShowDeletePopup(productId)
    }


    async function handleRemove(product_id){

        try {
            await deleteDoc(doc(db, 'items', product_id));

            alert("product removed");
            setShowDeletePopup(false)

             // remove from UI instantly
            setProducts((prev) =>
                prev.filter((p) => p.id !== product_id)
            );

        } catch (error) {
            console.log("error deleting the product:", error);
            alert("failed to remove the product")
        }
    }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        setProducts([]);
        return;
      }

      try {
        const q = query(
          collection(db, "items"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const productList = [];

        querySnapshot.forEach((doc) => {
          productList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        console.log("product list===> ", productList)
        setProducts(productList);
        

      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();

  }, []);

  return (
    <>    
    <div className="bg-[#f2f4f5] min-h-screen p-3 lg:px-30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

                <div className="relative w-full lg:w-[380px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Search by Ad Title"
                    className="w-full border border-gray-300 rounded-md bg-white py-3 pl-14 pr-4 outline-none"
                />
                </div>

                <div className="flex flex-wrap items-center gap-3">

                <span className="text-3 font-medium">
                    Filter By:
                </span>

                <button className="px-5 py-3 rounded-full bg-blue-100 text-blue-900 border border-transparent">
                    View all (1)
                </button>

                <button className="px-5 py-3 rounded-full border border-black bg-white">
                    Active Ads (0)
                </button>

                <button className="px-5 py-3 rounded-full border border-black bg-white">
                    Inactive Ads (0)
                </button>

                <button className="px-5 py-3 rounded-full border border-black bg-white">
                    Pending Ads (1)
                </button>

                <button className="px-5 py-3 rounded-full border border-black bg-white">
                    Moderated Ads (0)
                </button>
                </div>
            </div>

            {products.map((product)=>{
                return(
                    <div 
                        onClick={()=>navigate(`/product_details/${product.id}`)}
                        key={product.id} className="bg-white border border-gray-300 rounded-md overflow-visible">

                        <div className="flex flex-col lg:flex-row">

                            <div className="w-full lg:w-[150px] border-r border-gray-300 p-4 flex flex-col justify-center bg-white">
                                <p className="text-sm mb-2">
                                FROM:
                                <span className="font-bold"> {product.createdAt.toDate().toLocaleDateString()}</span>
                                </p>

                                <p className="text-sm">
                                TO:
                                <span className="font-bold"> {product.createdAt.toDate().toLocaleDateString()}</span>
                                </p>
                            </div>

                            <div className="flex-1">

                                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-5 p-4 border-b border-gray-300 ">

                                    <div className="flex gap-5">

                                        <img
                                        src={product.images[0]}
                                        alt="ad"
                                        className="w-20 h-20 object-cover rounded"
                                        />

                                        <div className="flex flex-col justify-center">
                                        <h2 className="font-bold text-2xl text-black">
                                            {product.title}
                                        </h2>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-2xl font-medium">
                                        ₹ {product.price}
                                    </div>

                                    <div>
                                        <button className="bg-blue-100 text-blue-900 px-10 py-3 rounded">
                                        
                                        </button>
                                    </div>

                                    <div className="bg-gray-100 border-l-4 border-blue-200 p-3 max-w-[380px]">
                                        <p className="text-[15px]">
                                    
                                        </p>
                                    </div>

                                    <div className="relative ">
                                        <button 
                                                onClick={(e)=>{toggleAdsPopUpMenu(e, product.id)}}
                                                className="text-3xl leading-none">
                                            ⋯
                                        </button>
                                        {showAdsPopUpMenu === product.id && (
                                            <div className="absolute left-0 -bottom-20 py-2 bg-white shadow-xl/30 border border-black/10 rounded-sm">
                                                <div className="hover:bg-sky-100 px-3 py-1" onClick={(e)=>{e.stopPropagation(); navigate(`/my_ads/edit_ad/${product.id}`);}}>Edit</div>
                                                <div className="hover:bg-sky-100 px-3 py-1" onClick={ (e)=> {e.stopPropagation(); openDeletePopup(product.id)}}>
                                                    Remove
                                                    {showDeletePopup === product.id && (
                                                        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            
                                                            <div className="bg-white w-[550px] rounded p-8">

                                                                <h1 className="text-4xl font-bold text-center mb-8" >
                                                                    Confirm
                                                                </h1>

                                                                <p className="text-gray-500 text-lg mb-10">
                                                                    You are about to delete your Ad. You won't be able to undo this.
                                                                </p>

                                                                <div className="flex gap-4">

                                                                    <button
                                                                        onClick={()=>{handleRemove(product.id)}}
                                                                        className="flex-1 bg-blue-800 text-white py-4 rounded font-semibold text-xl hover:bg-blue-900"
                                                                    >
                                                                        Remove
                                                                    </button>

                                                                    <button
                                                                        onClick={(e)=>{e.stopPropagation(); setShowDeletePopup(false)}}
                                                                        className="flex-1 border-2 border-blue-800 text-blue-800 py-4 rounded font-semibold text-xl hover:bg-gray-100"
                                                                    >
                                                                        Cancel
                                                                    </button>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                
                                </div>

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 px-6 py-4">

                                <div className="flex items-center gap-10">

                                    <div className="flex items-center gap-2 font-semibold">
                                    <span>👁️</span>
                                    <span>Views: -</span>
                                    </div>

                                    <div className="flex items-center gap-2 font-semibold">
                                    <span>🖤</span>
                                    <span>Likes: -</span>
                                    </div>
                                </div>

                                <button className="border-2 border-blue-800 text-blue-800 font-semibold px-6 py-3 rounded hover:bg-blue-50">
                                    Sell faster now
                                </button>
                                </div>

                            </div>
                        </div>


                    </div>
                )
            })}
    </div>
    </>
  );
}