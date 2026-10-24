import { createBrowserRouter } from "react-router";

import { NotFoundPage } from "@/pages/NotFoundPage";
import { SearchPage } from "@/pages/SearchPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { PATH_LIST } from "@/constants/navConstants";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: PATH_LIST.search, element: <SearchPage /> },
      { path: PATH_LIST.wishlist, element: <WishlistPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
