"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/docs" && pathname !== "/docs") return false;
    return pathname?.startsWith(href);
  };

  const navLinks = [
    {
      title: "Getting Started",
      links: [
        { name: "Introduction", href: "/docs" },
        { name: "Installation & Build", href: "/docs/installation" },
        { name: "Quick Start", href: "/docs/quick-start" },
        { name: "Tutorial", href: "/tutorial" },
      ],
    },
    {
      title: "Core Concepts",
      links: [
        { name: "CleaveQL Syntax", href: "/docs/core-concepts/cleaveql" },
        { name: "Graph Relations", href: "/docs/core-concepts/graph-relations" },
        { name: "Vector Embeddings", href: "/docs/core-concepts/vector-embeddings" },
        { name: "Document Security (DLS)", href: "/docs/core-concepts/security" },
      ],
    },
    {
      title: "Deployment",
      links: [
        { name: "Architecture", href: "/docs/deployment/architecture" },
        { name: "Scaling & Sharding", href: "/docs/deployment/scaling" },
      ],
    },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <nav className="space-y-8 sticky top-32">
        {navLinks.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-zinc-900 mb-4 tracking-tight">{section.title}</h3>
            <ul className="space-y-3 text-sm">
              {section.links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block transition-colors ${
                        active
                          ? "text-blue-600 font-medium"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
