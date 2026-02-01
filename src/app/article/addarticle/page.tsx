"use client";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { MdNavigateNext } from "react-icons/md";
import { ErrorHandling } from "@/helpers/errorHandling";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function MyComponent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [quillValue, setQuillValue] = useState("");

  const handleSaveArticle = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: quillValue,
          }),
        },
      );

      ErrorHandling(res);
      router.push("/article");
      alert("Save Success");
    } catch (err) {
      console.log("Ini error: ", err);
    }
  };

  return (
    <div className="mx-20 mt-20">
      <div>
        {/*Title input*/}
        <div className="flex flex-col">
          <span>Title:</span>
          <div className="w-1/2 flex">
            <input
              className="p-2 flex w-full border mb-5 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/*Content input*/}
        <div className="flex flex-col">
          <span>Content:</span>
          <ReactQuill
            theme="snow"
            value={quillValue}
            onChange={setQuillValue}
          />
        </div>
      </div>

      {/*Save Button*/}
      <div className="flex justify-end mt-5">
        <div
          className="flex items-center gap-2 text-white px-4 py-2 border rounded-3xl border-slate-600 hover:bg-gray-800 transition duration-75 cursor-pointer"
          onClick={handleSaveArticle}
        >
          <span>Save</span>
          <MdNavigateNext className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
