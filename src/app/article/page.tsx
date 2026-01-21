import Link from "next/link";

export default function Article() {
  return (
    <>
      <div className="flex justify-center mt-5 border-b border-slate-600">
        <span className="text-xl">Article</span>
      </div>

      <Link href={"/article/addarticle"}>
        <div className="flex mt-10 ml-10">
          <span className="border rounded-3xl py-2 px-4 border-slate-600 hover:bg-gray-800 transition duration-75 cursor-pointer">Tambah article</span>
        </div>
      </Link>
    </>
  )
}
