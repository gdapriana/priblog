import type { Blog } from "./type.data";

export const blogs: Blog[] = [
  {
    userId: 12,
    categoryId: 1,
    slug: "hari-yang-indah",
    title: "Today is beautifull day",
    excerpt: "Catatan singkat tentang hari yang menyenangkan.",
    content:
      "Hari ini cuaca cerah dan suasana hati sedang baik. Waktu yang pas untuk memulai hal baru.",
    id: 35,
    createdAt: "2026-11-02T00:41:23.795Z",
    updatedAt: "2026-11-02T00:41:23.795Z",
    category: { id: 1, title: "Lifestyle", slug: "lifestyle" },
    user: { id: 12, email: "apriana@example.com", name: "Apriana" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 12,
    categoryId: 2,
    slug: "memulai-nextjs-app-router",
    title: "Memulai Next.js dengan App Router",
    excerpt: "Panduan dasar struktur folder dan routing di App Router.",
    content:
      "App Router memperkenalkan konsep layout, server component, dan streaming yang mengubah cara kita membangun aplikasi React.",
    id: 36,
    createdAt: "2026-11-02T02:15:10.120Z",
    updatedAt: "2026-11-02T02:15:10.120Z",
    category: { id: 2, title: "Technology", slug: "technology" },
    user: { id: 12, email: "apriana@example.com", name: "Apriana" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 13,
    categoryId: 2,
    slug: "prisma-vs-drizzle",
    title: "Prisma vs Drizzle ORM: Mana yang Cocok?",
    excerpt: "Perbandingan developer experience dan performa kedua ORM.",
    content:
      "Prisma menawarkan DX yang matang dan schema yang jelas, sedangkan Drizzle unggul dalam ringan dan dekat dengan SQL.",
    id: 37,
    createdAt: "2026-11-02T03:30:45.500Z",
    updatedAt: "2026-11-02T04:10:00.000Z",
    category: { id: 2, title: "Technology", slug: "technology" },
    user: { id: 13, email: "budi@example.com", name: "Budi Santoso" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 13,
    categoryId: 3,
    slug: "tips-produktif-bekerja-remote",
    title: "Tips Produktif Bekerja Remote",
    excerpt: "Cara menjaga fokus dan ritme kerja dari rumah.",
    content:
      "Tentukan jam kerja yang jelas, siapkan area kerja khusus, dan jangan lupa istirahat teratur.",
    id: 38,
    createdAt: "2026-11-02T05:05:12.300Z",
    updatedAt: "2026-11-02T05:05:12.300Z",
    category: { id: 3, title: "Productivity", slug: "productivity" },
    user: { id: 13, email: "budi@example.com", name: "Budi Santoso" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 14,
    categoryId: 4,
    slug: "wisata-kuliner-bali",
    title: "Wisata Kuliner Bali yang Wajib Dicoba",
    excerpt: "Rekomendasi makanan khas Bali untuk para pelancong.",
    content:
      "Mulai dari babi guling, lawar, hingga sate lilit, Bali menyimpan banyak pilihan kuliner yang menggugah selera.",
    id: 39,
    createdAt: "2026-11-02T06:20:33.870Z",
    updatedAt: "2026-11-02T06:45:00.000Z",
    category: { id: 4, title: "Travel", slug: "travel" },
    user: { id: 14, email: "sari@example.com", name: "Sari Dewi" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 14,
    categoryId: 4,
    slug: "pantai-tersembunyi-di-jawa-timur",
    title: "Pantai Tersembunyi di Jawa Timur",
    excerpt: "Destinasi pantai yang masih sepi dan asri.",
    content:
      "Jawa Timur punya banyak pantai yang belum ramai wisatawan, cocok untuk melepas penat di akhir pekan.",
    id: 40,
    createdAt: "2026-11-02T07:55:01.010Z",
    updatedAt: "2026-11-02T07:55:01.010Z",
    category: { id: 4, title: "Travel", slug: "travel" },
    user: { id: 14, email: "sari@example.com", name: "Sari Dewi" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 15,
    categoryId: 5,
    slug: "resep-nasi-goreng-rumahan",
    title: "Resep Nasi Goreng Rumahan yang Simpel",
    excerpt: "Nasi goreng enak dengan bahan seadanya di dapur.",
    content:
      "Tumis bumbu halus, masukkan nasi dingin, tambahkan kecap, lalu sajikan dengan telur ceplok dan kerupuk.",
    id: 41,
    createdAt: "2026-11-03T01:10:20.640Z",
    updatedAt: "2026-11-03T01:10:20.640Z",
    category: { id: 5, title: "Food", slug: "food" },
    user: { id: 15, email: "rina@example.com", name: "Rina Putri" },
    cover:
      "https://images.unsplash.com/photo-1791395668334-427f868dca09?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D",
  },
  {
    userId: 15,
    categoryId: 6,
    slug: "manfaat-olahraga-pagi",
    title: "Manfaat Olahraga Pagi untuk Tubuh",
    excerpt: "Kenapa olahraga di pagi hari bisa meningkatkan energi.",
    content:
      "Olahraga pagi membantu metabolisme, memperbaiki suasana hati, dan membuat tidur malam lebih nyenyak.",
    id: 42,
    createdAt: "2026-11-03T02:40:55.220Z",
    updatedAt: "2026-11-03T03:00:00.000Z",
    category: { id: 6, title: "Health", slug: "health" },
    user: { id: 15, email: "rina@example.com", name: "Rina Putri" },
  },
  {
    userId: 12,
    categoryId: 2,
    slug: "state-management-dengan-zustand",
    title: "State Management Ringan dengan Zustand",
    excerpt: "Alternatif sederhana dibanding Redux untuk aplikasi React.",
    content:
      "Zustand menyediakan store minimalis tanpa boilerplate berlebih, cocok dipadukan dengan TanStack Query.",
    id: 43,
    createdAt: "2026-11-03T03:25:40.900Z",
    updatedAt: "2026-11-03T03:25:40.900Z",
    category: { id: 2, title: "Technology", slug: "technology" },
    user: { id: 12, email: "apriana@example.com", name: "Apriana" },
  },
  {
    userId: 12,
    categoryId: 1,
    slug: "belajar-konsisten-setiap-hari",
    title: "Belajar Konsisten Setiap Hari",
    excerpt: "Kebiasaan kecil yang berdampak besar dalam jangka panjang.",
    content:
      "Konsistensi lebih penting daripada intensitas. Luangkan 30 menit setiap hari untuk belajar hal baru.",
    id: 44,
    createdAt: "2026-11-03T04:00:15.450Z",
    updatedAt: "2026-11-03T04:00:15.450Z",
    category: { id: 1, title: "Lifestyle", slug: "lifestyle" },
    user: { id: 12, email: "apriana@example.com", name: "Apriana" },
  },
];
