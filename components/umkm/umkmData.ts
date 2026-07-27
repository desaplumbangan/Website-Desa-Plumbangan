export type UMKMItem = {
  id: string;
  nama: string;
  kategori: string;
  pemilik?: string;
  deskripsi: string;
  jamOperasional?: string;
  lokasi?: string;
  linkGmaps?: string;
  narahubung?: string;
  mediaSosial?: string;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  shopee?: string;
  tokopedia?: string;
  gambarUtama?: string;
  galeri?: string[];
};

export function sanitizePhoneNumber(phone?: string): string | null {
  if (!phone || !phone.trim()) return null;
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (!cleaned) return null;

  if (cleaned.startsWith("0")) {
    return `62${cleaned.slice(1)}`;
  } else if (cleaned.startsWith("62")) {
    return cleaned;
  } else {
    return `62${cleaned}`;
  }
}

export function getWaUrl(phone?: string): string | null {
  const sanitized = sanitizePhoneNumber(phone);
  return sanitized ? `https://wa.me/${sanitized}` : null;
}

export function getCleanSocialLabel(url?: string, defaultLabel?: string): string {
  if (!url || !url.trim()) return defaultLabel || "";
  try {
    const formattedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    const parsed = new URL(formattedUrl);
    const pathname = parsed.pathname.replace(/\/$/, "");
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      const lastPart = parts[parts.length - 1];
      if (lastPart && lastPart.length < 35 && !lastPart.includes(".")) {
        return lastPart.startsWith("@") ? lastPart : `@${lastPart}`;
      }
    }
  } catch {
    // fallback
  }
  return defaultLabel || "Kunjungi Link";
}

export const DATA_UMKM: UMKMItem[] = [
  {
    id: "umkm-1",
    nama: "UMKM 1",
    kategori: "Makanan",
    pemilik: "Ibu A",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id arcu aliquet, elementum nisi quis, varius nibh. Phasellus quis sodales sem. Ut convallis, lorem ut tincidunt sodales, eros leo sodales ex, nec accumsan nisl turpis sed sem. Vivamus sit amet tellus tincidunt, elementum elit non, porta magna. Curabitur vel leo id massa dictum efficitur. Mauris elementum, ante interdum varius interdum, sem odio volutpat magna, vel iaculis erat urna sit amet turpis.",
    jamOperasional: "Senin - Sabtu. Pukul 08.00 - 16.00 WIB",
    lokasi: "Jl. Raya Plumbangan No. 12, Plumbangan",
    linkGmaps: "https://maps.google.com",
    narahubung: "081234567890",
    instagram: "https://instagram.com/umkm1_plumbangan",
  },
  {
    id: "umkm-2",
    nama: "UMKM 2",
    kategori: "Kerajinan",
    pemilik: "Bapak B",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id arcu aliquet, elementum nisi quis, varius nibh. Phasellus quis sodales sem. Ut convallis, lorem ut tincidunt sodales, eros leo sodales ex, nec accumsan nisl turpis sed sem. Vivamus sit amet tellus tincidunt, elementum elit non, porta magna. Curabitur vel leo id massa dictum efficitur. Mauris elementum, ante interdum varius interdum, sem odio volutpat magna, vel iaculis erat urna sit amet turpis.",
    jamOperasional: "Senin - Minggu. Pukul 09.00 - 17.00 WIB",
    lokasi: "Dusun Plumbangan, Desa Plumbangan",
    narahubung: "085712345678",
    shopee: "https://shopee.co.id/umkm2_plumbangan",
  },
  {
    id: "umkm-3",
    nama: "UMKM 3",
    kategori: "Olahan Pertanian",
    pemilik: "Ibu C",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id arcu aliquet, elementum nisi quis, varius nibh. Phasellus quis sodales sem. Ut convallis, lorem ut tincidunt sodales, eros leo sodales ex, nec accumsan nisl turpis sed sem. Vivamus sit amet tellus tincidunt, elementum elit non, porta magna. Curabitur vel leo id massa dictum efficitur. Mauris elementum, ante interdum varius interdum, sem odio volutpat magna, vel iaculis erat urna sit amet turpis.",
    jamOperasional: "Setiap Hari. Pukul 07.00 - 15.00 WIB",
    lokasi: "Kecamatan Doko, Kabupaten Blitar",
    narahubung: "081398765432",
    tokopedia: "https://tokopedia.com/umkm3_official",
  },
];
