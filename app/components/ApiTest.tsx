// app/components/ApiTest.tsx
"use client";

import { useEffect, useState } from "react";

export default function ApiTest() {
  const [message, setMessage] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost/hoboc/api/test/", {
          headers: {
            Authorization: "Token c0881af7b46e2dc06f1ff49c2ff8472b9084e13e",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow mt-8 text-center">
      <h2 className="text-lg font-semibold mb-2">API Test Result</h2>
      {error ? (
        <p className="text-red-500">Failed to load: {error}</p>
      ) : (
        <p className="text-green-600">{message}</p>
      )}
    </div>
  );
}
