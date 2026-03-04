import SharedFooter from "@/components/shared/footer";

export default function Loading() {
  return (
    <div className="mx-5 flex flex-col min-h-screen">
      <main className="justify-center flex grow">
        <article className="max-w-3xl py-12 sm:px-6 sm:py-16 w-full animate-pulse">
          <header className="mb-10 text-center">
            <div className="h-10 sm:h-12 md:h-14 bg-slate-800 rounded w-3/4 mx-auto mb-6" />
          </header>

          <div className="w-full h-64 sm:h-80 bg-slate-800 rounded mb-4" />
          <div className="h-4 bg-slate-800 rounded w-40 mb-8" />

          <div className="space-y-4">
            <div className="h-4 bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-800 rounded w-5/6" />
            <div className="h-4 bg-slate-800 rounded w-4/6" />
            <div className="h-4 bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-5/6" />
          </div>
        </article>
      </main>
      <SharedFooter />
    </div>
  );
}
