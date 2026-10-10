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
        { title: "Structured retrieval", href: "/tutorial/retrieving-documents/structured-retrieval" },
        { title: "Filtering results", href: "/tutorial/retrieving-documents/filtering-results" },
        { title: "Sorting and choosing fields", href: "/tutorial/retrieving-documents/shaping-results" },
        { title: "Summaries and totals", href: "/tutorial/retrieving-documents/summaries-and-totals" },
        { title: "Nested SCOOP queries", href: "/tutorial/retrieving-documents/nested-queries" },
        { title: "Meaning search", href: "/tutorial/retrieving-documents/meaning-search" },
        { title: "Historical reads", href: "/tutorial/retrieving-documents/historical-reads" },
      ],
    },
    {
      title: "Graph & Semantic Search (FIND)",
      isOpen: false,
      href: "/tutorial/find",
      sections: [
        { title: "Overview", href: "/tutorial/find" },
        { title: "Following a bond", href: "/tutorial/find/bond-lookups" },
        { title: "Graph patterns", href: "/tutorial/find/graph-patterns" },
        { title: "Semantic search", href: "/tutorial/find/semantic-search" },
        { title: "Historical graph reads", href: "/tutorial/find/historical-reads" },
        { title: "Performance and edge cases", href: "/tutorial/find/performance" },
      ],
    },
    {
      title: "Updating Documents",
      isOpen: false,
      href: "/tutorial/updating-documents",
      sections: [
        { title: "Overview", href: "/tutorial/updating-documents" },
        { title: "Updating single fields", href: "/tutorial/updating-documents/single-fields" },
        { title: "Updating multiple fields", href: "/tutorial/updating-documents/multiple-fields" },
        { title: "Sub-query injection", href: "/tutorial/updating-documents/sub-query-injection" },
        { title: "The UPDATE", href: "/tutorial/updating-documents/update" },
      ],
    },
    {
      title: "Deleting & Recovering",
      isOpen: false,
      href: "/tutorial/deleting-recovering",
      sections: [
        { title: "Overview", href: "/tutorial/deleting-recovering" },
        { title: "Soft delete (DRAIN)", href: "/tutorial/deleting-recovering/drain" },
        { title: "Restore (SALVAGE)", href: "/tutorial/deleting-recovering/salvage" },
        { title: "Hard delete (INCINERATE)", href: "/tutorial/deleting-recovering/incinerate" },
        { title: "Drop & restore buckets", href: "/tutorial/deleting-recovering/drop-restore" },
      ],
    },
    {
      title: "Creating Relationships (LINK)",
      isOpen: false,
      href: "/tutorial/relationships",
      sections: [
        { title: "Overview", href: "/tutorial/relationships" },
        { title: "Basic bonds", href: "/tutorial/relationships/basic-bonds" },
        { title: "Mutual bonds", href: "/tutorial/relationships/mutual-bonds" },
        { title: "Conditional bonds", href: "/tutorial/relationships/conditional-bonds" },
        { title: "Expiring bonds", href: "/tutorial/relationships/expiring-bonds" },
        { title: "Exclusive bonds", href: "/tutorial/relationships/exclusive-bonds" },
        { title: "Cascade on delete", href: "/tutorial/relationships/cascade" },
        { title: "Confidence & affinity", href: "/tutorial/relationships/confidence-affinity" },
        { title: "Removing bonds (SEVER)", href: "/tutorial/relationships/sever" },
      ],
    },
    {
      title: "Graph Traversal",
      isOpen: false,
      href: "/tutorial/graph-traversal",
      sections: [
        { title: "Overview", href: "/tutorial/graph-traversal" },
        { title: "FOLLOW — explore neighbours", href: "/tutorial/graph-traversal/follow" },
        { title: "TRACE — walk a chain", href: "/tutorial/graph-traversal/trace" },
        { title: "MATCH — Cypher-style queries", href: "/tutorial/graph-traversal/match" },
        { title: "Direction & depth", href: "/tutorial/graph-traversal/direction-depth" },
        { title: "Semantic pathfinding", href: "/tutorial/graph-traversal/semantic-pathfinding" },
      ],
    },
    {
      title: "Pattern Matching",
      isOpen: false,
      href: "/tutorial/pattern-matching",
      sections: [
        { title: "Overview", href: "/tutorial/pattern-matching" },
        { title: "FIND PATTERN basics", href: "/tutorial/pattern-matching/basics" },
        { title: "Edge directions", href: "/tutorial/pattern-matching/edge-directions" },
        { title: "Cross-bucket patterns", href: "/tutorial/pattern-matching/cross-bucket" },
        { title: "Bond history (FIND HOW)", href: "/tutorial/pattern-matching/bond-history" },
      ],
    },
    {
      title: "Aggregation (DISTILL)",
      isOpen: false,
      href: "/tutorial/aggregation",
      sections: [
        { title: "Overview", href: "/tutorial/aggregation" },
        { title: "Sum, avg, min, max", href: "/tutorial/aggregation/basic-aggregates" },
        { title: "Count & tally", href: "/tutorial/aggregation/count-tally" },
        { title: "Filtering with WHERE", href: "/tutorial/aggregation/where" },
        { title: "Grouping with GROUP BY", href: "/tutorial/aggregation/group-by" },
        { title: "Named results (AS)", href: "/tutorial/aggregation/named-results" },
      ],
    },
    {
      title: "Pipeline (PIPE)",
      isOpen: false,
      href: "/tutorial/pipeline",
      sections: [
        { title: "Overview", href: "/tutorial/pipeline" },
        { title: "Chaining stages", href: "/tutorial/pipeline/chaining-stages" },
        { title: "Filter & sort stages", href: "/tutorial/pipeline/filter-sort" },
        { title: "Group & aggregate stages", href: "/tutorial/pipeline/group-aggregate" },
      ],
    },
    {
      title: "Bucket Configuration",
      isOpen: false,
      href: "/tutorial/bucket-configuration",
      sections: [
        { title: "Overview", href: "/tutorial/bucket-configuration" },
        { title: "SHAPE — configure buckets", href: "/tutorial/bucket-configuration/shape" },
        { title: "GUARD — validation rules", href: "/tutorial/bucket-configuration/guard" },
        { title: "INDEX — speed up lookups", href: "/tutorial/bucket-configuration/index" },
        { title: "DESCRIBE & SHOW", href: "/tutorial/bucket-configuration/describe-show" },
        { title: "Webhooks", href: "/tutorial/bucket-configuration/webhooks" },
      ],
    },
    {
      title: "Security & Access Control",
      isOpen: false,
      href: "/tutorial/security",
      sections: [
        { title: "Overview", href: "/tutorial/security" },
        { title: "Enforce security policies", href: "/tutorial/security/enforce" },
        { title: "Field masking (MASK)", href: "/tutorial/security/masking" },
        { title: "Rate limiting (LIMIT)", href: "/tutorial/security/rate-limiting" },
        { title: "Session context (SET)", href: "/tutorial/security/session-context" },
        { title: "Authenticate (AUTHENTICATE)", href: "/tutorial/security/authenticate" },
        { title: "Remove policies", href: "/tutorial/security/drop-policy" },
      ],
    },
    {
      title: "ACID Transactions",
      isOpen: false,
      href: "/tutorial/transactions",
      sections: [
        { title: "Overview", href: "/tutorial/transactions" },
        { title: "BEGIN & COMMIT", href: "/tutorial/transactions/begin-commit" },
        { title: "ROLLBACK", href: "/tutorial/transactions/rollback" },
      ],
    },
    {
      title: "Scheduled Tasks & Triggers",
      isOpen: false,
      href: "/tutorial/scheduled-tasks",
      sections: [
        { title: "Overview", href: "/tutorial/scheduled-tasks" },
        { title: "EVERY — repeating tasks", href: "/tutorial/scheduled-tasks/every" },
        { title: "ON ... RUN — triggers", href: "/tutorial/scheduled-tasks/triggers" },
        { title: "Webhooks for CDC", href: "/tutorial/scheduled-tasks/webhooks-cdc" },
      ],
    },
    {
      title: "Time Travel & Undo",
      isOpen: false,
      href: "/tutorial/time-travel",
      sections: [
        { title: "Overview", href: "/tutorial/time-travel" },
        { title: "AS OF — historical reads", href: "/tutorial/time-travel/as-of" },
        { title: "REWIND — restore a document", href: "/tutorial/time-travel/rewind" },
        { title: "UNDO — global rollback", href: "/tutorial/time-travel/undo" },
      ],
    },
    {
      title: "Schema Migration",
      isOpen: false,
      href: "/tutorial/schema-migration",
      sections: [
        { title: "Overview", href: "/tutorial/schema-migration" },
        { title: "MIGRATE — reshape documents", href: "/tutorial/schema-migration/migrate" },
        { title: "HEAL — repair integrity", href: "/tutorial/schema-migration/heal" },
        { title: "SUGGEST BONDS", href: "/tutorial/schema-migration/suggest-bonds" },
      ],
    },
    {
      title: "Real-time Pub/Sub (LISTEN)",
      isOpen: false,
      href: "/tutorial/realtime",
      sections: [
        { title: "Overview", href: "/tutorial/realtime" },
        { title: "Subscribe to a bucket", href: "/tutorial/realtime/subscribe-bucket" },
        { title: "Subscribe to a document", href: "/tutorial/realtime/subscribe-document" },
        { title: "Live computed feeds", href: "/tutorial/realtime/computed-feeds" },
      ],
    },
    {
      title: "Computed Fields (ENRICH)",
      isOpen: false,
      href: "/tutorial/computed-fields",
      sections: [
        { title: "Overview", href: "/tutorial/computed-fields" },
        { title: "Virtual fields", href: "/tutorial/computed-fields/virtual-fields" },
        { title: "Expressions & formulas", href: "/tutorial/computed-fields/expressions" },
        { title: "Enrichment with masking", href: "/tutorial/computed-fields/enrichment-masking" },
      ],
    },
    {
      title: "Query Diagnostics (PEER)",
      isOpen: false,
      href: "/tutorial/diagnostics",
      sections: [
        { title: "Overview", href: "/tutorial/diagnostics" },
        { title: "PEER INTO COST", href: "/tutorial/diagnostics/peer-cost" },
        { title: "PEER INTO ATTENTION", href: "/tutorial/diagnostics/peer-attention" },
        { title: "Performance tuning workflow", href: "/tutorial/diagnostics/performance-tuning" },
      ],
    },
    {
      title: "Distributed Cluster",
      isOpen: false,
      href: "/tutorial/cluster",
      sections: [
        { title: "Overview", href: "/tutorial/cluster" },
        { title: "Raft consensus", href: "/tutorial/cluster/raft" },
        { title: "Go coordinator", href: "/tutorial/cluster/coordinator" },
        { title: "CLUSTER queries", href: "/tutorial/cluster/cluster-queries" },
        { title: "SCATTER writes", href: "/tutorial/cluster/scatter" },
      ],
    },
    {
      title: "Forecasting (FORECAST)",
      isOpen: false,
      href: "/tutorial/forecasting",
      sections: [
        { title: "Overview", href: "/tutorial/forecasting" },
        { title: "Linear regression", href: "/tutorial/forecasting/linear" },
        { title: "Moving averages", href: "/tutorial/forecasting/moving-average" },
      ],
    },
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
