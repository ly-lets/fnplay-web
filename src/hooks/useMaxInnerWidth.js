import { useState, useEffect } from "react";

const useMaxInnerWidth = (maxWidth = 1024) => {
  const [isBelowOrEqualMaxWidth, setIsBelowOrEqualMaxWidth] = useState(
    window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      const isBelowOrEqual = window.innerWidth <= maxWidth;
      setIsBelowOrEqualMaxWidth(isBelowOrEqual);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxWidth]);

  return isBelowOrEqualMaxWidth;
};

export default useMaxInnerWidth;