import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon, Waypoints, Network, Activity, ShieldAlert, Sparkles, Trash2, Globe, HeartPulse } from "lucide-react";

export default function GraphRelationsPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Core Concepts</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">Graph Relations &amp; References</h1>
      
      <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
        Unlike traditional SQL databases that rely on expensive mathematical <code>JOIN</code> operations across tables, CleaveDB natively provides two distinct relationship mechanisms with different architectures, semantics, and storage engines: <strong>Graph Bonds (<code>BOND</code>)</strong> for rich semantic graph edges, and <strong>Document Links (<code>LINK</code>)</strong> for lightweight structural pointers and external web URLs.
      </p>

      <div className="mb-12 rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
        <Image 
          src="/grp.png" 
          alt="Graph Relations Overview" 
          width={1200} 
          height={600} 
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Comparison Matrix */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-16 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            VS
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Summary Comparison: BOND vs LINK</h2>
        </div>
        <p className="text-zinc-600 mb-6 text-sm leading-relaxed">
          CleaveDB clearly separates semantic graph topology from direct document references. The legacy concept of &quot;15-Dimensional Bonds&quot; has been streamlined into clean <strong>Graph Bond</strong> terminology.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50/80">
                <th className="py-3 px-4 font-semibold rounded-tl-lg">Feature</th>
                <th className="py-3 px-4 font-semibold text-blue-700"><code>BOND</code> (Graph Relationship)</th>
                <th className="py-3 px-4 font-semibold text-emerald-700 rounded-tr-lg"><code>LINK</code> (Document / URL Reference)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Primary Purpose</td>
                <td className="py-3 px-4">Semantic graph relationships with meaning (edges)</td>
                <td className="py-3 px-4">Direct document / external URL references</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Relationship Label</td>
                <td className="py-3 px-4 font-medium text-blue-800"><span className="bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono text-xs">Required</span> via <code>AS &quot;&lt;label&gt;&quot;</code></td>
                <td className="py-3 px-4 font-medium text-emerald-800"><span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-mono text-xs">Optional</span> (defaults to <code>&quot;linked&quot;</code>)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Internal Storage</td>
                <td className="py-3 px-4 font-mono text-xs text-blue-600">_bonds</td>
                <td className="py-3 px-4 font-mono text-xs text-emerald-600">_links</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">External URL Targets</td>
                <td className="py-3 px-4 text-zinc-400">No (internal document GIDs only)</td>
                <td className="py-3 px-4 font-medium text-emerald-700">Yes (supports <code>https://...</code>, <code>http://...</code>)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Confidence &amp; Affinity</td>
                <td className="py-3 px-4 text-zinc-800">Yes (<code>WITH CONFIDENCE</code>, <code>WITH AFFINITY</code>)</td>
                <td className="py-3 px-4 text-zinc-400">No (rejected by parser)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">TTL Expiry</td>
                <td className="py-3 px-4 text-zinc-800">Yes (<code>EXPIRING IN &lt;n&gt; SECONDS/MINUTES/HOURS</code>)</td>
                <td className="py-3 px-4 text-zinc-400">No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Conditional Activation</td>
                <td className="py-3 px-4 text-zinc-800">Yes (<code>IF &lt;field&gt; = &lt;val&gt;</code>, <code>ONLY WHEN</code>)</td>
                <td className="py-3 px-4 text-zinc-400">No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Exclusivity</td>
                <td className="py-3 px-4 text-zinc-800">Yes (<code>EXCLUSIVELY</code> replaces previous target)</td>
                <td className="py-3 px-4 text-zinc-400">No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Cascade on Delete</td>
                <td className="py-3 px-4 text-zinc-800">Yes (<code>ON DELETE CASCADE</code>)</td>
                <td className="py-3 px-4 text-zinc-400">No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Querying Commands</td>
                <td className="py-3 px-4 font-mono text-xs text-zinc-700">FIND &quot;label&quot; OF doc, FOLLOW, TRACE, FIND PATTERN, MATCH, SHOW BONDS</td>
                <td className="py-3 px-4 font-mono text-xs text-zinc-700">FIND LINKS OF doc, SHOW LINKS</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Removal Command</td>
                <td className="py-3 px-4 font-mono text-xs text-rose-600 font-semibold">SEVER &lt;doc1&gt; FROM &lt;doc2&gt; [AS &quot;label&quot;]</td>
                <td className="py-3 px-4 font-mono text-xs text-rose-600 font-semibold">UNLINK &lt;doc1&gt; FROM &lt;doc2&gt;</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Integrity Healing</td>
                <td className="py-3 px-4 font-mono text-xs text-zinc-700">HEAL BONDS, HEAL ALL</td>
                <td className="py-3 px-4 font-mono text-xs text-zinc-700">HEAL LINKS, HEAL ALL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strict Existence Validation */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
          <h3 className="text-lg font-semibold text-amber-950">Strict Existence Validation — No Ghost Relationships</h3>
        </div>
        <p className="text-sm text-amber-900/90 leading-relaxed mb-3">
          CleaveDB validates that both source and target buckets and documents exist <strong>before</strong> creating bonds or links (external URLs are validated as valid URLs and exempt from local bucket checks). Creating ghost edges on non-existent entities is strictly rejected:
        </p>
        <div className="bg-zinc-900 rounded-xl p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
          <span className="text-zinc-500">cleave&gt;</span> <span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;user:alice&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;user:david&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;friend&quot;</span><br/>
          <span className="text-rose-400">[&#123;&quot;status&quot;: &quot;error&quot;, &quot;message&quot;: &quot;Source bucket &apos;user&apos; does not exist.&quot;&#125;]</span>
        </div>
      </div>

      {/* 1. BOND Section */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Network className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">1. BOND — Semantic Graph Relationships</h2>
            <p className="text-xs text-zinc-500">Stored in dedicated <code>_bonds</code> bucket</p>
          </div>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          The <code>BOND</code> command establishes directed or mutual semantic graph edges between existing documents. A bond <strong>always requires an explicit relationship label</strong> via <code>AS &quot;&lt;label&gt;&quot;</code> (e.g. <code>AS &quot;friend&quot;</code>). Omitting <code>AS</code> produces an error directing you to <code>LINK</code>.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800 mb-8">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Standard Directed Graph Bond (Label is REQUIRED) */</span><br/>
<span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;users:juan&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;friend&quot;</span><br/><br/>

<span className="text-zinc-500">/* Two-Way (Mutual) Bidirectional Bond */</span><br/>
<span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">AND</span> <span className="text-emerald-300">&quot;users:pedro&quot;</span> <span className="text-amber-400">AS MUTUAL</span> <span className="text-emerald-300">&quot;bff&quot;</span><br/><br/>

<span className="text-zinc-500">/* Multiple Targets */</span><br/>
<span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;users:juan&quot;</span>, <span className="text-emerald-300">&quot;users:pedro&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;knows&quot;</span><br/><br/>

<span className="text-zinc-500">/* Multi-Target Graphing with ANY(...) */</span><br/>
<span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO ANY</span>(<span className="text-emerald-300">&quot;tag:sql&quot;</span>, <span className="text-emerald-300">&quot;tag:rust&quot;</span>) <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;skill&quot;</span>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">Graph Bond Modifiers</h3>
        <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
          Modifiers can be appended after <code>AS &quot;label&quot;</code> on <code>BOND</code>. They configure operational behaviors such as exclusivity, lifecycles, and weights:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm text-zinc-600 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-100/50">
                <th className="py-3 px-4 font-semibold rounded-tl-lg">Modifier</th>
                <th className="py-3 px-4 font-semibold">Syntax</th>
                <th className="py-3 px-4 font-semibold rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">Confidence Score</td>
                <td className="py-3 px-4 font-mono text-purple-600 bg-purple-50 rounded">WITH CONFIDENCE 0.9</td>
                <td className="py-3 px-4">Stores a 0.0 to 1.0 strength score on the edge.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">Affinity Score</td>
                <td className="py-3 px-4 font-mono text-purple-600 bg-purple-50 rounded">WITH AFFINITY 0.8</td>
                <td className="py-3 px-4">Stores a 0.0 to 1.0 closeness metric on the edge.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">TTL Expiration</td>
                <td className="py-3 px-4 font-mono text-emerald-600 bg-emerald-50 rounded">EXPIRING IN 2 HOURS</td>
                <td className="py-3 px-4">Automatic edge expiration (SECONDS, MINUTES, or HOURS).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">Exclusive Edge</td>
                <td className="py-3 px-4 font-mono text-pink-600 bg-pink-50 rounded">EXCLUSIVELY</td>
                <td className="py-3 px-4">Replaces any previous bond with the same label from this source.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">Cascade on Delete</td>
                <td className="py-3 px-4 font-mono text-amber-600 bg-amber-50 rounded">ON DELETE CASCADE</td>
                <td className="py-3 px-4">When the source document is <code>DRAIN</code>ed, target document is also drained.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">Intermediate Routing</td>
                <td className="py-3 px-4 font-mono text-blue-600 bg-blue-50 rounded">THROUGH hubs</td>
                <td className="py-3 px-4">Tags the bond with an intermediate bucket reference.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">Fully-Loaded Bond (Combining Modifiers)</h3>
        <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
          You can combine conditions, weights, TTL, cascades, and exclusivity on a single statement:
        </p>
        <div className="bg-zinc-900 rounded-xl p-5 font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto shadow-inner border border-zinc-800">
          <span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;staff:a&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;staff:b&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;full&quot;</span><br/>
          &nbsp;&nbsp;<span className="text-pink-400">IF</span> status = <span className="text-emerald-300">&quot;active&quot;</span><br/>
          &nbsp;&nbsp;<span className="text-purple-400">WITH CONFIDENCE</span> <span className="text-emerald-300">0.9</span><br/>
          &nbsp;&nbsp;<span className="text-emerald-400">EXPIRING IN</span> <span className="text-emerald-300">2 HOURS</span><br/>
          &nbsp;&nbsp;<span className="text-amber-400">ON DELETE CASCADE</span><br/>
          &nbsp;&nbsp;<span className="text-pink-400">EXCLUSIVELY</span>
        </div>
      </div>

      {/* 2. LINK Section */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Globe className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">2. LINK — Direct Document &amp; URL References</h2>
            <p className="text-xs text-zinc-500">Stored in dedicated <code>_links</code> bucket</p>
          </div>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          The <code>LINK</code> command creates structural pointers between internal documents or references to external web URLs. Unlike <code>BOND</code>, labels are optional (defaulting to <code>&quot;linked&quot;</code>), and graph modifiers like <code>WITH</code>, <code>IF</code>, and <code>EXPIRING</code> are rejected.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800 mb-8">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Unlabelled Document Link (Label defaults to &quot;linked&quot;) */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;users:juan&quot;</span><br/><br/>

<span className="text-zinc-500">/* External Web URL Reference (Validated URL) */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;https://github.com/jane&quot;</span><br/><br/>

<span className="text-zinc-500">/* Labelled Document Link */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;users:juan&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;mentor&quot;</span><br/><br/>

<span className="text-zinc-500">/* Mutual (Bidirectional) Link */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">AND</span> <span className="text-emerald-300">&quot;users:pedro&quot;</span> <span className="text-amber-400">AS MUTUAL</span><br/><br/>

<span className="text-zinc-500">/* Multi-Target Links */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">TO ANY</span>(<span className="text-emerald-300">&quot;users:juan&quot;</span>, <span className="text-emerald-300">&quot;users:pedro&quot;</span>)<br/><br/>

<span className="text-zinc-500">/* Inspecting Links */</span><br/>
<span className="text-blue-400">SHOW LINKS</span>                                     <span className="text-zinc-500">-- lists all document &amp; URL links</span><br/>
<span className="text-blue-400">FIND LINKS OF</span> <span className="text-emerald-300">&quot;users:jane&quot;</span>                         <span className="text-zinc-500">-- shows all links originating from Jane</span>
            </pre>
          </div>
        </div>
      </div>

      {/* 3. Conditional Bonds */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">3. Conditional Bonds (Dormant Edges)</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Bonds can be configured with activation conditions dynamically evaluated against document fields. If the condition is false, the bond remains dormant (ignored by standard traversals). When the document is updated with <code>CHANGE</code> to meet the predicate, the edge reactivates immediately without any re-linking.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800 mb-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Create conditional bond */</span><br/>
<span className="text-blue-400">BOND</span> <span className="text-emerald-300">&quot;staff:a&quot;</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;staff:d&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;gate&quot;</span> <span className="text-pink-400">IF</span> status = <span className="text-emerald-300">&quot;active&quot;</span><br/><br/>

<span className="text-zinc-500">/* staff:d status is &quot;active&quot; -&gt; live bond */</span><br/>
<span className="text-blue-400">FIND</span> <span className="text-emerald-300">&quot;gate&quot;</span> <span className="text-amber-400">OF</span> <span className="text-emerald-300">&quot;staff:a&quot;</span>                <span className="text-zinc-500">-- 1 result</span><br/><br/>

<span className="text-zinc-500">/* Change target field so condition fails */</span><br/>
<span className="text-blue-400">CHANGE</span> staff <span className="text-emerald-300">&quot;d&quot;</span> <span className="text-purple-400">SET</span> status <span className="text-purple-400">TO</span> <span className="text-emerald-300">&quot;inactive&quot;</span><br/>
<span className="text-blue-400">FIND</span> <span className="text-emerald-300">&quot;gate&quot;</span> <span className="text-amber-400">OF</span> <span className="text-emerald-300">&quot;staff:a&quot;</span>                <span className="text-zinc-500">-- 0 results (dormant)</span><br/>
<span className="text-blue-400">FIND CANDIDATE</span> <span className="text-emerald-300">&quot;gate&quot;</span> <span className="text-amber-400">OF</span> <span className="text-emerald-300">&quot;staff:a&quot;</span>      <span className="text-zinc-500">-- reveals dormant candidate bond</span>
            </pre>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-100/50">
                <th className="py-2.5 px-4 font-semibold">Condition Syntax</th>
                <th className="py-2.5 px-4 font-semibold">Evaluated Against</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs font-mono">
              <tr>
                <td className="py-2.5 px-4 text-pink-600">IF status = &quot;active&quot;</td>
                <td className="py-2.5 px-4 text-zinc-700 font-sans">Target document field (default)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-pink-600">ONLY WHEN status IS &quot;active&quot;</td>
                <td className="py-2.5 px-4 text-zinc-700 font-sans">Target document field (synonym)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-pink-600">IF source role IS &quot;admin&quot;</td>
                <td className="py-2.5 px-4 text-zinc-700 font-sans">Source document field</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-pink-600">IF my role = &quot;admin&quot;</td>
                <td className="py-2.5 px-4 text-zinc-700 font-sans">Source document field</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-pink-600">IF their role = &quot;user&quot;</td>
                <td className="py-2.5 px-4 text-zinc-700 font-sans">Target document field</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Graph Traversal */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Waypoints className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">4. Graph Traversal</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Traversing the graph requires no complex relational syntax. You can walk a single hop, trace N-hops deep, or execute multi-hop graph queries.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800 mb-8">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Single Hop Traversal */</span><br/>
<span className="text-blue-400">FIND</span> <span className="text-emerald-300">&quot;friend&quot;</span> <span className="text-amber-400">OF</span> <span className="text-emerald-300">&quot;users:alice&quot;</span><br/><br/>

<span className="text-zinc-500">/* Multi-Hop Deep Traversal (Reading right-to-left) */</span><br/>
<span className="text-blue-400">FIND THE</span> knows <span className="text-amber-400">OF THE</span> boss <span className="text-amber-400">OF</span> users <span className="text-emerald-300">&quot;jane&quot;</span><br/><br/>

<span className="text-zinc-500">/* Explicit Multi-Hop Trace */</span><br/>
<span className="text-blue-400">TRACE</span> <span className="text-emerald-300">&quot;manages&quot;</span>, <span className="text-emerald-300">&quot;mentors&quot;</span> <span className="text-amber-400">FROM</span> <span className="text-emerald-300">&quot;users:ana&quot;</span><br/><br/>

<span className="text-zinc-500">/* Broad Neighborhood Breadth-First Search (FOLLOW) */</span><br/>
<span className="text-blue-400">FOLLOW</span> <span className="text-emerald-300">&quot;users:ana&quot;</span> <span className="text-amber-400">THROUGH</span> <span className="text-emerald-300">&quot;manages&quot;</span> <span className="text-pink-400">DIRECTION BOTH DEPTH</span> 3 <span className="text-pink-400">LIMIT</span> 10
            </pre>
          </div>
        </div>
      </div>

      {/* 5. Pattern Matching Subgraphs */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Network className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">5. Pattern Matching Subgraphs (FIND PATTERN &amp; MATCH)</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Define the exact shape of the subgraph you want across multiple buckets, and CleaveDB will resolve the entire pattern in a single pass.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Multi-Node Chain Pattern */</span><br/>
<span className="text-blue-400">FIND PATTERN</span> staff <span className="text-amber-400">AS</span> a <span className="text-amber-400">LINKED VIA</span> <span className="text-emerald-300">&quot;manages&quot;</span> <span className="text-purple-400">TO</span> staff <span className="text-amber-400">AS</span> b <span className="text-amber-400">LINKED VIA</span> <span className="text-emerald-300">&quot;mentors&quot;</span> <span className="text-purple-400">TO</span> staff <span className="text-amber-400">AS</span> c<br/><br/>

<span className="text-zinc-500">/* Cross-Bucket Geographic Match */</span><br/>
<span className="text-blue-400">FIND PATTERN</span> staff <span className="text-amber-400">AS</span> s <span className="text-amber-400">LINKED VIA</span> <span className="text-emerald-300">&quot;lives_in&quot;</span> <span className="text-purple-400">TO</span> places <span className="text-amber-400">AS</span> p<br/><br/>

<span className="text-zinc-500">/* Advanced Cypher-Style MATCH */</span><br/>
<span className="text-blue-400">MATCH</span> (u <span className="text-purple-400">FROM</span> users)-[<span className="text-emerald-300">&quot;friend&quot;</span>]-&gt;(f <span className="text-purple-400">FROM</span> users)-[<span className="text-emerald-300">&quot;owns&quot;</span>]-&gt;(d <span className="text-purple-400">FROM</span> docs) <span className="text-pink-400">WHERE</span> u.name = <span className="text-emerald-300">&quot;Alice&quot;</span>
            </pre>
          </div>
        </div>
      </div>

      {/* 6. Removing Relationships: SEVER vs UNLINK */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">6. Removing Relationships: SEVER vs UNLINK</h2>
            <p className="text-xs text-zinc-500">Dedicated removal commands for distinct relationship engines</p>
          </div>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Because <code>BOND</code> and <code>LINK</code> reside in distinct collections, CleaveDB provides dedicated commands to remove them cleanly without confusing graph edges with URL references.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-xs border border-blue-100">SEVER</span>
              Remove Bonds (_bonds)
            </h3>
            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Detaches semantic graph edges. Can target a specific label or destroy all edges between two documents.
            </p>
            <div className="bg-zinc-900 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
              <span className="text-zinc-500">-- Remove specific label</span><br/>
              <span className="text-blue-400">SEVER</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">FROM</span> <span className="text-emerald-300">&quot;users:juan&quot;</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">&quot;friend&quot;</span><br/><br/>
              <span className="text-zinc-500">-- Remove all labels</span><br/>
              <span className="text-blue-400">SEVER</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">FROM</span> <span className="text-emerald-300">&quot;users:juan&quot;</span>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-xs border border-emerald-100">UNLINK</span>
              Remove Links (_links)
            </h3>
            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Removes document pointers or external URL targets without affecting graph bonds.
            </p>
            <div className="bg-zinc-900 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
              <span className="text-zinc-500">-- Remove document link</span><br/>
              <span className="text-blue-400">UNLINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">FROM</span> <span className="text-emerald-300">&quot;users:juan&quot;</span><br/><br/>
              <span className="text-zinc-500">-- Remove external URL link</span><br/>
              <span className="text-blue-400">UNLINK</span> <span className="text-emerald-300">&quot;users:jane&quot;</span> <span className="text-purple-400">FROM</span> <span className="text-emerald-300">&quot;https://github.com/jane&quot;</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Healing & Maintenance */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">7. Node Disappearance &amp; Integrity Healing</h2>
            <p className="text-xs text-zinc-500">Automated orphan cleanup across storage</p>
          </div>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          When a document is soft-deleted with <code>DRAIN</code>, CleaveDB automatically detaches connected edges. If documents are permanently hard-deleted with <code>INCINERATE</code> or external changes occur, <code>HEAL</code> prunes orphaned pointers:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-100/50">
                <th className="py-2.5 px-4 font-semibold">Variant</th>
                <th className="py-2.5 px-4 font-semibold">Syntax</th>
                <th className="py-2.5 px-4 font-semibold">Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs font-mono">
              <tr>
                <td className="py-2.5 px-4 text-zinc-800 font-sans font-medium">Bonds only</td>
                <td className="py-2.5 px-4 text-blue-600">HEAL BONDS</td>
                <td className="py-2.5 px-4 text-zinc-600 font-sans">Removes bonds whose source or target document no longer exists in <code>_bonds</code>.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-zinc-800 font-sans font-medium">Links only</td>
                <td className="py-2.5 px-4 text-emerald-600">HEAL LINKS</td>
                <td className="py-2.5 px-4 text-zinc-600 font-sans">Removes links whose source or target document no longer exists in <code>_links</code>.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-zinc-800 font-sans font-medium">Full repair</td>
                <td className="py-2.5 px-4 text-purple-600">HEAL ALL</td>
                <td className="py-2.5 px-4 text-zinc-600 font-sans">Heals bonds, links, secondary indexes, and any detectable inconsistencies.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Neuro-Symbolic Semantic Pathfinding */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-8 mb-16 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl shadow-sm flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-blue-950 tracking-tight">Neuro-Symbolic Semantic Pathfinding</h2>
        </div>
        
        <p className="text-blue-900/80 mb-6 leading-relaxed">
          Graph databases traverse relationships symbolically, but they possess zero semantic understanding. Vector databases find conceptually similar data but are entirely flat. CleaveDB seamlessly merges Graph Bond Traversal with the ONNX Transformer.
        </p>
        
        <p className="text-blue-900/80 mb-6 leading-relaxed">
          At each hop of a BFS graph traversal, the Rust FFI engine computes the <code>_mm512_dp_ps</code> vector cosine similarity between the prompt&apos;s embedding and adjacent nodes&apos; embeddings. It dynamically prunes branches of the graph that do not match the semantic concept in a single CPU clock cycle, preventing BFS explosions and yielding highly intelligent, context-aware paths.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-blue-400">FOLLOW</span> <span className="text-emerald-300">&quot;users:alice&quot;</span> <span className="text-amber-400">THROUGH</span> <span className="text-emerald-300">&quot;friend&quot;</span> <span className="text-pink-400">GUIDED BY MEANING</span> <span className="text-emerald-300">&quot;machine learning experts&quot;</span> <span className="text-pink-400">THRESHOLD</span> 0.75 <span className="text-pink-400">DEPTH</span> 6
            </pre>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 mb-16 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4 tracking-tight">Summary</h2>
        <p className="text-zinc-600 leading-relaxed">
          CleaveDB transforms rigid relational joins into clear, expressive graph navigation. By choosing between <strong><code>BOND</code></strong> for semantic, weighted, expiring graph relationships and <strong><code>LINK</code></strong> for lightweight document and external URL references, applications maintain clean separation of concerns and ultra-fast hardware-level traversals.
        </p>
      </div>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/docs/core-concepts/cleaveql" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors">
          &larr; CleaveQL Syntax
        </Link>
        <Link href="/docs/core-concepts/vector-embeddings" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: Vector Embeddings &rarr;
        </Link>
      </div>
    </>
  );
}
