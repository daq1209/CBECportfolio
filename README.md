# CBEC Solutions - Creative Agency Portfolio Landing Page

Dự án Landing Page Portfolio chính thức của **CBEC Solutions**, một Creative Agency toàn cầu tập trung vào thị trường E-commerce và hệ sinh thái công nghệ tự động hóa. Website được xây dựng theo triết lý thương hiệu **"Build What Sells"** với thiết kế Dark Mode cao cấp, typography phong cách editorial sắc sảo và hiệu ứng chuyển động mượt mà.

---

## Công Nghệ Sử Dụng (Tech Stack)

Dự án áp dụng các công nghệ hiện đại nhất để đảm bảo hiệu suất tải trang cao, chuẩn SEO và trải nghiệm UX/UI vượt trội:

### 1. Core Framework & Language
- **Next.js 16.2.4 (App Router)**: Tận dụng các tính năng mới nhất của Next.js để tối ưu hóa SEO, Routing và Server/Client Components.
- **React 19.2.4**: Thư viện UI cốt lõi.
- **TypeScript 5.x**: Đảm bảo type-safe và giảm thiểu lỗi trong quá trình phát triển.

### 2. Styling (Giao Diện)
- **Tailwind CSS v4**: Framework CSS thế hệ mới, tối ưu hóa tốc độ build và hỗ trợ các tính năng CSS hiện đại.
- **PostCSS**: Xử lý và tiền tối ưu hóa các quy tắc CSS.
- **Google Fonts**: Load động font chữ theo ngôn ngữ được chọn:
  - **English**: `Red Hat Display` & `Red Hat Text` (phong cách thanh lịch, đậm chất B2B toàn cầu).
  - **Vietnamese**: `Be Vietnam Pro` (tối ưu hiển thị dấu tiếng Việt mà vẫn giữ được tính chất hình học vuông vức).

### 3. Animations & Interactive (Hiệu Ứng Chuyển Động)
- **Framer Motion 12**: Xử lý các hiệu ứng xuất hiện (reveal), cuộn trang (scroll transitions) và parallax.
- **GSAP 3 (GreenSock)**: Hỗ trợ kiểm soát timeline chuyển động phức tạp.
- **Lenis Scroll**: Tạo trải nghiệm cuộn trang mượt mà (smooth inertial scrolling) trên tất cả các trình duyệt và thiết bị.
- **Three.js / React Three Fiber / Drei** *(Đã cấu hình)*: Sẵn sàng để tích hợp các phần tử đồ họa 3D tương tác cao.

---

## Cấu Trúc Thư Mục (Project Structure)

```bash
cbec-landing-page/
├── app/                      # Next.js App Router (Layout & Pages)
│   ├── globals.css           # Cấu hình styles toàn cục và Tailwind v4
│   ├── layout.tsx            # Bố cục gốc (load fonts, providers, smooth scroll)
│   ├── page.tsx              # Trang Landing Page chính (gồm các sections)
│   └── icon.svg              # SVG Icon của ứng dụng
├── components/               # Các React Component tái sử dụng
│   ├── animations/           # Component liên quan đến hiệu ứng 3D/Parallax
│   │   └── CenterGraphic.tsx # Đồ họa trung tâm tương tác chuột và cuộn trang
│   ├── sections/             # Các phần chính của Landing Page
│   │   ├── SquareEditorialHero.tsx # Hero section (Định danh thương hiệu)
│   │   ├── ProjectsGallery.tsx     # Thư viện dự án dạng cuộn ngang (Desktop)
│   │   ├── AboutSection.tsx        # Giới thiệu năng lực agency
│   │   ├── ServicesSection.tsx     # Chi tiết dịch vụ & quy trình
│   │   ├── PrinciplesSection.tsx   # 6 nguyên tắc làm việc cốt lõi
│   │   └── ContactSection.tsx      # Chân trang & Thông tin liên hệ
│   ├── FontWrapper.tsx       # Tự động thay đổi Font Stack theo ngôn ngữ chọn
│   ├── LanguageGate.tsx      # Màn hình chọn ngôn ngữ ban đầu (Gate)
│   └── LanguageSwitcher.tsx  # Nút chuyển đổi nhanh ngôn ngữ
├── context/                  # Quản lý State toàn cục
│   └── LanguageContext.tsx   # Lưu trữ và cập nhật trạng thái ngôn ngữ (EN/VI)
├── docs/                     # Tài liệu thiết kế & thương hiệu
├── lib/                      # Các thư viện bổ trợ và dữ liệu tĩnh
│   └── translations.ts       # Bản dịch song ngữ Anh - Việt cho toàn bộ site
├── public/                   # Thư mục chứa tài nguyên tĩnh (Hình ảnh, SVG)
│   └── projects/             # Ảnh minh họa các dự án thực tế
├── package.json              # Khai báo script và dependencies của dự án
└── tsconfig.json             # Cấu hình TypeScript compiler
```

---

## Tính Năng Nổi Bật (Core Features)

1. **Định Vị Song Ngữ (Localization)**: 
   Hỗ trợ hoàn chỉnh hai ngôn ngữ **English (EN)** và **Tiếng Việt (VI)** thông qua React Context. Hệ thống tự động chuyển đổi phông chữ tương ứng để hiển thị đẹp nhất.
2. **Smooth Scroll & Parallax**: 
   Kết hợp **Lenis** và **Framer Motion** để tạo cảm giác cuộn mượt và chuyển động parallax chiều sâu của hệ thống lưới (Grid) cùng khối Rubik thương hiệu.
3. **Desktop Horizontal Scroll**:
   Mục **Projects Gallery (Selected Works)** tự động chuyển hướng cuộn dọc thành cuộn ngang trên màn hình Desktop, tăng tính tương tác và thẩm mỹ.
4. **Chuẩn Thiết Kế Cao Cấp (Premium Visuals)**:
   Layout sử dụng các đường kẻ tối giản (editorial grid), tương phản Dark Mode sâu phối hợp với điểm nhấn **Tech Green (#66FF80)** chuẩn định vị thương hiệu CBEC.

---

## Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Hệ Thống
- Đã cài đặt **Node.js** (Khuyên dùng v18 hoặc v20+)
- Đã cài đặt **npm** hoặc **yarn** / **pnpm**

### Các Bước Cài Đặt

1. **Clone dự án và di chuyển vào thư mục:**
   ```bash
   git clone https://github.com/daq1209/CBECportfolio.git
   cd CBECportfolio
   ```

2. **Cài đặt các gói thư viện (Dependencies):**
   ```bash
   npm install
   ```

3. **Khởi chạy môi trường phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   *Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)*

4. **Biên dịch sản phẩm (Build Production):**
   ```bash
   npm run build
   ```

5. **Chạy sản phẩm sau khi build:**
   ```bash
   npm run start
   ```

---

## Quản Lý Bảo Mật & File Nhạy Cảm

Dự án đã được cấu hình `.gitignore` chuẩn hóa nhằm ngăn chặn việc vô tình đẩy các thông tin nhạy cảm lên Git. Các tệp tin sau luôn được tự động loại bỏ khỏi lịch sử commit:
- Khóa bí mật, file chứng chỉ kết nối (`*.pem`, API keys).
- File cấu hình môi trường cục bộ (`.env`, `.env.local`, `.env.development.local`, v.v.).
- Thư mục cấu hình của IDEs (`.vscode/`, `.idea/`).
- Các file hệ điều hành sinh ra (`.DS_Store`, `Thumbs.db`).
- Thư mục lưu trữ tạm thời của AI/Agent (`.agent/`, `.agents/`, `.gemini/`).
