import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MobileBottomNav from "@/components/ui/MobileBottomNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
