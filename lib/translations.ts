export type Language = "en" | "vi";

export const translations = {
  en: {
    // ── Language Gate ──
    gate: {
      prompt: "Select your language",
    },

    // ── Navbar ──
    nav: [
      { label: "Work", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],

    // ── Hero ──
    hero: {
      logo: "CBEC SOLUTIONS.",
      line1: "Creative",
      line2: "Technology",
      line3: "Agency.",
      tagline: "Build What Scales.",
      description:
        "CBEC Solutions is a technology agency helping businesses build brands, websites, custom software, and AI automation workflows. We combine software engineering with design to build digital products that scale.",
      trustBadge: "GMT+7 schedule aligned with Sydney & Melbourne business hours",
      scroll: "Scroll to discover",
      ctaPrimary: "View Our Work",
      ctaSecondary: "Get In Touch",
    },

    // ── Projects Gallery ──
    gallery: {
      label: "Selected Works",
      status: "In Production",
      headline1: "Selected",
      headline2: "Works.",
      description:
        "Our latest projects are currently in production, real work coming soon.",
      hover: "Coming Soon",
      comingSoon: "Coming Soon",
      viewProject: "View Project",
    },

    // ── About ──
    about: {
      label: "About",
      line1: "Reliable",
      line2: "Technical",
      line3: "Execution.",
      p1: "Based in Ho Chi Minh City, we deliver technical infrastructure and practical software solutions for your business.",
      p2: "From strategic planning to custom software development, we help you launch products reliably.",
      metric: "Digital products launched.",
    },

    // ── Services ──
    services: {
      label: "Services & Process",
      heading: "What we do",
      items: [
        {
          number: "01",
          title: "Branding & Identity",
          description:
            "We create clean visual identities that match your business goals and connect with your target audience.",
          metrics: ["Visual Identity", "Brand Guidelines", "Design System"],
        },
        {
          number: "02",
          title: "Web Development & UI/UX",
          description:
            "Fast, responsive websites designed for intuitive navigation and better conversion rates.",
          metrics: ["Custom Websites", "Framer/React", "Conversion Optimization"],
        },
        {
          number: "03",
          title: "Custom Software Solutions",
          description:
            "Internal management software, custom CRM tools, and web platforms built to streamline daily business operations.",
          metrics: ["SaaS Platforms", "Internal Tools", "System Architecture"],
        },
        {
          number: "04",
          title: "AI Automation",
          description:
            "Automated workflows and practical AI integrations to remove repetitive manual tasks and reduce overhead.",
          metrics: ["Process Automation", "AI Chatbots", "Workflow Optimization"],
        },
      ],
    },

    // ── Principles ──
    principles: {
      label: "Our Principles",
      heading1: "How we",
      heading2: "operate.",
      sub: "Five core working principles for every project.",
      items: [
        {
          number: "01",
          title: "Outcome-Driven Build.",
          description: "Every product we build focuses on solving business problems and supporting growth.",
        },
        {
          number: "02",
          title: "Clear Technical Standards.",
          description: "We use modern technology stacks to ensure maintainability and long term stability.",
        },
        {
          number: "03",
          title: "Transparent Communication.",
          description: "We share progress, feedback, and technical decisions clearly throughout the build.",
        },
        {
          number: "04",
          title: "Scalable Architecture.",
          description: "Our solutions are flexible and ready to handle business expansion when needed.",
        },
        {
          number: "05",
          title: "Focus on Code Quality.",
          description: "We emphasize clean code, reliable architecture, and consistent user interfaces.",
        },
      ],
    },

    // ── Contact ──
    contact: {
      line1: "Let's",
      line2: "Build.",
      hq: "Headquarters",
      address: "17th Floor, 72A Le Thanh Ton,\nBen Nghe Ward, District 1,\nHCMC",
      directLine: "Direct Line",
      footer: "© 2026 CBEC Solutions. All rights reserved.",
      tagline: "Vietnam & Global",
      formName: "Full Name*",
      formNamePlaceholder: "John Doe",
      formEmail: "Email Address*",
      formEmailPlaceholder: "john@company.com",
      formCompany: "Company Name*",
      formCompanyPlaceholder: "Acme Corp",
      formPhone: "Phone Number",
      formPhonePlaceholder: "+1 234 567 8900",
      formService: "How can we help you?*",
      formServiceOptions: [
        "Global Software/Web Outsourcing",
        "Website Design",
        "Branding",
        "CRM & Software",
        "AI Automation",
        "Marketing & Lead Gen",
        "Other"
      ],
      formCurrentWebsite: "Current Website",
      formCurrentWebsitePlaceholder: "https://yourcompany.com",
      formBudget: "Estimated Budget",
      formBudgetPlaceholder: "$5,000 to $10,000+",
      formMessage: "Project Details*",
      formMessagePlaceholder: "Tell us about your project, goals, and timeline...",
      formButton: "Submit Inquiry",
      formSending: "Sending...",
      formSuccess: "Message received. We will be in touch shortly.",
      formError: "Something went wrong. Please try emailing us directly.",
      formPrivacy: "We never share your information.",
    },
  },

  vi: {
    // ── Language Gate ──
    gate: {
      prompt: "Chọn ngôn ngữ của bạn",
    },

    // ── Navbar ──
    nav: [
      { label: "Dự Án", href: "#projects" },
      { label: "Về Chúng Tôi", href: "#about" },
      { label: "Dịch Vụ", href: "#services" },
      { label: "Liên Hệ", href: "#contact" },
    ],

    // ── Hero ──
    hero: {
      logo: "CBEC SOLUTIONS.",
      line1: "Creative",
      line2: "Technology",
      line3: "Agency.",
      tagline: "Build What Scales.",
      description:
        "CBEC Solutions cung cấp dịch vụ thiết kế thương hiệu, lập trình website, phát triển phần mềm và tự động hóa quy trình bằng AI. Chúng tôi tập trung vào các giải pháp công nghệ thực tế giúp doanh nghiệp vận hành hiệu quả.",
      scroll: "Cuộn để khám phá",
      ctaPrimary: "Xem dự án",
      ctaSecondary: "Liên hệ",
    },

    // ── Projects Gallery ──
    gallery: {
      label: "Dự án tiêu biểu",
      status: "Đang triển khai",
      headline1: "Dự án",
      headline2: "Tiêu biểu.",
      description:
        "Các dự án mới nhất của chúng tôi đang trong quá trình hoàn thiện và sẽ ra mắt sớm.",
      hover: "Sắp ra mắt",
      comingSoon: "Sắp ra mắt",
      viewProject: "Xem dự án",
    },

    // ── About ──
    about: {
      label: "Về chúng tôi",
      line1: "Năng lực",
      line2: "Lập trình",
      line3: "Thực tế.",
      p1: "Trụ sở tại TP.HCM, chúng tôi cung cấp dịch vụ phát triển phần mềm và giải pháp thiết kế cho doanh nghiệp.",
      p2: "Chúng tôi đồng hành từ bước tư vấn giải pháp kỹ thuật đến khi triển khai sản phẩm hoàn chỉnh.",
      metric: "Sản phẩm công nghệ đã vận hành.",
    },

    // ── Services ──
    services: {
      label: "Dịch vụ & Quy trình",
      heading: "Chúng tôi làm gì",
      items: [
        {
          number: "01",
          title: "Thương hiệu & Nhận diện",
          description:
            "Thiết kế bộ nhận diện thương hiệu rõ ràng, đồng bộ và phù hợp với khách hàng mục tiêu.",
          metrics: ["Nhận diện hình ảnh", "Bộ tiêu chuẩn thương hiệu", "Hệ thống thiết kế"],
        },
        {
          number: "02",
          title: "Phát triển Web & UI/UX",
          description:
            "Lập trình website tối ưu tốc độ, giao diện dễ sử dụng và giúp tăng tỷ lệ chuyển đổi.",
          metrics: ["Website tùy chỉnh", "Framer/React", "Tối ưu chuyển đổi"],
        },
        {
          number: "03",
          title: "Phần mềm doanh nghiệp",
          description:
            "Xây dựng phần mềm quản lý nội bộ, hệ thống CRM và ứng dụng web theo yêu cầu thực tế.",
          metrics: ["Nền tảng SaaS", "Công cụ nội bộ", "Kiến trúc hệ thống"],
        },
        {
          number: "04",
          title: "AI & Tự động hoá",
          description:
            "Tích hợp tự động hóa quy trình bằng AI giúp giảm bớt các công việc thủ công và tối ưu chi phí.",
          metrics: ["Tự động hoá quy trình", "Chatbot AI", "Tối ưu vận hành"],
        },
      ],
    },

    // ── Principles ──
    principles: {
      label: "Nguyên tắc hoạt động",
      heading1: "Cách chúng tôi",
      heading2: "vận hành.",
      sub: "Năm nguyên tắc làm việc cốt lõi trong từng dự án.",
      items: [
        {
          number: "01",
          title: "Hiệu quả thực tế.",
          description: "Mỗi sản phẩm đều hướng tới việc giải quyết bài toán kinh doanh cụ thể.",
        },
        {
          number: "02",
          title: "Tiêu chuẩn kỹ thuật.",
          description: "Sử dụng công nghệ hiện đại, đảm bảo tính ổn định và dễ bảo trì.",
        },
        {
          number: "03",
          title: "Minh bạch thông tin.",
          description: "Cập nhật tiến độ và trao đổi thông tin rõ ràng trong suốt quá trình làm việc.",
        },
        {
          number: "04",
          title: "Khả năng mở rộng.",
          description: "Cấu trúc hệ thống linh hoạt, sẵn sàng mở rộng khi doanh nghiệp phát triển.",
        },
        {
          number: "05",
          title: "Chú trọng chất lượng.",
          description: "Đề cao chất lượng mã nguồn, độ bảo mật và tính đồng bộ của giao diện.",
        },
      ],
    },

    // ── Contact ──
    contact: {
      line1: "Bắt tay",
      line2: "Vào việc.",
      hq: "Trụ sở",
      address: "Tầng 17, 72A Lê Thánh Tôn,\nPhường Bến Nghé, Quận 1,\nTP.HCM",
      directLine: "Liên hệ trực tiếp",
      footer: "© 2026 CBEC Solutions. Mọi quyền được bảo lưu.",
      tagline: "Vietnam & Global",
      formName: "Họ tên*",
      formNamePlaceholder: "Ví dụ: Nguyễn Văn A",
      formEmail: "Email*",
      formEmailPlaceholder: "email@congty.com",
      formCompany: "Tên Doanh Nghiệp*",
      formCompanyPlaceholder: "Ví dụ: Công ty TNHH ABC",
      formPhone: "Số điện thoại",
      formPhonePlaceholder: "090 123 4567",
      formService: "Bạn cần hỗ trợ mảng nào?*",
      formServiceOptions: [
        "Global Software/Web Outsourcing",
        "Thiết kế website",
        "Branding",
        "Phần mềm quản lý / CRM",
        "Tự động hóa AI",
        "Quản lý Lead / Marketing",
        "Khác"
      ],
      formCurrentWebsite: "Website hiện tại",
      formCurrentWebsitePlaceholder: "https://ten-cong-ty.com",
      formBudget: "Ngân sách dự kiến",
      formBudgetPlaceholder: "100 triệu đến 200 triệu+",
      formMessage: "Chi tiết dự án*",
      formMessagePlaceholder: "Mô tả ngắn gọn về yêu cầu và mục tiêu của bạn...",
      formButton: "Gửi yêu cầu",
      formSending: "Đang gửi...",
      formSuccess: "Đã nhận được thông tin. Chúng tôi sẽ liên hệ lại sớm nhất.",
      formError: "Có lỗi xảy ra. Vui lòng gửi email trực tiếp cho chúng tôi.",
      formPrivacy: "Thông tin của bạn được bảo mật tuyệt đối.",
    },
  },
} as const;

export type Translations = typeof translations.en;
