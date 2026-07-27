import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import DataKependudukanSection from "@/components/tentang/DataKependudukanSection";
import MisiDesaSection from "@/components/tentang/MisiDesaSection";
import StrukturDesaSection, { Person } from "@/components/tentang/StrukturDesaSection";
import TentangDesaSection from "@/components/tentang/TentangDesaSection";
import VisiDesaSection from "@/components/tentang/VisiDesaSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Desa Plumbangan - Sejarah & Struktur Organisasi",
  description:
    "Sejarah Desa Plumbangan sejak era Kerajaan Kediri, profil kependudukan, visi misi, serta struktur organisasi Pemerintah Desa Plumbangan, Kec. Doko, Kab. Blitar.",
  openGraph: {
    title: "Tentang Desa Plumbangan - Sejarah & Struktur Organisasi",
    description:
      "Sejarah Desa Plumbangan sejak era Kerajaan Kediri, profil kependudukan, visi misi, serta struktur organisasi Pemerintah Desa Plumbangan.",
    images: [{ url: "/logo-desa.png" }],
  },
};

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Tentang() {
  const tentang = await reader.singletons.tentang.read();
  const struktur = await reader.singletons.struktur.read();

  // Parse struktur lists
  const kepalaDesa: Person | undefined = struktur?.kepala_desa?.nama
    ? {
        name: struktur.kepala_desa.nama,
        role: struktur.kepala_desa.role || "Kepala Desa",
        note: struktur.kepala_desa.note || undefined,
        photo: struktur.kepala_desa.foto || undefined,
      }
    : undefined;

  const sekretarisDesa: Person | undefined = struktur?.sekretaris_desa?.nama
    ? {
        name: struktur.sekretaris_desa.nama,
        role: struktur.sekretaris_desa.role || "Sekretaris Desa",
        photo: struktur.sekretaris_desa.foto || undefined,
      }
    : undefined;

  const kasiRow: Person[] = (struktur?.kasi_list || [])
    .map((item) => ({
      name: item.nama || "",
      role: item.role || "Kasi",
      photo: item.foto || undefined,
    }))
    .filter((item) => item.name);

  const kaurRow: Person[] = (struktur?.kaur_list || [])
    .map((item) => ({
      name: item.nama || "",
      role: item.role || "Kaur",
      photo: item.foto || undefined,
    }))
    .filter((item) => item.name);

  const kamituwoRow: Person[] = (struktur?.kamituwo_list || [])
    .map((item) => ({
      name: item.nama || "",
      role: item.role || "Kamituwo",
      photo: item.foto || undefined,
    }))
    .filter((item) => item.name);

  const karyawanRow: Person[] = (struktur?.karyawan_list || [])
    .map((item) => ({
      name: item.nama || "",
      role: item.role || "Karyawan Desa",
      photo: item.foto || undefined,
    }))
    .filter((item) => item.name);

  const detailKependudukan = (tentang?.detail_kependudukan || [])
    .filter((d): d is string => typeof d === "string" && Boolean(d));

  const deskripsiSejarah = tentang?.deskripsi_sejarah
    ? [tentang.deskripsi_sejarah]
    : undefined;

  const visiList = (tentang?.visi_list || [])
    .filter((v): v is string => typeof v === "string" && Boolean(v));

  const misiList = (tentang?.misi_list || [])
    .filter((m): m is string => typeof m === "string" && Boolean(m));

  return (
    <main>
      <TentangDesaSection
        villageName={tentang?.judul_tentang ?? undefined}
        heading={tentang?.heading_sejarah ?? undefined}
        paragraphs={deskripsiSejarah}
        imageSrc={tentang?.foto_sejarah ?? undefined}
      />
      <VisiDesaSection visiList={visiList.length > 0 ? visiList : undefined} />
      <MisiDesaSection misiList={misiList.length > 0 ? misiList : undefined} />
      <DataKependudukanSection
        icon={
          <Image
            src="/penduduk.webp"
            alt="Ikon jumlah penduduk"
            width={100}
            height={100}
          />
        }
        jumlahPenduduk={tentang?.jumlah_penduduk ?? undefined}
        dusunList={detailKependudukan.length > 0 ? detailKependudukan : undefined}
      />
      <StrukturDesaSection
        kepalaDesa={kepalaDesa}
        sekretarisDesa={sekretarisDesa}
        kasiRow={kasiRow.length > 0 ? kasiRow : undefined}
        kaurRow={kaurRow.length > 0 ? kaurRow : undefined}
        kamituwoRow={kamituwoRow.length > 0 ? kamituwoRow : undefined}
        karyawanRow={karyawanRow.length > 0 ? karyawanRow : undefined}
      />
    </main>
  );
}