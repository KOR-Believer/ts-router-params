import { Link } from '@tanstack/react-router'

export const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[500px] flex-1">
    <img
      src="/404.png"
      alt="404 Not Found"
      className="max-w-[200px] h-auto"
    />
    <div className="text-[24px] font-[600] leading-[1.4] tracking-[-.9px] text-black mb-[8px]">
      404 Not Found
    </div>
    <div className="text-[13px] font-[400] leading-[1.6] tracking-[-0.13px] text-[#535765]">
      요청하신 페이지가 존재하지 않습니다.
    </div>
    <Link
      to="/"
      className="text-[13px] font-[400] leading-[1.6] tracking-[-0.13px] text-[#535765]"
    >
      홈으로 이동
    </Link>
  </div>
)
