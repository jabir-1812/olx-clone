// import { db, auth } from "../../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs
// } from "firebase/firestore";


// export default function MyAds(){
//     const user = auth.currentUser;
//     return(
//         <div>
//             My Ads page
//         </div>
//     )
// }
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();

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
    <div>
      {/* {products.map((product) => (
        <div key={product.id}>
            <Link to={`/product_details/${product.id}`}>
                <h2>{product.title}</h2>
                <img src={product.images[0]} alt="" />
            </Link>
        </div>
      ))} */}
    </div>
    <div className="lg:px-50 flex flex-col gap-3 border border-black/25">
        {products.map((product)=>{
            return(
                <div 
                    onClick={()=>navigate(`/product_details/${product.id}`)}
                    key={product.id} className="px-5 py-3 shadow-md border border-black/25 rounded-md flex gap-10 w-full">
                    <div className="flex items-center">Date:</div>
                    <div className="flex flex-1 justify-between">
                        <div>
                            <img className="size-16" src={product.images[0]} alt="" />
                        </div>
                        <div className="font-semibold flex items-center">{product.title}</div>
                        <div className="flex items-center">₹ {product.price}</div>
                        <div className="bg-black/10"></div>
                    </div>
                </div>
            )
        })}
    </div>
    </>
  );
}