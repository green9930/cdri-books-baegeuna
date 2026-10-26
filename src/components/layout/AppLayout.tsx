import { Outlet, ScrollRestoration, useLocation } from "react-router";

import { CommonErrorModal } from "@/components/elements/CommonErrorModal";
import { Navigation } from "@/components/layout/Navigation";

export const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <main className="isolate mx-auto min-h-dvh max-w-content px-5 pt-[calc(var(--spacing-nav)+5rem)] pb-19">
        <Outlet key={location.key} />
      </main>
      <ScrollRestoration />
      <CommonErrorModal />
    </>
  );
};
