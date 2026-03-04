"use client";
import { use, useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { MdNavigateNext } from "react-icons/md";
import { ErrorHandling } from "@/helpers/errorHandling";
import { GetArticleSlug } from "@/lib/api/article";
import { Article } from "@/types/article";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function AdminDashboardArticleAddarticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quillValue, setQuillValue] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetArticleSlug(slug);
      setArticle(data);
      setTitle(data!.title);
      setDescription(data!.description);
      setQuillValue(data!.content);
    };
    fetchData();
  }, [slug]);

  const handleSaveArticle = async () => {
    try {
      // making multipart object and append its body
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", quillValue);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`,
        {
          method: "POST",
          body: formData,
        },
      );

      ErrorHandling(res);
      if (!res.ok) return;

      router.push("/admin/dashboard/article");
      alert("Save Success");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
    }
  };

  return (
    <form className="mx-20 mt-20">
      <div>
        {/*Title input*/}
        <div className="flex flex-col">
          <label>Title:</label>
          <div className="w-1/2 flex">
            <input
              className="p-2 flex w-full border border-slate-600 mb-5 outline-none hover:bg-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/*Description input*/}
        <div className="flex flex-col">
          <label>Description:</label>
          <div className="w-full flex">
            <input
              className="p-2 flex w-full border border-slate-600 mb-5 outline-none hover:bg-gray-800"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/*Image input*/}
        <div className="flex flex-col">
          <label>Image:</label>
          <div className="w-1/2 flex">
            <input
              className="p-1 flex text-black border border-slate-100 bg-slate-200 mb-5 outline-none cursor-pointer hover:bg-slate-300"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files?.[0] || null);
              }}
              type="file"
            />
          </div>
        </div>

        {/*Content input*/}
        <div className="flex flex-col">
          <label>Content:</label>
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
    </form>
  );
}
