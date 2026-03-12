"use client";
import { ErrorHandling } from "@/helpers/errorHandling";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Article } from "@/types/article";

export default function RootComponentMainSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParams = Number(searchParams.get("page")) || 1;
  const limitParams = Number(searchParams.get("limit")) || 8;

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getArticle();
    };
    fetchData();
  }, [pageParams]);

  const getArticle = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles?limit=${limitParams}&page=${pageParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      ErrorHandling(res);
      const data = await res.json();
      setArticles(data.data.articles);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  console.log(articles);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-5 dark:bg-black">
        {!articles
          ? ""
          : articles.map((item, index) => (
              <div
                key={index}
                className="border m-5 border-slate-700 py-2 px-4 hover:opacity-80 cursor-pointer rounded"
              >
                <Link href={`/article/${item.slug}`}>
                  <div className="aspect-video my-2 overflow-hidden rounded">
                    <img
                      alt={item?.slug ?? ""}
                      className="w-full h-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${item?.image_url ?? ""}`}
                    />
                  </div>

                  <p className="font-bold text-xl">{item.title}</p>
                  <p className="text-sm text-slate-400">
                    {new Date(item.updated_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="line-clamp-3">{item.description}</p>
                </Link>
              </div>
            ))}
      </div>

      <div className="flex justify-center items-center gap-4 my-10">
        <button
          onClick={() => handlePageChange(pageParams - 1)}
          disabled={pageParams <= 1}
          className="border border-slate-700 px-6 py-2 rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>

        <span className="text-slate-400 font-mono">{pageParams}</span>

        <button
          onClick={() => handlePageChange(pageParams + 1)}
          disabled={articles.length < limitParams}
          className="border border-slate-700 px-6 py-2 rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    </>
  );
}
