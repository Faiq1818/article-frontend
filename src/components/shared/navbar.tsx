import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function SharedNavbar() {
  return (
    <header className="mx-5">
      <div className="flex border-b py-2 border-slate-600 flex-col items-center">
        <h1 className="text-2xl">Personal Article</h1>
        <p className="text-sm">by - Faiq Ghozy Erlangga</p>
      </div>
      <nav className="flex border-b py-2 border-slate-600 justify-center gap-10 font-bold">
        <Link href={`/`}>
          <div className="flex items-center gap-1">
            <span>/</span>
            <span>Home</span>
          </div>
        </Link>
        <Link href={`/Search`}>
          <div className="flex items-center gap-1">
            <CiSearch />
            <span>Search</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}
