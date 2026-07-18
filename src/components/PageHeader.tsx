"use client";

import SectionHeading from "./SectionHeading";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, bgImage }: PageHeaderProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space/60 via-transparent to-deep-space" />
      <div className="relative z-10 py-24 px-4">
        <SectionHeading title={title} subtitle={subtitle} />
      </div>
    </section>
  );
}
