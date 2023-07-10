import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 100, // Adjust the duration to control speed (in milliseconds)
      smooth: true,
    });
  }, [pathname]);

  return children;
};

export { ScrollToTop };
