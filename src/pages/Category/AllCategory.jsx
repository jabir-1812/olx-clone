// import { useContext } from "react";
// import { dbContext } from "../../App";
// import {useNavigate} from "react-router-dom"
// import CategoryNavbar from "../../components/CategoryNavBar";


// export default function AllCategory(){
//     const {db}=useContext(dbContext);
//     const navigate=useNavigate();
    
//     return(
//         <>
//             <CategoryNavbar/>
//             <div className="grid grid-cols-4 gap-3 mx-5 my-5">
//                 {db.map((i)=>{
//                     return (
//                     <div 
//                             key={i.id}
//                             onClick={()=>navigate(`/product_details/${i.id}`)}
//                             className="flex flex-col border border-black/25 rounded-md p-2">
//                         <div className="flex flex-1/2 items-center justify-center">
//                             <img className="object-cover" src={`/${i?.image}`} alt={i.name} />
//                         </div>
//                         <div>
//                             <div className="font-bold text-2xl">
//                                 ₹ {i?.price}
//                             </div>
//                             <div className="text-black/50">
//                                 {i?.name}
//                             </div>
//                             <div className="text-sm text-black/50">
//                                 {i?.place}, {i?.district}, {i?.state}
//                             </div>
//                         </div>
//                     </div>
//                     )

//                 })}
//             </div>
//         </>
//     )
// }

export default function AllCategory(){
    return(
        <div>
            All Category
        </div>
    )
}