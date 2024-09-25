"use client";
import { ring } from "ldrs";
import { useEffect, useState } from "react";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      ring.register();
      setLoading(true);
    }
  }, []);
  return <>{loading && <l-ring size="45" speed="2" color="orange"></l-ring>}</>;
};

export default Loader;
