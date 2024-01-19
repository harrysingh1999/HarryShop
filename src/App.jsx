import React, { Suspense } from "react";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { RssFeed } from "@mui/icons-material";

export default function App() {

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

