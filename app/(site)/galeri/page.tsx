import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import Image from "next/image";
import HeroGaleri from "@/components/galeri/HeroGaleri";
import AsetDesa from "@/components/galeri/AsetDesa";
import KegiatanDesa, { KegiatanItem } from "@/components/galeri/KegiatanDesa";
import GaleriGrid from "@/components/galeri/GaleriGrid";
import MobileBottomNav from "@/components/ui/MobileBottomNav"; 

export const metadata: Metadata = {
  title: "Galeri Desa Plumbangan - Aset, Kegiatan & Pesona Desa",
  description:
    "Dokumentasi foto aset desa, kegiatan masyarakat, dan keindahan alam Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar.",
  openGraph: {
    title: "Galeri Desa Plumbangan - Aset, Kegiatan & Pesona Desa",
    description:
      "Dokumentasi foto aset desa, kegiatan masyarakat, dan keindahan alam Desa Plumbangan.",
    images: [{ url: "/downviewcandi.webp" }, { url: "/logo-desa.png" }],
  },
};

const reader = createReader(process.cwd(), keystaticConfig);

export default async function GaleriPage() {
  const galeri = await reader.singletons.galeri.read();

  const asetDesaList = (galeri?.aset_desa || [])
    .map((item) => ({
      nama: item.nama || undefined,
      foto: item.foto || "",
    }))
    .filter((item) => item.foto);

  const kegiatanDesaList: KegiatanItem[] = (galeri?.kegiatan_desa || [])
    .map((item) => ({
      deskripsi: item.deskripsi || "",
      foto: item.foto || "",
    }))
    .filter((item) => item.foto);

  const extraImagesList = (galeri?.galeri_grid || [])
    .map((item) => item.foto)
    .filter(Boolean) as string[];

  return (
    <main className="relative min-h-dvh w-full bg-white overflow-x-hidden">
      {/* Pattern Background Desa */}
      <div className="fixed inset-0 pointer-events-none opacity-80 z-0">
        <Image
          src="/backgrounddesa.webp"
          alt="Background Pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Layout Flow */}
      <div className="relative z-10 space-y-4 md:space-y-8 pb-24 md:pb-16">
        <HeroGaleri bannerImage={galeri?.hero_image ?? undefined} />
        <AsetDesa items={asetDesaList.length > 0 ? asetDesaList : undefined} />
        <KegiatanDesa items={kegiatanDesaList.length > 0 ? kegiatanDesaList : undefined} />
        <GaleriGrid
          highlightImage={galeri?.foto_highlight ?? undefined}
          extraImages={extraImagesList.length > 0 ? extraImagesList : undefined}
        />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </main>
  );
}