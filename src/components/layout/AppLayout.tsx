import { Outlet, ScrollRestoration, useLocation } from "react-router";

import { Navigation } from "@/components/layout/Navigation";

export const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <main className="mx-auto min-h-dvh max-w-content px-5 pt-[calc(var(--spacing-nav)+4rem)] pb-19">
        <Outlet key={location.key} />
      </main>
      <ScrollRestoration />
    </>
  );
};
