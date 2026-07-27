type MisiDesaSectionProps = {
  misiList?: string[];
};

const defaultMisiItems = [
  "Peningkatan sarana dan prasarana pendidikan keagamaan (tempat ibadah) yang ada di Desa Plumbangan.",
  "Memajukan dan menggali kesenian adat.",
  "Pelayanan kepada masyarakat harus ditingkatkan sesuai tugas dan fungsinya masing-masing perangkat desa.",
  "Pelayanan dasar gratis / tidak di pungut biaya.",
  "Menuntaskan sertifikat tanah warga.",
  "Pembangunan, pengembangan, dan pemeliharaan infrastruktur pertanian yang sesuai kewenangan desa.",
  "Dana Desa dipergunakan untuk membiayai/ mendaya gunakan potensi dan sumberdaya Desa sehingga desa bisa menghidupi pelayanan dasarnya sendiri.",
  "Mengutamakan hak asal usul dan kewenangan lokal skala desa.",
  "Peningkatan kualitas dan akses terhadap pelayanan sosial dasar.",
  "Pengupayaan peningkatan jaringan Internet untuk warga desa.",
  "Membuat rasa tentram warga yang kondusif sehingga warga merasa aman dan nyaman dalam bermasyarakat.",
  "Pengadaan, pembangunan, pengembangan, dan pemeliharaan transportasi."
];

export default function MisiDesaSection({ misiList }: MisiDesaSectionProps) {
  const items = misiList && misiList.length > 0 ? misiList : defaultMisiItems;

  return (
    <section
      className="px-6 py-16 sm:px-12"
      style={{
        backgroundImage: "url('/backgrounddesa.webp')",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#485935] sm:text-3xl">
          Misi Desa
        </h2>

        <ul className="space-y-4">
          {items.map((text, index) => (
            <li
              key={index}
              className="rounded-full bg-[#485935] px-6 py-4 text-sm font-medium text-white shadow-sm sm:px-8 sm:text-base"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
