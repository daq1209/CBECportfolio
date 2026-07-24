/**
 * lib/projects.ts
 *
 * Source of truth for case studies (work).
 * Maps to:
 *   - /global/work/[slug]
 *   - /vi/work/[slug]
 */

export interface ProjectStat {
  value: string;
  label: { en: string; vi: string };
}

export interface ProjectBrandAssets {
  colors: string[]; // e.g. ["#66FF80", "#0A2540", "#0A0A0A"]
  fonts: string[]; // e.g. ["Inter", "Outfit"]
  deliverables: { en: string; vi: string }[];
}

export interface ProjectTestimonial {
  quote: { en: string; vi: string };
  author: string;
  title: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  image: string;
  imagePosition?: string; // Tailwind class for object-position
  externalLink?: string;
  category: string; // key matching PROJECT_CATEGORIES in gallery
  outcome: { en: string; vi: string };
  client: string;
  year: string;
  role: { en: string; vi: string };
  overview: { en: string; vi: string };
  stats: ProjectStat[];
  challenges: { en: string; vi: string }[];
  solutions: { en: string; vi: string }[];
  results: { en: string; vi: string }[];
  galleryImages: string[];

  // Expanded optional fields
  industry?: string;
  timeline?: string;
  testimonial?: ProjectTestimonial;
  brandAssets?: ProjectBrandAssets;
  relatedSlugs?: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "richmond-smiles",
    title: "Richmond Smiles",
    image: "/projects/richmondsmiles.jpg",
    externalLink: "https://www.richmondsmiles.com.au/",
    category: "gallery.cat6",
    industry: "Healthcare / Dentistry",
    timeline: "3 weeks",
    outcome: {
      en: "Dental clinic rebrand + custom headless web booking platform.",
      vi: "Rebranding phòng khám nha khoa + nền tảng đặt lịch chuyên sâu."
    },
    client: "Richmond Smiles Dental Group (Australia)",
    year: "2025",
    role: {
      en: "Brand Identity, UI/UX Design, Headless Next.js Build",
      vi: "Thiết kế thương hiệu, UI/UX, Lập trình Next.js tốc độ cao"
    },
    overview: {
      en: "Richmond Smiles is a premium dental clinic in Melbourne, Australia. CBEC Solutions redesigned their visual identity and custom-built a Next.js web application that connects directly to their booking engine, creating a seamless online patient journey.",
      vi: "Richmond Smiles là phòng khám nha khoa cao cấp tại Melbourne, Australia. CBEC Solutions thiết kế lại bộ nhận diện và lập trình website Next.js kết nối hệ thống CRM đặt lịch riêng biệt, tối ưu trải nghiệm người bệnh."
    },
    stats: [
      { value: "48%", label: { en: "Booking Conversion Rate Increase", vi: "Tăng tỷ lệ chuyển đổi đặt lịch" } },
      { value: "1.2s", label: { en: "Lighthouse Load Speed", vi: "Tốc độ tải trang chuẩn Lighthouse" } },
      { value: "35%", label: { en: "Bounce Rate Reduction", vi: "Giảm tỷ lệ thoát trang" } }
    ],
    challenges: [
      {
        en: "Legacy dental systems were causing 35%+ customer drop-offs on booking pages because of complex and unresponsive forms.",
        vi: "Hệ thống đặt lịch cũ phức tạp khiến hơn 35% bệnh nhân bỏ cuộc giữa chừng khi truy cập trên di động."
      },
      {
        en: "The brand design lacked modern appeal, failing to stand out in Melbourne's competitive private healthcare sector.",
        vi: "Nhận diện thương hiệu cũ mờ nhạt, không tạo được cảm giác cao cấp và tin tưởng giữa thị trường nha khoa cạnh tranh."
      }
    ],
    solutions: [
      {
        en: "Re-imagined the brand identity with a clean, medical-grade visual system including dynamic social guidelines.",
        vi: "Tái định vị thương hiệu với bộ nhận diện y khoa cao cấp, sang trọng kèm cẩm nang sử dụng trực quan."
      },
      {
        en: "Constructed a custom Next.js frontend integrated with their booking API to process appointments in under three clicks.",
        vi: "Xây dựng cổng đặt lịch Next.js mượt mà, tối giản hóa các bước đặt lịch từ 7 bước xuống còn 3 click chuột."
      }
    ],
    results: [
      {
        en: "Successfully launched the brand and portal within 3 weeks, yielding a record-breaking surge in new patient registrations.",
        vi: "Bàn giao thành công dự án trong 3 tuần, đạt kỷ lục số lượng khách đăng ký khám trực tuyến."
      },
      {
        en: "100% mobile-responsive layout that scored 98/100 on Google PageSpeed Insights.",
        vi: "Layout tối ưu di động đạt điểm số 98/100 trên công cụ chấm điểm Google PageSpeed."
      }
    ],
    galleryImages: [
      "/projects/richmond-smiles-gallery-1.webp",
      "/projects/richmond-smiles-gallery-2.webp",
      "/projects/richmond-smiles-gallery-3.webp",
      "/projects/richmond-smiles-gallery-4.webp",
      "/projects/richmond-smiles-gallery-5.webp"
    ],
    testimonial: {
      quote: {
        en: "CBEC completely transformed our online patient booking experience. Conversion jumped 48% in the very first month after launch.",
        vi: "CBEC đã tái định hình toàn bộ trải nghiệm đặt lịch của bệnh nhân. Tỷ lệ chuyển đổi tăng 48% ngay trong tháng đầu tiên ra mắt."
      },
      author: "Dr. Andrew Nguyen",
      title: "Principal Dentist & Founder, Richmond Smiles"
    },
    brandAssets: {
      colors: ["#66FF80", "#0A2540", "#0A0A0A"],
      fonts: ["Inter", "Outfit"],
      deliverables: [
        { en: "Brand Identity Guidelines & Vector Logo Pack", vi: "Bộ nhận diện thương hiệu & File thiết kế Logo vector" },
        { en: "Headless Next.js Online Booking Platform", vi: "Nền tảng đặt lịch khám Next.js tốc độ cao" }
      ]
    },
    relatedSlugs: ["dentix-consulting", "lee-concept"]
  },
  {
    slug: "banh-mi-ngon",
    title: "Bánh Mì Ngon",
    image: "/projects/5e0d1b7bdd555c0b0544 (1).jpg",
    imagePosition: "object-center",
    externalLink: "https://www.behance.net/gallery/167430343/BANH-MI-NGON",
    category: "gallery.cat1",
    industry: "F&B / Street Food",
    timeline: "4 weeks",
    outcome: {
      en: "Contemporary F&B brand identity & eco-friendly packaging system.",
      vi: "Hệ thống nhận diện thương hiệu F&B & bao bì thân thiện môi trường."
    },
    client: "Bánh Mì Ngon (Vietnam)",
    year: "2025",
    role: {
      en: "Brand Strategy, Hand-drawn Lettering, Packaging Design",
      vi: "Chiến lược thương hiệu, Chữ vẽ tay độc quyền, Thiết kế bao bì"
    },
    overview: {
      en: "Bánh Mì Ngon is a contemporary F&B brand elevating traditional Vietnamese street food. CBEC Solutions created a vibrant brand identity, custom hand-drawn typography, and an eco-friendly packaging system for their franchise rollout.",
      vi: "Bánh Mì Ngon là thương hiệu F&B hiện đại nâng tầm món ăn đường phố truyền thống Việt Nam. CBEC Solutions xây dựng hệ thống nhận diện thương hiệu độc đáo, bộ chữ vẽ tay ấn tượng và bao bì thân thiện môi trường."
    },
    stats: [
      { value: "3x", label: { en: "Brand Recognition Growth", vi: "Tăng trưởng độ nhận diện thương hiệu" } },
      { value: "100%", label: { en: "Eco-friendly Packaging Materials", vi: "Chất liệu bao bì thân thiện môi trường" } },
      { value: "4.9/5", label: { en: "Customer Satisfaction Index", vi: "Điểm số hài lòng của khách hàng" } }
    ],
    challenges: [
      {
        en: "Positioning traditional street food in a premium yet accessible segment while preserving authentic Vietnamese food culture.",
        vi: "Định vị món ăn đường phố ở phân khúc cao cấp nhưng vẫn gần gũi và giữ trọn nét văn hóa ẩm thực Việt."
      },
      {
        en: "Outdated packaging caused thermal loss during delivery and lacked visual consistency across franchise stores.",
        vi: "Bao bì cũ không giữ được độ nóng giòn khi giao hàng và thiếu sự nhất quán giữa các cửa hàng nhượng quyền."
      }
    ],
    solutions: [
      {
        en: "Crafted a custom hand-lettered logo mark combined with traditional pattern accents and a warm color palette.",
        vi: "Tạo logo chữ vẽ tay thủ công kết hợp họa tiết truyền thống và phối màu cam ấm trẻ trung."
      },
      {
        en: "Designed sustainable paper packaging with custom grease-resistant thermal insulation for delivery quality.",
        vi: "Thiết kế túi giấy và bọc bánh mì bằng chất liệu thân thiện môi trường, chống thấm dầu và giữ nhiệt tối ưu."
      }
    ],
    results: [
      {
        en: "Successfully rolled out across flagship locations, generating strong viral engagement on social platforms.",
        vi: "Triển khai thành công tại chuỗi cửa hàng chính, tạo hiệu ứng truyền thông tích cực trên mạng xã hội."
      },
      {
        en: "Standardized brand guidelines enabled rapid expansion for 5+ new franchise outlets within six months.",
        vi: "Bộ cẩm nang quy chuẩn thương hiệu giúp chuẩn hóa và mở rộng nhanh chóng 5+ chi nhánh nhượng quyền."
      }
    ],
    galleryImages: [
      "/projects/banh-mi-ngon-gallery-1.jpg",
      "/projects/banh-mi-ngon-gallery-2.jpg",
      "/projects/banh-mi-ngon-gallery-3.jpg",
      "/projects/banh-mi-ngon-gallery-4.jpg",
      "/projects/banh-mi-ngon-gallery-5.jpg",
      "/projects/banh-mi-ngon-gallery-6.jpg",
      "/projects/banh-mi-ngon-gallery-7.jpg",
      "/projects/banh-mi-ngon-gallery-8.jpg",
      "/projects/banh-mi-ngon-gallery-9.jpg",
      "/projects/banh-mi-ngon-gallery-10.jpg"
    ],
    testimonial: {
      quote: {
        en: "The brand identity designed by CBEC captured the exact soul of authentic Vietnamese Bánh Mì with a modern, high-end touch.",
        vi: "Bộ nhận diện do CBEC thiết kế đã thể hiện trọn vẹn linh hồn bánh mì Việt Nam với nét vẽ hiện đại và rất cao cấp."
      },
      author: "Tran Hoang Nam",
      title: "Founder, Bánh Mì Ngon"
    },
    brandAssets: {
      colors: ["#E85A2A", "#F4A261", "#2A9D8F", "#0A0A0A"],
      fonts: ["Lexend", "Playfair Display"],
      deliverables: [
        { en: "Custom Hand-Lettered Logo & Visual System", vi: "Logo chữ vẽ tay thủ công & Hệ thống ngôn ngữ thị giác" },
        { en: "Eco-Friendly Paper Packaging Suite", vi: "Bộ ấn phẩm bao bì túi giấy thân thiện môi trường" }
      ]
    },
    relatedSlugs: ["richmond-smiles", "unineon"]
  },
  {
    slug: "dentix-consulting",
    title: "Dentix Consulting",
    image: "/projects/84ebc9938460053e5c71.jpg",
    externalLink: "https://www.behance.net/gallery/229948819/DENTIX-CONSULTING-BRANDING",
    category: "gallery.cat1",
    industry: "Healthcare Consulting",
    timeline: "2 weeks",
    outcome: {
      en: "Corporate brand identity & executive consulting stationery suite.",
      vi: "Bộ nhận diện thương hiệu doanh nghiệp & ấn phẩm văn phòng cao cấp."
    },
    client: "Dentix Consulting (Australia)",
    year: "2026",
    role: {
      en: "Logo Design, Corporate Identity, Brand Guidelines",
      vi: "Thiết kế Logo, Nhận diện doanh nghiệp, Cẩm nang thương hiệu"
    },
    overview: {
      en: "Dentix Consulting provides strategic management consulting for dental practice groups across Australia. CBEC Solutions engineered an authoritative visual identity and professional corporate stationery suite to reflect their executive standard.",
      vi: "Dentix Consulting cung cấp dịch vụ tư vấn chiến lược quản lý cho các tập đoàn nha khoa tại Australia. CBEC Solutions xây dựng hệ thống nhận diện thương hiệu chuyên nghiệp và bộ ấn phẩm văn phòng chuẩn mực."
    },
    stats: [
      { value: "95%", label: { en: "Partner Approval Rate", vi: "Tỷ lệ đối tác đánh giá cao" } },
      { value: "100%", label: { en: "Corporate Standard Compliance", vi: "Chuẩn mực nhận diện doanh nghiệp" } },
      { value: "2w", label: { en: "Project Turnaround Time", vi: "Thời gian hoàn thành dự án" } }
    ],
    challenges: [
      {
        en: "Establishing an authoritative, clinical corporate image that clearly distinguishes management consulting from retail dental clinics.",
        vi: "Xây dựng hình ảnh tư vấn doanh nghiệp uy tín, chuyên khoa nhưng không bị trùng lặp với các phòng khám nha khoa thông thường."
      },
      {
        en: "Inconsistent sales decks and documentation were undermining pitch conversion rates with healthcare enterprise executives.",
        vi: "Tài liệu hồ sơ năng lực cũ thiếu nhất quán làm giảm tỷ lệ thuyết phục các giám đốc điều hành tập đoàn y tế."
      }
    ],
    solutions: [
      {
        en: "Designed a clean geometric monogram mark paired with deep medical blue typography and minimalist grid layouts.",
        vi: "Thiết kế logo biểu tượng hình học tối giản kết hợp tông màu xanh y tế đậm và hệ thống lưới bố cục chuẩn mực."
      },
      {
        en: "Produced a full executive corporate kit including business stationery, pitch decks, and digital proposal templates.",
        vi: "Xây dựng trọn bộ ấn phẩm văn phòng cao cấp gồm danh thiếp, hồ sơ năng lực, kẹp file và mẫu đề xuất kỹ thuật."
      }
    ],
    results: [
      {
        en: "Significantly elevated corporate perception, directly contributing to securing major enterprise contracts in NSW and Victoria.",
        vi: "Nâng cao vị thế thương hiệu, trực tiếp góp phần chốt các hợp đồng tư vấn lớn tại bang NSW và Victoria."
      },
      {
        en: "Delivered comprehensive brand guidelines ensuring seamless visual consistency across all digital and print touchpoints.",
        vi: "Bàn giao cẩm nang hướng dẫn nhận diện thương hiệu toàn diện, đảm bảo tính đồng bộ trên tất cả các kênh."
      }
    ],
    galleryImages: [
      "/projects/dentix-consulting-gallery-1.png",
      "/projects/dentix-consulting-gallery-2.png",
      "/projects/dentix-consulting-gallery-3.png",
      "/projects/dentix-consulting-gallery-4.png",
      "/projects/dentix-consulting-gallery-5.png",
      "/projects/dentix-consulting-gallery-6.png",
      "/projects/dentix-consulting-gallery-7.png",
      "/projects/dentix-consulting-gallery-8.png"
    ],
    testimonial: {
      quote: {
        en: "CBEC delivered an outstanding corporate brand identity that elevated our standing among Australian healthcare practice owners.",
        vi: "CBEC mang đến bộ nhận diện doanh nghiệp đẳng cấp, nâng tầm vị thế của chúng tôi với các chủ phòng khám tại Australia."
      },
      author: "Marcus Vance",
      title: "Managing Director, Dentix Consulting Australia"
    },
    brandAssets: {
      colors: ["#0052CC", "#0747A6", "#DEEBFF", "#0A0A0A"],
      fonts: ["Inter", "Plus Jakarta Sans"],
      deliverables: [
        { en: "Geometric Monogram Logo & Corporate Guidelines", vi: "Logo biểu tượng hình học & Quy chuẩn thương hiệu" },
        { en: "Executive Presentation Decks & Business Stationery", vi: "Bộ hồ sơ năng lực thuyết trình & Ấn phẩm văn phòng" }
      ]
    },
    relatedSlugs: ["richmond-smiles", "lee-concept"]
  },
  {
    slug: "lee-concept",
    title: "Lee Concept",
    image: "/projects/lee concept.png",
    externalLink: "https://leeconcept.com.vn",
    category: "gallery.cat5",
    industry: "Interior & E-Commerce / AI Automation",
    timeline: "6 weeks",
    outcome: {
      en: "AI Automation R&D & high-performance e-commerce architecture.",
      vi: "Nghiên cứu ứng dụng AI & kiến trúc website e-commerce tốc độ cao."
    },
    client: "Lee Concept / CBEC R&D Division",
    year: "2026",
    role: {
      en: "AI Agents Research, Prompt Engineering, Web Architecture",
      vi: "Nghiên cứu Đại lý AI, Lập trình Prompt, Kiến trúc Website"
    },
    overview: {
      en: "Lee Concept is a modern interior and lifestyle brand supported by CBEC Lab R&D. We built AI-driven market scraping bots, automated review sentiment analysis tools, and optimized high-performance e-commerce web layouts.",
      vi: "Lee Concept là thương hiệu nội thất & phong cách sống hiện đại. CBEC Lab phát triển các bot cào dữ liệu xu hướng tự động, công cụ phân tích cảm xúc đánh giá bằng AI và xây dựng giao diện e-commerce tốc độ cao."
    },
    stats: [
      { value: "24/7", label: { en: "Autonomous Agent Monitoring", vi: "Trợ lý AI hoạt động liên tục tự động" } },
      { value: "50k+", label: { en: "Market Insights & Products Analyzed", vi: "Dữ liệu sản phẩm & thị trường đã phân tích" } },
      { value: "90%", label: { en: "Operational Time Saved on Research", vi: "Tiết kiệm thời gian nghiên cứu vận hành" } }
    ],
    challenges: [
      {
        en: "E-commerce operations were losing hundreds of hours manually tracking competitor product catalogs, pricing shifts, and customer reviews.",
        vi: "Đội ngũ vận hành mất nhiều thời gian tự theo dõi biến động giá, danh mục sản phẩm và đánh giá của đối thủ."
      },
      {
        en: "Heavy unoptimized product images (over 4MB) caused severe mobile load lag and high bounce rates on product pages.",
        vi: "Ảnh sản phẩm chất lượng cao chưa tối ưu (nặng trên 4MB) gây giật lag khi tải trên điện thoại làm tăng tỷ lệ thoát trang."
      }
    ],
    solutions: [
      {
        en: "Engineered stealthy AI scraping bots to aggregate competitor analytics and summarize sentiment using OpenAI/Gemini APIs.",
        vi: "Phát triển bot thu thập dữ liệu AI thông minh kết hợp API Gemini tự động đọc hiểu và tổng hợp phản hồi thị trường."
      },
      {
        en: "Re-architected all visual assets into sub-300KB WebP formats with Next.js dynamic image optimization.",
        vi: "Tối ưu hóa toàn bộ kho ảnh sang định dạng WebP siêu nhẹ dưới 300KB kết hợp cơ chế load ảnh tự động của Next.js."
      }
    ],
    results: [
      {
        en: "Reduced page load time by 75% while providing real-time competitive intelligence dashboards for store managers.",
        vi: "Giảm 75% thời gian tải trang và cung cấp dashboard phân tích đối thủ thời gian thực cho nhà quản lý."
      },
      {
        en: "Published E-commerce growth playbooks and workflow scripts for commercial partner deployment.",
        vi: "Hoàn thiện cẩm nang tăng trưởng E-commerce và chia sẻ các script tự động hóa hữu ích cho đối tác."
      }
    ],
    galleryImages: [
      "/projects/lee-concept-gallery-1.webp",
      "/projects/lee-concept-gallery-2.webp",
      "/projects/lee-concept-gallery-3.webp",
      "/projects/lee-concept-gallery-4.webp",
      "/projects/lee-concept-gallery-5.webp"
    ],
    testimonial: {
      quote: {
        en: "The AI scraping and real-time review sentiment pipeline saved our operations team 15+ hours every single week.",
        vi: "Hệ thống AI tự động phân tích đánh giá và dữ liệu giá đối thủ giúp đội ngũ vận hành tiết kiệm hơn 15 giờ mỗi tuần."
      },
      author: "Lee Nguyen",
      title: "Head of Product & R&D, Lee Concept"
    },
    brandAssets: {
      colors: ["#8A2BE2", "#4B0082", "#121212", "#66FF80"],
      fonts: ["Space Grotesk", "Inter"],
      deliverables: [
        { en: "AI Market Intelligence Scraping System", vi: "Hệ thống Bot AI cào & phân tích dữ liệu thị trường" },
        { en: "High-Performance Next.js E-Commerce Portal", vi: "Cổng website E-Commerce Next.js tốc độ cao" }
      ]
    },
    relatedSlugs: ["unineon", "banh-mi-ngon"]
  },
  {
    slug: "unineon",
    title: "UniNeon",
    image: "/projects/61e08dd5eb266a783337.jpg",
    externalLink: "https://unineon.com/?srsltid=AfmBOorWjOFD-jrHxZD6PHrS9O4HD8Mf-bqsCp3YaUmzTEAOkSpLqtvG",
    category: "gallery.cat5",
    industry: "E-Commerce / Home Decor",
    timeline: "3 weeks",
    outcome: {
      en: "Custom e-commerce platform & live neon color preview visualizer.",
      vi: "Nền tảng e-commerce chuyên biệt & công cụ tùy biến ánh sáng Neon."
    },
    client: "UniNeon (Global)",
    year: "2026",
    role: {
      en: "E-Commerce Web Dev, Customizer UI, Performance Tuning",
      vi: "Lập trình Website E-Commerce, Giao diện tùy biến, Tối ưu hiệu năng"
    },
    overview: {
      en: "UniNeon is an e-commerce brand specializing in custom LED neon signs for home, business, and events. CBEC Solutions engineered a high-vibrancy web platform featuring custom CSS neon glow previews and a mobile-first checkout wizard.",
      vi: "UniNeon là thương hiệu đèn LED Neon trang trí theo yêu cầu cho gia đình, doanh nghiệp và sự kiện. CBEC Solutions phát triển website e-commerce với hiệu ứng ánh sáng Neon sống động và công cụ tùy biến màu trực quan."
    },
    stats: [
      { value: "100%", label: { en: "Mobile Responsive Layout", vi: "Tương thích 100% mọi thiết bị" } },
      { value: "99.8%", label: { en: "Application Uptime Record", vi: "Thời gian hoạt động ổn định" } },
      { value: "2.5x", label: { en: "Cart Checkout Completion Increase", vi: "Tăng tỷ lệ hoàn tất giỏ hàng" } }
    ],
    challenges: [
      {
        en: "Standard e-commerce templates failed to capture realistic neon glow aesthetics, leading to poor customer engagement.",
        vi: "Giao diện website mẫu thông thường không thể hiển thị đúng hiệu ứng phát sáng rực rỡ của đèn Neon."
      },
      {
        en: "Complex options for size, font, backing shape, and color combinations confused users during checkout.",
        vi: "Các tùy chọn phức tạp về kích thước, phông chữ, chất liệu mảng bọc và màu sắc làm khách bối rối khi đặt mua."
      }
    ],
    solutions: [
      {
        en: "Developed custom CSS glow rendering engines and dynamic color switcher tools for live sign previews.",
        vi: "Xây dựng bộ thư viện CSS render hiệu ứng ánh sáng phát sáng chân thực kèm bộ chọn màu xem trước tức thì."
      },
      {
        en: "Streamlined the multi-step custom ordering process into an intuitive 3-step mobile checkout wizard.",
        vi: "Tối giản quy trình đặt làm đèn theo yêu cầu thành 3 bước trực quan giúp khách chốt mua dễ dàng trên di động."
      }
    ],
    results: [
      {
        en: "Successfully launched the digital storefront, yielding a major boost in direct online orders and average order value.",
        vi: "Ra mắt thành công cửa hàng trực tuyến, ghi nhận sự gia tăng vượt bậc về số lượng đơn hàng và giá trị đơn."
      },
      {
        en: "Delivered 60fps smooth animations on mobile browsers using lightweight WebP image assets.",
        vi: "Đạt tốc độ cuộn trang 60fps mượt mà trên di động nhờ tối ưu hóa toàn bộ kho ảnh WebP siêu nhẹ."
      }
    ],
    galleryImages: [
      "/projects/unineon-gallery-1.jpg",
      "/projects/unineon-gallery-2.jpg",
      "/projects/unineon-gallery-3.jpg",
      "/projects/unineon-gallery-4.jpg",
      "/projects/unineon-gallery-5.png",
      "/projects/unineon-gallery-6.png",
      "/projects/unineon-gallery-7.png",
      "/projects/unineon-gallery-8.png",
      "/projects/unineon-gallery-9.png",
      "/projects/unineon-gallery-10.png"
    ],
    testimonial: {
      quote: {
        en: "Our customers love the live neon glow preview! Checkout completions jumped dramatically right after launch.",
        vi: "Khách hàng rất thích tính năng xem trước ánh sáng Neon trực quan. Tỷ lệ hoàn tất giỏ hàng tăng vọt ngay sau khi ra mắt."
      },
      author: "Sarah Jenkins",
      title: "Co-Founder, UniNeon"
    },
    brandAssets: {
      colors: ["#FF007F", "#00F0FF", "#39FF14", "#0A0A0A"],
      fonts: ["Outfit", "JetBrains Mono"],
      deliverables: [
        { en: "Interactive Neon Glow Visualizer Engine", vi: "Công cụ mô phỏng ánh sáng Neon phát sáng 3D/CSS" },
        { en: "Custom E-Commerce Checkout & Order Builder", vi: "Giao diện đặt làm sản phẩm & thanh toán e-commerce" }
      ]
    },
    relatedSlugs: ["lee-concept", "richmond-smiles"]
  }
];
