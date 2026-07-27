"use client";

import { useState } from "react";
import Image from "next/image";

interface GaleriGridProps {
  highlightImage?: string;
  extraImages?: string[];
}

const DEFAULT_EXTRA: string[] = [
  "/images/galeri/IMG_6544.webp",
  "/images/galeri/IMG_6545.webp",
  "/images/galeri/IMG_6555.webp",
  "/images/galeri/IMG_6435.webp",
  "/images/galeri/IMG_6563.webp",
  "/images/galeri/IMG_6506.webp",
];

export default function GaleriGrid({
  highlightImage = "/images/galeri/IMG_6534.webp",
  extraImages,
}: GaleriGridProps) {
  const [highlightError, setHighlightError] = useState(false);
  const galleryList = extraImages && extraImages.length > 0 ? extraImages : DEFAULT_EXTRA;

  return (
    <section className="w-full py-6 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col gap-6">
      {/* Gambar Highlight Besar */}
      <div className="w-full h-[240px] sm:h-[420px] md:h-[550px] relative rounded-[28px] md:rounded-[35px] bg-[#3d4e2a] overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1">
        {!highlightError && highlightImage ? (
          <Image
            src={highlightImage}
            alt="Galeri Highlight"
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
            onError={() => setHighlightError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/40 font-semibold text-sm">
            Foto Galeri Plumbangan
          </div>
        )}
      </div>

      {/* Flex Wrap / Grid Card Tambahan */}
      {galleryList && galleryList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {galleryList.map((src, idx) => (
            <GaleriCard key={idx} src={src} index={idx + 1} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500 text-sm font-medium">
          Belum ada foto galeri tambahan yang ditambahkan.
        </div>
      )}
    </section>
  );
}

function GaleriCard({ src, index }: { src: string; index: number }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.833rem)] max-w-sm h-36 sm:h-48 md:h-72 relative rounded-2xl md:rounded-xl bg-[#3d4e2a] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1">
      {!hasError && src ? (
        <Image
          src={src}
          alt={`Galeri ${index}`}
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-white/30 text-xs">
          Foto Galeri {index}
        </div>
      )}
    </div>
  );
}