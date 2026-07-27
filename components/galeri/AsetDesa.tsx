"use client";

import Image from "next/image";

interface AsetItem {
  nama?: string;
  foto: string;
}

interface AsetDesaProps {
  items?: AsetItem[];
}

const DEFAULT_ASSETS: AsetItem[] = [
  { nama: "Aset Desa Utama", foto: "/images/galeri/IMG_6534.webp" },
  { nama: "Candi Plumbangan", foto: "/images/galeri/candi-plumbangan06.webp" },
];

export default function AsetDesa({ items }: AsetDesaProps) {
  const assetList = items && items.length > 0 ? items : DEFAULT_ASSETS;

  return (
    <section className="w-full py-6 flex flex-col items-center px-4 sm:px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-[#3a5323] mb-6 text-center drop-shadow-sm">
        Aset Desa
      </h2>

      {assetList && assetList.length > 0 ? (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {assetList.map((item, idx) => (
            <div
              key={idx}
              className="w-full h-[280px] sm:h-[450px] md:h-[550px] relative rounded-[28px] md:rounded-[35px] bg-[#3d4e2a] overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <Image
                src={item.foto}
                alt={item.nama || `Aset Desa ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500 text-sm font-medium">
          Belum ada data aset desa yang ditambahkan.
        </div>
      )}
    </section>
  );
}