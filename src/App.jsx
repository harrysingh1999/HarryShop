import React, { Suspense, useEffect } from "react";
import Header from "./Components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { RssFeed } from "@mui/icons-material";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading........</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
