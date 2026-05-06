import { Link, useParams } from "react-router-dom"

export default function  Success(){
    const {product_id}=useParams();
    
    return(
        <div className="flex justify-center">
            <div className="flex flex-col gap-8">
                <div className="text-green-500 text-4xl font-semibold flex justify-center">Success</div>
                <div className="font-semibold">Reach more buyers and seller faster</div>
                <div>Upgrade your Ad to a top position</div>
                <div className="bg-blue-700 flex justify-center p-2 text-white">Sell faster now</div>
                <div className="border-2 border-blue-700 p-2 flex justify-center">
                    <Link to={`/product_details/${product_id}`}>Preview Ad</Link>
                </div>
            </div>
        </div>
    )
}