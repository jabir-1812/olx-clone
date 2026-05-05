import { useState } from "react";

export default function PostAd(){
    return(
        <>
            Post Ad
            <ChooseCategory/>
        </>
    )
}



function ChooseCategory(){
    const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Mobiles", "Laptops", "Cameras"]
    },
    {
      id: 2,
      name: "Vehicles",
      subcategories: ["Cars", "Bikes", "Trucks"]
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Sofa", "Beds", "Tables"]
    }
  ];

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE - Subcategories */}
      <div className="w-1/2 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Subcategories</h2>

        {selectedCategory ? (
          selectedCategory.subcategories.map((sub, index) => (
            <div key={index} className="p-2 bg-white mb-2 rounded shadow">
              {sub}
            </div>
          ))
        ) : (
          <p>Select a category</p>
        )}
      </div>

      {/* RIGHT SIDE - Categories */}
      <div className="w-1/2 bg-white p-4 border-l">
        <h2 className="text-xl font-bold mb-4">Categories</h2>

        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`p-3 cursor-pointer rounded mb-2 ${
              selectedCategory?.id === cat.id
                ? "bg-blue-200"
                : "hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </div>
        ))}
      </div>

    </div>
  );
}