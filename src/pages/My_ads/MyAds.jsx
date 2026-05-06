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
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

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
    <div>
      {products.map((product) => (
        <div key={product.id}>
            <Link to={`/product_details/${product.id}`}>
                <h2>{product.title}</h2>
                <img src={product.images[0]} alt="" />
            </Link>
        </div>
      ))}
    </div>
  );
}