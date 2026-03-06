import SharedFooter from "@/components/shared/footer";
import SharedNavbar from "@/components/shared/navbar";

export default function ArticleSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SharedNavbar />
      {children}
      <SharedFooter />
    </>
  );
}
