import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/blog";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found — NovaX" };
  return {
    title: `${article.title} — NovaX Space Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function BlogArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const paragraphs = article.content.split("\n\n");

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${article.image})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-space-black/80 via-space-black/50 to-space-black" />
      <div className="relative z-10 section-container pt-32 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white font-mono mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan font-mono">
              {article.category}
            </span>
            <span className="text-white/40 text-sm font-mono">{article.date}</span>
          </div>

          <h1 className="text-display-2 font-display font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="h-64 md:h-96 rounded-3xl overflow-hidden mb-10">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none space-y-5 text-white/70 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="btn-primary inline-flex"
            >
              <span>More Articles</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
