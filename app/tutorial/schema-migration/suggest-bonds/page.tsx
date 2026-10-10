import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SuggestBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="SUGGEST BONDS"
      previousHref="/tutorial/schema-migration/heal"
      previousLabel="HEAL — repair integrity"
      nextHref="/tutorial/realtime"
      nextLabel="Real-time Pub/Sub (LISTEN)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        As data models grow, documents often reference each other through foreign key fields, string IDs, or semantic concepts without having explicit graph bonds defined. The <strong><code>SUGGEST BONDS</code></strong> command scans your documents and intelligently proposes missing relationships.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Non-destructive proposal engine</h3>
        <p>
          <code>SUGGEST BONDS</code> is strictly read-only. It inspects documents and outputs scored suggestions, but nothing is added to the graph until you explicitly approve the relationship using <code>LINK</code>.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Inspecting relationship suggestions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Run <code>SUGGEST BONDS</code> to scan for unlinked candidate pairs:
      </p>
      <TutorialCodeBlock label="Request bond suggestions">{`SUGGEST BONDS`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The engine returns a ranked list of suggestions with confidence scores:
      </p>
      <TutorialCodeBlock label="Engine response format">{`{
  "status": "ok",
  "count": 2,
  "suggestions": [
    {
      "source": "logs:l3",
      "target": "staff:c",
      "confidence": 0.95,
      "reason": "Field 'owner' references staff:c"
    },
    {
      "source": "logs:l1",
      "target": "staff:a",
      "confidence": 0.75,
      "reason": "Field 'user' matches the id of staff:a"
    }
  ]
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Pairs that are already bonded in either direction are excluded from the output.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Detection signals &amp; confidence scores</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB combines heuristic field matching with AI vector embedding proximity to score potential relationships:
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Signal</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Example Pattern</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Full document ID match</td>
              <td className="px-4 py-3 font-mono font-semibold text-emerald-600">0.95</td>
              <td className="px-4 py-3">Field holds a qualified ID like <code>{`{"owner": "staff:c"}`}</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Cross-bucket ID match</td>
              <td className="px-4 py-3 font-mono font-semibold text-blue-600">0.75</td>
              <td className="px-4 py-3">Field holds a bare ID like <code>{`{"user": "a"}`}</code> matching <code>staff:a</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">AI Vector Embedding similarity</td>
              <td className="px-4 py-3 font-mono font-semibold text-amber-600">&gt; 0.50</td>
              <td className="px-4 py-3">Cosine similarity in <code>_embeddings</code> demonstrates semantic affinity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Review &amp; bond workflow</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Accepting a suggestion is as simple as creating the bond with <code>BOND</code>:
      </p>
      <TutorialCodeBlock label="Interactive suggestion lifecycle">{`-- 1. Inspect what relationships are missing
SUGGEST BONDS

-- 2. Accept a high-confidence recommendation
BOND "logs:l1" TO "staff:a" AS "by"

-- 3. Verify suggestion is dismissed
SUGGEST BONDS

-- 4. Query across the newly formed relationship
FIND "by" OF "logs:l1"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Once bonded, the recommendation is dismissed and no longer appears in future <code>SUGGEST BONDS</code> results.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Single-line command chaining</h3>
        <p>
          You can inspect, establish, and verify bonds in a single command string:
        </p>
        <code className="mt-2 block text-xs font-semibold text-blue-900">
          SUGGEST BONDS BOND &quot;logs:l1&quot; TO &quot;staff:b&quot; AS &quot;seen&quot; SUGGEST BONDS
        </code>
      </aside>
    </TutorialPageShell>
  );
}
