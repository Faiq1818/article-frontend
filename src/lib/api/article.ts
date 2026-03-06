import { ErrorHandling } from "@/helpers/errorHandling";
import type { Article } from "@/types/article";

export async function GetArticleSlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      },
    );

    ErrorHandling(res);

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function GetAdminArticleSlug(
  slug: string,
): Promise<Article | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/article/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      },
    );

    ErrorHandling(res);

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
