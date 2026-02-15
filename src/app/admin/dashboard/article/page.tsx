"use client";
import { ErrorHandling } from "@/helpers/errorHandling";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoIosResize } from "react-icons/io";

interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
}

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
      <div className="flex justify-center mt-5">
        <span className="text-xl">Article Dashboard</span>
      </div>

      <Link href={"/admin/dashboard/article/addarticle"}>
        <div className="flex mt-5 ml-10">
          <div className="flex items-center gap-2 border rounded-3xl py-2 px-4 border-slate-600 hover:bg-gray-800 transition duration-75 cursor-pointer">
            <AiOutlineFileAdd className="text-xl" />
            <span>Tambah article</span>
          </div>
        </div>
      </Link>

      <div>
        {!articles
          ? ""
          : articles.map((article, i) => (
              <div key={i} className="mx-10">
                <div className="border my-5 p-4 rounded-3xl border-slate-600">
                  <div className="flex items-center justify-between">
                    <span>{article.title}</span>
                    <div>
                      <Link href={`/article/${article.slug}`}>
                        <IoIosResize />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}
