import { Link, useParams } from "react-router-dom"

export default function  Success(){
    const {product_id}=useParams();
    
    return(
        <div className="flex justify-center my-10">
            <div className="flex flex-col gap-8 justify-center items-center">
                <div className="text-white bg-blue-500 size-16 rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <div className="text-4xl font-semibold flex justify-center">Congratulations</div>
                <div className="text-yellow-500 mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-70">
                        <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="font-semibold">Reach more buyers and seller faster</div>
                <div>Upgrade your Ad to a top position</div>
                <div className="bg-blue-900 font-semibold flex justify-center p-2 text-white w-full rounded-md">Sell faster now</div>
                <div className="border-2 border-blue-700 font-semibold p-2 flex justify-center w-full rounded-md">
                    <Link to={`/product_details/${product_id}`}>Preview Ad</Link>
                </div>
            </div>
        </div>
    )
}