/**
 * lib/services.ts
 *
 * Single source of truth for CBEC Solutions' service pages.
 * Maps to:
 *   - /global/services/[slug]  (Global market)
 *   - /vi/services/[slug]      (Vietnamese market)
 */

export interface ServiceDeliverable {
  en: string;
  vi: string;
}

export interface ServiceFeature {
  icon: string; // Emoji, unicode or SVG icon descriptor
  title: { en: string; vi: string };
  description: { en: string; vi: string };
}

export interface ServiceItem {
  slug: string;
  locale: "global" | "vi" | "both";
  number: string;
  name: { en: string; vi: string };
  tagline: { en: string; vi: string };
  metaDescription: { en: string; vi: string };
  overview: { en: string; vi: string };
  features: ServiceFeature[];
  deliverables: ServiceDeliverable[];
  idealFor: { en: string; vi: string };
  cta: { en: string; vi: string };
  accentColor: string; // Used for hero accent (e.g. #66FF80)
}

export const SERVICES: ServiceItem[] = [
  // ─── GLOBAL SERVICES (Outsourcing & Custom Build for International Market) ───

  {
    slug: "custom-software",
    locale: "global",
    number: "01",
    name: { en: "Custom Software Solutions", vi: "Phần Mềm Doanh Nghiệp" },
    tagline: {
      en: "Scale your development capacity with senior Vietnam-based engineers.",
      vi: "Mở rộng năng lực phát triển với kỹ sư công nghệ cao tại Việt Nam."
    },
    metaDescription: {
      en: "Top-tier software outsourcing in Vietnam. CBEC Solutions bridges global standards with local talent to deliver high-quality, cost-efficient software products.",
      vi: "Dịch vụ outsourcing phần mềm hàng đầu. CBEC Solutions kết nối tiêu chuẩn quốc tế với nhân tài Việt để cung cấp phần mềm chất lượng cao."
    },
    overview: {
      en: "Access a dedicated pool of highly skilled software developers in Vietnam. Led by senior management with international experience, we deliver clean code, Agile workflow, and reliable communication at a competitive cost structure.",
      vi: "Tiếp cận đội ngũ kỹ sư phần mềm tài năng tại Việt Nam. Dưới sự quản lý của đội ngũ có kinh nghiệm quốc tế, chúng tôi bàn giao mã nguồn sạch, quy trình Agile và giao tiếp hiệu quả với chi phí tối ưu."
    },
    features: [
      {
        icon: "zap",
        title: { en: "Senior Engineering", vi: "Đội ngũ Senior" },
        description: {
          en: "Our developers are vetted for technical excellence, architecture design patterns, and clear English communication.",
          vi: "Lập trình viên được tuyển chọn kỹ lưỡng về chuyên môn, thiết kế kiến trúc và giao tiếp tiếng Anh tốt."
        }
      },
      {
        icon: "refresh-cw",
        title: { en: "Agile Development", vi: "Quy trình Agile" },
        description: {
          en: "Weekly sprints, daily standups, and full transparency via Jira, Slack, and GitHub. You stay in control of the project lifecycle.",
          vi: "Sprint hàng tuần, standup hàng ngày và minh bạch qua Jira, Slack, GitHub. Bạn luôn nắm quyền kiểm soát."
        }
      },
      {
        icon: "shield",
        title: { en: "IP & Code Protection", vi: "Bảo mật IP" },
        description: {
          en: "Rigorous NDAs and contract structures that ensure all intellectual property remains 100% yours from day one.",
          vi: "Hợp đồng NDA nghiêm ngặt đảm bảo toàn bộ sở hữu trí tuệ thuộc về bạn 100% ngay từ ngày đầu."
        }
      }
    ],
    deliverables: [
      { en: "Dedicated Developer Allocation", vi: "Phân bổ lập trình viên chuyên trách" },
      { en: "Clean & Documented Git Repository", vi: "Kho lưu trữ Git sạch kèm tài liệu" },
      { en: "Agile Project Board & Weekly Sprint Reports", vi: "Bảng dự án Agile & Báo cáo Sprint" },
      { en: "Direct Slack & Video Sync Channels", vi: "Kênh giao tiếp Slack & Video trực tiếp" },
      { en: "Complete Intellectual Property Handover", vi: "Bàn giao hoàn toàn sở hữu trí tuệ" }
    ],
    idealFor: {
      en: "Australian SMEs, startups, and tech agencies seeking to scale engineering capacity while reducing costs by 40-60%. Perfect timezone overlap (GMT+7) means daily standups align with Sydney/Melbourne business hours.",
      vi: "Doanh nghiệp vừa và nhỏ, startup, agency công nghệ muốn tăng hiệu suất kỹ thuật và tối ưu chi phí."
    },
    cta: { en: "Scale Your Dev Team", vi: "Mở rộng đội ngũ lập trình" },
    accentColor: "#66FF80"
  },

  {
    slug: "web-development",
    locale: "global",
    number: "02",
    name: { en: "Web Development & UI/UX", vi: "Phát Triển Web & UI/UX" },
    tagline: {
      en: "High-performance, custom-coded web architectures that load instantly and scale.",
      vi: "Kiến trúc web code tay hiệu suất cao, tải trang tức thì và dễ mở rộng."
    },
    metaDescription: {
      en: "Outsource your website development to Vietnam with CBEC Solutions. Bespoke Next.js and React interfaces engineered for global performance.",
      vi: "Outsource phát triển website sang Việt Nam với CBEC. Trải nghiệm Next.js/React được thiết kế riêng tối ưu chuyển đổi."
    },
    overview: {
      en: "We design and build bespoke web experiences from scratch. No bloated themes or page builders. We utilize Next.js, Tailwind CSS, and headless CMS integrations to build lightweight, lightning-fast sites that rank on search engines and convert visitors.",
      vi: "Chúng tôi thiết kế và xây dựng trang web riêng biệt từ con số 0. Không sử dụng themes dựng sẵn. Chúng tôi dùng Next.js, Tailwind CSS, và headless CMS để xây dựng web tải nhanh, chuẩn SEO và tối ưu chuyển đổi."
    },
    features: [
      {
        icon: "rocket",
        title: { en: "Next.js Core Performance", vi: "Hiệu suất Next.js" },
        description: {
          en: "Static Site Generation (SSG) and Server-Side Rendering (SSR) to guarantee perfect Core Web Vitals and SEO rankings.",
          vi: "Static Site Generation (SSG) và Server-Side Rendering (SSR) đảm bảo Core Web Vitals hoàn hảo và tối ưu SEO."
        }
      },
      {
        icon: "palette",
        title: { en: "Tailored UI/UX Layouts", vi: "Thiết kế UI/UX May Đo" },
        description: {
          en: "Figma prototypes custom-coded to pixel-perfection. Smooth micro-animations and mobile-first layouts standard.",
          vi: "Bản vẽ Figma được lập trình hoàn hảo từng pixel. Chuyển động mượt mà và layout ưu tiên di động."
        }
      },
      {
        icon: "folder",
        title: { en: "Headless CMS Integration", vi: "Tích hợp Headless CMS" },
        description: {
          en: "Sanity or Contentful integrations allowing your marketing team to update content easily without touching code.",
          vi: "Tích hợp Sanity hoặc Contentful giúp đội ngũ marketing cập nhật nội dung dễ dàng không cần chạm code."
        }
      }
    ],
    deliverables: [
      { en: "Figma UI/UX Prototypes", vi: "Bản vẽ thiết kế UI/UX Figma" },
      { en: "Bespoke Next.js Codebase", vi: "Mã nguồn website Next.js viết riêng" },
      { en: "Headless CMS setup & training", vi: "Cài đặt & hướng dẫn dùng Headless CMS" },
      { en: "Google Lighthouse Performance Report (95+ score)", vi: "Báo cáo hiệu suất Lighthouse (điểm 95+)" },
      { en: "30 days post-launch technical support", vi: "Hỗ trợ kỹ thuật 30 ngày sau bàn giao" }
    ],
    idealFor: {
      en: "Australian SaaS companies, established agencies, and brands requiring custom web infrastructure at 50% lower cost than local development. Clear English communication, no language barriers.",
      vi: "Các công ty SaaS, agency và thương hiệu cần hạ tầng web tùy chỉnh mà không tốn chi phí nội bộ lớn."
    },
    cta: { en: "Start Your Web Build", vi: "Bắt đầu dự án website" },
    accentColor: "#33CCFF"
  },

  {
    slug: "custom-crm-development",
    locale: "global",
    number: "03",
    name: { en: "Custom CRM Development", vi: "Phát Triển CRM Tùy Chỉnh" },
    tagline: {
      en: "Ditch generic spreadsheets. Build a CRM tailored exactly to your operations.",
      vi: "Từ bỏ bảng tính Excel. Xây dựng hệ thống CRM chuẩn hóa quy trình vận hành."
    },
    metaDescription: {
      en: "Build custom CRM systems and operational dashboards. Tailored workflows, API integrations, and robust pipeline management by CBEC Solutions.",
      vi: "Xây dựng hệ thống CRM và dashboard vận hành tùy chỉnh. Chuẩn hóa workflow và tích hợp API bởi CBEC Solutions."
    },
    overview: {
      en: "Off-the-shelf CRMs are complex and filled with features you never use. We build lean, customized CRM platforms designed strictly around your specific lead flow, sales activities, and operational pipelines, boosting team productivity and removing friction.",
      vi: "Các CRM bán sẵn thường phức tạp và dư thừa tính năng. Chúng tôi xây dựng CRM tinh gọn, thiết kế hoàn toàn theo quy trình bán hàng và phễu khách hàng của riêng bạn để tối ưu năng suất đội ngũ."
    },
    features: [
      {
        icon: "bar-chart",
        title: { en: "Bespoke Lead Pipelines", vi: "Phễu Lead Tùy Chỉnh" },
        description: {
          en: "Custom status stages, lead scoring matrices, and automatic assignment logic mapped to your organization chart.",
          vi: "Các bước trạng thái riêng biệt, ma trận điểm lead và tự động chia lead theo sơ đồ tổ chức."
        }
      },
      {
        icon: "plug",
        title: { en: "Third-Party Integrations", vi: "Tích hợp Bên Thứ Ba" },
        description: {
          en: "Direct connections to your website forms, Stripe payments, Slack notifications, and automated email sequences.",
          vi: "Kết nối trực tiếp form website, thanh toán Stripe, thông báo Slack và chuỗi email tự động."
        }
      },
      {
        icon: "trending-up",
        title: { en: "Real-time Dashboards", vi: "Báo cáo Thời Gian Thực" },
        description: {
          en: "Clean visualization of conversion rates, sales revenue, representative activity, and bottleneck alerts.",
          vi: "Báo cáo trực quan tỷ lệ chuyển đổi, doanh thu sales, hiệu suất nhân viên và cảnh báo điểm nghẽn."
        }
      }
    ],
    deliverables: [
      { en: "Tailored CRM Database Schema Design", vi: "Thiết kế cơ sở dữ liệu CRM riêng" },
      { en: "Responsive Admin Panel Interface", vi: "Giao diện quản trị Admin responsive" },
      { en: "Role-Based Access Control (RBAC) setup", vi: "Phân quyền người dùng chi tiết (RBAC)" },
      { en: "API Integration Documentation", vi: "Tài liệu hướng dẫn kết nối API" },
      { en: "Interactive Team Onboarding Session", vi: "Buổi đào tạo hướng dẫn sử dụng cho team" }
    ],
    idealFor: {
      en: "Australian sales organizations outgrowing spreadsheets. Cost-effective alternative to Salesforce ($150-300/user/mo) at fraction of the price with custom workflows built for your exact process.",
      vi: "Doanh nghiệp muốn chuyển dịch khỏi Excel, nhà cung cấp dịch vụ có lịch đặt hẹn phức tạp và team vận hành."
    },
    cta: { en: "Design Your CRM Flow", vi: "Thiết kế hệ thống CRM" },
    accentColor: "#CC66FF"
  },

  {
    slug: "mvp-development",
    locale: "global",
    number: "04",
    name: { en: "MVP Development", vi: "Phát Triển MVP Cho Startup" },
    tagline: {
      en: "Go from concept to market-ready product in weeks, not months.",
      vi: "Đưa ý tưởng ra thị trường trong vài tuần thay vì nhiều tháng."
    },
    metaDescription: {
      en: "Fast-track your startup idea with CBEC Solutions. We build robust Minimum Viable Products (MVPs) designed to acquire users and attract funding.",
      vi: "Đẩy nhanh tiến độ ý tưởng startup cùng CBEC. Xây dựng phiên bản thử nghiệm MVP chất lượng cao để gọi vốn và kiểm chứng thị trường."
    },
    overview: {
      en: "We validate and build your startup core product quickly. By avoiding over-engineering and prioritizing critical features, we develop secure, functional, and scalable MVPs that prove market demand, gather early feedback, and support funding pitches.",
      vi: "Chúng tôi giúp startup tối ưu tính năng cốt lõi và phát triển nhanh. Bằng cách tập trung vào giá trị chính, chúng tôi tạo ra MVP bảo mật, hoạt động tốt và có thể mở rộng để gọi vốn hiệu quả."
    },
    features: [
      {
        icon: "lightbulb",
        title: { en: "Scope Optimization", vi: "Tối ưu Phạm Vi Tính Năng" },
        description: {
          en: "We help you trim product scope to the essential value proposition to launch fast and save capital.",
          vi: "Chúng tôi giúp bạn lọc ra tính năng cốt lõi để ra mắt sớm nhất và tiết kiệm ngân sách."
        }
      },
      {
        icon: "layers",
        title: { en: "Scalable Tech Stack", vi: "Công nghệ Dễ Mở Rộng" },
        description: {
          en: "Built using clean React/Next.js/PostgreSQL architecture so you can scale features as users grow without rewrite.",
          vi: "Sử dụng React/Next.js/PostgreSQL chuẩn hóa để nâng cấp thêm tính năng sau này không cần đập đi xây lại."
        }
      },
      {
        icon: "key",
        title: { en: "User Authentication & Stripe", vi: "Đăng nhập & Thanh toán" },
        description: {
          en: "Secure login, profile settings, database management, and Stripe billing pre-integrated to collect revenue from Day 1.",
          vi: "Tích hợp sẵn đăng nhập, hồ sơ, lưu trữ dữ liệu và cổng thanh toán Stripe để bắt đầu thu phí ngay."
        }
      }
    ],
    deliverables: [
      { en: "MVP Roadmap & Feature Specification", vi: "Lộ trình MVP & Đặc tả tính năng" },
      { en: "Interactive Figma Product Mockups", vi: "Mẫu giao diện Figma tương tác" },
      { en: "Functional Beta Application (Web/Mobile)", vi: "Ứng dụng Beta hoạt động đầy đủ" },
      { en: "Analytics & Error Tracking Setup", vi: "Cài đặt đo lường & log lỗi hệ thống" },
      { en: "Pitch-ready Product Demo Video", vi: "Video giới thiệu demo sản phẩm gọi vốn" }
    ],
    idealFor: {
      en: "Australian founders seeking seed funding or testing market fit. Build your MVP for $15-25K (vs $50-80K locally) in 4-6 weeks. Same quality, faster delivery, better price.",
      vi: "Nhà sáng lập muốn thử nghiệm ý tưởng mới, gọi vốn hoặc kiểm chứng nhu cầu thị trường."
    },
    cta: { en: "Build Your MVP", vi: "Xây dựng bản thử nghiệm MVP" },
    accentColor: "#FF8066"
  },

  {
    slug: "ai-automation",
    locale: "global",
    number: "05",
    name: { en: "AI Automation", vi: "Tự Động Hóa AI" },
    tagline: {
      en: "Automate manual operations, enrich data, and integrate LLMs into your product.",
      vi: "Tự động hóa vận hành thủ công và tích hợp AI vào quy trình làm việc."
    },
    metaDescription: {
      en: "Unlock efficiency with AI automation. We integrate OpenAI, Gemini, and custom agents to automate support, sales, and data entry.",
      vi: "Nâng cao hiệu suất bằng tự động hóa AI. Tích hợp OpenAI, Gemini và các trợ lý ảo để chăm sóc khách hàng và xử lý dữ liệu."
    },
    overview: {
      en: "We integrate modern LLM APIs (OpenAI GPT, Google Gemini, Claude) directly into your business logic. We design agents that categorize emails, process unstructured documents, automate sales outreach, and provide smart customer support, eliminating repetitive manual work.",
      vi: "Chúng tôi tích hợp các API ngôn ngữ lớn (OpenAI GPT, Google Gemini, Claude) trực tiếp vào hệ thống của bạn. Thiết kế bot phân loại email, trích xuất dữ liệu tài liệu giấy tờ, gửi email chào hàng và CSKH thông minh."
    },
    features: [
      {
        icon: "bot",
        title: { en: "Custom AI Agents", vi: "Trợ Lý AI Riêng Biệt" },
        description: {
          en: "AI agents trained on your custom knowledge base to support customer inquiries, internal compliance, or drafting reports.",
          vi: "AI được đào tạo theo tài liệu nội bộ để giải đáp thắc mắc, kiểm tra quy trình hoặc soạn thảo báo cáo."
        }
      },
      {
        icon: "settings",
        title: { en: "Workflow Automation", vi: "Tự động hóa quy trình" },
        description: {
          en: "Connecting software tools via Make, Zapier, or custom Node.js cron jobs to sync data and trigger actions automatically.",
          vi: "Kết nối các hệ thống qua Make, Zapier hoặc script tự động để đồng bộ dữ liệu và kích hoạt công việc."
        }
      },
      {
        icon: "file-text",
        title: { en: "Data Extraction & Parsing", vi: "Trích xuất & Xử lý Dữ liệu" },
        description: {
          en: "Transforming invoices, PDFs, and unstructured logs into clean JSON data structured directly into your database.",
          vi: "Chuyển hóa hóa đơn, file PDF và văn bản thô thành dữ liệu JSON cấu trúc trực tiếp vào database."
        }
      }
    ],
    deliverables: [
      { en: "AI Integration Feasibility Report", vi: "Báo cáo khả thi tích hợp AI" },
      { en: "Automated Integration Workflow Design", vi: "Thiết kế sơ đồ tự động hóa" },
      { en: "Deployed Custom AI Agent Backend", vi: "Triển khai backend cho trợ lý AI" },
      { en: "Data Pipeline & Database Sync Setup", vi: "Thiết lập đường truyền dữ liệu tự động" },
      { en: "Monitoring dashboard for API token spend", vi: "Bảng theo dõi chi phí sử dụng API token" }
    ],
    idealFor: {
      en: "Australian SMEs handling high email volumes, operations teams reducing manual data entry. AI automation at Vietnam rates (60% less than local developers) with English-fluent implementation.",
      vi: "Doanh nghiệp xử lý lượng email/tickets lớn, cần giảm thời gian nhập liệu thủ công."
    },
    cta: { en: "Automate Your Workflows", vi: "Tự động hóa bằng AI" },
    accentColor: "#FFD700"
  },

  {
    slug: "tu-dong-hoa-ai",
    locale: "vi",
    number: "05-vi",
    name: { en: "AI Automation", vi: "Tự Động Hóa AI" },
    tagline: {
      en: "Automate manual operations, enrich data, and integrate LLMs into your product.",
      vi: "Tự động hóa vận hành thủ công và tích hợp AI vào quy trình làm việc."
    },
    metaDescription: {
      en: "Unlock efficiency with AI automation. We integrate OpenAI, Gemini, and custom agents to automate support, sales, and data entry.",
      vi: "Nâng cao hiệu suất bằng tự động hóa AI. Tích hợp OpenAI, Gemini và các trợ lý ảo để chăm sóc khách hàng và xử lý dữ liệu."
    },
    overview: {
      en: "We integrate modern LLM APIs (OpenAI GPT, Google Gemini, Claude) directly into your business logic. We design agents that categorize emails, process unstructured documents, automate sales outreach, and provide smart customer support, eliminating repetitive manual work.",
      vi: "Chúng tôi tích hợp các API ngôn ngữ lớn (OpenAI GPT, Google Gemini, Claude) trực tiếp vào hệ thống của bạn. Thiết kế bot phân loại email, trích xuất dữ liệu tài liệu giấy tờ, gửi email chào hàng và CSKH thông minh."
    },
    features: [
      {
        icon: "bot",
        title: { en: "Custom AI Agents", vi: "Trợ Lý AI Riêng Biệt" },
        description: {
          en: "AI agents trained on your custom knowledge base to support customer inquiries, internal compliance, or drafting reports.",
          vi: "AI được đào tạo theo tài liệu nội bộ để giải đáp thắc mắc, kiểm tra quy trình hoặc soạn thảo báo cáo."
        }
      },
      {
        icon: "settings",
        title: { en: "Workflow Automation", vi: "Tự động hóa quy trình" },
        description: {
          en: "Connecting software tools via Make, Zapier, or custom Node.js cron jobs to sync data and trigger actions automatically.",
          vi: "Kết nối các hệ thống qua Make, Zapier hoặc script tự động để đồng bộ dữ liệu và kích hoạt công việc."
        }
      },
      {
        icon: "file-text",
        title: { en: "Data Extraction & Parsing", vi: "Trích xuất & Xử lý Dữ liệu" },
        description: {
          en: "Transforming invoices, PDFs, and unstructured logs into clean JSON data structured directly into your database.",
          vi: "Chuyển hóa hóa đơn, file PDF và văn bản thô thành dữ liệu JSON cấu trúc trực tiếp vào database."
        }
      }
    ],
    deliverables: [
      { en: "AI Integration Feasibility Report", vi: "Báo cáo khả thi tích hợp AI" },
      { en: "Automated Integration Workflow Design", vi: "Thiết kế sơ đồ tự động hóa" },
      { en: "Deployed Custom AI Agent Backend", vi: "Triển khai backend cho trợ lý AI" },
      { en: "Data Pipeline & Database Sync Setup", vi: "Thiết lập đường truyền dữ liệu tự động" },
      { en: "Monitoring dashboard for API token spend", vi: "Bảng theo dõi chi phí sử dụng API token" }
    ],
    idealFor: {
      en: "Australian SMEs handling high email volumes, operations teams reducing manual data entry. AI automation at Vietnam rates (60% less than local developers) with English-fluent implementation.",
      vi: "Doanh nghiệp xử lý lượng email/tickets lớn, cần giảm thời gian nhập liệu thủ công."
    },
    cta: { en: "Automate Your Workflows", vi: "Tự động hóa bằng AI" },
    accentColor: "#FFD700"
  },

  {
    slug: "dedicated-development-team",
    locale: "global",
    number: "06",
    name: { en: "Dedicated Development Team", vi: "Đội Ngũ Lập Trình Chuyên Trách" },
    tagline: {
      en: "Hire a fully managed software development unit focused 100% on your product.",
      vi: "Thuê đội ngũ lập trình chuyên nghiệp đồng hành dài hạn cùng dự án của bạn."
    },
    metaDescription: {
      en: "Dedicated development teams in Vietnam. Scale up your technical capability with custom-vetted teams, managed under Agile methodologies.",
      vi: "Đội ngũ dev chuyên trách tại Việt Nam. Tăng năng lực kỹ thuật với nhân sự chọn lọc riêng, làm việc độc quyền cho bạn."
    },
    overview: {
      en: "Build a custom, long-term software team in Vietnam without the setup and HR overhead. We recruit, onboard, and host your developers in our office, providing standard infrastructure, QA support, and management, while they integrate directly into your daily standups.",
      vi: "Xây dựng đội ngũ lập trình dài hạn tại Việt Nam không tốn chi phí quản lý nhân sự hay văn phòng. Chúng tôi tuyển dụng, hỗ trợ kỹ thuật và chuẩn bị văn phòng làm việc, giúp họ kết nối trực tiếp vào dự án của bạn mỗi ngày."
    },
    features: [
      {
        icon: "users",
        title: { en: "Custom Recruitment Vetting", vi: "Tuyển Chọn Theo Yêu Cầu" },
        description: {
          en: "We interview and hire candidates specifically matching your required technology stack and company culture.",
          vi: "Chúng tôi tuyển dụng ứng viên chính xác theo yêu cầu ngôn ngữ, kinh nghiệm và văn hóa của bạn."
        }
      },
      {
        icon: "building",
        title: { en: "Managed Infrastructure", vi: "Hạ Tầng Sẵn Sàng" },
        description: {
          en: "We provide high-speed internet, workstations, meeting spaces, and HR payroll management so you focus only on the code.",
          vi: "Chúng tôi chuẩn bị máy móc cấu hình tốt, văn phòng, họp hành và lo toàn bộ thủ tục hành chính, bảo hiểm."
        }
      },
      {
        icon: "handshake",
        title: { en: "Direct Daily Integration", vi: "Làm Việc Trực Tiếp Hàng Ngày" },
        description: {
          en: "The team operates on your working hours, uses your Slack channels, and reports directly to your CTO/PM.",
          vi: "Đội ngũ hoạt động theo giờ làm việc của bạn, sử dụng Slack của bạn và báo cáo trực tiếp cho CTO/PM bên bạn."
        }
      }
    ],
    deliverables: [
      { en: "Curated Candidate Portfolios & Vetting", vi: "Hồ sơ ứng viên được sàng lọc" },
      { en: "Standard Office Workstation Provisioning", vi: "Cung cấp chỗ ngồi & trang thiết bị làm việc" },
      { en: "Local HR, Payroll & Compliance Management", vi: "Quản lý nhân sự, lương thưởng & pháp lý local" },
      { en: "On-site Scrum Master oversight", vi: "Hỗ trợ giám sát chất lượng từ Scrum Master" },
      { en: "Flexible Team Scaling Options", vi: "Khả năng tăng giảm quy mô nhân sự linh hoạt" }
    ],
    idealFor: {
      en: "Australian companies needing to expand core dev capacity by 2-10+ engineers long-term. Senior developers at $40-60/hr (vs $120-180/hr locally) with daily overlap in working hours.",
      vi: "Doanh nghiệp cần mở rộng đội ngũ dev cốt lõi dài hạn từ 2 đến 10+ người ổn định."
    },
    cta: { en: "Build Your Dedicated Team", vi: "Thành lập đội ngũ chuyên trách" },
    accentColor: "#00E5FF"
  },

  // ─── VIETNAMESE LOCAL SERVICES (Tăng trưởng & Chuyển đổi số doanh nghiệp) ───

  {
    slug: "thiet-ke-website-doanh-nghiep",
    locale: "vi",
    number: "07",
    name: { en: "Enterprise Web Design", vi: "Thiết Kế Website Doanh Nghiệp" },
    tagline: {
      en: "Professional corporate websites designed to build brand trust and capture leads.",
      vi: "Thiết kế website doanh nghiệp chuẩn SEO, giao diện độc quyền và tăng tỷ lệ chuyển đổi."
    },
    metaDescription: {
      en: "Custom corporate website design in Vietnam. Highly optimized Next.js sites built for lead generation, speed, and brand credibility.",
      vi: "Thiết kế website doanh nghiệp chuyên nghiệp bởi CBEC. Website giao diện độc quyền, tải nhanh, chuẩn SEO giúp tăng lead và uy tín thương hiệu."
    },
    overview: {
      en: "We build premium, custom-designed corporate websites that act as your primary sales engine. Moving away from generic WordPress templates, we hand-code fast, SEO-friendly, and secure Next.js websites that build authority in the Vietnamese market.",
      vi: "Chúng tôi xây dựng website doanh nghiệp cao cấp với thiết kế độc quyền, đóng vai trò là cỗ máy tạo lead chính. Không dùng template WordPress dựng sẵn, chúng tôi lập trình Next.js tối ưu tốc độ, chuẩn SEO và bảo mật để khẳng định uy tín thương hiệu."
    },
    features: [
      {
        icon: "zap",
        title: { en: "Bespoke Design Vibe", vi: "Giao diện độc quyền" },
        description: {
          en: "No templates. Custom-drawn interfaces by professional UI designers tailored to your exact brand book and target audience.",
          vi: "Nói không với mẫu có sẵn. Bản thiết kế được vẽ tay riêng biệt bởi designer chuyên nghiệp, bám sát bộ nhận diện thương hiệu."
        }
      },
      {
        icon: "trending-up",
        title: { en: "SEO & Google Optimization", vi: "Tối ưu chuẩn SEO" },
        description: {
          en: "Full technical SEO implementation: structured data schema, perfect Core Web Vitals, and keyword-friendly architecture.",
          vi: "Tối ưu chuẩn kỹ thuật SEO: khai báo cấu trúc schema, đạt điểm xanh Lighthouse và cấu trúc URL chuẩn từ khóa."
        }
      },
      {
        icon: "smartphone",
        title: { en: "Perfect Mobile Experience", vi: "Tương thích di động" },
        description: {
          en: "Over 80% of traffic in Vietnam is mobile. We code fluid, responsive layouts optimized for touch interaction and slow networks.",
          vi: "Hơn 80% truy cập tại Việt Nam bằng điện thoại. Layout responsive mượt mà tối ưu cho trải nghiệm chạm vuốt."
        }
      }
    ],
    deliverables: [
      { en: "Figma UI/UX layouts (Desktop & Mobile)", vi: "Bản thiết kế giao diện Figma (Desktop & Mobile)" },
      { en: "Custom Next.js front-end source code", vi: "Toàn bộ mã nguồn website Next.js viết riêng" },
      { en: "Visual Content Management CMS integration", vi: "Tích hợp trang quản trị nội dung dễ sử dụng" },
      { en: "Local Business Schema JSON-LD setup", vi: "Cài đặt Schema Local Business tăng thứ hạng tìm kiếm" },
      { en: "3 months post-handover bug-fix warranty", vi: "Bảo hành kỹ thuật 3 tháng sau bàn giao" }
    ],
    idealFor: {
      en: "Vietnamese corporations, B2B service providers, and growing startups needing to elevate their online presence.",
      vi: "Doanh nghiệp B2B, tập đoàn và startup muốn nâng cấp hình ảnh thương hiệu chuyên nghiệp trên Internet."
    },
    cta: { en: "Discuss Website Project", vi: "Nhận tư vấn thiết kế web" },
    accentColor: "#66FF80"
  },

  {
    slug: "branding-services",
    locale: "global",
    number: "08",
    name: { en: "Branding Services", vi: "Dịch Vụ Thiết Kế Thương Hiệu" },
    tagline: {
      en: "Establish a clear brand positioning and visual identity system.",
      vi: "Xây dựng định vị và hệ thống nhận diện thương hiệu chuyên nghiệp."
    },
    metaDescription: {
      en: "Professional brand identity design in Vietnam. Visual guidelines, logo suites, and naming architecture for corporate expansion.",
      vi: "Dịch vụ thiết kế nhận diện thương hiệu. Tạo dựng logo, cẩm nang thương hiệu (Brand Guidelines) và tài sản truyền thông chuẩn quốc tế."
    },
    overview: {
      en: "Branding is not just a logo. We help businesses define their market position, build a consistent visual identity system, and produce marketing assets that communicate trust, helping you command higher margins and stand out from competitors.",
      vi: "Thương hiệu không chỉ là logo đẹp. Chúng tôi giúp doanh nghiệp xác định định vị thị trường, xây dựng hệ thống nhận diện đồng nhất và sản xuất ấn phẩm truyền thông uy tín, giúp tạo giá trị cạnh tranh vượt trội."
    },
    features: [
      {
        icon: "compass",
        title: { en: "Brand Positioning Strategy", vi: "Chiến Lược Định Vị" },
        description: {
          en: "Analyzing competitor landscape, customer personas, and defining core brand values before designing visuals.",
          vi: "Nghiên cứu đối thủ cạnh tranh, phác họa chân dung khách hàng và xác định giá trị cốt lõi trước khi thiết kế hình ảnh."
        }
      },
      {
        icon: "palette",
        title: { en: "Visual Identity System", vi: "Nhận Diện Hình Ảnh" },
        description: {
          en: "Logo suite, brand color palette, typography grid, typography rules, and usage constraints.",
          vi: "Bộ logo chuẩn, bảng màu thương hiệu, quy chuẩn font chữ và các trường hợp chống chỉ định sử dụng."
        }
      },
      {
        icon: "briefcase",
        title: { en: "Corporate Marketing Assets", vi: "Ấn Phẩm Văn Phòng & Marketing" },
        description: {
          en: "Business cards, letterheads, presentation slides, brand patterns, and social media template grids.",
          vi: "Danh thiếp, phong bì thư, slide thuyết trình, pattern thương hiệu và khung bài đăng MXH."
        }
      }
    ],
    deliverables: [
      { en: "Brand Strategy & Positioning Document", vi: "Tài liệu chiến lược định vị thương hiệu" },
      { en: "Vector Logo Suite (AI, SVG, PDF, PNG)", vi: "Bộ file logo gốc chất lượng cao đầy đủ định dạng" },
      { en: "Detailed Brand Guidelines Book (PDF)", vi: "Cẩm nang hướng dẫn sử dụng thương hiệu (PDF)" },
      { en: "Corporate Stationery Assets templates", vi: "Mẫu thiết kế ấn phẩm văn phòng" },
      { en: "Custom Canva Social Media template kit", vi: "Bộ template thiết kế bài đăng mạng xã hội trên Canva" }
    ],
    idealFor: {
      en: "New startups looking to launch, and legacy businesses seeking a modern rebrand to attract younger consumers.",
      vi: "Startup chuẩn bị ra mắt sản phẩm mới hoặc doanh nghiệp lâu năm muốn tái định vị hình ảnh hiện đại hơn."
    },
    cta: { en: "Get Brand Design Consultation", vi: "Nhận tư vấn thiết kế thương hiệu" },
    accentColor: "#33CCFF"
  },

  {
    slug: "dich-vu-branding",
    locale: "vi",
    number: "08-vi",
    name: { en: "Branding Services", vi: "Dịch Vụ Thiết Kế Thương Hiệu" },
    tagline: {
      en: "Establish a clear brand positioning and visual identity system.",
      vi: "Xây dựng định vị và hệ thống nhận diện thương hiệu chuyên nghiệp."
    },
    metaDescription: {
      en: "Professional brand identity design in Vietnam. Visual guidelines, logo suites, and naming architecture for corporate expansion.",
      vi: "Dịch vụ thiết kế nhận diện thương hiệu. Tạo dựng logo, cẩm nang thương hiệu (Brand Guidelines) và tài sản truyền thông chuẩn quốc tế."
    },
    overview: {
      en: "Branding is not just a logo. We help businesses define their market position, build a consistent visual identity system, and produce marketing assets that communicate trust, helping you command higher margins and stand out from competitors.",
      vi: "Thương hiệu không chỉ là logo đẹp. Chúng tôi giúp doanh nghiệp xác định định vị thị trường, xây dựng hệ thống nhận diện đồng nhất và sản xuất ấn phẩm truyền thông uy tín, giúp tạo giá trị cạnh tranh vượt trội."
    },
    features: [
      {
        icon: "compass",
        title: { en: "Brand Positioning Strategy", vi: "Chiến Lược Định Vị" },
        description: {
          en: "Analyzing competitor landscape, customer personas, and defining core brand values before designing visuals.",
          vi: "Nghiên cứu đối thủ cạnh tranh, phác họa chân dung khách hàng và xác định giá trị cốt lõi trước khi thiết kế hình ảnh."
        }
      },
      {
        icon: "palette",
        title: { en: "Visual Identity System", vi: "Nhận Diện Hình Ảnh" },
        description: {
          en: "Logo suite, brand color palette, typography grid, typography rules, and usage constraints.",
          vi: "Bộ logo chuẩn, bảng màu thương hiệu, quy chuẩn font chữ và các trường hợp chống chỉ định sử dụng."
        }
      },
      {
        icon: "briefcase",
        title: { en: "Corporate Marketing Assets", vi: "Ấn Phẩm Văn Phòng & Marketing" },
        description: {
          en: "Business cards, letterheads, presentation slides, brand patterns, and social media template grids.",
          vi: "Danh thiếp, phong bì thư, slide thuyết trình, pattern thương hiệu và khung bài đăng MXH."
        }
      }
    ],
    deliverables: [
      { en: "Brand Strategy & Positioning Document", vi: "Tài liệu chiến lược định vị thương hiệu" },
      { en: "Vector Logo Suite (AI, SVG, PDF, PNG)", vi: "Bộ file logo gốc chất lượng cao đầy đủ định dạng" },
      { en: "Detailed Brand Guidelines Book (PDF)", vi: "Cẩm nang hướng dẫn sử dụng thương hiệu (PDF)" },
      { en: "Corporate Stationery Assets templates", vi: "Mẫu thiết kế ấn phẩm văn phòng" },
      { en: "Custom Canva Social Media template kit", vi: "Bộ template thiết kế bài đăng mạng xã hội trên Canva" }
    ],
    idealFor: {
      en: "New startups looking to launch, and legacy businesses seeking a modern rebrand to attract younger consumers.",
      vi: "Startup chuẩn bị ra mắt sản phẩm mới hoặc doanh nghiệp lâu năm muốn tái định vị hình ảnh hiện đại hơn."
    },
    cta: { en: "Get Brand Design Consultation", vi: "Nhận tư vấn thiết kế thương hiệu" },
    accentColor: "#33CCFF"
  },

  {
    slug: "phan-mem-quan-ly-doanh-nghiep",
    locale: "vi",
    number: "09",
    name: { en: "Enterprise Management Software", vi: "Phần Mềm Quản Lý Doanh Nghiệp" },
    tagline: {
      en: "Bespoke operations tools, databases, and reporting systems for Vietnamese business models.",
      vi: "Xây dựng phần mềm nội bộ, quản lý kho bãi, nhân sự và báo cáo theo yêu cầu."
    },
    metaDescription: {
      en: "Custom operations software and internal tools in Vietnam. Build ERP/CRM software tailored strictly to your operations.",
      vi: "Thiết kế phần mềm quản lý doanh nghiệp riêng biệt. Số hóa vận hành, quản lý kho, nhân sự và báo cáo trực quan."
    },
    overview: {
      en: "Avoid heavy, complex software. We build clean, lightweight management web portals designed exactly around your team's real operational steps in Vietnam. From warehouse inventory tracking to employee timesheets and automated invoice flows.",
      vi: "Không còn đau đầu vì phần mềm sẵn có quá phức tạp. Chúng tôi thiết kế các cổng thông tin quản lý nội bộ tinh gọn, chuẩn xác theo quy trình thực tế của doanh nghiệp Việt. Từ quản lý tồn kho, chấm công nhân sự đến tự động hóa hóa đơn."
    },
    features: [
      {
        icon: "settings",
        title: { en: "Workflow Digitization", vi: "Số Hóa Quy Trình Thực Tế" },
        description: {
          en: "We map your offline paperwork, spreadsheets, and manual approvals into a single, cloud-based platform.",
          vi: "Chuyển đổi toàn bộ giấy tờ offline, bảng tính Excel phức tạp và quy trình duyệt thủ công lên một nền tảng cloud duy nhất."
        }
      },
      {
        icon: "lock",
        title: { en: "Role-Based Permissions", vi: "Phân Quyền Chi Tiết" },
        description: {
          en: "Strict access control ensuring managers, staff, accounting, and partners only see authorized data fields.",
          vi: "Kiểm soát truy cập chặt chẽ, nhân viên chỉ xem thông tin trong phạm vi phụ trách, quản lý nắm báo cáo tổng."
        }
      },
      {
        icon: "bar-chart",
        title: { en: "Internal Dashboard Reporting", vi: "Báo Cáo Tự Động" },
        description: {
          en: "Automated calculations of inventory velocity, employee hours, operational cost, and revenue charts.",
          vi: "Tự động thống kê số liệu xuất nhập kho, công nợ, hiệu suất nhân viên và biểu đồ doanh thu trực quan."
        }
      }
    ],
    deliverables: [
      { en: "Operations Blueprint & Database Schema", vi: "Sơ đồ luồng vận hành & Cấu trúc database" },
      { en: "Responsive Custom Web Portal Platform", vi: "Nền tảng phần mềm web chạy mượt trên mọi thiết bị" },
      { en: "Role-Based Access Security framework", vi: "Phân quyền bảo mật người dùng" },
      { en: "User Acceptance Testing (UAT) documentation", vi: "Biên bản bàn giao kiểm thử UAT chi tiết" },
      { en: "Staff Operations Training Video Guides", vi: "Video hướng dẫn vận hành chi tiết cho nhân viên" }
    ],
    idealFor: {
      en: "SMEs with high manual operational tracking, manufacturing setups, and sales teams requiring custom workflows.",
      vi: "Doanh nghiệp sản xuất, dịch vụ có quy trình vận hành thủ công nhiều điểm chạm và muốn số hóa."
    },
    cta: { en: "Request Software Demo", vi: "Yêu cầu tư vấn giải pháp phần mềm" },
    accentColor: "#CC66FF"
  },

  {
    slug: "crm-cho-doanh-nghiep-nho",
    locale: "vi",
    number: "10",
    name: { en: "SME CRM Systems", vi: "Hệ Thống CRM Cho Doanh Nghiệp Nhỏ" },
    tagline: {
      en: "Capture leads from all channels and optimize your sales team output.",
      vi: "Quản lý phễu khách hàng, theo dõi lịch sử tư vấn và tăng doanh số sales."
    },
    metaDescription: {
      en: "Custom CRM systems for SMEs in Vietnam. Keep track of customer history, pipeline stages, and conversion metrics.",
      vi: "Thiết kế CRM cho doanh nghiệp nhỏ. Gom lead tự động từ website, quản lý lịch sử CSKH và đo lường tỷ lệ chốt sales."
    },
    overview: {
      en: "Lose zero leads. Our custom CRM solutions automatically capture prospects from your website, social media, and landing pages, storing them in a central pipeline. Sales representatives get automatic reminders, customer history, and performance stats.",
      vi: "Không để lọt bất kỳ khách hàng tiềm năng nào. Giải pháp CRM tùy chỉnh gom lead tự động từ mọi nguồn về một nơi. Hỗ trợ sales theo dõi lịch sử tư vấn, nhận nhắc nhở chăm sóc và quản lý phễu chốt đơn hiệu quả."
    },
    features: [
      {
        icon: "target",
        title: { en: "Automated Lead Funnels", vi: "Phễu Lead Tự Động" },
        description: {
          en: "Capture contact requests instantly. Distribute leads to sales agents automatically based on rotation or performance.",
          vi: "Gom lead từ form liên hệ ngay lập tức. Tự động chia khách hàng cho nhân viên tư vấn theo quy tắc xoay vòng."
        }
      },
      {
        icon: "phone",
        title: { en: "Customer Interaction History", vi: "Lịch Sử Tư Vấn Chi Tiết" },
        description: {
          en: "Save phone notes, chat summaries, purchase values, and email correspondence on a single timeline page.",
          vi: "Lưu trữ nhật ký cuộc gọi, nội dung trao đổi, lịch sử mua hàng và email trên một dòng thời gian duy nhất."
        }
      },
      {
        icon: "bar-chart",
        title: { en: "Sales Rep Conversion Tracking", vi: "Đo Lường Hiệu Suất Sales" },
        description: {
          en: "Clear reporting on how many leads were assigned, contacted, qualified, and won by each representative.",
          vi: "Thống kê số lượng khách được chia, tỷ lệ liên hệ thành công và tỷ lệ chốt đơn của từng nhân sự."
        }
      }
    ],
    deliverables: [
      { en: "Lead Pipeline Stage Mapping Blueprint", vi: "Sơ đồ phễu bán hàng & Quy trình xử lý lead" },
      { en: "Custom Sales CRM Web Application", vi: "Phần mềm Web CRM quản lý khách hàng" },
      { en: "Integrated Customer Database system", vi: "Hệ thống lưu trữ thông tin khách hàng tập trung" },
      { en: "Automated Lead Assignment rules engine", vi: "Cấu hình phân chia lead tự động cho sales" },
      { en: "Admin Dashboard with conversion metrics", vi: "Báo cáo doanh số & Tỷ lệ chuyển đổi tổng quan" }
    ],
    idealFor: {
      en: "Service companies, real estate brokers, education centers, and sales teams of 5-50+ representatives.",
      vi: "Trung tâm đào tạo, dịch vụ B2B, bất động sản và các team sales cần theo sát khách hàng dài hạn."
    },
    cta: { en: "Design Your CRM System", vi: "Xây dựng hệ thống CRM" },
    accentColor: "#FF8066"
  },

  {
    slug: "tu-dong-hoa-ai-cho-doanh-nghiep",
    locale: "vi",
    number: "11",
    name: { en: "Enterprise AI Automation", vi: "Tự Động Hóa AI Cho Doanh Nghiệp" },
    tagline: {
      en: "Integrate smart AI assistants and automated message responses to save operation time.",
      vi: "Tích hợp trợ lý AI chăm sóc khách hàng và tự động hóa quy trình nội bộ."
    },
    metaDescription: {
      en: "AI automation for Vietnamese businesses. Train AI agents on internal knowledge, automate customer support, and sync databases.",
      vi: "Dịch vụ AI automation cho doanh nghiệp. Huấn luyện trợ lý ảo trả lời fanpage, tự động hóa xử lý văn bản và tối ưu nhân sự."
    },
    overview: {
      en: "Optimize operational costs with artificial intelligence. We help you train AI assistants that resolve up to 80% of common customer questions, automatically write reports, parse invoice PDFs, and trigger automatic data updates across software applications.",
      vi: "Tối ưu hóa chi phí và thời gian vận hành bằng trí tuệ nhân tạo. Chúng tôi thiết kế trợ lý AI giải đáp nhanh 80% thắc mắc khách hàng, tự động làm báo cáo, trích xuất thông tin hóa đơn PDF và liên kết dữ liệu giữa các phần mềm."
    },
    features: [
      {
        icon: "bot",
        title: { en: "Knowledge-Trained AI Support", vi: "Trợ Lý AI Chăm Sóc Khách Hàng" },
        description: {
          en: "Trained on your company pricing, policies, and FAQs to reply accurately without human intervention.",
          vi: "Được huấn luyện theo dữ liệu sản phẩm, chính sách của bạn để phản hồi khách hàng chính xác và tự nhiên."
        }
      },
      {
        icon: "plug",
        title: { en: "API Workflow Integration", vi: "Liên Kết Quy Trình Tự Động" },
        description: {
          en: "Syncing data automatically between CRM, sheets, ERP, and messaging channels using automation tools.",
          vi: "Đồng bộ dữ liệu tự động giữa CRM, Zalo, Fanpage và Google Sheets thông qua các kịch bản tự động hóa."
        }
      },
      {
        icon: "search",
        title: { en: "OCR Invoice & Contract Parsing", vi: "Trích Xuất Hóa Đơn & Hợp Đồng" },
        description: {
          en: "AI scans paper bills, input data, and uploads records to your internal accounting software automatically.",
          vi: "AI quét ảnh chụp hóa đơn, hợp đồng PDF, tự động lấy thông tin số liệu nhập vào hệ thống kế toán."
        }
      }
    ],
    deliverables: [
      { en: "AI Automation Opportunity Blueprint", vi: "Bản phân tích cơ hội ứng dụng tự động hóa AI" },
      { en: "Knowledge-base trained AI chatbot backend", vi: "Backend trợ lý AI được nạp dữ liệu tài liệu doanh nghiệp" },
      { en: "Automated workflow flows (Make/Node-RED)", vi: "Hệ thống kịch bản tự động hóa (Make hoặc Node-RED)" },
      { en: "API connector to internal databases", vi: "Cổng kết nối API đồng bộ cơ sở dữ liệu nội bộ" },
      { en: "1 month monitoring & prompt tuning", vi: "1 tháng giám sát hiệu suất & tinh chỉnh prompt" }
    ],
    idealFor: {
      en: "Retail stores, booking agencies, service providers, and business owners wanting to automate back-office operations.",
      vi: "Thương hiệu bán lẻ, đại lý, dịch vụ có lượng tin nhắn lớn và nhiều tác vụ văn phòng lặp đi lặp lại."
    },
    cta: { en: "Consult on AI Strategy", vi: "Nhận tư vấn giải pháp AI" },
    accentColor: "#FFD700"
  },

  {
    slug: "thiet-ke-landing-page-ban-hang",
    locale: "vi",
    number: "12",
    name: { en: "High-conversion Landing Pages", vi: "Thiết Kế Landing Page Bán Hàng" },
    tagline: {
      en: "Vibrant, high-converting product pages optimized for Facebook, TikTok, and Google ad campaigns.",
      vi: "Landing page bán hàng tối ưu chuyển đổi, tốc độ tải trang < 1.5 giây cho chạy quảng cáo."
    },
    metaDescription: {
      en: "High-performing sales landing pages. Engineered in Next.js for high speed, custom layout design, and maximum lead capture rates.",
      vi: "Thiết kế landing page chạy quảng cáo chuyên nghiệp. Lập trình Next.js tải trang cực nhanh, tối ưu phễu đăng ký."
    },
    overview: {
      en: "Double your advertising ROI. We design and hand-code sales landing pages that focus strictly on product value, clear social proof, and simple lead forms. Engineered to load in under 1.5 seconds, ensuring visitors do not bounce before reading your offer.",
      vi: "Tối ưu chi phí quảng cáo (FB/TikTok/Google Ads). Chúng tôi thiết kế và code tay landing page tập trung phô diễn thế mạnh sản phẩm, hiển thị feedback thuyết phục và nút mua hàng nổi bật. Website tải dưới 1.5 giây giúp giảm tỷ lệ thoát trang."
    },
    features: [
      {
        icon: "zap",
        title: { en: "Under 1.5s Load Speed", vi: "Tải trang dưới 1.5 giây" },
        description: {
          en: "Speed prevents bounce. We hand-code our pages with light components, compressed WebP images, and clean styling.",
          vi: "Tốc độ giữ chân khách hàng. Lập trình tối giản mã nguồn, nén ảnh WebP/AVIF tối đa để tải trang tức thì."
        }
      },
      {
        icon: "target",
        title: { en: "AIDA Copywriting Flow", vi: "Copywriting Theo Phễu AIDA" },
        description: {
          en: "Content structured systematically to capture Attention, build Interest, generate Desire, and drive Action.",
          vi: "Nội dung sắp xếp khoa học: Gây chú ý, Tạo thích thú, Kích thích ham muốn và Thúc đẩy hành động mua."
        }
      },
      {
        icon: "plug",
        title: { en: "Ad Pixels & Analytics Setup", vi: "Cài Đặt Pixel Quảng Cáo" },
        description: {
          en: "Pre-integrated Facebook Pixel, TikTok Pixel, Google Tag Manager, and UTM campaign tracking codes.",
          vi: "Tích hợp sẵn mã kiểm đo lường Facebook Pixel, TikTok Pixel và Google Analytics để theo dõi chuyển đổi Ads."
        }
      }
    ],
    deliverables: [
      { en: "High-fidelity Landing Page Figma layout", vi: "Bản thiết kế giao diện chi tiết trên Figma" },
      { en: "Next.js Single-Page Application source code", vi: "Mã nguồn trang Next.js chạy độc lập" },
      { en: "Integrated Lead Capture validation form", vi: "Form đăng ký có xác thực dữ liệu đầu vào" },
      { en: "Conversion Pixel & tracking code injection", vi: "Cài đặt đầy đủ mã đo lường quảng cáo" },
      { en: "Domain mapping & DNS configuration support", vi: "Hỗ trợ trỏ tên miền và cấu hình hosting" }
    ],
    idealFor: {
      en: "eCommerce sellers launching new products, real estate teams, aesthetic clinics, and courses seeking online registrations.",
      vi: "Thương hiệu bán lẻ, bất động sản, trung tâm đào tạo, thẩm mỹ viện cần gom danh sách khách đăng ký."
    },
    cta: { en: "Build Landing Page", vi: "Bắt đầu thiết kế Landing Page" },
    accentColor: "#00E5FF"
  },

  {
    slug: "he-thong-quan-ly-lead",
    locale: "vi",
    number: "13",
    name: { en: "Multi-channel Lead System", vi: "Hệ Thống Quản Lý Lead Đa Kênh" },
    tagline: {
      en: "Unify prospective inquiries from Zalo, Facebook, TikTok Shop, and website into one sales dashboard.",
      vi: "Gom và tự động quản lý lead từ Zalo, Facebook Fanpage, TikTok Shop về CRM."
    },
    metaDescription: {
      en: "Multi-channel lead management system. Automatically route incoming leads from social media pages directly to your sales pipeline.",
      vi: "Hệ thống gom lead đa kênh tự động. Kết nối tin nhắn Zalo, Facebook, TikTok và form website về phễu xử lý của sales."
    },
    overview: {
      en: "Say goodbye to missed messages. We build unified workflows that monitor chat comments, Zalo OA direct messages, Facebook leads, and website forms. The moment a user interacts, their contact is structured and routed to your sales team with automatic desktop alerts.",
      vi: "Kết thúc tình trạng bỏ sót tin nhắn của khách hàng. Chúng tôi xây dựng hệ thống tự động nhận diện bình luận, tin nhắn Zalo OA, Fanpage, TikTok Shop và form website. Ngay khi khách để lại thông tin, dữ liệu được chuyển thẳng về sales kèm cảnh báo."
    },
    features: [
      {
        icon: "plug",
        title: { en: "Multi-channel API Connectors", vi: "Kết Nối API Đa Nguồn" },
        description: {
          en: "Direct integration using official Webhook APIs from Zalo, Meta Graph, TikTok Developer Portal.",
          vi: "Tích hợp trực tiếp thông qua cổng API chính thức từ Zalo OA, Facebook Meta Graph và TikTok Shop."
        }
      },
      {
        icon: "bell",
        title: { en: "Instant Telegram/Slack Alerts", vi: "Cảnh Báo Lead Mới Tức Thì" },
        description: {
          en: "Trigger instant notifications to your sales group chat on Telegram or Slack with customer phone and product choice.",
          vi: "Gửi thông báo có khách mới tức thì vào group Telegram/Slack kèm số điện thoại và sản phẩm quan tâm."
        }
      },
      {
        icon: "trending-up",
        title: { en: "Central Customer History", vi: "Giao Diện Quản Lý Tập Trung" },
        description: {
          en: "View message history, source tracking (which ad campaign brought them in), and pipeline tracking in one portal.",
          vi: "Xem chi tiết nguồn lead (đến từ bài viết hay chiến dịch quảng cáo nào), lịch sử chat và quản lý phễu."
        }
      }
    ],
    deliverables: [
      { en: "Lead Pipeline Integration Architecture Map", vi: "Sơ đồ kiến trúc liên kết luồng lead đa kênh" },
      { en: "Unified CRM Integration Middleware backend", vi: "Backend trung gian kết nối các API tin nhắn mạng xã hội" },
      { en: "Telegram/Slack Notification Bot integration", vi: "Cấu hình bot thông báo khách mới qua Telegram/Slack" },
      { en: "UTM Traffic Attribution tracking setup", vi: "Thiết lập đo lường phân bổ nguồn quảng cáo UTM" },
      { en: "System Status & API Logging portal", vi: "Trang theo dõi trạng thái kết nối & nhật ký API" }
    ],
    idealFor: {
      en: "Vietnamese retail companies running intensive social ads, customer call centers, and multi-member sales departments.",
      vi: "Doanh nghiệp chạy quảng cáo Facebook/TikTok/Zalo lớn, có đội sales đông cần xử lý data nhanh."
    },
    cta: { en: "Unify Your Lead Flow", vi: "Gom hệ thống Lead đa kênh" },
    accentColor: "#CC66FF"
  }
];
