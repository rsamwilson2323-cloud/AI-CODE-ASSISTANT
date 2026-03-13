import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function PageWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loader whenever children changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // 2 seconds loader

    return () => clearTimeout(timer);
  }, [children]);

  return (
    <>
      {loading && <Loader />}
      <div style={{ opacity: loading ? 0.5 : 1 }}>
        {!loading && children}
      </div>
    </>
  );
}

export default PageWrapper;