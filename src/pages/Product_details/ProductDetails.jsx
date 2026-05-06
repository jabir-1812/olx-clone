// import { useContext } from "react";
// import { dbContext } from "../../App";
// import {useNavigate, useParams} from "react-router-dom";
// import CategoryNavbar from "../../components/CategoryNavBar";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function ProductDetails(){
//     const {db}=useContext(dbContext);
//     const {productId}=useParams();
//     // console.log(productId)
//     const [product, setProduct]=useState();
//     const navigate=useNavigate();

//     useEffect(()=>{
//         const findItem=db.filter((item)=>{
//             return String(item.id)===String(productId)
//         })
//         console.log(findItem[0])

//         setProduct(findItem[0]);
//     },[productId])

//     return(
//         <>
//         <CategoryNavbar/>
//         <div>
//             <img src={`/${product?.image}`} alt={`${product?.name}`} />
//         </div>
//         </>
//     )
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../../firebase";

import { doc, getDoc } from "firebase/firestore";

export default function ProductDetails() {

  const { product_id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const docRef = doc(db, "items", product_id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });

        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();

  }, [product_id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{product.title}</h1>

      {product.images.map((img, index) => (
        <img
          key={index}
          src={img}
          width="150"
          alt=""
        />
      ))}
    </div>
  );
}