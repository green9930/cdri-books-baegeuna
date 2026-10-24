import { Link } from "react-router";

import { PATH_LIST, SERVICE_NAME } from "@/constants/navConstants";

export const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center gap-4 pt-30 text-center">
      <title>{`404 Not Found | ${SERVICE_NAME}`}</title>
      <h2 className="text-title1">404 Not Found</h2>
      <p className="text-caption text-textSecondary">
        페이지를 찾을 수 없습니다. 입력하신 주소가 정확한지 다시 한 번 확인해
        주세요.
      </p>
      <Link
        to={PATH_LIST.search}
        className="rounded-lg bg-primary px-5 py-3 text-body2-bold text-white"
      >
        메인 페이지로 이동
      </Link>
    </section>
  );
};
