export default function Footer(){
    return(
        <footer className="w-full">
    
            <div className="bg-gray-100 px-6 md:px-16 py-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">

                <div>
                    <h2 className="font-bold text-black mb-4 uppercase">
                    Popular Locations
                    </h2>

                    <ul className="space-y-2 text-gray-500">
                    <li>Kolkata</li>
                    <li>Mumbai</li>
                    <li>Chennai</li>
                    <li>Pune</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-black mb-4 uppercase">
                    Trending Locations
                    </h2>

                    <ul className="space-y-2 text-gray-500">
                    <li>Bhubaneshwar</li>
                    <li>Hyderabad</li>
                    <li>Chandigarh</li>
                    <li>Nashik</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-black mb-4 uppercase">
                    About Us
                    </h2>

                    <ul className="space-y-2 text-gray-500">
                    <li>About OLX India</li>
                    <li>Tech@OLX</li>
                    <li>Careers</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-black mb-4 uppercase">
                    OLX
                    </h2>

                    <ul className="space-y-2 text-gray-500">
                    <li>Blog</li>
                    <li>Help</li>
                    <li>Sitemap</li>
                    <li>Legal & Privacy information</li>
                    <li>Vulnerability Disclosure Program</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-black mb-4 uppercase">
                    Follow Us
                    </h2>

                    <div className="flex items-center gap-2 mb-5">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        f
                    </div>

                    <div className="w-9 h-9 rounded-full border-2 border-pink-500 text-pink-500 flex items-center justify-center font-bold">
                        i
                    </div>

                    <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                        ▶
                    </div>

                    <div className="w-9 h-9 rounded bg-black text-white flex items-center justify-center font-bold">
                        X
                    </div>

                    <div className="w-9 h-9 rounded bg-green-500 text-white flex items-center justify-center font-bold">
                        W
                    </div>

                    <div className="w-9 h-9 rounded bg-blue-700 text-white flex items-center justify-center font-bold">
                        in
                    </div>
                    </div>

                    <div className="space-y-3">
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg w-44 text-left">
                        <div className="text-xs">GET IT ON</div>
                        <div className="text-lg font-semibold">Google Play</div>
                    </button>

                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg w-44 text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-lg font-semibold">App Store</div>
                    </button>
                    </div>
                </div>
                </div>
            </div>

            <div className="bg-blue-900 text-white px-6 md:px-16 py-10">

                <div className="flex flex-wrap items-center justify-between gap-10 border-b border-white/30 pb-10">

                <div className="text-3xl font-bold border-r border-white/40 pr-10">
                    CarTradeTech
                </div>

                <div className="text-4xl font-bold">
                    olx
                </div>

                <div className="text-3xl font-bold">
                    carwale
                </div>

                <div className="text-3xl font-bold">
                    bikewale
                </div>

                <div className="text-3xl font-bold">
                    CarTrade
                </div>

                <div className="text-2xl font-bold">
                    MOBILITY OUTLOOK
                </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm gap-4">
                <div>
                    Help - Sitemap
                </div>

                <div>
                    All rights reserved © 2006-2026 OLX
                </div>
                </div>
            </div>
    </footer>
    )
}