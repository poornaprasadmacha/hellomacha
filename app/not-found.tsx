import Link from 'next/link'
import { FiHome, FiCompass } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 relative overflow-hidden py-24">
      
      {/* Animated Background Gradients (The 'Blobs') */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '6s' }}></div>

      <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
        
        {/* Animated 404 Text */}
        <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-700 to-indigo-900 tracking-tighter leading-none mb-4 animate-[pulse_3s_ease-in-out_infinite]">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons with Hover Animations */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          
          <Link 
            href="/" 
            className="group flex items-center justify-center gap-3 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 w-full sm:w-auto"
          >
            <FiHome className="text-xl transition-transform duration-300 group-hover:scale-110" />
            Back to Homepage
          </Link>
          
          <Link 
            href="/sitemap" 
            className="group flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 hover:-translate-y-1 hover:shadow-md w-full sm:w-auto"
          >
            <FiCompass className="text-xl transition-transform duration-300 group-hover:rotate-45" />
            Site Directory
          </Link>
          
        </div>
      </div>
      
    </div>
  )
}