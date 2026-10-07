import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

import { TutorialSidebar } from "@/components/ui/tutorial-sidebar";

type TutorialPageShellProps = {
  sectionTitle: string;
  children: React.ReactNode;
  previousHref?: string;
  previousLabel?: string;
  nextHref?: string;
  nextLabel?: string;
};

export function TutorialPageShell({
  sectionTitle,
  children,
  previousHref,
  previousLabel,
  nextHref,
  nextLabel,
}: TutorialPageShellProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-blue-100">
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/logo-full.png"
              alt="CleaveDB Logo"
              width={480}
              height={120}
              className="h-auto w-[100px] object-contain"
            />
          </Link>
          <Link href="/" className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 py-12 md:flex-row">
        <TutorialSidebar />

        <main className="max-w-3xl flex-1 pb-32">
          <article>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-blue-600">
              <BookOpen className="h-4 w-4" /> Getting Started
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">Tutorial: Building with CleaveDB</h1>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900">{sectionTitle}</h2>
            {children}

            {(previousHref || nextHref) && (
              <nav className="mt-12 flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {previousHref && previousLabel ? (
                  <Link href={previousHref} className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
                    <ArrowLeft className="h-4 w-4" /> Previous: {previousLabel}
                  </Link>
                ) : <span />}
                {nextHref && nextLabel && (
                  <Link href={nextHref} className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
                    Next: {nextLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </nav>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}
