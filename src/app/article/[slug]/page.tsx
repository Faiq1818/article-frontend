"use client";
import { ErrorHandling } from "@/helpers/errorHandling";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
};

export default function Page() {
  const params = useParams<{ slug: string }>();

  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const fetchData = async () => {
      await GetArticle();
    };
    fetchData();
  }, []);

  const GetArticle = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${params.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      ErrorHandling(res);

      const data = await res.json();
      setArticle(data.data);
    } catch (err) {
      console.log("Ini error: ", err);
    }
  };

  console.log("slug", params.slug);
  console.log("article", article);

  // Fungsi utilitas sederhana untuk membersihkan &nbsp; menjadi spasi biasa
  const cleanContent = (htmlContent: string) => {
    if (!htmlContent) return "";
    // Regex global (/g) untuk mengganti semua instance &nbsp; dengan spasi biasa
    return htmlContent.replace(/&nbsp;/g, " ");
  };

  return (
    <main className="justify-center flex">
      <article className="max-w-3xl py-12 sm:px-6 sm:py-16">
        {/* HEADER: Judul Artikel */}
        <header className="mb-10 text-center">
          <div
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-6"
            dangerouslySetInnerHTML={{
              __html: cleanContent(article?.title ?? ""),
            }}
          />
        </header>

        {/* CONTENT BODY */}
        <div
          dangerouslySetInnerHTML={{
            __html: cleanContent(article?.content ?? ""),
          }}
        />
      </article>
    </main>
  );
}
