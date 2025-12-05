import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'راهنمای ساختار سایت | موزیک',
  description: 'مرور سریع معماری و اجزای اصلی اپلیکیشن پخش موسیقی',
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">راهنما</p>
            <h1 className="text-3xl font-bold">ساختار سایت</h1>
          </div>
          <Link
            href="/"
            className="text-sm px-4 py-2 rounded-full border border-border/60 hover:border-primary hover:text-primary transition-colors"
          >
            بازگشت به پخش‌کننده
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <aside className="space-y-2 rounded-2xl border border-border/40 p-4">
            <p className="text-sm font-semibold text-muted-foreground">سرفصل‌ها</p>
            <nav className="space-y-1 text-sm leading-6">
              {[
                ['نمای کلی', '#overview'],
                ['ساختار پوشه‌ها', '#folders'],
                ['جریان صفحه اصلی', '#flow'],
                ['استایل و تم', '#theme'],
                ['دارایی‌های رسانه‌ای', '#assets'],
                ['نکات توسعه/اجرا', '#dev'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-xl px-3 py-2 hover:bg-secondary/60 transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-10">
            <section id="overview" className="space-y-3">
              <h2 className="text-2xl font-bold">نمای کلی</h2>
              <ul className="space-y-2 text-base leading-7 text-muted-foreground">
                <li>چارچوب: Next.js 16 (App Router) با React 19.</li>
                <li>زبان و راست‌چین: <code className="font-mono text-sm bg-secondary/60 px-1 rounded">lang="fa"</code> و <code className="font-mono text-sm bg-secondary/60 px-1 rounded">dir="rtl"</code> در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">app/layout.tsx</code>.</li>
                <li>فونت: Montserrat روی بدنه.</li>
                <li>آنالیتیکس: <code className="font-mono text-sm bg-secondary/60 px-1 rounded">@vercel/analytics</code> در لایه ریشه.</li>
                <li>استایل: Tailwind 4 + <code className="font-mono text-sm bg-secondary/60 px-1 rounded">tw-animate-css</code> با پالت تیره پیش‌فرض در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">app/globals.css</code>.</li>
              </ul>
            </section>

            <section id="folders" className="space-y-3">
              <h2 className="text-2xl font-bold">ساختار پوشه‌ها</h2>
              <div className="rounded-2xl border border-border/40 bg-card/40 p-4 space-y-2">
                <p className="text-muted-foreground">پوشه‌های کلیدی:</p>
                <ul className="space-y-2 text-base leading-7 text-muted-foreground">
                  <li><strong>app/</strong> – <code className="font-mono text-sm bg-secondary/60 px-1 rounded">layout.tsx</code> (HTML shell، فونت، متادیتا، Analytics)، <code className="font-mono text-sm bg-secondary/60 px-1 rounded">page.tsx</code> (رندر <code className="font-mono text-sm bg-secondary/60 px-1 rounded">MusicPlayer</code>)، <code className="font-mono text-sm bg-secondary/60 px-1 rounded">globals.css</code> (تم و پایه Tailwind).</li>
                  <li><strong>components/</strong> – <code className="font-mono text-sm bg-secondary/60 px-1 rounded">music-player.tsx</code> (UI و منطق پخش)، <code className="font-mono text-sm bg-secondary/60 px-1 rounded">theme-provider.tsx</code> (اتصال next-themes)، زیرپوشه <code className="font-mono text-sm bg-secondary/60 px-1 rounded">ui/</code> برای اجزای پایه.</li>
                  <li><strong>public/</strong> – کاورها و آیکن‌ها؛ صوت‌ها در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">public/audio/</code>.</li>
                  <li><strong>styles/globals.css</strong> – پالت جایگزین روشن (فعلاً غیرفعال).</li>
                  <li><strong>پیکربندی</strong> – <code className="font-mono text-sm bg-secondary/60 px-1 rounded">next.config.mjs</code>، <code className="font-mono text-sm bg-secondary/60 px-1 rounded">tsconfig.json</code>، تنظیمات Tailwind/PostCSS و فایل‌های قفل پکیج.</li>
                </ul>
              </div>
            </section>

            <section id="flow" className="space-y-3">
              <h2 className="text-2xl font-bold">جریان صفحه اصلی (MusicPlayer)</h2>
              <ul className="space-y-2 text-base leading-7 text-muted-foreground">
                <li>داده‌ها: آرایه <code className="font-mono text-sm bg-secondary/60 px-1 rounded">songs</code> با عنوان، مدت، دسته‌بندی، کاور و مسیر صوت.</li>
                <li>وضعیت‌ها: آهنگ جاری، پخش/توقف، شمارش پخش (Persist در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">localStorage</code>)، جست‌وجو، فیلتر دسته، زمان جاری و طول آهنگ، نمایش متن.</li>
                <li>فیلتر/جست‌وجو: روی عنوان و دسته‌بندی (پیش‌فرض «همه»).</li>
                <li>کارت‌ها: کاور، برچسب دسته، مدت، دکمه پخش/توقف، شمارنده پخش، آکاردئون متن.</li>
                <li>پلیر پایینی: هنگام پخش ظاهر می‌شود؛ کنترل قبلی/بعدی، نوار پیشرفت کلیک‌پذیر، نمایش متن جاری.</li>
                <li>رویدادها: <code className="font-mono text-sm bg-secondary/60 px-1 rounded">onTimeUpdate</code>، <code className="font-mono text-sm bg-secondary/60 px-1 rounded">onLoadedMetadata</code>، و پخش خودکار آهنگ بعدی روی <code className="font-mono text-sm bg-secondary/60 px-1 rounded">onEnded</code>.</li>
              </ul>
            </section>

            <section id="theme" className="space-y-3">
              <h2 className="text-2xl font-bold">استایل و تم</h2>
              <ul className="space-y-2 text-base leading-7 text-muted-foreground">
                <li>تم تیره با Accent فیروزه‌ای در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">app/globals.css</code> (مقادیر oklch روی CSS variables).</li>
                <li>پایه Tailwind: همه المان‌ها <code className="font-mono text-sm bg-secondary/60 px-1 rounded">bg-background</code> و <code className="font-mono text-sm bg-secondary/60 px-1 rounded">text-foreground</code> دارند.</li>
                <li>فونت و کلاس‌ها در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">layout.tsx</code> به بدنه اعمال می‌شوند.</li>
              </ul>
            </section>

            <section id="assets" className="space-y-3">
              <h2 className="text-2xl font-bold">دارایی‌های رسانه‌ای</h2>
              <ul className="space-y-2 text-base leading-7 text-muted-foreground">
                <li>تصاویر کاور و آیکن‌ها در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">public/</code>.</li>
                <li>فایل‌های صوت در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">public/audio/</code> (مثلاً <code className="font-mono text-sm bg-secondary/60 px-1 rounded">/audio/Natars.mp3</code>).</li>
              </ul>
            </section>

            <section id="dev" className="space-y-3">
              <h2 className="text-2xl font-bold">نکات توسعه و اجرا</h2>
              <ul className="space-y-2 text-base leading-7 text-muted-foreground">
                <li>اجرای محلی: <code className="font-mono text-sm bg-secondary/60 px-1 rounded">pnpm dev</code> یا <code className="font-mono text-sm bg-secondary/60 px-1 rounded">npm run dev</code>.</li>
                <li>ساخت: <code className="font-mono text-sm bg-secondary/60 px-1 rounded">npm run build</code>؛ اجرای نسخه تولید: <code className="font-mono text-sm bg-secondary/60 px-1 rounded">npm start</code>.</li>
                <li>تغییر تم: ویرایش متغیرهای تعریف‌شده در <code className="font-mono text-sm bg-secondary/60 px-1 rounded">app/globals.css</code>.</li>
              </ul>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}

