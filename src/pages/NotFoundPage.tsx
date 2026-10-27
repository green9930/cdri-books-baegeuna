import { Link } from "react-router";

import { PATH_LIST, SERVICE_NAME } from "@/constants/navConstants";
import { BTN_COLOR_VAR, BTN_TEXT_VAR } from "@/constants/styleConstants";

export const NotFoundPage = () => {
  return (
    <section className="flex w-full flex-col items-center gap-8 pt-30 text-center">
      <title>{`404 Not Found | ${SERVICE_NAME}`}</title>
      <h2 className="text-title1">404 Not Found</h2>
      <p className="w-full text-caption leading-6 whitespace-pre-line text-textSecondary">
        {`페이지를 찾을 수 없습니다.\n입력하신 주소가 정확한지 다시 한 번 확인해 주세요.`}
      </p>
      <Link
        to={PATH_LIST.search}
        className={`rounded-lg px-5 py-3 ${BTN_TEXT_VAR.body2} ${BTN_COLOR_VAR.primaryFilled}`}
      >
        메인 페이지로 이동
      </Link>
    </section>
  );
};
