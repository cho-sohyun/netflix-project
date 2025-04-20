import React from "react";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

// 수정예정
// 헤더 모바일 버전 : 홈 영화 햄버거 아이콘
// 검색 아이콘만 출력 -> 클릭 시 검색창

const AppLayout = () => {
  return (
    <div className="bg-black text-white">
      <header className="bg-black h-[100px]">
        <div className="sm:px-4 lg:px-6 flex items-center justify-between h-full">
          {/* 왼쪽: 로고 + 메뉴 */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo/logo.png"
                alt="Netflix Logo"
                className="w-[200px] object-contain"
              />
            </Link>

            {/* 홈/영화 메뉴 */}
            <div className="flex text-lg font-medium gap-4 ml-6">
              <Link to="/" className="hover:text-red-500">
                홈
              </Link>
              <Link to="/movies" className="hover:text-red-500">
                영화
              </Link>
            </div>
          </div>

          {/* 검색창 */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="bg-zinc-900 text-white border border-red-500 px-4 py-2 rounded w-36 sm:w-48 md:w-64 text-sm outline-none"
            />
            <button className="border border-red-500 p-2 rounded h-10 w-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AppLayout;
