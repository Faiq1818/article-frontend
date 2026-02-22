"use client";
import { ErrorHandling } from "@/helpers/errorHandling";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Article = {
  updated_at: string;
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
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
      console.error(err);
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
    }
  };

  const cleanContent = (htmlContent: string) => {
    if (!htmlContent) return "";
    return htmlContent.replace(/&nbsp;/g, " ");
  };

  return (
    <main className="justify-center flex">
      <article className="max-w-3xl py-12 sm:px-6 sm:py-16">
        {/* Artikel title */}
        <header className="mb-10 text-center">
          <div
            className="text-3xl font-extrabold sm:text-4xl md:text-5xl mb-6"
            dangerouslySetInnerHTML={{
              __html: cleanContent(article?.title ?? ""),
            }}
          />
        </header>

        <img
          alt={article?.slug ?? ""}
          className="rounded"
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${article?.image_url ?? ""}`}
        />
        <p className="text-sm text-slate-300 mb-5 mt-2">
          {new Date(article?.updated_at ?? "").toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Article content */}
        <div
          dangerouslySetInnerHTML={{
            __html: cleanContent(article?.content ?? ""),
          }}
        />
      </article>
    </main>
  );
}
