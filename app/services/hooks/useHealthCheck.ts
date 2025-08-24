"use client";
import { useEffect, useState } from "react";

export default function useHealthCheck(intervalMs = 30000) {
  const [healthy, setHealthy] = useState(true);

  async function check() {
    try {
      const res = await fetch(`http://localhost/hoboc/api/health/`, {
        cache: "no-store"
      });
      setHealthy(res.ok);
    } catch {
      setHealthy(false);
    }
  }

  useEffect(() => {
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, []);

  return healthy;
}
