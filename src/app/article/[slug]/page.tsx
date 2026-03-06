import { GetArticleSlug } from "@/lib/api/article";

export default async function ArticleSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await GetArticleSlug(slug);

  const cleanContent = (htmlContent: string) => {
    if (!htmlContent) return "";
    return htmlContent.replace(/&nbsp;/g, " ");
  };

  return (
    <div className="mx-5 flex flex-col min-h-screen">
      <main className="justify-center flex grow">
        <article className="max-w-3xl py-4 sm:px-6 sm:py-16">
          {/* Artikel title */}
          <header className="mb-4 text-center">
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
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: cleanContent(article?.content ?? ""),
            }}
          />
        </article>
      </main>
    </div>
  );
}
