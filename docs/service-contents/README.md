# Thư mục Nội dung Dịch vụ (Service Contents Drafts)

Thư mục này được sử dụng để chuẩn bị, biên tập và lưu trữ nội dung thô (drafts) cho 13 trang dịch vụ của CBEC Solutions trước khi tích hợp chính thức vào database `lib/service-articles.ts`.

---

## 1. Định hướng Biên tập (Editorial Guidelines)

Dựa trên định vị thương hiệu tại `docs/ThongTinBrand.md`, nội dung các bài viết dịch vụ cần tuân thủ các quy tắc sau:
- **Triết lý:** **"Build What Sells"** và **"No fluff, no theory—just execution that drives revenue"**. Không viết sáo rỗng, tập trung vào kết quả chuyển đổi và tăng trưởng doanh thu.
- **Giọng văn (Tone of Voice):** Rõ ràng, trực diện, tự tin của B2B hiện đại, khoa học nhưng thực tế (Operator Mentality).
- **Cấu trúc chuẩn SEO:** Mỗi bài viết sẽ được xây dựng theo một khung sườn thống nhất nhằm tối ưu UX và khả năng lập chỉ mục (Index) của Google Search Bot.

---

## 2. Khung sườn bài viết dịch vụ (Service Article Template)

Mỗi dịch vụ sẽ được biên soạn trong một tệp tin Markdown độc lập với cấu trúc như sau:

```markdown
# [Tên dịch vụ] (H1)

- **Mô tả ngắn (Meta Description):** [150-160 ký tự]
- **CTA chính:** [Nút hành động]

## 1. Tổng quan & Vấn đề thực tế (Problem & Overview)
- Nêu rõ nỗi đau (Pain Point) thực tế của khách hàng trong phân khúc.
- Cách CBEC tiếp cận để giải quyết triệt để nỗi đau đó.

## 2. Giải pháp kỹ thuật & Tính năng (Features & Tech Stack)
- Các module chức năng cụ thể được xây dựng.
- Công nghệ áp dụng (Next.js, Zod, PostgreSQL, v.v.) và lý do chọn lựa (tốc độ, bảo mật, scale).

## 3. Lợi ích thương mại & ROI (Business Value)
- Tại sao giải pháp này giúp doanh nghiệp bán được hàng hoặc tối ưu chi phí (Build What Sells).
- Số liệu minh chứng dự kiến (giảm thời gian vận hành, tăng tỉ lệ chuyển đổi).

## 4. Quy trình triển khai (Work Process)
- Các bước làm việc rõ ràng (từ Discovery Call đến Launch & Support).

## 5. Câu hỏi thường gặp (FAQs)
- 3-5 câu hỏi đáp xoáy sâu vào các lo ngại thường gặp của khách hàng (chi phí phát sinh, sở hữu mã nguồn, bảo trì).
```

---

## 3. Danh sách 13 Tệp tin Biên soạn

### Thị trường Quốc tế (Global - Tiếng Anh)
1. `global_software_outsourcing.md` - Software Outsourcing in Vietnam
2. `global_web_outsourcing.md` - Web Development Outsourcing
3. `global_custom_crm.md` - Custom CRM Development
4. `global_mvp_development.md` - MVP Development
5. `global_ai_automation.md` - AI Automation & Integrations
6. `global_dedicated_team.md` - Dedicated Development Team

### Thị trường Việt Nam (Vietnam - Tiếng Việt)
7. `vi_website_doanh_nghiep.md` - Thiết kế Website Doanh nghiệp
8. `vi_branding_identity.md` - Dịch vụ Branding & Thiết kế Nhận diện
9. `vi_phan_mem_quan_ly.md` - Phần mềm Quản lý Doanh nghiệp
10. `vi_crm_sme.md` - CRM cho Doanh nghiệp nhỏ
11. `vi_tu_dong_hoa_ai.md` - Tự động hóa AI cho Doanh nghiệp
12. `vi_landing_page_ban_hang.md` - Thiết kế Landing Page Bán hàng
13. `vi_quan_ly_lead.md` - Hệ thống Quản lý Lead
