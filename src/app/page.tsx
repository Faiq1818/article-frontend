import { CiSearch } from "react-icons/ci";
import RootComponentMainSection from "./_components/mainSection";

export default function Root() {
  return (
    <div className="mx-5 dark:bg-black">
      <div>
        <div className="flex border-b py-2 border-slate-600 flex-col items-center">
          <p className="text-2xl">Personal Article</p>
          <p className="text-sm">by - Faiq Ghozy Erlangga</p>
        </div>
        <div className="flex border-b py-2 border-slate-600 justify-center gap-10 font-bold">
          <div className="flex items-center gap-1 cursor-pointer">
            <p>/</p>
            <p>Home</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <CiSearch />
            <p>Search</p>
          </div>
        </div>
      </div>

      <RootComponentMainSection />
    </div>
  );
}
