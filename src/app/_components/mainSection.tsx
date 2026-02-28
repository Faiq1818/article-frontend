"use client";
import { ErrorHandling } from "@/helpers/errorHandling";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Article } from "@/types/article";

export default function RootComponentMainSection() {
  const searchParams = useSearchParams();
  const pageParams = Number(searchParams.get("page")) || 1;
  const limitParams = Number(searchParams.get("limit")) || 100;

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await GetArticle();
    };
    fetchData();
  }, []);

  const GetArticle = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article?limit=${limitParams}&page=${pageParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      ErrorHandling(res);

      const data = await res.json();
      setArticles(data.data);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
    }
  };

  console.log(articles);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-5 dark:bg-black">
      {!articles
        ? ""
        : articles.map((item, index) => (
            <div
              key={index}
              className="border m-5 border-slate-700 py-2 px-4 hover:opacity-80 cursor-pointer rounded"
            >
              <Link href={`/article/${item.slug}`}>
                <p className="font-bold text-xl">{item.title}</p>
                <p className="text-sm text-slate-300">
                  {new Date(item.updated_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <div className="aspect-video my-2 overflow-hidden rounded">
                  <img
                    alt={item?.slug ?? ""}
                    className="w-full h-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${item?.image_url ?? ""}`}
                  />
                </div>
                <p className="line-clamp-3">{item.description}</p>
              </Link>
            </div>
          ))}
    </div>
  );
}
