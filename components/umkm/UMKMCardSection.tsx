"use client";

import Image from "next/image";
import { UMKMItem } from "./umkmData";

type UMKMCardSectionProps = {
  item: UMKMItem;
  index: number;
  onSelect: (item: UMKMItem) => void;
};

export default function UMKMCardSection({
  item,
  index,
  onSelect,
}: UMKMCardSectionProps) {
  // Odd sections (0, 2, 4...) have dark green background
  // Even sections (1, 3, 5...) have pure batik /backgrounddesa.webp background
  const isDark = index % 2 === 0;
  const displayImage = item.gambarUtama || item.galeri?.[0];

  return (
    <div
      className={`relative w-full py-12 sm:py-16 transition-colors duration-300 bg-cover bg-center bg-no-repeat ${
        isDark ? "bg-[#3F4E20] text-white" : "bg-white text-[#3F4E20]"
      }`}
      style={{
        backgroundImage: !isDark ? "url('/backgrounddesa.webp')" : undefined,
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8">
        <div
          className={`flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
            !isDark ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Text Content Column */}
          <div
            className={`space-y-4 sm:space-y-6 ${
              !isDark ? "lg:col-start-2" : ""
            }`}
          >
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              {item.nama}
            </h3>

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? "text-white/90" : "text-[#3F4E20]/90 font-medium"
              }`}
            >
              {item.deskripsi}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onSelect(item)}
                className={`inline-block rounded-xl px-6 py-3 text-sm sm:text-base font-bold shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-white text-[#3F4E20] hover:bg-slate-100 focus:ring-white/50"
                    : "bg-[#3F4E20] text-white hover:bg-[#2E3B18] focus:ring-[#3F4E20]/50"
                }`}
              >
                Lihat Selengkapnya
              </button>
            </div>
          </div>

          {/* Single Image Column */}
          <div
            className={`w-full flex justify-center ${
              !isDark ? "lg:col-start-1" : ""
            }`}
          >
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <div
                className={`relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border ${
                  isDark
                    ? "bg-[#2E3B18] border-white/20"
                    : "bg-slate-100 border-[#3F4E20]/20"
                }`}
              >
                {displayImage ? (
                  <Image
                    src={displayImage}
                    alt={item.nama}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center font-semibold text-xs sm:text-sm ${
                      isDark ? "text-white/40" : "text-[#3F4E20]/40"
                    }`}
                  >
                    Foto UMKM
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
