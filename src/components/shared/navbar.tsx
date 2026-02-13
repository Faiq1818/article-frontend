import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function SharedNavbar() {
  return (
    <div>
      <div className="flex border-b py-2 border-slate-600 flex-col items-center">
        <p className="text-2xl">Personal Article</p>
        <p className="text-sm">by - Faiq Ghozy Erlangga</p>
      </div>
      <div className="flex border-b py-2 border-slate-600 justify-center gap-10 font-bold">
        <Link href={`/`}>
          <div className="flex items-center gap-1 cursor-pointer">
            <p>/</p>
            <p>Home</p>
          </div>
        </Link>
        <Link href={`/Search`}>
          <div className="flex items-center gap-1 cursor-pointer">
            <CiSearch />
            <p>Search</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
