import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desa-plumbangan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Desa Plumbangan - Website Resmi Desa Plumbangan",
    template: "%s | Desa Plumbangan",
  },
  description:
    "Website Resmi Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar. Layanan publik, berita desa, profil kependudukan, sejarah, galeri, dan potensi UMKM Desa Plumbangan.",
  keywords: [
    "Desa Plumbangan",
    "Plumbangan",
    "Doko",
    "Blitar",
    "Website Resmi Desa Plumbangan",
    "UMKM Desa Plumbangan",
    "Pelayanan Desa Plumbangan",
    "Candi Plumbangan",
    "Pemerintah Desa Plumbangan",
  ],
  authors: [{ name: "Pemerintah Desa Plumbangan" }],
  creator: "Pemerintah Desa Plumbangan",
  publisher: "Pemerintah Desa Plumbangan",
  icons: {
    icon: [
      { url: "/logo-desa.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/logo-desa.png"],
    apple: [{ url: "/logo-desa.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Desa Plumbangan - Website Resmi Desa Plumbangan",
    description:
      "Website Resmi Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar. Temukan informasi pelayanan publik, berita, galeri, dan potensi UMKM lokal.",
    url: siteUrl,
    siteName: "Desa Plumbangan",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo-desa.png",
        width: 512,
        height: 512,
        alt: "Logo Resmi Desa Plumbangan",
      },
      {
        url: "/downviewcandi.webp",
        width: 1200,
        height: 630,
        alt: "Candi Plumbangan - Desa Plumbangan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Plumbangan - Website Resmi Desa Plumbangan",
    description:
      "Website Resmi Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar.",
    images: ["/logo-desa.png", "/downviewcandi.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentOffice",
        "@id": `${siteUrl}/#organization`,
        name: "Desa Plumbangan",
        alternateName: "Pemerintah Desa Plumbangan",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo-desa.png`,
          width: 512,
          height: 512,
        },
        image: [
          `${siteUrl}/logo-desa.png`,
          `${siteUrl}/downviewcandi.webp`,
        ],
        description:
          "Website Resmi Desa Plumbangan, Kecamatan Doko, Kabupaten Blitar. Layanan publik, berita, galeri, dan potensi UMKM.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Raya Plumbangan",
          addressLocality: "Doko",
          addressRegion: "Kabupaten Blitar",
          postalCode: "66186",
          addressCountry: "ID",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Desa Plumbangan",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "id-ID",
      },
    ],
  };

  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo-desa.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-desa.png" />
        <link rel="shortcut icon" href="/logo-desa.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
