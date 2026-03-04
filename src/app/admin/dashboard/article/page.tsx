"use client";
import { ErrorHandling } from "@/helpers/errorHandling";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoIosResize } from "react-icons/io";
import { CiEdit, CiTrash } from "react-icons/ci";
import type { Article } from "@/types/article";

export default function Article() {
  // get params from url
  const searchParams = useSearchParams();
  const pageParams = Number(searchParams.get("page")) || 1;
  const limitParams = Number(searchParams.get("limit")) || 5;

  const [articles, setArticle] = useState<Article[]>([]);

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
      setArticle(data.data);
    } catch (err) {
      console.log("Ini error: ", err);
    }
  };

  return (
    <>
      <header className="flex justify-center mt-5">
        <h1 className="text-xl">Article Dashboard</h1>
      </header>

      <nav className="mt-5 ml-10">
        <Link href="/admin/dashboard/article/addarticle">
          <span className="inline-flex items-center gap-2 border rounded py-2 px-4 border-slate-600 hover:bg-gray-800 transition duration-75 cursor-pointer">
            <AiOutlineFileAdd className="text-xl" />
            Tambah article
          </span>
        </Link>
      </nav>

      <main>
        {articles && articles.length > 0 && (
          <section className="mx-10 mt-5">
            <ul className="space-y-5">
              {articles.map((article, i) => (
                <li key={i}>
                  <div className="flex items-center justify-between border p-4 rounded border-slate-600">
                    <div>
                      <h2 className="font-medium">{article.title}</h2>
                      <p className="text-sm text-slate-300">
                        {new Date(article.updated_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Link href={`/article/${article.slug}`}>
                        <IoIosResize />
                      </Link>
                      <Link
                        href={`/admin/dashboard/article/editarticle/${article.slug}`}
                      >
                        <CiEdit />
                      </Link>
                      <Link href={`/article/${article.slug}`}>
                        <CiTrash />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
