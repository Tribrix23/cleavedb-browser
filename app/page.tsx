import logoImg from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { ArrowDown, ArrowRight, ArrowUpRight, Box, Braces, Cpu, GitBranch, Layers3, Network, ScanSearch, ShieldCheck } from "lucide-react";
import { LandingNav, DatabaseSculpture, QueryPlayground } from "@/components/landing/landing-interactions";
import { CopyCommand } from "@/components/ui/copy-command";
import styles from "./landing.module.css";

const editorial = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-editorial", display: "swap" });

const capabilities = [
  { icon: Box, title: "Rust at the core", description: "Purpose-built from the storage up." },
  { icon: GitBranch, title: "Native graph bonds", description: "Relationships belong with your data." },
  { icon: ScanSearch, title: "Built-in semantic search", description: "Find meaning, beyond exact matches." },
  { icon: Layers3, title: "One query language", description: "A more natural way to work with data." },
];

const infrastructure = [
  { icon: Cpu, title: "A purpose-built Rust engine.", body: "A storage engine built from scratch, with C++ AVX-512 extensions for vector math. No SQLite. No RocksDB.", href: "/docs/deployment/architecture", link: "Explore the architecture" },
  { icon: Network, title: "Room for your next big idea.", body: "A Go-based coordinator connects to the Rust engine for distributed, multi-shard deployments.", href: "/docs/deployment/scaling", link: "Learn about scaling" },
  { icon: ShieldCheck, title: "Boundaries built into the database.", body: "Authentication, tenant isolation, and granular document-level security keep access rules close to your data.", href: "/docs/core-concepts/security", link: "Understand security" },
];

export default function Home() {
  return (
    <div className={`${styles.landing} ${editorial.variable}`}>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <LandingNav />
      <main id="main-content">
        <section className={`${styles.hero} ${styles.container}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 id="hero-title">Your data.<br /><span className={styles.headlineLine}>More <em>connected.</em></span></h1>
            <p className={styles.heroDescription}>Documents, relationships, and semantic search.<br className={styles.desktopBreak} /> One database. A more natural way to build.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/docs/installation">Start building <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className={styles.textButton} href="/docs">Explore the docs <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
            <div className="mt-6 sm:mt-8 mb-6 max-w-sm w-full">
              <CopyCommand command="npm i cleavedb" />
            </div>
            <a href="#product" className={styles.discoverLink}><ArrowDown size={14} aria-hidden="true" /> A little less complexity. A lot more possibility.</a>
          </div>
          <DatabaseSculpture />
        </section>
        <div className={`${styles.capabilityStrip} ${styles.container}`}>
          {capabilities.map(({ icon: Icon, title, description }) => (
            <div key={title} className={styles.capability}>
              <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
              <div><h2>{title}</h2><p>{description}</p></div>
            </div>
          ))}
        </div>
        <section id="product" className={`${styles.productSection} ${styles.container}`} aria-labelledby="product-title">
          <div className={styles.sectionHeading}>
            <h2 id="product-title">One home for every<br />dimension of your data.</h2>
            <p>Flexible like documents. Connected like a graph. Thoughtful enough to search by meaning. It all comes together in CleaveDB.</p>
          </div>
          <QueryPlayground />
          <div className={styles.productFootnote}><span><Braces size={16} aria-hidden="true" /> Real CleaveQL syntax. Illustrative data.</span><Link href="/docs/core-concepts/cleaveql">Meet your new query language <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </section>
        <section id="developers" className={styles.engineeringSection} aria-labelledby="engineering-title">
          <div className={`${styles.engineeringGrid} ${styles.container}`}>
            <div className={styles.engineeringIntro}>
              <h2 id="engineering-title">Serious underneath.<br /><em>Simple on the surface.</em></h2>
              <p>Less time stitching infrastructure together.<br />More time building what comes next.</p>
              <div className={styles.engineDiagram} aria-label="CleaveDB connects a Rust storage engine, native graph bonds, and ONNX semantic search">
                <div className={styles.diagramInputs}><span>Documents</span><span>Relationships</span><span>Meaning</span></div>
                <div className={styles.diagramConnectors} aria-hidden="true"><i /><i /><i /></div>
                <div className={styles.diagramCore}><Image src={logoImg} alt="" width={40} height={40} /><strong>CleaveDB</strong><span>One connected engine</span></div>
                <div className={styles.diagramBase}><span>Rust</span><span>Graph bonds</span><span>ONNX</span></div>
              </div>
              <div className={styles.engineNote}><span aria-hidden="true" /> Built for the way your data actually connects.</div>
            </div>
            <div className={styles.infrastructureList}>
              {infrastructure.map(({ icon: Icon, title, body, href, link }) => (
                <article key={title} className={styles.infrastructureItem}>
                  <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
                  <div><h3>{title}</h3><p>{body}</p><Link href={href}>{link}<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.philosophy} ${styles.container}`} aria-labelledby="philosophy-title">
          <div className={styles.philosophyHeading}><h2 id="philosophy-title">Great ideas deserve<br /><em>less friction.</em></h2><span className={styles.philosophyMark} aria-hidden="true"><GitBranch size={60} strokeWidth={0.8} /></span></div>
          <div className={styles.philosophyColumns}>
            <article><h3>Make data intuitive.</h3><p>We believe building scalable architecture shouldn’t require years of specialized SQL knowledge. Our mission is to make high-performance data storage inherently readable, learnable, and accessible to developers of any background through simple, conversational semantics.</p></article>
            <article><h3>Infrastructure without friction.</h3><p>A future where backend complexity simply gets out of the way. We envision a world where bridging complex graph relationships and neural AI search is as easy as storing a JSON document, empowering you to build the next generation of software without limits.</p></article>
          </div>
          <blockquote><p>“Data infrastructure shouldn’t be a barrier to entry. It should be the invisible bridge between a great idea and its execution.”</p><cite>John David L. Perez</cite></blockquote>
        </section>
        <section className={`${styles.finalCta} ${styles.container}`} aria-labelledby="start-title">
          <div><h2 id="start-title">Make something<br /><em>beautifully connected.</em></h2><p>Your next idea starts with your first query.</p></div>
          <div className={styles.finalActions}><Link className={styles.primaryButton} href="/docs/installation">Start building with CleaveDB <ArrowRight size={18} aria-hidden="true" /></Link><Link className={styles.textButton} href="/tutorial">Take a guided tour <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.container}`}>
        <Link href="/" className={styles.brand} aria-label="CleaveDB home"><Image src={logoImg} alt="" width={30} height={30} /><span>Cleave<span className={styles.brandLight}>DB</span></span></Link>
        <p>© {new Date().getFullYear()} CleaveDB. Built for possibility.</p>
        <nav aria-label="Footer"><Link href="/docs">Documentation</Link><Link href="/tutorial">Tutorials</Link><a href="https://github.com/Tribrix23/CleaveDB" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a></nav>
      </footer>
    </div>
  );
}
