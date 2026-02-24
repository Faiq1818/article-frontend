import SharedNavbar from "@/components/shared/navbar";
import SharedFooter from "@/components/shared/footer";
import RootComponentMainSection from "./_components/mainSection";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen mx-5 dark:bg-black">
      <SharedNavbar />
      <main className="grow">
        <RootComponentMainSection />
      </main>
      <SharedFooter />
    </div>
  );
}
