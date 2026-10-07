import React from "react";
import Link from "next/link";
import { Download, Terminal, Info, AlertTriangle } from "lucide-react";

export default function DocsInstallationPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Getting Started</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">Installation</h1>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        CleaveDB is built for extreme performance using hardware-accelerated memory access and vector search. You can choose to run the pre-compiled standalone binary (recommended for most users) or compile the core engine from source out of Rust and C++ SIMD.
      </p>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">A</div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Download Pre-Compiled Binary (Recommended)</h2>
        </div>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          You do <strong>not</strong> need to install Python, Rust, or C++ build tools. We provide a single, self-contained executable that has the hardware-accelerated C++ AVX-512 extensions and Rust engine fully baked in.
        </p>
        
        <ol className="list-decimal list-inside space-y-4 text-zinc-600 mb-8 ml-2">
          <li>Go to the <a href="https://github.com/Tribrix23/CleaveDB/releases" className="text-blue-600 hover:underline font-medium">Releases</a> page on GitHub.</li>
          <li>Download <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-sm text-zinc-800">CleaveShell.exe</code> (or the equivalent binary for your OS).</li>
          <li>Double-click the executable to instantly start the database server and interactive shell.</li>
        </ol>

        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 text-sm text-blue-900 shadow-sm flex items-start gap-4">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-1 text-blue-950">Windows SmartScreen Notice</strong>
            Because CleaveDB is an independent, open-source project, the Windows installer does not use an expensive corporate EV certificate. When downloading or running the <code>.exe</code>, Windows or Edge might flag it as "unrecognized".
            To bypass this, click <strong>Keep &rarr; Keep anyway</strong> in Edge, and <strong>More info &rarr; Run anyway</strong> on the blue Windows screen.
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 mb-16 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-white font-bold text-sm">B</div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Compile from Source (Advanced / Contributors)</h2>
        </div>
        <p className="text-zinc-600 mb-8 leading-relaxed">
          If you want to modify the source code, extend the engine, or contribute to the project, you can compile the engine from scratch.
        </p>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">1. Prerequisites</h3>
        <ul className="list-disc list-inside space-y-3 text-zinc-600 mb-10 ml-2">
          <li><strong>Python 3.10+</strong> (Required for the CleaveQL Interpreter and TCP Server bindings)</li>
          <li><strong>Rust Toolchain (2021 Edition)</strong> (Install via <a href="https://rustup.rs" className="text-blue-600 hover:underline">rustup.rs</a>). The install takes ~1 minute.</li>
          <li><strong>C++ Build Tools</strong> (Required for compiling the AVX-512 and AVX2 hardware extensions).</li>
          <li><strong>Go 1.21+</strong> (Optional, only needed if compiling the distributed cluster coordinator logic).</li>
        </ul>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">2. Install Python Dependencies</h3>
        <p className="text-zinc-600 mb-4">
          This installs everything from <code>websockets</code> and <code>numpy</code> for the AI semantic search, up to <code>maturin</code>, which is the Rust-to-Python compiler tool.
        </p>
        <code className="block bg-zinc-900 text-zinc-100 p-4 rounded-xl text-sm font-mono shadow-inner overflow-x-auto mb-10">
          <span className="text-zinc-500 select-none mr-3">$</span>pip install -r requirements.txt
        </code>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">3. Run the Master Build Script</h3>
        <p className="text-zinc-600 mb-4">
          Simply run the orchestrator script, which compiles the C++ SIMD layers, the Go Coordinator, and the Rust storage engine via PyO3/maturin:
        </p>
        <code className="block bg-zinc-900 text-zinc-100 p-4 rounded-xl text-sm font-mono shadow-inner overflow-x-auto mb-6">
          <span className="text-zinc-500 select-none mr-3">$</span>python build.py
        </code>
        
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-sm text-zinc-600 mt-6 mb-10">
          <strong className="text-zinc-900 block mb-2">What <code>build.py</code> does in the background:</strong>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Compiles the <strong>C++ SIMD</strong> layers for vector dot-product, softmax, and matrix multiplication.</li>
            <li>Compiles the optional <strong>Go Coordinator</strong> into a shared library.</li>
            <li>Compiles the <strong>Custom Rust Storage Engine</strong> (B+Tree, WAL, Buffer Pool).</li>
            <li>Uses <code>maturin</code> to bind the Rust engine into a Python module (<code>cleavedb3_storage</code>) and installs it.</li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">4. Start the Server</h3>
        <p className="text-zinc-600 mb-4">
          Once compiled, start the TCP / WebSocket / HTTP server:
        </p>
        <code className="block bg-zinc-900 text-zinc-100 p-4 rounded-xl text-sm font-mono shadow-inner overflow-x-auto">
          <span className="text-zinc-500 select-none mr-3">$</span>python cleavedb_server.py
        </code>
      </div>

      <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Authentication & Multi-Tenancy Setup</h2>
      <p className="text-zinc-600 leading-relaxed mb-6">
        CleaveDB enforces authentication before any query. Every client must <code>register</code> or <code>login</code> through the CLI shell before the database allows connections.
      </p>

      <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl mb-10 font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
        <div className="text-emerald-400 mb-2">cleavedb-auth&gt; register</div>
        Username: david<br/>
        Password: ********<br/>
        Dev Password (superuser override): ********<br/>
        Security Question: What was the name of your first pet?<br/>
        Answer: rover
      </div>
      <p className="text-zinc-600 leading-relaxed mb-10">
        Passwords are hashed natively with <strong>PBKDF2-HMAC-SHA256</strong> (100,000 iterations, 16-byte random salt). Security questions and answers are encrypted at rest with <strong>AES-256-GCM</strong>.
      </p>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/docs" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors">
          &larr; Introduction
        </Link>
        <Link href="/docs/quick-start" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: Quick Start &rarr;
        </Link>
      </div>
    </>
  );
}
