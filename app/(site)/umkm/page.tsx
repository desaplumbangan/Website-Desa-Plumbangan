import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import UMKMView from "@/components/umkm/UMKMView";
import { UMKMItem } from "@/components/umkm/umkmData";

export const metadata: Metadata = {
  title: "UMKM Desa Plumbangan - Produk & Usaha Lokal",
  description:
    "Jelajahi produk lokal unggulan dan potensi UMKM khas Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar. Dukung ekonomi lokal warga desa.",
  openGraph: {
    title: "UMKM Desa Plumbangan - Produk & Usaha Lokal",
    description:
      "Jelajahi produk lokal unggulan dan potensi UMKM khas Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar.",
    images: [{ url: "/logo-desa.png" }],
  },
};

const reader = createReader(process.cwd(), keystaticConfig);

export default async function UMKMPage() {
  let umkmList: UMKMItem[] = [];

  try {
    const rawUmkm = await reader.collections.umkm.all();
    umkmList = rawUmkm.map((entry) => {
      const item = entry.entry;
      const galeri: string[] = [];
      if (item.foto_galeri_1 && item.foto_galeri_1.trim() !== "") galeri.push(item.foto_galeri_1.trim());
      if (item.foto_galeri_2 && item.foto_galeri_2.trim() !== "") galeri.push(item.foto_galeri_2.trim());
      if (item.foto_galeri_3 && item.foto_galeri_3.trim() !== "") galeri.push(item.foto_galeri_3.trim());

      return {
        id: entry.slug,
        nama: item.nama,
        pemilik: item.pemilik || undefined,
        kategori: item.kategori || "UMKM",
        deskripsi: item.deskripsi,
        jamOperasional: item.jam_operasional || undefined,
        lokasi: item.lokasi || undefined,
        linkGmaps: item.link_gmaps || undefined,
        narahubung: item.kontak_wa || undefined,
        mediaSosial: undefined,
        facebook: item.link_facebook || undefined,
        tiktok: item.link_tiktok || undefined,
        instagram: item.link_instagram || undefined,
        shopee: item.link_shopee || undefined,
        tokopedia: item.link_tokopedia || undefined,
        gambarUtama: item.foto_utama && item.foto_utama.trim() !== "" ? item.foto_utama.trim() : undefined,
        galeri: galeri.length > 0 ? galeri : undefined,
      };
    });
  } catch {
    umkmList = [];
  }

  return <UMKMView umkmList={umkmList} />;
}
