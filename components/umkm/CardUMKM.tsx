import Image from "next/image";
import { getWaUrl } from "./umkmData";

type CardUMKMProps = {
  nama: string;
  kategori: string;
  deskripsi: string;
  kontak?: string;
  gambarUrl?: string;
};

export default function CardUMKM({
  nama,
  kategori,
  deskripsi,
  kontak,
  gambarUrl,
}: CardUMKMProps) {
  const waUrl = getWaUrl(kontak);

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100">
      <div className="relative h-48 w-full bg-[#CADBB7]">
        {gambarUrl ? (
          <Image
            src={gambarUrl}
            alt={nama}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#3F4E20]/50 font-medium">
            {nama}
          </div>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-[#3F4E20] px-3 py-1 text-xs font-semibold text-white shadow">
          {kategori}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800">{nama}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{deskripsi}</p>
        {kontak && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hubungi:</span>
            {waUrl ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-600 hover:underline"
              >
                {kontak}
              </a>
            ) : (
              <span className="font-semibold text-[#3F4E20]">{kontak}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
