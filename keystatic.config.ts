import { config, fields, singleton, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_REPO_OWNER!,
      name: process.env.NEXT_PUBLIC_REPO_NAME!,
    },
  },

  ui: {
    brand: { name: 'Admin Desa Plumbangan' },
    // 💡 MENYATUKAN MENU SIDEBAR ADMIN KEYSTATIC
    navigation: {
      'Kelola Konten Website': [
        'beranda',
        'tentang',
        'struktur',
        'galeri',
        'umkm', // 👈 UMKM dimasukkan ke grup yang sama dengan Singleton!
      ],
    },
  },

  // ── SINGLETON: data tunggal ────────────────────────────────
  singletons: {
    beranda: singleton({
      label: 'Beranda',
      path: 'content/beranda',
      schema: {
        judul: fields.text({ label: 'Judul Utama', defaultValue: 'Desa Plumbangan' }),
        tagline: fields.text({
          label: 'Tagline / Deskripsi Singkat',
          multiline: true,
          defaultValue: 'Selamat datang di website resmi Desa Plumbangan',
        }),
        video_url: fields.text({
          label: 'Link Video Profil Desa (YouTube)',
          defaultValue: 'https://youtu.be/L_y2Qi_p9jc?si=aOPb0SJqYPPAkLP2',
          description: 'Masukkan URL video YouTube',
        }),
        about_heading: fields.text({ label: 'Judul Sekilas Tentang', defaultValue: 'Tentang' }),
        about_deskripsi_1: fields.text({
          label: 'Deskripsi Tentang Baris 1',
          multiline: true,
          defaultValue: 'Desa Plumbangan sudah ada pada masa Pemerintahan Kerajaan Kediri di bawah Raja Jaya Baya, yang terus berlangsung hingga Pemerintahan Majapahit, hingga masa keruntuhannya. Berdasarkan data yang kami dapat bahwa Pemerintah Desa Plumbangan yang pertama baru dimulai Tahun 1895 Masehi.',
        }),
        about_deskripsi_2: fields.text({
          label: 'Deskripsi Tentang Baris 2',
          multiline: true,
          defaultValue: 'Terdiri dari 4 Dusun yang ditandai dengan petilasan ( punden ) dan setiap dusun mengadakan acara ritual sendiri ( Bersih Dusun ) di bulan Jawa Selo.',
        }),
        foto_about_1: fields.image({
          label: 'Foto Tentang 1 (Disarankan format WebP, Maks 2MB)',
          directory: 'public/images/beranda',
          publicPath: '/images/beranda/',
          transformFilename: () => 'foto1',
        }),
        foto_about_2: fields.image({
          label: 'Foto Tentang 2 (Disarankan format WebP, Maks 2MB)',
          directory: 'public/images/beranda',
          publicPath: '/images/beranda/',
          transformFilename: () => 'foto2',
        }),
        foto_about_3: fields.image({
          label: 'Foto Tentang 3 (Disarankan format WebP, Maks 2MB)',
          directory: 'public/images/beranda',
          publicPath: '/images/beranda/',
          transformFilename: () => 'foto3',
        }),
      },
    }),

    tentang: singleton({
      label: 'Halaman Tentang',
      path: 'content/tentang',
      schema: {
        judul_tentang: fields.text({ label: 'Nama Desa / Judul Utama', defaultValue: 'Plumbangan' }),
        heading_sejarah: fields.text({ label: 'Sub-Judul Sejarah', defaultValue: 'Sejarah Desa' }),
        deskripsi_sejarah: fields.text({
          label: 'Deskripsi Sejarah Desa',
          multiline: true,
          defaultValue: 'Desa Plumbangan sudah ada pada masa Pemerintahan Kerajaan Kediri di bawah Raja Jaya Baya, yang terus berlangsung hingga Pemerintahan Majapahit, hingga masa keruntuhannya. Berdasarkan data yang kami dapat bahwa Pemerintah Desa Plumbangan yang pertama baru dimulai Tahun 1895 Masehi.',
        }),
        foto_sejarah: fields.image({
          label: 'Foto Utama Tentang Desa (Disarankan format WebP, Maks 2MB)',
          directory: 'public/images/tentang',
          publicPath: '/images/tentang/',
        }),
        jumlah_penduduk: fields.text({ label: 'Jumlah Penduduk (contoh: 2.300)', defaultValue: '2.300' }),
        detail_kependudukan: fields.array(
          fields.text({ label: 'Detail Fasilitas / Dusun' }),
          {
            label: 'Detail Kependudukan (Dusun/Sekolah/Candi)',
            itemLabel: (props) => props.value || 'Item Detail',
          }
        ),
      },
    }),

    struktur: singleton({
      label: 'Struktur Organisasi',
      path: 'content/struktur',
      schema: {
        kepala_desa: fields.object({
          nama: fields.text({ label: 'Nama Kepala Desa' }),
          role: fields.text({ label: 'Jabatan', defaultValue: 'Kepala Desa' }),
          note: fields.text({ label: 'Catatan / NIP (Opsional)' }),
          foto: fields.image({
            label: 'Foto Kepala Desa (Disarankan WebP, Maks 2MB)',
            directory: 'public/images/struktur',
            publicPath: '/images/struktur/',
          }),
        }),
        sekretaris_desa: fields.object({
          nama: fields.text({ label: 'Nama Sekretaris Desa' }),
          role: fields.text({ label: 'Jabatan', defaultValue: 'Sekretaris Desa' }),
          foto: fields.image({
            label: 'Foto Sekretaris Desa (Disarankan WebP, Maks 2MB)',
            directory: 'public/images/struktur',
            publicPath: '/images/struktur/',
          }),
        }),
        kasi_list: fields.array(
          fields.object({
            nama: fields.text({ label: 'Nama' }),
            role: fields.text({ label: 'Jabatan (contoh: Kasi Pelayanan)' }),
            foto: fields.image({
              label: 'Foto (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/struktur',
              publicPath: '/images/struktur/',
            }),
          }),
          {
            label: 'Daftar Kasi',
            itemLabel: (props) => `${props.fields.role.value}: ${props.fields.nama.value}` || 'Kasi',
          }
        ),
        kaur_list: fields.array(
          fields.object({
            nama: fields.text({ label: 'Nama' }),
            role: fields.text({ label: 'Jabatan (contoh: Kaur Keuangan)' }),
            foto: fields.image({
              label: 'Foto (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/struktur',
              publicPath: '/images/struktur/',
            }),
          }),
          {
            label: 'Daftar Kaur',
            itemLabel: (props) => `${props.fields.role.value}: ${props.fields.nama.value}` || 'Kaur',
          }
        ),
        kamituwo_list: fields.array(
          fields.object({
            nama: fields.text({ label: 'Nama' }),
            role: fields.text({ label: 'Jabatan (contoh: Kamituwo Plumbangan)' }),
            foto: fields.image({
              label: 'Foto (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/struktur',
              publicPath: '/images/struktur/',
            }),
          }),
          {
            label: 'Daftar Kamituwo',
            itemLabel: (props) => `${props.fields.role.value}: ${props.fields.nama.value}` || 'Kamituwo',
          }
        ),
        karyawan_list: fields.array(
          fields.object({
            nama: fields.text({ label: 'Nama' }),
            role: fields.text({ label: 'Jabatan (contoh: Karyawan Desa)' }),
            foto: fields.image({
              label: 'Foto (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/struktur',
              publicPath: '/images/struktur/',
            }),
          }),
          {
            label: 'Daftar Karyawan Desa',
            itemLabel: (props) => `${props.fields.role.value}: ${props.fields.nama.value}` || 'Karyawan',
          }
        ),
      },
    }),

    galeri: singleton({
      label: 'Halaman Galeri',
      path: 'content/galeri',
      schema: {
        hero_image: fields.image({
          label: 'Foto Hero Banner Galeri (Disarankan WebP, Maks 2MB)',
          directory: 'public/images/galeri',
          publicPath: '/images/galeri/',
        }),
        aset_desa: fields.array(
          fields.object({
            nama: fields.text({ label: 'Nama / Keterangan Aset' }),
            foto: fields.image({
              label: 'Foto Aset (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/galeri/aset_desa',
              publicPath: '/images/galeri/aset_desa/',
            }),
          }),
          {
            label: 'Daftar Aset Desa',
            itemLabel: (props) => props.fields.nama.value || 'Foto Aset Desa',
          }
        ),
        kegiatan_desa: fields.array(
          fields.object({
            deskripsi: fields.text({ label: 'Deskripsi Kegiatan', multiline: true }),
            foto: fields.image({
              label: 'Foto Kegiatan (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/galeri/kegiatan_desa',
              publicPath: '/images/galeri/kegiatan_desa/',
            }),
          }),
          {
            label: 'Daftar Kegiatan Desa',
            itemLabel: (props) => props.fields.deskripsi.value?.slice(0, 30) || 'Kegiatan Desa',
          }
        ),
        foto_highlight: fields.image({
          label: 'Foto Highlight Utama Galeri Grid (Disarankan WebP, Maks 2MB)',
          directory: 'public/images/galeri',
          publicPath: '/images/galeri/',
        }),
        galeri_grid: fields.array(
          fields.object({
            foto: fields.image({
              label: 'Foto Galeri Grid (Disarankan WebP, Maks 2MB)',
              directory: 'public/images/galeri/galeri_grid',
              publicPath: '/images/galeri/galeri_grid/',
            }),
          }),
          {
            label: 'Foto Tambahan Galeri Grid',
            itemLabel: () => 'Foto Grid',
          }
        ),
      },
    }),
  },

  // ── COLLECTION: data dinamis / bisa banyak ────────────────────────────────
  collections: {
    umkm: collection({
      label: 'UMKM Desa',
      slugField: 'nama',
      path: 'content/umkm/*',
      schema: {
        nama: fields.slug({ name: { label: 'Nama UMKM' } }),
        pemilik: fields.text({ label: 'Nama Pemilik' }),
        kategori: fields.text({ label: 'Kategori Produk / Usaha', defaultValue: 'Makanan' }),
        deskripsi: fields.text({ label: 'Deskripsi Produk / Usaha', multiline: true }),
        jam_operasional: fields.text({ label: 'Jam Operasional (contoh: Senin - Sabtu. Pukul 08.00 - 16.00 WIB)' }),
        lokasi: fields.text({ label: 'Alamat / Lokasi UMKM', multiline: true }),
        link_gmaps: fields.text({ label: 'Link Google Maps / Pinpoint (Opsional)' }),
        kontak_wa: fields.text({ label: 'Nomor WhatsApp (contoh: 08123456789 atau +628123456789)' }),
        link_facebook: fields.text({ label: 'Link Facebook (Opsional)' }),
        link_tiktok: fields.text({ label: 'Link TikTok (Opsional)' }),
        link_instagram: fields.text({ label: 'Link Instagram (Opsional)' }),
        link_shopee: fields.text({ label: 'Link Shopee (Opsional)' }),
        link_tokopedia: fields.text({ label: 'Link Tokopedia (Opsional)' }),
        foto_utama: fields.image({
          label: 'Foto Utama UMKM',
          directory: 'public/images/umkm',
          publicPath: '/images/umkm/',
        }),
        foto_galeri_1: fields.image({
          label: 'Foto Galeri 1',
          directory: 'public/images/umkm',
          publicPath: '/images/umkm/',
        }),
        foto_galeri_2: fields.image({
          label: 'Foto Galeri 2',
          directory: 'public/images/umkm',
          publicPath: '/images/umkm/',
        }),
        foto_galeri_3: fields.image({
          label: 'Foto Galeri 3',
          directory: 'public/images/umkm',
          publicPath: '/images/umkm/',
        }),
      },
    }),
  },
})