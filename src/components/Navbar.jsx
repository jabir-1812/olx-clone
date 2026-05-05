// import { useState } from "react";
// import {BrowserRouter, Link, useNavigate} from "react-router-dom"



// export function Navbar(){

//     const [isLoggedIn, setIsLoggedIn]=useState(false)
//     const [isLoginModalOpen, setIsLoginModalOpen]=useState(false);


//     function openLoginModal(){
//         setIsLoginModalOpen(true);
//     }

//     function closeLoginModal(){
//         setIsLoginModalOpen(false);
//     }

//     const [email, setEmail]=useState("");
//     const [emailError, setEmailError]=useState("");

//     const password='123123';
//     const [enteredPassword, setEnteredPassword]=useState("");
//     const [passwordError, setPasswordError]=useState("")

//     const navigate=useNavigate();

//     function validateEmail(enteredEmail){
//         if(enteredEmail.trim()===""){
//             setEmailError("This field is required")
//         }else{
//             setEmail(enteredEmail);
//             setEmailError("")
//         }
//     }

//     function validatePassword(enteredPassword){
//         if(enteredPassword.trim()===""){
//             setPasswordError("Password is required")
//         }else{
//             setEnteredPassword(enteredPassword);
//             setPasswordError("")
//         }
//     }

//     function handleFormSubmission(){
//         if(email.trim()===""){
//             setEmailError("This field is required")
//             return;
//         }else{
//             setEmailError("")
//         }

//         if(enteredPassword.trim()===""){
//             setPasswordError("Password is required")
//             return;
//         }else{
//             setPasswordError("")
//         }

//         if(enteredPassword !== password){
//             setPasswordError("Incorrect email or password")
//             return;
//         }else{
//             setPasswordError("")
//         }

//         setIsLoginModalOpen(false)
//         setIsLoggedIn(true)
//         navigate('/');

//     }

//     const [toggleProfileDropdown, setToggleProfileDropdown]=useState(false);

//     return(
//         <>
//             <nav className="flex justify-between items-center px-[2%] py-1 gap-5 bg-blue-50">
//                     <Link className="" to="/">
//                         <img src="/olx_logo_2025.svg" className="w-15" alt="" />
//                     </Link>

//                     <div className="flex items-center justify-around px-[1%] py-3 gap-10 rounded-full bg-white border-1 border-black/25">
//                         <div className="">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
//                             </svg>
//                         </div>
//                         <div>
//                              <div>Kerala</div>
//                         </div>
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//                             </svg>
//                         </div>
//                     </div>
                        
//                     <div className="flex items-center grow border-2 border-black/25 rounded-full py-3 pl-[3%] pr-[1%]">
//                         <input className=" grow" type="text" placeholder="search" />
//                         <div className="bg-blue-500 rounded-full px-[1%] text-white">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//                             </svg>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-1 items-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
//                         </svg>
//                         <div className="text-xs font-bold">
//                             Wishlist
//                         </div>
//                     </div>

//                 {
//                     isLoggedIn ?
//                     (
//                         <>
//                             <div className="flex flex-col gap-1 items-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
//                                 </svg>
//                                 <div className="text-xs font-bold">
//                                     Chat
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-1 items-center relative">
//                                 <div 
//                                         onClick={()=>setToggleProfileDropdown(!toggleProfileDropdown)}
//                                         className="bg-blue-300 px-2 rounded-full cursor-pointer">
//                                     👤
//                                 </div>
//                                 <div className="text-xs font-bold">
//                                     User
//                                 </div>
//                                 {
//                                     toggleProfileDropdown &&
//                                     (
//                                         <div className="absolute right-0">
//                                             <Link to='/myAds'>My Ads</Link>
//                                             <div>Logout</div>
//                                         </div>
//                                     )
//                                 }
//                             </div>
//                         </>
//                     )
//                     :
//                     (
//                         <>
//                         <div>
//                             <button 
//                                     onClick={openLoginModal}
//                                     className="flex flex-col gap-1 items-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//                                 </svg>
//                                 <div  className="text-xs font-bold">Login</div>
//                             </button>
//                         </div>
//                         </>
//                     )
//                 }

//                  <div>
//                     <Link to='/sell' className="text-lg font-bold px-5 py-2 border-5 border-blue-500 rounded-full">
//                        + Sell
//                     </Link>
//                 </div>
                
//             </nav>

//             <div className="flex items-center justify-center bg-gray-100">

//                 {/* Login Modal */}
//                 {isLoginModalOpen && (
//                     <div
//                             className="fixed inset-0 bg-black/50 flex items-center justify-center"
//                             onClick={closeLoginModal}   // click outside closes
//                     >
//                     {/* Modal Content */}
//                         <div
//                             className="bg-white p-5 rounded shadow-lg w-80"
//                             onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//                         >
//                             {/* close button */}
//                             <div 
//                                     onClick={closeLoginModal}
//                                     className="flex justify-end">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                                 </svg>
//                             </div>
//                             <div className=" flex justify-center text-3xl font-bold mb-4">Login</div>
//                             <div className="flex flex-col gap-5 items-center">
//                                 <div className="w-full border-2 border-black/25 rounded-lg flex px-5 py-3">
//                                     <input 
//                                         onChange={(e)=> validateEmail(e.target.value)} 
//                                         type="text"
//                                         className="w-full" 
//                                         placeholder="Email" />
//                                     <div className="text-red-500">{emailError && emailError}</div>
//                                 </div>
//                                 <div className="w-full border-2 border-black/25 rounded-lg flex px-5 py-3">
//                                     <input 
//                                         onChange={(e)=>validatePassword(e.target.value)} 
//                                         type="password" 
//                                         className="w-full"
//                                         placeholder="Password"/>
//                                     <div className="text-red-500">{passwordError && passwordError}</div>
//                                 </div>
                                
//                                 <div className="flex justify-center text-white bg-blue-500 border-2 rounded-lg px-3 py-1">
//                                     <button onClick={handleFormSubmission}>Log in</button>
//                                 </div>
                                
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>


//             {/* <ProfileDropdown/> */}
//         </>
//     )
// }

// function ProfileDropdown() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   return (
//     <div className="relative bg-lime-100">
      
//       {/* Profile Icon */}
//       <button
//         onClick={toggleDropdown}
//         className="w-10 h-10 rounded-full bg-blue-500 text-white"
//       >
//         P
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
//           <ul className="py-2">
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
//           </ul>
//         </div>
//       )}

//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            signOut,
            onAuthStateChanged } from "firebase/auth";



export function Navbar({isUserLoggedIn}){
    const [isTheRegisterAndLoginModalOpen, setIsTheRegisterAndLoginModalOpen] = useState(false)

    //this function will show the modal of register form and login form
    function showTheRegisterAndLoginModal(){
        setIsTheRegisterAndLoginModalOpen(true);
    }

    //this function will close the modal of register form and login form
    function closeTheRegisterAndLoginModal(){
        setIsTheRegisterAndLoginModalOpen(false);
    }


    const [showLogin, setShowLogin]=useState(true);
    const [showRegister, setShowRegister]=useState(false);

    function showRegisterForm(){
        setShowRegister(true);
        setShowLogin(false);
    }

    function showLoginForm(){
        setShowLogin(true);
        setShowRegister(false);
    }



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]=useState("")

    const [emailErrorMsg, setEmailErrorMsg]=useState("")
    const [passwordErrorMsg, setPasswordErrorMsg]=useState("")
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg]=useState("")

    const [registerErrorMsg, setRegisterErrorMsg]=useState("")
    const [loginErrorMsg, setLoginErrorMsg]=useState("")

    const [isloggedIn, setIsLoggedIn]=useState(false);


    async function handleRegister(){
        try {
            setRegisterErrorMsg("")
            if(email.trim()===""){
                setEmailErrorMsg("Email is required")
                return;
            }else{
                setEmailErrorMsg("")
            }


            if(password.trim()===""){
                setPasswordErrorMsg("Password is required")
                return;
            }else{
                setPasswordErrorMsg("")
            }

            if(password !== confirmPassword){
                setConfirmPasswordErrorMsg("Password doesn't match")
                return;
            }else{
                setConfirmPasswordErrorMsg("")
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log("User created:", userCredential.user);

            //user will be logged in after register
            //to check you can run the "onAuthStateChanged" function.
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("User is logged in:", user.email);
                    setIsLoggedIn(true);
                }
            });

            closeTheRegisterAndLoginModal();
        } catch (error) {
            console.log("error registering new user==>",error.message);
            setRegisterErrorMsg(error.message)
        }
    }

    async function handleLogin(){
        try {
            setLoginErrorMsg("")
            if(email.trim()===""){
                setEmailErrorMsg("Email is required")
                return;
            }else{
                setEmailErrorMsg("")
            }


            if(password.trim()===""){
                setPasswordErrorMsg("Password is required")
                return;
            }else{
                setPasswordErrorMsg("")
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email, 
                password
            );

            console.log("User logged in ===> ",userCredential.user)
            closeTheRegisterAndLoginModal();
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                console.log("User not found");
                setLoginErrorMsg("User not fouond")
            } else if (error.code === "auth/wrong-password") {
                console.log("Wrong password");
                setLoginErrorMsg("Wrong password or email")
            } else {
                console.log(error.message);
                setLoginErrorMsg(error.message)
            }
        }
    }

    const [isProfileDropdownOpen, setIsProfileDropdownOpen]=useState(false)
    const profileDropdownRef=useRef(null)

    function toggleProfileDropdown(e){
        console.log("working ====>", !isProfileDropdownOpen)
        e.stopPropagation();
        setIsProfileDropdownOpen(!isProfileDropdownOpen)
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out");
        } catch (error) {
            console.error(error.message);
        }
    };


    useEffect(()=>{
        function handleClickOutside(event) {
            console.log("working the handleOutside")
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target)
            ) {
                setIsProfileDropdownOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    },[])

    return(
        <nav className="flex justify-between items-center px-[2%] py-1 gap-5 bg-blue-50">

            <Link className="" to="/">
                <img src="/olx_logo_2025.svg" className="w-15" alt="" />
            </Link>

            <div className="flex items-center justify-around px-[1%] py-3 gap-10 rounded-full bg-white border-1 border-black/25">
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                </div>
                <div>
                        <div>Kerala</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
                
            <div className="flex items-center grow border-2 border-black/25 rounded-full py-3 pl-[3%] pr-[1%]">
                <input className=" grow" type="text" placeholder="search" />
                <div className="bg-blue-500 rounded-full px-[1%] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <div className="text-xs font-bold">
                    Wishlist
                </div>
            </div>

            {
                isUserLoggedIn ?
                (
                    <>
                         <div className="flex flex-col gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>
                            <div className="text-xs font-bold">
                                Chat
                            </div>
                        </div>

                         <div 
                            ref={profileDropdownRef}
                            onClick={(e)=>toggleProfileDropdown(e)}
                            className="flex flex-col gap-1 items-center relative">
                            <div 
                                    className="bg-blue-300 px-2 rounded-full cursor-pointer">
                                👤
                            </div>
                            <div className="text-xs font-bold">
                                User
                            </div>

                            {/* profile dropdown */}
                            {isProfileDropdownOpen && (
                                <div className="absolute border -bottom-22">
                                    <div>My Ads</div>
                                    <div 
                                        onClick={handleLogout}
                                        className="bg-red-300"
                                    >Logout</div>
                                </div>
                            )}
                            
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div>
                            <button
                                onClick={showTheRegisterAndLoginModal}
                                className="flex flex-col gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <div  className="text-xs font-bold">Login</div>
                            </button>
                        </div>
                    </>
                )
            }

            

            {isTheRegisterAndLoginModalOpen ? 
                <RegisterAndLoginModal 
                    closeTheRegisterAndLoginModal={closeTheRegisterAndLoginModal}
                    showLogin={showLogin}
                    showLoginForm={showLoginForm}
                    showRegisterForm={showRegisterForm}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    handleRegister={handleRegister}
                    handleLogin={handleLogin}
                    emailErrorMsg={emailErrorMsg}
                    passwordErrorMsg={passwordErrorMsg}
                    confirmPasswordErrorMsg={confirmPasswordErrorMsg}
                    registerErrorMsg={registerErrorMsg}
                    loginErrorMsg={loginErrorMsg}

                    /> : ""}

            <div>
                <Link to='/sell' className="text-lg font-bold px-5 py-2 border-5 border-blue-500 rounded-full">
                    + Sell
                </Link>
            </div>

        </nav>
    )
}



function RegisterAndLoginModal(
    {   
        closeTheRegisterAndLoginModal, 
        showLogin, 
        showLoginForm,
        showRegisterForm,
        setEmail, 
        setPassword, 
        setConfirmPassword, 
        emailErrorMsg, 
        passwordErrorMsg,
        confirmPasswordErrorMsg,
        handleLogin, 
        handleRegister,
        registerErrorMsg,
        loginErrorMsg
    }){



    return(
        <div 
            onClick={closeTheRegisterAndLoginModal} //closes the modal when clicking outside the modal
            className="fixed inset-0 bg-black/50 flex items-center justify-center">
            {/* modal content */}
            <div onClick={(e)=>e.stopPropagation()} className="bg-white">
                    <div className="flex justify-end">
                        <div onClick={closeTheRegisterAndLoginModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    {showLogin ?
                     (
                        <div>
                            <form action="">
                                <div className="text-red-500">{loginErrorMsg && loginErrorMsg}</div>
                                <div>
                                    <input
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        type="email" placeholder="email" />
                                    <div className="text-red-500">
                                        {emailErrorMsg && emailErrorMsg}
                                    </div>
                                </div>
                                <div>
                                    <input 
                                        onChange={(e)=>setPassword(e.target.value)}
                                        type="password" placeholder="password" />
                                    <div className="text-red-500">
                                        {passwordErrorMsg && passwordErrorMsg}
                                    </div>
                                    
                                </div>
                                <div>
                                    <button 
                                        onClick={handleLogin}
                                        type="button">Login</button>
                                </div>
                            </form>

                            <div className="bg-red-100" onClick={showRegisterForm}>Register</div>
                        </div>
                     )
                     :
                     (
                        <div>
                            <form action="">
                                <div className="text-red-500">{registerErrorMsg && registerErrorMsg}</div>
                                <div>
                                    <input
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        type="email" placeholder="email" />
                                    <div className="text-red-500">
                                        {emailErrorMsg && emailErrorMsg}
                                    </div>
                                </div>
                                <div>
                                    <input 
                                        onChange={(e)=>setPassword(e.target.value)}
                                        type="password" placeholder="password" />
                                    <div className="text-red-500">
                                        {passwordErrorMsg && passwordErrorMsg}
                                    </div>
                                </div>
                                <div>
                                    <input 
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        type="password" placeholder="confirm password" />
                                    <div className="text-red-500">
                                        {confirmPasswordErrorMsg && confirmPasswordErrorMsg}
                                    </div>
                                </div>
                                <div>
                                    <button 
                                        onClick={handleRegister}
                                        type="button">Register</button>
                                </div>
                            </form>
                            <div onClick={showLoginForm}>Login</div> 
                        </div> 
                     )}        
            </div>
        </div>
    )
}


