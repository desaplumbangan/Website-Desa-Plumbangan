"use client";

import React from "react";

export type Person = {
  name: string;
  role: string;
  note?: string;
  photo?: string;
  accent?: "default" | "highlight";
};

const initials = (name: string) => {
  if (!name) return "?";
  const clean = name
    .replace(/,.*$/, "")
    .replace(/\b(S\.P[dD]|S\.E|S\.Ak|S\.Sos|M\.P[dD]|Drs)\b\.?/gi, "")
    .trim();
  const parts = clean.split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

function Avatar({ person }: { person: Person }) {
  const [imgError, setImgError] = React.useState(false);
  const ring =
    person.accent === "highlight" ? "ring-red-600" : "ring-[#485935]";

  return (
    <div
      className={`relative z-10 h-14 w-14 shrink-0 rounded-full ring-4 ${ring} bg-[#3F4E20] overflow-hidden flex items-center justify-center shadow-md`}
    >
      {person.photo && !imgError ? (
        <img
          src={person.photo}
          alt={person.name}
          className="h-full w-full object-cover aspect-square"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-base font-extrabold text-white tracking-wider">
          {initials(person.name)}
        </span>
      )}
    </div>
  );
}

function Card({ person }: { person: Person }) {
  return (
    <div className="flex items-center gap-0 w-[200px]">
      <Avatar person={person} />
      <div className="-ml-6 flex-1 rounded-md bg-[#e7dfc9] pl-8 pr-3 py-1.5 shadow-sm">
        <div className="rounded bg-[#485935] px-2 py-1 text-[11px] font-bold leading-tight text-white -mt-1.5 -ml-3 mr-[-9px] w-[calc(100%+9px)]">
          {person.role}
        </div>
        <div className="mt-1 text-[11px] leading-snug text-stone-800 font-medium">
          {person.name}
          {person.note && (
            <div className="text-[10px] text-stone-600 font-normal">{person.note}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Node({
  x,
  y,
  person,
}: {
  x: number;
  y: number;
  person: Person;
}) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <Card person={person} />
    </div>
  );
}

const LINE = "#4a5a3a";

function HLine({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: Math.min(x1, x2),
        top: y,
        width: Math.abs(x2 - x1),
        height: 2,
        background: LINE,
      }}
    />
  );
}

function VLine({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: Math.min(y1, y2),
        width: 2,
        height: Math.abs(y2 - y1),
        background: LINE,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Default Fallback Data
// ---------------------------------------------------------------------------

const DEFAULT_KEPALA_DESA: Person = {
  name: "Yoyok Eko Iswahyudi, S.E.",
  role: "Kepala Desa",
  note: "Penata Tingkat I - NIP.",
  photo: '/images/struktur/yoyok.webp'
};

const DEFAULT_SEKRETARIS_DESA: Person = {
  name: "Nuryani",
  role: "Sekretaris Desa",
  photo: '/images/struktur/nuryani.webp'
};

const DEFAULT_KASI_ROW: Person[] = [
  { name: "Irwan Wahyu Saputro", role: "Kasi Pelayanan", photo: '/images/struktur/rwan.webp' },
  { name: "Didin Mulantika, S.Sos.", role: "Kasi Pemerintahan", photo: '/images/struktur/didin.webp'},
  { name: "Nur Hadi Asy'ari, S.Pd.I.", role: "Kasi Kesejahteraan", photo: '/images/struktur/nurhadi.webp'},
];

const DEFAULT_KAUR_ROW: Person[] = [
  { name: "Elisa Wahyuniati", role: "Kaur TU & Umum" , photo: '/images/struktur/elisa.webp'},
  { name: "Heru Irawan", role: "Kaur Keuangan", photo : '/images/struktur/heru.webp' },
  { name: "Septiana Heru Santi, S.Ak", role: "Kaur Perencanaan", photo: '/images/struktur/septiana.webp' },
];

const DEFAULT_KAMITUWO_ROW: Person[] = [
  { name: "Irwan Wahyu Saputro", role: "Kamituwo Plumbangan", photo: '/images/struktur/irwan.webp'},
  { name: "Agus Riadi", role: "Kamituwo Barek" },
  { name: "Suryadi", role: "Kamituwo Precet", photo: '/images/struktur/suryadi.webp' },
  { name: "Bambang Prasetyo", role: "Kamituwo Pagak" },
];

const DEFAULT_KARYAWAN_ROW: Person[] = [
  { name: "Hernindya Annisa Rahayu, S.Pd", role: "Karyawan Desa", photo: '/images/struktur/hernindya.webp' },
  { name: "Dwi Agus Ningtyas", role: "Karyawan Desa" },
];

const CARD_W = 200;
const CARD_H = 58;

const kepalaPos = { x: 470, y: 20 };
const sekretarisPos = { x: 760, y: 115 };

const kasiX = [10, 220, 430];
const kaurX = [640, 850, 1060];
const rowKasiKaurY = 215;

const kamX = [220, 430, 640, 850];
const kamY = 330;

const karyawanX = [430, 640];
const karyawanY = 445;

const center = (x: number) => x + CARD_W / 2;

const CANVAS_W = 1300;
const CANVAS_H = 540;

type StrukturDesaSectionProps = {
  kepalaDesa?: Person;
  sekretarisDesa?: Person;
  kasiRow?: Person[];
  kaurRow?: Person[];
  kamituwoRow?: Person[];
  karyawanRow?: Person[];
};

export default function StrukturDesaSection({
  kepalaDesa = DEFAULT_KEPALA_DESA,
  sekretarisDesa = DEFAULT_SEKRETARIS_DESA,
  kasiRow = DEFAULT_KASI_ROW,
  kaurRow = DEFAULT_KAUR_ROW,
  kamituwoRow = DEFAULT_KAMITUWO_ROW,
  karyawanRow = DEFAULT_KARYAWAN_ROW,
}: StrukturDesaSectionProps) {
  const kepalaC = center(kepalaPos.x); // 570
  const kepalaBottom = kepalaPos.y + CARD_H; // 78
  const sekretarisC = center(sekretarisPos.x); // 860

  const branchY = 95;
  const kasiJoinY = rowKasiKaurY - 10;
  const kamJoinY = kamY - 10;
  const karyawanJoinY = karyawanY - 10;

  return (
    <section className="w-full py-10"
    style={{
        backgroundImage: "url('/backgrounddesa.webp')",
      }}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-[#485935] mb-8">
          Susunan Organisasi dan
          <br />
          Tata Kerja Pemerintah
        </h2>

        <div className="overflow-x-auto">
          <div
            className="relative mx-auto"
            style={{ width: CANVAS_W, height: CANVAS_H, minWidth: CANVAS_W }}
          >
            {/* ---- connector lines ---- */}
            <VLine x={kepalaC} y1={kepalaBottom} y2={branchY} />
            <HLine x1={kepalaC} x2={sekretarisC} y={branchY} />
            <VLine x={sekretarisC} y1={branchY} y2={sekretarisPos.y} />

            <VLine x={kepalaC} y1={kepalaBottom} y2={kasiJoinY} />
            <HLine x1={kasiX.map(center)[0]} x2={kasiX.map(center)[2]} y={kasiJoinY} />
            {kasiX.map((x) => (
              <VLine key={`kasi-${x}`} x={center(x)} y1={kasiJoinY} y2={rowKasiKaurY} />
            ))}

            <VLine x={sekretarisC} y1={sekretarisPos.y + CARD_H} y2={kasiJoinY} />
            <HLine x1={kaurX.map(center)[0]} x2={kaurX.map(center)[2]} y={kasiJoinY} />
            {kaurX.map((x) => (
              <VLine key={`kaur-${x}`} x={center(x)} y1={kasiJoinY} y2={rowKasiKaurY} />
            ))}

            <VLine x={kepalaC} y1={kasiJoinY} y2={kamJoinY} />
            <HLine x1={kamX.map(center)[0]} x2={kamX.map(center)[kamX.length - 1]} y={kamJoinY} />
            {kamX.map((x) => (
              <VLine key={`kam-${x}`} x={center(x)} y1={kamJoinY} y2={kamY} />
            ))}

            <VLine x={kepalaC} y1={kamJoinY} y2={karyawanJoinY} />
            <HLine
              x1={karyawanX.map(center)[0]}
              x2={karyawanX.map(center)[1]}
              y={karyawanJoinY}
            />
            {karyawanX.map((x) => (
              <VLine key={`kar-${x}`} x={center(x)} y1={karyawanJoinY} y2={karyawanY} />
            ))}

            {/* ---- nodes ---- */}
            <Node x={kepalaPos.x} y={kepalaPos.y} person={kepalaDesa} />
            <Node x={sekretarisPos.x} y={sekretarisPos.y} person={sekretarisDesa} />

            {kasiRow.map((p, i) => (
              <Node key={p.role} x={kasiX[i] ?? kasiX[0]} y={rowKasiKaurY} person={p} />
            ))}
            {kaurRow.map((p, i) => (
              <Node key={p.role} x={kaurX[i] ?? kaurX[0]} y={rowKasiKaurY} person={p} />
            ))}
            {kamituwoRow.map((p, i) => (
              <Node key={p.role} x={kamX[i] ?? kamX[0]} y={kamY} person={p} />
            ))}
            {karyawanRow.map((p, i) => (
              <Node key={`${p.role}-${i}`} x={karyawanX[i] ?? karyawanX[0]} y={karyawanY} person={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
