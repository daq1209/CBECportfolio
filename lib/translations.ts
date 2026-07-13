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
        "CBEC Solutions is a creative technology agency helping businesses build brands, websites, custom software, and AI automation workflows. We combine reliable engineering with strategic design to build digital products that scale.",
      trustBadge: "GMT+7 → Perfect overlap with Sydney & Melbourne business hours",
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
        "Our latest projects are currently in production — real work, coming soon.",
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
      p1: "Based in Ho Chi Minh City, we deliver the creative and technical infrastructure your business needs to stand out.",
      p2: "From strategic branding to complex software architectures, we bridge the gap between vision and reliable execution.",
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
            "We craft compelling visual identities that resonate with your target audience and establish a dominant market presence.",
          metrics: ["Visual Identity", "Brand Guidelines", "Creative Direction"],
        },
        {
          number: "02",
          title: "Web Development & UI/UX",
          description:
            "High-performance, award-winning websites designed for seamless user experiences and maximum conversion rates.",
          metrics: ["Custom Websites", "Framer/React", "Conversion Optimization"],
        },
        {
          number: "03",
          title: "Custom Software Solutions",
          description:
            "Bespoke internal tools, CRM systems, and scalable SaaS platforms designed with a focus on UX to streamline your business operations and drive efficiency.",
          metrics: ["SaaS Platforms", "Internal Tools", "System Architecture"],
        },
        {
          number: "04",
          title: "AI Automation",
          description:
            "Intelligent automation systems and AI-powered workflows that eliminate repetitive tasks, reduce operational costs, and boost your team's productivity.",
          metrics: ["Process Automation", "AI Chatbots", "Workflow Optimization"],
        },
      ],
    },

    // ── Principles ──
    principles: {
      label: "Our Principles",
      heading1: "How we",
      heading2: "operate.",
      sub: "Five non-negotiable principles that define every engagement.",
      items: [
        {
          number: "01",
          title: "Value-Driven Execution.",
          description: "Every product we build must deliver clear business value and drive revenue.",
        },
        {
          number: "02",
          title: "Global Standards.",
          description: "We build robust architectures and premium designs that meet top-tier international standards.",
        },
        {
          number: "03",
          title: "Radical Transparency.",
          description: "We communicate challenges and decisions with brutal honesty.",
        },
        {
          number: "04",
          title: "Agile & Scalable.",
          description: "Our technology solutions are flexible and ready to scale with your business.",
        },
        {
          number: "05",
          title: "Quality over Quantity.",
          description: "We prioritize code quality, system architecture, and design consistency above all.",
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
      tagline: "Vietnam → Global",
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
      formBudgetPlaceholder: "$5,000 - $10,000+",
      formMessage: "Project Details*",
      formMessagePlaceholder: "Tell us about your project, goals, and timeline...",
      formButton: "Submit Inquiry",
      formSending: "Sending...",
      formSuccess: "Message received. We'll be in touch shortly.",
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
        "CBEC Solutions là đối tác công nghệ sáng tạo, giúp doanh nghiệp xây dựng thương hiệu, website, phần mềm và tự động hoá AI. Chúng tôi kết hợp năng lực kỹ thuật vững chắc và tư duy thiết kế chiến lược để tạo ra các sản phẩm số có khả năng mở rộng.",
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
        "Những dự án mới nhất của chúng tôi đang được triển khai. Việc thật, kết quả thật — sắp ra mắt.",
      hover: "Sắp ra mắt",
      comingSoon: "Sắp ra mắt",
      viewProject: "Xem dự án",
    },

    // ── About ──
    about: {
      label: "Về chúng tôi",
      line1: "Năng lực",
      line2: "Thực thi",
      line3: "Đáng tin.",
      p1: "Có trụ sở tại TP.HCM, chúng tôi cung cấp hạ tầng kỹ thuật và giải pháp sáng tạo để doanh nghiệp của bạn bứt phá.",
      p2: "Từ chiến lược thương hiệu đến kiến trúc phần mềm phức tạp, chúng tôi là cầu nối giữa tầm nhìn và năng lực thực thi.",
      metric: "Sản phẩm kỹ thuật số đã vận hành.",
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
            "Làm nhận diện thương hiệu rõ ràng, đúng tệp khách hàng và giúp bạn nổi bật thực sự so với đối thủ.",
          metrics: ["Nhận diện hình ảnh", "Bộ tiêu chuẩn thương hiệu", "Định hướng sáng tạo"],
        },
        {
          number: "02",
          title: "Phát triển Web & UI/UX",
          description:
            "Thiết kế và lập trình website chạy nhanh, dễ dùng và tối ưu để khách truy cập mua hàng.",
          metrics: ["Website tùy chỉnh", "Framer/React", "Tối ưu chuyển đổi"],
        },
        {
          number: "03",
          title: "Phần mềm doanh nghiệp",
          description:
            "Viết phần mềm nội bộ, CRM và SaaS. Giúp doanh nghiệp của bạn tự động hóa công việc và vận hành trơn tru hơn.",
          metrics: ["Nền tảng SaaS", "Công cụ nội bộ", "Kiến trúc hệ thống"],
        },
        {
          number: "04",
          title: "AI & Tự động hoá",
          description:
            "Xây dựng hệ thống tự động hoá và luồng làm việc bằng AI giúp loại bỏ các tác vụ lặp lại, giảm chi phí vận hành và tăng hiệu suất.",
          metrics: ["Tự động hoá quy trình", "Chatbot AI", "Tối ưu vận hành"],
        },
      ],
    },

    // ── Principles ──
    principles: {
      label: "Nguyên tắc hoạt động",
      heading1: "Cách chúng tôi",
      heading2: "vận hành.",
      sub: "Năm nguyên tắc làm việc cốt lõi của chúng tôi.",
      items: [
        {
          number: "01",
          title: "Thực thi tạo giá trị.",
          description: "Sản phẩm công nghệ phải mang lại giá trị kinh doanh và thúc đẩy tăng trưởng thực sự.",
        },
        {
          number: "02",
          title: "Tiêu chuẩn quốc tế.",
          description: "Kiến trúc hệ thống mạnh mẽ và thiết kế cao cấp, đáp ứng những tiêu chuẩn khắt khe nhất.",
        },
        {
          number: "03",
          title: "Minh bạch tuyệt đối.",
          description: "Giao tiếp trung thực, quy trình minh bạch, không giấu giếm rủi ro kỹ thuật.",
        },
        {
          number: "04",
          title: "Linh hoạt & Mở rộng.",
          description: "Giải pháp công nghệ linh hoạt, sẵn sàng mở rộng cùng sự phát triển của doanh nghiệp.",
        },
        {
          number: "05",
          title: "Chất lượng trên số lượng.",
          description: "Đề cao chất lượng code, tư duy kiến trúc hệ thống và tính nhất quán trong thiết kế.",
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
      tagline: "Vietnam → Global",
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
      formBudgetPlaceholder: "100tr - 200tr+",
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
