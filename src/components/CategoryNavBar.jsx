import {Link} from "react-router-dom"

export default function CategoryNavbar(){
    
    return(
        <div className="flex gap-5 justify-center py-[1%] border-y-2 border-black/25">
            <Link to='/category/all'><div className="border border-black/25 rounded-full px-5 py-2">All categories</div></Link>
            <Link to='/category/cars'><div className="border border-black/25 rounded-full px-5 py-2">Cars</div></Link>
            <Link to='/category/bikes'><div className="border border-black/25 rounded-full px-5 py-2">Bikes</div></Link>
            <Link to='/category/mobiles'><div className="border border-black/25 rounded-full px-5 py-2">Mobiles</div></Link>
        </div>
    )
}