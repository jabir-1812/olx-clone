// import { useEffect, useState } from "react";

// import { db } from "../../firebase";

// import {
//   collection,
//   getDocs,
// } from "firebase/firestore";
// import { Link } from "react-router-dom";

// export default function Products() {

//   const [products, setProducts] = useState([]);

//   useEffect(() => {

//     const fetchProducts = async () => {

//       try {

//         const querySnapshot = await getDocs(
//           collection(db, "items")
//         );

//         const productList = [];

//         querySnapshot.forEach((doc) => {

//           productList.push({
//             id: doc.id,
//             ...doc.data(),
//           });

//         });

//         setProducts(productList);

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();

//   }, []);

//   return (
//     <div>

//       <h1>All Products</h1>

//       {products.map((product) => (

//         <div
//           key={product.id}
//           style={{
//             border: "1px solid gray",
//             marginBottom: "20px",
//             padding: "10px",
//           }}
//         >
//             <Link to={`/product_details/${product.id}`}>

//                 <h2>{product.title}</h2>

//                 {/* First image */}
//                 {product.images?.[0] && (
//                     <img
//                     src={product.images[0]}
//                     width="200"
//                     alt=""
//                     />
//                 )}

//           </Link>
//         </div>

//       ))}

//     </div>
//   );
// }

import { useEffect, useState } from "react";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function Products() {

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const querySnapshot = await getDocs(
          collection(db, "items")
        );

        const productList = [];

        querySnapshot.forEach((doc) => {

          productList.push({
            id: doc.id,
            ...doc.data(),
          });

        });

        console.log("products list==>",productList)
        setProducts(productList);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();

  }, []);

  // 🔥 Filtered products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  return (
    <div>

      {/* 🔥 Category Buttons */}
      <div>

        <button
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        <button
          onClick={() => setSelectedCategory("Electronic")}
        >
          Electronics
        </button>

        <button
          onClick={() => setSelectedCategory("Vehicle")}
        >
          Vehicles
        </button>

        <button
          onClick={() => setSelectedCategory("Furniture")}
        >
          Furnitures
        </button>

      </div>

      <h2>{selectedCategory} Products</h2>

      {/* 🔥 Show filtered products */}
      {filteredProducts.map((product) => (

        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            marginBottom: "20px",
            padding: "10px",
          }}
        >

          <h3>{product.title}</h3>

          <p>{product?.category}</p>

          {product.images?.[0] && (
            <img
              src={product.images[0]}
              width="150"
              alt=""
            />
          )}

        </div>

      ))}

    </div>
  );
}

