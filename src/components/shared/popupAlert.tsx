"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function CustomPopup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // is mounted is used to make nextjs server component
  // can't running it in the server that can make it error
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black p-6 rounded">Welcome</div>
    </div>,
    document.body,
  );
}
