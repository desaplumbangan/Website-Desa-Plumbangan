type VisiDesaSectionProps = {
  visiList?: string[];
};

const defaultVisiItems = [
  "MEWUJUDKAN DESA PLUMBANGAN YANG SEJAHTERA, RELIGIUS, DAMAI, BERBUDAYA, MANDIRI DAN MAMPU BERDAYA SAING",
];

export default function VisiDesaSection({ visiList }: VisiDesaSectionProps) {
  const items = visiList && visiList.length > 0 ? visiList : defaultVisiItems;

  return (
    <section className="bg-[#485935] px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
          Visi Desa
        </h2>

        <ul className="space-y-4 text-center">
          {items.map((text, index) => (
            <li
              key={index}
              className="rounded-full bg-white px-6 py-4 text-sm font-medium text-[#3F4E20] shadow-sm sm:px-8 sm:text-base"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
