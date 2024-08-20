import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScroll(setScrolled) {
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    if (location.pathname === "/") {
      setScrolled(false);
      window.addEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
}
