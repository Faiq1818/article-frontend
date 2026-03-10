import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

type Props = {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  msg1: string;
  msg2: string;
};

export default function CustomPopup({
  isError,
  setIsError,
  msg1,
  msg2,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // is mounted is used to make nextjs server component
  // can't running it in the server that can make it error
  if (!mounted) return null;

  if (isError) {
    return createPortal(
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/70"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-black text-white p-3 border-slate-600 border rounded">
          <div className="flex items-center gap-2">
            <MdErrorOutline aria-hidden="true" />
            <p>{msg1}</p>
          </div>

          <p className="text-[#a0a0a0]">{msg2}</p>

          <div className="flex pt-2 justify-end">
            <button
              type="button"
              className="bg-black rounded border border-slate-600 px-2 py-1 cursor-pointer hover:bg-gray-800"
              onClick={() => setIsError(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}
