import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";

const AppLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    // url 바꾸기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div className="bg-black text-white">
      <header className="bg-black h-[70px] px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* 로고 + 데스크탑 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 모바일: 햄버거 아이콘 */}
          <button
            className="text-white text-2xl sm:hidden"
            onClick={toggleMenu}
          >
            <FiMenu />
          </button>

          {/* 로고 */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo/logo.png"
              alt="Netflix Logo"
              className="w-[120px] object-contain"
            />
          </Link>

          {/* 데스크탑: 홈/영화 메뉴 */}
          <div className="hidden sm:flex items-center gap-6 text-lg font-medium ml-6">
            <Link to="/" className="hover:text-red-500">
              홈
            </Link>
            <Link to="/movies" className="hover:text-red-500">
              영화
            </Link>
          </div>
        </div>

        {/* 데스크탑 검색창 / 모바일 검색 아이콘 */}
        <div className="flex items-center gap-2">
          {/* 데스크탑: 검색창 */}
          <form
            className="hidden sm:flex items-center gap-2"
            onSubmit={searchByKeyword}
          >
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-zinc-900 text-white border border-red-500 px-4 py-2 rounded w-48 md:w-64 text-sm outline-none"
            />
            <button className="p-2" type="submit">
              <FiSearch size={20} />
            </button>
          </form>

          {/* 모바일: 검색 아이콘 */}
          <button
            className="sm:hidden text-white text-xl"
            onClick={toggleSearch}
          >
            <FiSearch />
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="sm:hidden flex px-4 py-4 bg-zinc-900 border-t border-zinc-700">
          <nav className="flex flex-col gap-4 text-lg">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              홈
            </Link>
            <Link to="/movies" onClick={() => setIsMenuOpen(false)}>
              영화
            </Link>
          </nav>
        </div>
      )}

      {/* 모바일 검색창 */}
      {isSearchOpen && (
        <form
          className="sm:hidden px-4 py-2 bg-zinc-900 border-b border-zinc-700"
          onSubmit={searchByKeyword}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded text-sm outline-none border border-red-500"
          />
        </form>
      )}
      <Outlet />
    </div>
  );
};

export default AppLayout;
