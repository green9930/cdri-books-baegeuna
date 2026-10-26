import { WishedBookResult } from "@/components/book/WishedBookResult";
import { NAV_LABEL_LIST, SERVICE_NAME } from "@/constants/navConstants";

export const WishlistPage = () => {
  return (
    <>
      <title>{`${NAV_LABEL_LIST.wishlist} | ${SERVICE_NAME}`}</title>

      <section className="flex flex-col gap-6">
        <h2 className="text-title2">{NAV_LABEL_LIST.wishlist}</h2>
        <WishedBookResult />
      </section>
    </>
  );
};
