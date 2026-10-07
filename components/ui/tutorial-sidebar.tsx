"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

type AccordionItem = {
  title: string;
  isOpen?: boolean;
  href: string;
  sections?: { title: string; href: string }[];
};

export function TutorialSidebar() {
  const pathname = usePathname();
  
  const [items, setItems] = useState<AccordionItem[]>([
    { title: "Introduction", isOpen: false, href: "/tutorial", sections: [{ title: "Overview", href: "/tutorial" }] },
    {
      title: "Storing Documents (POUR)",
      isOpen: false,
      href: "/tutorial/storing-documents",
      sections: [
        { title: "Overview", href: "/tutorial/storing-documents" },
        { title: "Creating ID", href: "/tutorial/storing-documents/creating-id" },
        { title: "Bulk writes", href: "/tutorial/storing-documents/bulk-writes" },
        { title: "Expiring documents", href: "/tutorial/storing-documents/expiring-documents" },
        { title: "Login secrets", href: "/tutorial/storing-documents/login-secrets" },
        { title: "Nested fields", href: "/tutorial/storing-documents/nested-fields" },
      ],
    },
    {
      title: "Retrieving Documents (SCOOP)",
      isOpen: false,
      href: "/tutorial/retrieving-documents",
      sections: [
        { title: "Overview", href: "/tutorial/retrieving-documents" },
        { title: "Finding documents", href: "/tutorial/retrieving-documents/finding-documents" },
        { title: "Filtering results", href: "/tutorial/retrieving-documents/filtering-results" },
        { title: "Sorting and choosing fields", href: "/tutorial/retrieving-documents/shaping-results" },
        { title: "Summaries and totals", href: "/tutorial/retrieving-documents/summaries-and-totals" },
        { title: "Text and meaning search", href: "/tutorial/retrieving-documents/text-and-meaning" },
        { title: "Related documents", href: "/tutorial/retrieving-documents/related-documents" },
        { title: "History and candidate bonds", href: "/tutorial/retrieving-documents/historical-queries" },
      ],
    },
    { title: "Creating Relationships (LINK)", isOpen: false, href: "/tutorial/relationships" },
    { title: "Graph Traversal (FOLLOW)", isOpen: false, href: "/tutorial/graph-traversal" },
    { title: "AI Semantic Search (MEANING)", isOpen: false, href: "/tutorial/semantic-search" },
    { title: "Security Rules (DLS)", isOpen: false, href: "/tutorial/security-rules" },
  ]);

  // Open the accordion item that matches the current pathname on initial load
  useEffect(() => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        isOpen: item.href === "/tutorial"
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`),
      }))
    );
  }, [pathname]);

  const toggleItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden sticky top-24">
        {items.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <div
              key={index}
              className={`border-b border-zinc-200 last:border-b-0 ${
                item.isOpen ? "bg-zinc-50/50" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-semibold text-[#1e293b] hover:bg-zinc-50 transition-colors"
              >
                {item.isOpen ? (
                  <ChevronDown className="h-4 w-4 text-[#1e293b] shrink-0" strokeWidth={2.5} />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#1e293b] shrink-0" strokeWidth={2.5} />
                )}
                <span className="tracking-wide">{item.title}</span>
              </button>
              {item.isOpen && (
                <div className="px-12 py-3 text-sm text-zinc-600 bg-zinc-50/50 border-t border-zinc-100">
                  <ul className="space-y-2">
                    {(item.sections ?? [{ title: "Overview", href: item.href }]).map((section) => {
                      const sectionIsActive = section.href === pathname;

                      return (
                        <li key={section.href}>
                          <Link
                            href={section.href}
                            className={`hover:text-blue-600 hover:underline ${sectionIsActive ? "text-blue-600 font-medium" : ""}`}
                          >
                            {section.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
