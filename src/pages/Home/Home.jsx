import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="lg:px-20">

      {/* Category Buttons */}
      <div className="flex gap-5 flex-wrap  justify-center py-3 border-y-2 border-black/20">

        <button
            className="p-2 border-2 border-black/20 rounded-full"
            onClick={() => setSelectedCategory("All")}
        >
          All Categories
        </button>

        <button
            className="p-2 border-2 border-black/20 rounded-full"
            onClick={() => setSelectedCategory("Electronic")}
        >
          Electronics
        </button>

        <button
            className="p-2 border-2 border-black/20 rounded-full"
            onClick={() => setSelectedCategory("Vehicle")}
        >
          Vehicles
        </button>

        <button
            className="p-2 border-2 border-black/20 rounded-full"
            onClick={() => setSelectedCategory("Furniture")}
        >
          Furnitures
        </button>

      </div>

      <div className="flex py-2">

            <div
                className=" flex flex-col justify-center items-center text-xs font-medium"
                onClick={() => setSelectedCategory("Electronic")}
            >
                <img className="bg-blue-50 w-[70%]" src="/electronics.png" alt="" />
                <div>Electronics</div>
            </div>

            <div
                className=" flex flex-col justify-center items-center text-xs font-medium"
                onClick={() => setSelectedCategory("Vehicle")}
            >
                <img className="bg-blue-50 w-[70%]" src="/car.png" alt="" />
                <div>Vehicles</div>
            </div>

            <div
                className=" flex flex-col justify-center items-center text-xs font-medium"
                onClick={() => setSelectedCategory("Furniture")}
            >
                <img className="bg-blue-50 w-[70%]" src="/furniture.png" alt="" />
                <div>Furniture</div>
            </div>

        </div>


    <div className="">
        <div className="text-2xl">Fresh Recommendations</div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="border border-black/20 p-3 rounded-lg flex-col"
                >
                    <Link to={`product_details/${product.id}`}>

                        {product.images?.[0] && (
                            <img
                                src={product.images[0]}
                                width=""
                                className="w-full"
                                alt=""
                            />
                        )}
                        <div className="font-bold text-xl">₹ {product?.price}</div>
                        <div className="text-lg font-medium">{product.title}</div>
                        <div className="text-md text-black/50">{product?.description}</div>
                    </Link>
                </div>
            ))}
        </div>
    </div>


      {/* Show filtered products */}
      {/* {filteredProducts.map((product) => (

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

      ))} */}

    </div>
  );
}

