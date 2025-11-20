"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import type { BlogPost } from "@/lib/blogData";
import { blogPosts } from "@/lib/blogData";
import BlogCard from "./BlogCard";
import { useRef } from "react";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

interface BlogDetailClientProps {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className={`${displaySerif.variable} min-h-screen bg-white`}>
      {/* Hero Section with Parallax */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-20"
        >
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-white/90 hover:text-white text-[11px] tracking-[0.25em] uppercase transition-colors duration-300"
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                strokeWidth={1.5}
              />
              QUAY LẠI BLOG
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block bg-white/90 backdrop-blur-sm px-6 py-2 text-[10px] tracking-[0.25em] uppercase text-[#3b4417] font-semibold">
              {post.categoryLabel}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[32px] md:text-[48px] lg:text-[56px] leading-tight tracking-widest uppercase text-white font-semibold max-w-4xl mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-white/90 text-[11px] tracking-[0.2em] uppercase"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" strokeWidth={1.5} />
              {post.author}
            </span>
            <span className="h-px w-4 bg-white/40" />
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              {post.date}
            </span>
            <span className="h-px w-4 bg-white/40" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {post.readTime}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Share button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex justify-end"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 border border-[#c8c8a3] px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-[#3b4417] hover:border-[#3b4417] transition-all duration-300"
            >
              <Share2 className="w-4 h-4" strokeWidth={1.5} />
              CHIA SẺ
            </motion.button>
          </motion.div>

          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-[18px] md:text-[20px] leading-relaxed text-neutral-700 tracking-wide mb-12 font-medium">
              {post.excerpt}
            </p>

            <div className="space-y-6 text-[#5d4e37] leading-relaxed text-lg">
              <p>
                Rượu vang không chỉ là một thức uống – đó là sự kết tinh của
                lịch sử, khí hậu, thổ nhưỡng và bàn tay con người. Mỗi chai vang
                là một câu chuyện được viết bằng thời gian, là khoảnh khắc giao
                thoa giữa nghệ thuật và khoa học. Khi hiểu sâu hơn về rượu vang,
                bạn sẽ khám phá được thế giới hương vị phong phú, tinh tế và đầy
                chiều sâu, nơi mỗi giọt rượu đều mang trong mình linh hồn của
                vùng đất nơi chúng được sinh ra.
              </p>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                Lịch Sử và Nguồn Gốc
              </h2>
              <p>
                Hành trình của rượu vang bắt đầu hơn 8.000 năm trước tại vùng
                Caucasus – nơi ngày nay là Gruzia. Từ đó, rượu vang lan rộng đến
                Ai Cập cổ đại, Hy Lạp, rồi đế chế La Mã – những nền văn minh đã
                xem vang như biểu tượng của tôn giáo, triết học và sự hưng
                thịnh. Khi La Mã mở rộng lãnh thổ, nghệ thuật làm vang lan khắp
                châu Âu, đặc biệt là Pháp, Ý, Tây Ban Nha và Bồ Đào Nha – những
                quốc gia trở thành cột trụ của ngành rượu vang.
              </p>
              <p>
                Mỗi vùng trồng nho có đặc trưng khí hậu riêng: Bordeaux đậm đà
                phức hợp, Burgundy tinh tế nhẹ nhàng, Napa Valley mạnh mẽ tròn
                vị. Chính sự đa dạng này tạo ra hàng ngàn phong cách vang khác
                nhau, hình thành nên văn hóa thưởng vang phong phú trên toàn thế
                giới.
              </p>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                Quy Trình Sản Xuất
              </h2>
              <p>
                Đằng sau mỗi chai rượu vang là một quy trình công phu và đầy tâm
                huyết. Mọi thứ bắt đầu từ việc chăm sóc vườn nho – nơi cây nho
                hấp thụ ánh sáng, đất mẹ và khí hậu địa phương. Khi đến mùa thu
                hoạch, từng chùm nho được chọn lọc kỹ lưỡng để đảm bảo chất
                lượng tốt nhất.
              </p>
              <p>
                Sau đó, nho được nghiền ép và đưa vào quá trình lên men. Đối với
                vang đỏ, nho được giữ nguyên vỏ để tạo màu sắc và cấu trúc
                tannin. Với vang trắng, vỏ thường được loại bỏ để giữ độ nhẹ
                nhàng và thanh thoát. Khi quá trình lên men hoàn tất, rượu sẽ
                tiếp tục được ủ trong thùng gỗ sồi hoặc bồn thép tùy phong cách
                mong muốn.
              </p>
              <p>
                Gỗ sồi mang lại hương vanilla, caramel hay khói nhẹ; trong khi
                bồn thép giúp giữ hương tự nhiên và độ tươi trẻ. Cuối cùng, rượu
                được lọc, phối trộn (nếu cần) rồi đóng chai. Một số loại cần
                được “ngủ yên” nhiều năm trước khi sẵn sàng để mở.
              </p>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                Cách Thưởng Thức
              </h2>
              <p>
                Để thưởng thức rượu vang trọn vẹn, bạn không chỉ đơn giản rót
                rồi uống. Nghệ thuật thưởng vang bao gồm bốn yếu tố quan trọng:
                nhiệt độ, ly rượu, cách xoay ly và sự kết hợp với món ăn. Vang
                đỏ thường ngon nhất ở 16–18°C, vang trắng ở 8–12°C và vang sủi
                cần được làm lạnh sâu hơn để giữ được độ tươi và bọt khí sống
                động.
              </p>
              <p>
                Hình dáng ly cũng ảnh hưởng mạnh mẽ đến hương vị: ly dáng bầu
                cho vang đỏ giúp hương thơm lan tỏa; ly miệng hẹp dành cho vang
                sủi giúp giữ bọt lâu hơn. Khi xoay ly, bạn giúp giải phóng các
                phân tử hương, mở ra tầng hương phức hợp hơn trước khi đưa lên
                mũi và miệng.
              </p>
              <p>
                Sự kết hợp với món ăn (wine pairing) là nghệ thuật cân bằng vị
                giác: vang đỏ hợp với thịt đỏ, vang trắng hợp với hải sản và các
                món nhẹ; vang ngọt đi cùng món tráng miệng hoặc đồ cay rất tuyệt
                vời. Khi kết hợp đúng, bạn sẽ cảm nhận được sự bùng nổ hương vị
                đầy bất ngờ.
              </p>

              <div className="bg-linear-to-br from-[#fef8f0] to-[#fff5eb] border-2 border-[#c9a961] rounded-3xl p-10 my-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#c9a961]/20 to-transparent rounded-bl-full" />
                <h3 className="font-display-serif text-3xl font-bold text-[#8b4513] mb-4 flex items-center gap-3">
                  <span className="text-4xl">💡</span>
                  Mẹo từ Chuyên Gia
                </h3>
                <p className="text-[#5d4e37] mb-0 text-lg leading-relaxed relative z-10">
                  Hãy để rượu vang “thở” trong bình decanter từ 15–30 phút với
                  vang trẻ, và 1–2 giờ cho vang đỏ lâu năm. Quá trình này giúp
                  rượu tiếp xúc với oxy, làm mềm tannin và mở ra hương vị tinh
                  tế hơn. Đối với vang trắng cao cấp, việc cho thở cũng có thể
                  mang lại hương thơm đậm đà và cấu trúc tốt hơn.
                </p>
              </div>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                Kết Luận
              </h2>
              <p>
                Khám phá rượu vang là một cuộc hành trình đầy cảm hứng – nơi bạn
                càng tìm hiểu, bạn càng muốn học sâu hơn. Mỗi vùng đất, mỗi nhà
                làm vang và mỗi niên vụ đều mang đến một câu chuyện mới. Khi bạn
                mở một chai rượu, bạn đang mở ra cả một thế giới văn hóa, lịch
                sử và tinh hoa nhân loại. Hãy thưởng thức theo cách riêng của
                bạn, bởi chính cảm nhận cá nhân mới tạo nên trải nghiệm đáng giá
                nhất.
              </p>
            </div>
          </motion.article>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mt-16 pt-12 border-t border-neutral-200"
          >
            <Tag className="w-4 h-4 text-[#3b4417]" strokeWidth={1.5} />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 border border-[#c8c8a3] text-[10px] tracking-[0.2em] uppercase text-[#3b4417] hover:border-[#3b4417] transition-all duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#f5f3e8] py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-[28px] md:text-[36px] tracking-[0.3em] uppercase text-[#3b4417] font-semibold mb-4">
                  BÀI VIẾT LIÊN QUAN
                </h2>
                <div className="flex items-center justify-center gap-3 text-[11px] italic tracking-[0.2em] text-[#4c5b23]">
                  <span className="h-px w-10 bg-[#4c5b23]" />
                  <span>Khám phá thêm</span>
                  <span className="h-px w-10 bg-[#4c5b23]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
