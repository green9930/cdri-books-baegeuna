import { NAV_LABEL_LIST, SERVICE_NAME } from "@/constants/navConstants";

export const SearchPage = () => {
  return (
    <>
      <title>{`${NAV_LABEL_LIST.search} | ${SERVICE_NAME}`}</title>
      <h2 className="text-title2">{NAV_LABEL_LIST.search}</h2>
    </>
  );
};
