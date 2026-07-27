import type { Metadata } from "next";
import PelayananView from "@/components/pelayanan/PelayananView";

export const metadata: Metadata = {
  title: "Pelayanan Publik Desa Plumbangan - Surat & Administrasi",
  description:
    "Persyaratan dan prosedur pelayanan publik serta pengurusan administrasi surat-menyurat di Kantor Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar.",
  openGraph: {
    title: "Pelayanan Publik Desa Plumbangan - Surat & Administrasi",
    description:
      "Persyaratan dan prosedur pelayanan publik serta pengurusan administrasi surat-menyurat di Kantor Desa Plumbangan.",
    images: [{ url: "/logo-desa.png" }],
  },
};

export default function PelayananPage() {
  return <PelayananView />;
}
