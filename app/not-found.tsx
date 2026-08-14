import Link from 'next/link'
import { FiHome, FiCompass } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 relative overflow-hidden py-24 bg-transparent">
      
      {/* Subtle Editorial Background Accent (Matches your About Us circular theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] border-2 border-dashed border-red-200 rounded-full -z-10 opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-red-50 rounded-full -z-10 opacity-40"></div>

      <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
        
        {/* Editorial 404 Typography */}
        <h1 className="text-9xl md:text-[12rem] font-black text-gray-900 tracking-tighter leading-none mb-4">
          404<span className="text-red-700">.</span>
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 font-serif italic leading-relaxed max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to the facts.
        </p>

        {/* Action Buttons (Flat, Pill-shaped, Zero Shadows) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          
          <Link 
            href="/" 
            className="group flex items-center justify-center gap-3 bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors duration-300 hover:bg-red-800 w-full sm:w-auto border border-transparent !no-underline"
          >
            <FiHome className="text-xl transition-transform duration-300 group-hover:-translate-y-1" />
            Back to Homepage
          </Link>
          
          <Link 
            href="/sitemap" 
            className="group flex items-center justify-center gap-3 bg-transparent text-red-700 border-2 border-red-700 px-8 py-3 rounded-full font-bold transition-colors duration-300 hover:bg-red-50 w-full sm:w-auto !no-underline"
          >
            <FiCompass className="text-xl transition-transform duration-300 group-hover:rotate-45" />
            Site Directory
          </Link>
          
        </div>
      </div>
      
    </div>
  )
}