import { useState, createContext, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

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





export default function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
        //after successfull register or login, 
        //this onAuthStateChanged() function will automatically run by Firebase.
        //and store the logged in user
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoggedIn(user);
        });

        return () => unsubscribe();
    }, []);
    
    return(
        <>
            <BrowserRouter>
                <Navbar isUserLoggedIn={isUserLoggedIn}></Navbar>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/post_ad" element={<PostAd/>}/>
                    <Route path="/my_ads" element={<MyAds/>}/>
                    <Route path="/product_details/:product_id" element={<ProductDetails/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}