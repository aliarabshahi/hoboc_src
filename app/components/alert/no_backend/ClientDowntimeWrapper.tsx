"use client";

import useHealthCheck from "../../../services/hooks/useHealthCheck";
import GlobalDowntimeBanner from "./GlobalDowntimeBanner";

export default function ClientDowntimeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHealthy = useHealthCheck();
  return (
    <>
      {!isHealthy && <GlobalDowntimeBanner />}
      {children}
    </>
  );
}
