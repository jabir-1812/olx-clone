import { useContext } from "react";
import { dbContext } from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import CategoryNavbar from "../../components/CategoryNavBar";
import { useEffect } from "react";
import { useState } from "react";

export default function ProductDetails(){
    const {db}=useContext(dbContext);
    const {productId}=useParams();
    // console.log(productId)
    const [product, setProduct]=useState();
    const navigate=useNavigate();

    useEffect(()=>{
        const findItem=db.filter((item)=>{
            return String(item.id)===String(productId)
        })
        console.log(findItem[0])

        setProduct(findItem[0]);
    },[productId])

    return(
        <>
        <CategoryNavbar/>
        <div>
            <img src={`/${product?.image}`} alt={`${product?.name}`} />
        </div>
        </>
    )
}