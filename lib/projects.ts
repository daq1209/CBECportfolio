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
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "richmond-smiles",
    title: "Richmond Smiles",
    image: "/projects/richmondsmiles.jpg",
    externalLink: "https://www.richmondsmiles.com.au/",
    category: "gallery.cat1",
    outcome: {
      en: "Dental clinic rebrand + custom web booking platform.",
      vi: "Rebranding phòng khám nha khoa + nền tảng đặt lịch chuyên sâu."
    },
    client: "Richmond Smiles Dental Group (Australia)",
    year: "2025",
    role: {
      en: "Brand Identity, UI/UX Design, Headless Next.js Build",
      vi: "Thiết kế thương hiệu, UI/UX, lập trình Next.js tốc độ cao"
    },
    overview: {
      en: "Richmond Smiles is a premium dental clinic in Melbourne, Australia. We redesigned their visual identity and custom-built a Next.js web application that connects directly to their booking engine, creating a seamless online patient journey.",
      vi: "Richmond Smiles là phòng khám nha khoa cao cấp tại Melbourne, Australia. Chúng tôi thiết kế lại bộ nhận diện và lập trình website Next.js kết nối hệ thống CRM đặt lịch riêng biệt, tối ưu trải nghiệm người bệnh."
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
      "/projects/richmondsmiles.jpg",
      "/projects/richmondsmiles.jpg"
    ]
  },
  {
    slug: "banh-mi-ngon",
    title: "Banh Mi Ngon",
    image: "/projects/5e0d1b7bdd555c0b0544 (1).jpg",
    imagePosition: "object-center",
    externalLink: "https://www.behance.net/gallery/167430343/BANH-MI-NGON",
    category: "gallery.cat6",
    outcome: {
      en: "B2B sales engagement portal & automated CRM solution.",
      vi: "Phần mềm quản lý bán hàng B2B & giải pháp tự động hóa CRM."
    },
    client: "Banh Mi Ngon",
    year: "2025",
    role: {
      en: "Software Architecture, React Admin Panel, API Integration",
      vi: "Thiết kế kiến trúc phần mềm, xây dựng React Admin, kết nối API"
    },
    overview: {
      en: "Leadoi is a dynamic B2B sales automation startup. We built their flagship enterprise portal, featuring real-time lead ingestion dashboards, custom sales pipeline visualization, and direct automated notifications.",
      vi: "Leadoi là đơn vị startup giải pháp tự động hóa kinh doanh B2B. Chúng tôi phát triển cổng quản trị cốt lõi, cung cấp dashboard cập nhật lead thời gian thực, trực quan hóa phễu bán hàng và bot cảnh báo tự động."
    },
    stats: [
      { value: "4.5x", label: { en: "Faster Lead Routing Time", vi: "Tốc độ xử lý và phân bổ lead nhanh hơn" } },
      { value: "10k+", label: { en: "Daily active leads managed", vi: "Số lượng lead xử lý mỗi ngày" } },
      { value: "85%", label: { en: "Sales productivity efficiency boost", vi: "Nâng cao năng suất làm việc của Sales" } }
    ],
    challenges: [
      {
        en: "Manually copying lead data from multi-channel forms to spreadsheets resulted in high response latency (averaging 4 hours).",
        vi: "Nhập liệu thủ công lead từ nhiều kênh quảng cáo về Excel gây trễ thời gian phản hồi khách (trung bình 4 tiếng)."
      },
      {
        en: "No central database of customer touchpoints made it impossible to attribute revenue to specific marketing campaigns.",
        vi: "Thiếu hệ thống lưu trữ dữ liệu tập trung khiến doanh nghiệp khó đo lường chính xác hiệu quả từng chiến dịch ads."
      }
    ],
    solutions: [
      {
        en: "Engineered a custom Node.js middleware to ingest, format, and route leads from Facebook, Zalo, and Webhooks instantly.",
        vi: "Phát triển hệ thống API middleware trung gian gom lead tự động từ Zalo OA, Facebook Ads và Website thời gian thực."
      },
      {
        en: "Designed a clean React/Tailwind dashboard featuring role-based dashboards for directors, sales leads, and reps.",
        vi: "Thiết kế dashboard React/Tailwind phân quyền chi tiết (RBAC) cho cấp Giám đốc, Trưởng nhóm và Nhân viên."
      }
    ],
    results: [
      {
        en: "Lead response times dropped from 4 hours to under 3 minutes, significantly boosting conversion rates.",
        vi: "Thời gian tiếp cận khách từ 4 tiếng giảm xuống dưới 3 phút, tăng đáng kể tỷ lệ chốt đơn."
      },
      {
        en: "Centralized data visualization provided management with instant, clear insights on client acquisition cost.",
        vi: "Báo cáo tập trung trực quan hóa chính xác chi phí có được một khách hàng tiềm năng."
      }
    ],
    galleryImages: [
      "/projects/383084327_122117840984033541_1787976392589229528_n.jpg"
    ]
  },
  {
    slug: "dentix-consulting",
    title: "Dentix Consulting",
    image: "/projects/84ebc9938460053e5c71.jpg",
    externalLink: "https://www.behance.net/gallery/229948819/DENTIX-CONSULTING-BRANDING",
    category: "gallery.cat6",
    outcome: {
      en: "Platform for Australian trade services and booking scheduler.",
      vi: "Ứng dụng đặt lịch thợ sửa chữa & quản lý việc cho thị trường Úc."
    },
    client: "TradieMate Australia",
    year: "2026",
    role: {
      en: "Mobile Web Platform, Interactive Calendar, Customer Flow",
      vi: "Nền tảng ứng dụng web di động, thiết kế lịch tương tác, luồng khách hàng"
    },
    overview: {
      en: "TradieMate connects Australian homeowners with local qualified trade professionals. We engineered the entire responsive web application, featuring interactive calendar bookings, automatic invoice dispatching, and localized map search.",
      vi: "TradieMate kết nối chủ nhà tại Úc với đội ngũ thợ sửa chữa lành nghề. Chúng tôi phát triển ứng dụng web tối ưu hiển thị di động, tích hợp bộ lịch đặt giờ kéo-thả, hóa đơn tự động và tìm kiếm thợ theo bản đồ vị trí."
    },
    stats: [
      { value: "15k", label: { en: "Successful Tradie Bookings", vi: "Lịch hẹn dịch vụ thành công" } },
      { value: "99.9%", label: { en: "Application Uptime Record", vi: "Thời gian hoạt động liên tục" } },
      { value: "60m", label: { en: "Average job resolution window", vi: "Thời gian phản hồi thợ trung bình" } }
    ],
    challenges: [
      {
        en: "Tradies are busy on-site and struggle to update calendars, leading to double-bookings and bad customer experience.",
        vi: "Thợ sửa chữa di chuyển liên tục khó cập nhật lịch trống, dẫn đến đặt trùng lịch và trải nghiệm tệ cho khách."
      },
      {
        en: "Homeowners need transparent, hourly quote estimates and immediate SMS updates during emergency call-outs.",
        vi: "Khách hàng cần biết bảng giá minh bạch theo giờ và nhận thông báo cập nhật qua SMS lập tức khi có sự cố khẩn cấp."
      }
    ],
    solutions: [
      {
        en: "Developed a mobile-first, drag-and-drop booking scheduler optimized for one-handed operation on active worksites.",
        vi: "Xây dựng giao diện lịch kéo-thả tối ưu hiển thị trên điện thoại để thợ cập nhật trạng thái chỉ bằng một tay."
      },
      {
        en: "Integrated Twilio API for real-time SMS status dispatches and Stripe Connect for split payments.",
        vi: "Tích hợp SMS API của Twilio thông báo trạng thái tự động và cổng thanh toán Stripe Connect chia tiền hoa hồng."
      }
    ],
    results: [
      {
        en: "Became a leading niche service booking app, scaling rapidly across Queensland and New South Wales.",
        vi: "Trở thành nền tảng tìm thợ uy tín phát triển nhanh chóng tại Queensland và New South Wales."
      },
      {
        en: "Reduced administrative scheduling overhead for tradespeople by 10+ hours per week.",
        vi: "Tiết kiệm hơn 10 tiếng mỗi tuần làm việc hành chính sắp xếp lịch biểu cho mỗi người thợ."
      }
    ],
    galleryImages: [
      "/projects/5e0d1b7bdd555c0b0544 (1).jpg"
    ]
  },
  {
    slug: "lee-concept",
    title: "Lee Concept",
    image: "/projects/lee concept.png",
    externalLink: "https://leeconcept.com.vn",
    category: "gallery.cat5",
    outcome: {
      en: "AI Automation R&D & eCommerce scaling playbooks.",
      vi: "Nghiên cứu ứng dụng AI & cẩm nang tăng trưởng eCommerce."
    },
    client: "CBEC Solutions R&D Division",
    year: "2026",
    role: {
      en: "AI Agents Research, Prompt Engineering, Scraping Bot Builds",
      vi: "Nghiên cứu Đại lý AI, thiết kế Prompt, phát triển bot cào dữ liệu"
    },
    overview: {
      en: "CBEC Lab is our internal research division. Here, we build and test AI agent structures, data enrichment bots, and growth playbooks. We release these validated findings to help our clients automate their marketing and operations.",
      vi: "CBEC Lab là phòng nghiên cứu thử nghiệm nội bộ của chúng tôi. Tại đây, chúng tôi phát triển các bot cào dữ liệu thông minh, quy trình tự động hóa AI và cẩm nang tăng trưởng, sau đó chuyển giao ứng dụng thực tế cho khách hàng."
    },
    stats: [
      { value: "24/7", label: { en: "Autonomous Agent Monitoring", vi: "Trợ lý AI hoạt động liên tục tự động" } },
      { value: "50k+", label: { en: "Enriched business leads generated", vi: "Danh sách khách hàng tiềm năng đã lọc" } },
      { value: "90%", label: { en: "Operational time saved on testing", vi: "Tiết kiệm thời gian thử nghiệm vận hành" } }
    ],
    challenges: [
      {
        en: "eCommerce sellers lose hours tracking product reviews and pricing fluctuations across competitors.",
        vi: "Người bán hàng trên sàn thương mại điện tử mất nhiều giờ tự theo dõi đánh giá và biến động giá đối thủ."
      },
      {
        en: "Traditional web scraping gets easily blocked, leading to incomplete or outdated market data.",
        vi: "Các phương pháp cào dữ liệu truyền thống dễ bị chặn khiến thông tin thu thập không đầy đủ."
      }
    ],
    solutions: [
      {
        en: "Built stealthy, AI-orchestrated scraping bots that compile competitor analytics automatically.",
        vi: "Phát triển bot thu thập dữ liệu thông minh, tự động phân tích chiến lược giá và sản phẩm của đối thủ."
      },
      {
        en: "Deployed custom OpenAI/Gemini LLM scripts to summarize review sentiment in real-time.",
        vi: "Triển khai các script AI tự động đọc hiểu và phân tích cảm xúc đánh giá của khách hàng."
      }
    ],
    results: [
      {
        en: "Created the Amazon Scale-up playbook helping partners increase conversion metrics.",
        vi: "Hoàn thiện cẩm nang tăng trưởng Amazon giúp đối tác tối ưu hóa tỷ lệ chuyển đổi sản phẩm."
      },
      {
        en: "Released 5+ open-source workflow scripts to the automation developer community.",
        vi: "Chia sẻ rộng rãi hơn 5 script quy trình tự động hóa hữu ích tới cộng đồng lập trình."
      }
    ],
    galleryImages: [
      "/projects/richmondsmiles.jpg"
    ]
  }
];
