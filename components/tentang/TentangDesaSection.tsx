import React from "react";

type TentangDesaSectionProps = {
  villageName?: string;
  imageSrc?: string;
  backgroundImage?: string;
  heading?: string;
  paragraphs?: string[];
};

const defaultParagraphs = [
  "Desa Plumbangan sudah ada pada masa Pemerintahan Kerajaan Kediri di bawah Raja Jaya Baya, yang terus berlangsung hingga Pemerintahan Majapahit, hingga masa keruntuhannya. Berdasarkan data yang kami dapat bahwa Pemerintah Desa Plumbangan yang pertama baru dimulai Tahun 1895 Masehi. ",
];

export default function TentangDesaSection({
  villageName = "Plumbangan",
  imageSrc = '/images/tentang/downviewcandi.webp',
  backgroundImage,
  heading = "Sejarah Desa",
  paragraphs = defaultParagraphs,
}: TentangDesaSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-stone-50 pb-16 pt-20 md:pt-28"
      style={{
        backgroundImage: "url('/backgrounddesa.webp')",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Title — mobile only, left-aligned, sits above everything */}
        <h1 className="mb-8 bg-gradient-to-r from-[#2E4A2B] via-[#5A7A3D] to-[#A3C65D] pb-2 bg-clip-text text-left text-4xl font-black text-transparent sm:text-5xl md:hidden">
          <span>Tentang</span>
          <br />
          <span>Desa {villageName}</span>
        </h1>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-16 md:items-center">
          {/* Image / placeholder panel */}
          <div className="flex justify-start md:justify-start">
            <div className="aspect-[4/5] w-[45%] max-w-[180px] overflow-hidden rounded-[2rem] bg-[#485935] shadow-sm md:w-full md:max-w-sm">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={`Desa ${villageName}`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Text content */}
          <div className="text-right">
            {/* Title — desktop only, inside text column as original */}
            <h1 className="mb-4 hidden bg-gradient-to-r from-[#2E4A2B] via-[#5A7A3D] to-[#A3C65D] pb-2 bg-clip-text text-5xl font-black text-transparent md:block">
              <span>Tentang</span>
              <br />
              <span>Desa {villageName}</span>
            </h1>

            <h2 className="mb-4 bg-gradient-to-r from-[#2E4A2B] via-[#5A7A3D] to-[#A3C65D] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              {heading}
            </h2>

            <div className="mt-3 space-y-3">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-4 bg-gradient-to-r from-[#2E4A2B] to-[#5A7A3D] bg-clip-text text-xs font-normal text-transparent sm:text-base"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}