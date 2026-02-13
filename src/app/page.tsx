import RootComponentMainSection from "./_components/mainSection";
import SharedNavbar from "@/components/shared/navbar";

export default function Root() {
  return (
    <div className="mx-5 dark:bg-black">
      <SharedNavbar />
      <RootComponentMainSection />
    </div>
  );
}
