import { NAV_LABEL_LIST, SERVICE_NAME } from "@/constants/navConstants";

export const WishlistPage = () => {
  return (
    <>
      <title>{`${NAV_LABEL_LIST.wishlist} | ${SERVICE_NAME}`}</title>
      <h2 className="text-title2">{NAV_LABEL_LIST.wishlist}</h2>
    </>
  );
};
