import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="sticky top-0 z-100 flex bg-white h-[68px] items-center px-8 border-b border-gray-200">
      <Link to="/" className="mr-8 font-bold">Home</Link>
      
      {/* 🔴 DEBUG: Router params 테스트 링크 */}
      <div className="flex gap-4">
        <span className="text-gray-400 text-sm mr-2">Concrete URL:</span>
        <Link to="/office/gangnam" className="text-sm text-red-500 underline">
          강남(concrete)
        </Link>
        <Link to="/office/jamsil" className="text-sm text-red-500 underline">
          잠실(concrete)
        </Link>
        <Link to="/office/seoullo" className="text-sm text-red-500 underline">
          서울로(concrete)
        </Link>
        
        <span className="text-gray-400 text-sm mx-2">|</span>
        
        <span className="text-gray-400 text-sm mr-2">With params:</span>
        <Link to="/office/$placeId" params={{ placeId: 'gangnam' }} className="text-sm text-blue-500 underline">
          강남(params)
        </Link>
        <Link to="/office/$placeId" params={{ placeId: 'jamsil' }} className="text-sm text-blue-500 underline">
          잠실(params)
        </Link>
        <Link to="/office/$placeId" params={{ placeId: 'seoullo' }} className="text-sm text-blue-500 underline">
          서울로(params)
        </Link>
      </div>
    </header>
  )
}
