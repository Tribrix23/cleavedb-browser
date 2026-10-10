import React from "react";

type TutorialCodeBlockProps = {
  label: string;
  children: React.ReactNode;
};

const commandWords = new Set([
  "POUR", "FIND", "SCOOP", "CHANGE", "LINK", "DRAIN", "SHOW", "YIELD",
  "EXPIRES", "SECONDS", "MINUTES", "HOURS", "DAYS", "MANY", "INTO", "RANDOM",
  "WITH", "SECRET", "INSIDE", "AT", "GUARD", "FROM", "EVERYTHING", "WHERE",
  "AND", "OR", "WHOSE", "IS", "ONLY", "UNIQUE", "TALLY", "TOTAL", "FIRST",
  "LAST", "HIGHEST", "LOWEST", "GROUPED", "BY", "ARRANGED", "GOING", "UP",
  "DOWN", "SORTED", "ORDER", "ASC", "DESC", "LIMIT", "MENTIONING", "MEANING",
  "MATCHING", "INCLUDE", "CANDIDATE", "RELATED", "OF", "AS", "IN", "PATTERN",
  "LINKED", "VIA", "TO", "GUIDED", "THRESHOLD", "SET", "UPDATE",
  "SALVAGE", "INCINERATE", "DROP", "RESTORE", "BUCKET", "BUCKETS",
  "SEVER", "MUTUAL", "CONFIDENCE", "EXCLUSIVELY", "CASCADE", "DELETE",
  "IF", "TARGET", "SOURCE", "EXPIRING", "ANY", "BOND",
  "FOLLOW", "TRACE", "MATCH", "RETURN", "THROUGH", "DIRECTION", "BOTH", "DEPTH",
  "OUTGOING", "INCOMING", "THE", "HOW", "CHANGED", "BETWEEN",
  "DISTILL", "SUM", "AVERAGE", "AVG", "MIN", "MAX", "SPREAD", "COUNT", "GROUP",
  "PIPE", "THEN",
  "SHAPE", "DESCRIBE", "INDEX", "AUDITED", "VERSIONED", "DOCUMENTS", "COMPRESSION", "TTL",
  "REQUIRED", "WEBHOOK", "WEBHOOKS", "POST", "ACTION", "TYPE", "STATS", "BONDS", "INDEXES",
  "ENFORCE", "SECURITY", "POLICY", "ALLOW", "ALL", "READ", "WRITE", "MASK", "LIMIT", "AUTHENTICATE",
  "QUERIES", "PER", "MINUTE", "FOR", "MY", "ROLE", "BONDED", "OWNER", "REPLACE", "LEAST",
  "RECENTLY", "USED", "OLDEST", "UPDATES", "OVERWRITE", "CURRENT",
  "BEGIN", "COMMIT", "ROLLBACK", "TRANSACTION",
  "EVERY", "SECONDS", "MINUTES", "HOURS", "DO", "ON", "RUN", "MIDNIGHT", "DAY", "AT", "CRON",
  "REWIND", "UNDO", "AGO", "YESTERDAY", "NOW",
  "MIGRATE", "HEAL", "SUGGEST",
  "LISTEN",
]);

function highlightCleaveQL(source: string) {
  const tokenPattern = /--[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*|[{}\[\],.:()]/g;
  const tokens: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(source)) !== null) {
    const [token] = match;
    const start = match.index;
    if (start > cursor) tokens.push(source.slice(cursor, start));

    let color = "text-slate-200";
    if (token.startsWith("--")) {
      color = "text-zinc-500 italic";
    } else if (token.startsWith("\"") || token.startsWith("'")) {
      const afterToken = source.slice(start + token.length);
      color = /^\s*:/.test(afterToken) ? "text-cyan-300" : "text-emerald-300";
    } else if (/^\d/.test(token)) {
      color = "text-amber-300";
    } else if (commandWords.has(token.toUpperCase())) {
      color = ["POUR", "FIND", "SCOOP", "CHANGE", "UPDATE", "LINK", "DRAIN", "SALVAGE", "INCINERATE", "DROP", "RESTORE", "SEVER", "BOND", "FOLLOW", "TRACE", "MATCH", "DISTILL", "PIPE", "SHAPE", "GUARD", "INDEX", "DESCRIBE", "SHOW", "ENFORCE", "MASK", "AUTHENTICATE", "BEGIN", "COMMIT", "ROLLBACK", "EVERY", "ON", "RUN", "REWIND", "UNDO", "MIGRATE", "HEAL", "SUGGEST", "LISTEN"].includes(token.toUpperCase())
        ? "font-semibold text-sky-400"
        : "text-violet-300";
    } else if (/^[{}\[\],.:]$/.test(token)) {
      color = "text-zinc-500";
    }

    tokens.push(<span className={color} key={`${start}-${token}`}>{token}</span>);
    cursor = start + token.length;
  }

  if (cursor < source.length) tokens.push(source.slice(cursor));
  return tokens;
}

export function TutorialCodeBlock({ label, children }: TutorialCodeBlockProps) {
  const source = typeof children === "string" || typeof children === "number" ? String(children) : "";

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
        <span className="text-sm font-semibold tracking-wide text-zinc-100">CleaveQL</span>
        <span className="text-xs font-medium tracking-wide text-zinc-400">Example · {label}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-7 text-zinc-100">
        <code>{highlightCleaveQL(source)}</code>
      </pre>
    </div>
  );
}
