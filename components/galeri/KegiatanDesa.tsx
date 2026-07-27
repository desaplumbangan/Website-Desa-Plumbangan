"use client";

import { useState } from "react";
import Image from "next/image";

export interface KegiatanItem {
  id?: number | string;
  deskripsi: string;
  foto: string;
}

interface KegiatanDesaProps {
  items?: KegiatanItem[];
}

const DEFAULT_KEGIATAN: KegiatanItem[] = [
  {
    id: 1,
    deskripsi: "Methik Pari merupakan sebuah ritual adat yang digelar menjelang masa panen raya sebagai wujud rasa syukur para petani",
    foto: "/images/galeri/Methik Pagak 2.webp",
  },
  {
    id: 2,
    deskripsi: "Sebagian besar penduduk desa menggantungkan hidup pada sektor pertanian, tekun mengolah ladang dengan menanam tanaman padi serta palawija seperti jagung.",
    foto: "/images/galeri/DSC02680.webp",
  },
  {
    id: 3,
    deskripsi: "Piodalan (atau Odalan) adalah upacara peringatan hari ulang tahun atau pendirian sebuah tempat suci atau pura.",
    foto: "/images/galeri/Piodalan Hindu 2.webp",
  },
  {
    id: 4,
    deskripsi: "Peninjauan dan pendataan benda cagar budaya berupa batu bata kuno di area hutan Gondang, Pagak oleh aparatur desa bersama warga setempat.",
    foto: "/images/galeri/Gondang Pagak.webp",
  },
  {
    id: 5,
    deskripsi: "Baritan Suro adalah tradisi masyarakat Jawa yang digelar setiap malam atau menyambut 1 Muharram (1 Suro). Bertujuan sebagai penolak bala dan ungkapan syukur atas rezeki.",
    foto: "/images/galeri/baritan suro.webp",
  },
  {
    id: 6,
    deskripsi: "Peternak warga Desa Plumbangan mendampingi kerbau miliknya yang sedang mandi dan berendam santai di saluran air pinggir jalan desa.",
    foto: "/images/galeri/kebo.webp",
  },
];

export default function KegiatanDesa({ items }: KegiatanDesaProps) {
  const list = items && items.length > 0 ? items : DEFAULT_KEGIATAN;

  return (
    <section className="w-full py-8 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-[#3a5323] mb-8 text-center">
        Kegiatan Desa
      </h2>

      {list && list.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {list.map((item, idx) => (
            <KegiatanCard key={item.id ?? idx} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500 text-sm font-medium">
          Belum ada kegiatan desa yang ditambahkan.
        </div>
      )}
    </section>
  );
}

function KegiatanCard({ item }: { item: KegiatanItem }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] max-w-sm flex flex-col bg-[#3d4e2a] rounded-2xl md:rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2">
      {/* Header Gambar Card */}
      <div className="relative w-full h-28 sm:h-36 md:h-44 bg-[#8fb3de]">
        {!hasError && item.foto ? (
          <Image
            src={item.foto}
            alt="Foto Kegiatan"
            fill
            sizes="(max-width: 768px) 50vw, 350px"
            className="object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#3F4E20] text-white/40 text-xs p-2 text-center">
            Foto Kegiatan Desa
          </div>
        )}
      </div>

      {/* Body Deskripsi Card */}
      <div className="p-2 sm:p-4 text-white text-[9px] sm:text-xs leading-tight sm:leading-relaxed text-center flex-1 flex items-center justify-center">
        <p>{item.deskripsi}</p>
      </div>
    </div>
  );
}