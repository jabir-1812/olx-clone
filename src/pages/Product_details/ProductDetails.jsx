import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { db } from "../../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function ProductDetails() {

  const { product_id } = useParams();

  const [product, setProduct] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

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

  // 🔥 Previous image
  const handlePrev = () => {

    if (!product) return;

    setCurrentImageIndex((prev) =>

      prev === 0
        ? product.images.length - 1
        : prev - 1
    );
  };

  // 🔥 Next image
  const handleNext = () => {

    if (!product) return;

    setCurrentImageIndex((prev) =>

      prev === product.images.length - 1
        ? 0
        : prev + 1
    );
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="lg:flex lg:gap-5 lg:px-30 py-5">

      {/* <h1>{product.title}</h1> */}

        {/* left div */}
        <div className="lg:w-2/3 flex flex-col gap-5">
            <div className="flex items-center">
                <div onClick={handlePrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div className="flex-1">
                    <img className="w-full" src={product.images[currentImageIndex]} alt="" />
                </div>
                <div onClick={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
            <div className="flex lg:gap-8 gap-1 lg:px-30">
                {product.images.map((img)=>{
                    return(
                        <img className="w-[10%] border-2 border-blue-500" src={img} alt="" />
                    )
                })}
            </div>
            <div className="p-3 border border-black/25">
                <div className="font-medium text-lg mb-5">Description</div>
                <div className="text-sm">{product?.description}</div>
            </div>
        </div>
        <div className="lg:w-1/3 flex flex-col gap-5 shadow-md">
                <div>
                    <div className="font-bold text-2xl shadow-md">₹ {product?.price}</div>
                    <div>{product?.title}</div>
                    <div className="text-sm text-black/50">{product?.location}</div>
                </div>
                <div className="flex flex-col p-3 shadow-md">
                    <div className="flex">
                        <div className="bg-blue-500 p-3 text-white font-bold text-3xl rounded-full">U</div>
                    </div>
                    <div className="flex justify-center">Items listed</div>
                    <div className="border-2 border-blue-900 py-2 w-full flex justify-center">Chat with seller</div>
                </div>
                <div className="shadow-md p-5">
                    <div className="font-medium text-2xl">Posted in</div>
                    <div>{product?.location}</div>
                </div>
        </div>
    </div>
  );
}