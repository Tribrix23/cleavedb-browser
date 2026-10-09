"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Braces, Check, ChevronRight, Copy, FileJson, FileText, GitBranch, Menu, ScanSearch, UserRound, X } from "lucide-react";
import styles from "@/app/landing.module.css";

import logoImg from "@/public/logo.png";

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  return (
    <header className={styles.header} onKeyDown={(event) => { if (event.key === "Escape" && open) { close(); toggleRef.current?.focus(); } }}>
      <div className={`${styles.navbar} ${styles.container}`}>
        <Link href="/" className={styles.brand} aria-label="CleaveDB home"><Image src={logoImg} alt="" width={34} height={34} /><span>Cleave<span className={styles.brandLight}>DB</span></span></Link>
        <nav id="landing-navigation" aria-label="Main navigation" className={`${styles.navLinks} ${open ? styles.navOpen : ""}`}>
          <a href="#product" onClick={close}>Product</a><a href="#developers" onClick={close}>Developers</a><Link href="/docs" onClick={close}>Documentation</Link><a href="https://github.com/Tribrix23/CleaveDB" target="_blank" rel="noopener noreferrer" onClick={close}>GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
        </nav>
        <div className={styles.navActions}><Link href="/docs/installation" className={styles.navCta}>Start building <ArrowUpRight size={15} aria-hidden="true" /></Link><button ref={toggleRef} type="button" className={styles.menuToggle} aria-controls="landing-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
      </div>
    </header>
  );
}

export function DatabaseSculpture() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 70, damping: 24 });
  const rotateY = useSpring(x, { stiffness: 70, damping: 24 });
  return (
    <div className={styles.sculptureStage} onPointerMove={(event) => {
      if (reducedMotion || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
      y.set(-((event.clientY - rect.top) / rect.height - 0.5) * 6);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <motion.div className={styles.sculptureTilt} style={reducedMotion ? undefined : { rotateX, rotateY }}>
        <div className={styles.sculptureFloat}><Image src="/images/database-sculpture.png" alt="A sculptural database of floating porcelain and cobalt glass layers, joined by orbiting connections" width={1280} height={1280} sizes="(max-width: 600px) 95vw, (max-width: 1100px) 50vw, 640px" preload className={styles.sculptureImage} /></div>
      </motion.div>
    </div>
  );
}

const examples = [
  { id: "documents", label: "Documents", icon: FileJson, title: "Give your data room to be itself.", description: "Store flexible JSON in named buckets. No rigid schema, no setup step. Just POUR your first document.", query: 'POUR INTO users "jane" {\n  "name": "Jane",\n  "age": 25,\n  "city": "Manila"\n}', comment: "A document. A bucket. That's it.", href: "/tutorial/storing-documents", link: "Explore documents" },
  { id: "graph", label: "Relationships", icon: GitBranch, title: "The connection is part of the data.", description: "Follow a named bond from one document to another. Relationships are native, so your queries can stay human.", query: 'FIND "manager"\n  OF "employees:john"', comment: "Find the person on the other side of a bond.", href: "/tutorial/find/bond-lookups", link: "Explore graph bonds" },
  { id: "semantic", label: "Semantic search", icon: ScanSearch, title: "Find the idea behind the words.", description: "Built-in ONNX embeddings make meaning searchable. Find related documents, even when the exact words are different.", query: 'FIND "a rainy day"\n  IN articles', comment: "Search by meaning, not just a matching word.", href: "/tutorial/find/semantic-search", link: "Explore semantic search" },
] as const;

function HighlightedQuery({ query }: { query: string }) {
  return <>{query.split(/("[^"\n]*"|\b(?:POUR|INTO|FIND|OF|IN)\b|\b\d+\b)/g).map((part, index) => <span key={index} className={part.startsWith('"') ? styles.codeString : /^(POUR|INTO|FIND|OF|IN)$/.test(part) ? styles.codeKeyword : /^\d+$/.test(part) ? styles.codeNumber : undefined}>{part}</span>)}</>;
}

export function QueryPlayground() {
  const [active, setActive] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const example = examples[active];
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function choose(index: number) { setActive(index); setCopyState("idle"); if (timer.current) clearTimeout(timer.current); }
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % examples.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + examples.length) % examples.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = examples.length - 1;
    else return;
    event.preventDefault(); choose(next); tabRefs.current[next]?.focus();
  }
  async function copyQuery() {
    try { await navigator.clipboard.writeText(example.query); setCopyState("copied"); }
    catch { setCopyState("error"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 3000);
  }
  return (
    <div className={styles.playground}>
      <div className={styles.playgroundToolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Explore CleaveDB capabilities">
          {examples.map(({ id, label, icon: Icon }, index) => <button key={id} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab" id={`tab-${id}`} aria-selected={active === index} aria-controls={`panel-${id}`} tabIndex={active === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={(event) => onTabKey(event, index)} className={`${styles.tab} ${active === index ? styles.activeTab : ""}`}><Icon size={16} strokeWidth={1.6} aria-hidden="true" />{label}</button>)}
        </div>
        <span className={styles.exampleLabel}>Interactive example</span>
      </div>
      <div role="tabpanel" id={`panel-${example.id}`} aria-labelledby={`tab-${example.id}`} tabIndex={0} className={styles.playgroundPanel}>
        <div className={styles.querySide}>
          <div className={styles.queryIntro}><h3>{example.title}</h3><p>{example.description}</p></div>
          <div className={styles.codeHeader}><span><Braces size={14} aria-hidden="true" /> CleaveQL</span><button type="button" className={styles.copyButton} onClick={copyQuery} aria-label="Copy query">{copyState === "copied" ? <Check size={15} /> : <Copy size={15} />}<span>{copyState === "copied" ? "Copied" : "Copy"}</span></button></div>
          <div className={styles.codeBody}><p className={styles.codeComment}>{`// ${example.comment}`}</p><pre><code><HighlightedQuery query={example.query} /></code></pre></div>
          <div className={styles.queryBottom}><Link href={example.href}>{example.link}<ArrowRight size={15} aria-hidden="true" /></Link><span role="status" className={styles.copyStatus}>{copyState === "error" ? "Copy failed. Select the query to copy it." : copyState === "copied" ? "Query copied to clipboard." : ""}</span></div>
        </div>
        <div key={example.id} className={`${styles.resultSide} ${styles[`${example.id}Result`]}`}>
          <div className={styles.resultHeading}><span>{active === 0 ? "Your document" : active === 1 ? "Your connected data" : "Matches by meaning"}</span><span>Illustrative view</span></div>
          {active === 0 && <div className={styles.documentVisual}><div className={styles.documentTitle}><div className={styles.documentIcon}><FileJson size={22} strokeWidth={1.5} /></div><div><span>users <ChevronRight size={12} /> jane</span><strong>A little structure.<br />A lot of flexibility.</strong></div></div><dl className={styles.documentFields}><div><dt>name <span>string</span></dt><dd>Jane</dd></div><div><dt>age <span>number</span></dt><dd>25</dd></div><div><dt>city <span>string</span></dt><dd>Manila</dd></div></dl><div className={styles.documentNote}><Check size={14} /> The bucket is created with your first write.</div></div>}
          {active === 1 && <div className={styles.graphVisual}><svg className={styles.graphEdges} viewBox="0 0 500 250" fill="none" aria-hidden="true"><path d="M105 125H395" stroke="currentColor" strokeWidth="1.5" /><path d="m382 120 8 5-8 5" stroke="currentColor" strokeWidth="1.5" /></svg><div className={styles.graphNode}><span className={styles.personIcon}><UserRound size={25} strokeWidth={1.5} /></span><strong>John</strong><span>employees:john</span></div><div className={styles.bondLabel}>manager <ArrowRight size={12} /></div><div className={`${styles.graphNode} ${styles.graphNodeTarget}`}><span className={styles.personIcon}><UserRound size={25} strokeWidth={1.5} /></span><strong>Alex</strong><span>Connected document</span></div><p className={styles.graphCaption}>A named bond. A direct path to your answer.</p></div>}
          {active === 2 && <div className={styles.searchVisual}><div className={styles.searchPhrase}><ScanSearch size={18} /><span>a rainy day</span><span>Meaning</span></div><div className={styles.searchMatches}>{[{title:"A quiet afternoon indoors",body:"The windows misted over as the storm rolled in."},{title:"When the city slows down",body:"Umbrellas lined the streets under a silver sky."},{title:"The sound of a passing storm",body:"Water traced small rivers along the glass."}].map(({title,body}) => <div key={title} className={styles.searchMatch}><FileText size={18} strokeWidth={1.5} /><div><strong>{title}</strong><p>{body}</p></div><ArrowUpRight size={14} /></div>)}</div><p className={styles.searchNote}>Embeddings are indexed in the background after writes.</p></div>}
        </div>
      </div>
    </div>
  );
}

