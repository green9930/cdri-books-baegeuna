import { Link, NavLink } from "react-router";

import { NAV_MENUS, PATH_LIST, SERVICE_NAME } from "@/constants/navConstants";

/* 화면 top 고정. bottom line은 화면 끝까지, content 영역은 max-w-layout
 * 메뉴: md 미만은 우측 정렬, md 이상은 화면 중앙 */
export const Navigation = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 h-nav bg-white">
      <div className="relative mx-auto flex h-full max-w-layout items-center justify-between gap-4 px-5">
        <h1 className="text-caption whitespace-nowrap text-black sm:text-title3 md:text-title1">
          <Link to={PATH_LIST.search}>{SERVICE_NAME}</Link>
        </h1>

        <nav className="h-full md:absolute md:left-1/2 md:-translate-x-1/2">
          <ul className="flex h-full items-center gap-2 md:gap-14">
            {NAV_MENUS.map(({ label, path }) => (
              <li key={path} className="">
                <NavLink
                  to={path}
                  end={path === PATH_LIST.search}
                  className={({ isActive }) =>
                    `flex items-center border-b bg-white p-2 text-body2 whitespace-nowrap text-textPrimary md:text-body1 ${
                      isActive ? "border-primary" : "border-transparent"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
