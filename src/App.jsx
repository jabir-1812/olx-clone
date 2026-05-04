import { useState, createContext } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import './App.css'
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home/Home";
import MyAds from "./pages/My_ads/MyAds";
import AllCategory from "./pages/Category/AllCategory";
import CarCategory from "./pages/Category/CarCategory";
import BikeCategory from "./pages/Category/BikeCategory";
import MobileCategory from "./pages/Category/MobileCategory";
import PostAd from "./pages/Post_ad/PostAd";
import ProductDetails from "./pages/Product_details/ProductDetails";

export const dbContext=createContext();
// const db=[
//     {
//         id:1,
//         name:"Car",
//         category:"car",
//         subcategory:"car",
//         image:"car.jpg",
//         description:"description",
//         price:100,
//         state:"kerala",
//         district:"calicut",
//         place:"calicut"
//     },
//     {
//         id:2,
//         name:"Bike",
//         category:"bike",
//         subcategory:"bike",
//         image:"bike.jpg",
//         description:"description",
//         price:100
//     },
//     {
//         id:3,
//         name:"Mobile",
//         category:"mobile",
//         subcategory:"mobile",
//         image:"mobile.jpg",
//         description:"description",
//         price:100
//     },
    

// ]



export default function App() {
    
    return(
        <>
        <dbContext.Provider value={{db}}>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/category/all" element={<AllCategory/>}/>
                    <Route path="/category/cars" element={<CarCategory/>}/>
                    <Route path="/category/bikes" element={<BikeCategory/>}/>
                    <Route path="/category/mobiles" element={<MobileCategory/>}/>
                    <Route path="/product_details/:productId" element={<ProductDetails/>}/>
                    <Route path="/sell" element={<PostAd/>}/>
                    <Route path="/myAds" element={<MyAds/>}></Route>
                </Routes>
            </BrowserRouter>
        </dbContext.Provider>
        </>
    )
}