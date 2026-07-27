"use client";

import { useState } from "react";
import { DATA_UMKM, UMKMItem } from "./umkmData";
import UMKMCardSection from "./UMKMCardSection";
import UMKMModal from "./UMKMModal";

type UMKMViewProps = {
  umkmList?: UMKMItem[];
};

export default function UMKMView({ umkmList }: UMKMViewProps) {
  const [selectedUMKM, setSelectedUMKM] = useState<UMKMItem | null>(null);
  const itemsToDisplay = umkmList && umkmList.length > 0 ? umkmList : DATA_UMKM;

  return (
    <div className="w-full bg-[#F8F9FA] text-slate-800">
      {/* Hero Header Section - Identical Layout & Background to Pelayanan */}
      <section
        className="flex min-h-[100dvh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 text-center text-white"
        style={{
          backgroundImage: "url('/backgrounddesa.webp')",
        }}
      >
        <h1 className="mb-4 bg-gradient-to-r from-[#2E4A2B] via-[#5A7A3D] to-[#A3C65D] bg-clip-text text-center text-5xl font-black leading-tight pb-2 text-transparent sm:text-6xl md:text-7xl">
          UMKM
          <br />
          Desa Plumbangan
        </h1>
      </section>

      {/* UMKM List Sections (Alternating Dark & Light themes) */}
      <section className="w-full">
        {itemsToDisplay && itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((item, index) => (
            <UMKMCardSection
              key={item.id || index}
              item={item}
              index={index}
              onSelect={(selected) => setSelectedUMKM(selected)}
            />
          ))
        ) : (
          <div className="py-20 text-center px-4">
            <p className="text-base sm:text-lg font-medium text-slate-500">
              Belum ada data UMKM yang ditambahkan.
            </p>
          </div>
        )}
      </section>

      {/* Bottom Batik Spacing Section above Footer */}
      <div
        className="w-full h-24 sm:h-36 bg-cover bg-center bg-no-repeat border-t border-slate-200"
        style={{
          backgroundImage: "url('/backgrounddesa.webp')",
        }}
      />

      {/* UMKM Popup Modal */}
      <UMKMModal
        item={selectedUMKM}
        onClose={() => setSelectedUMKM(null)}
      />
    </div>
  );
}
