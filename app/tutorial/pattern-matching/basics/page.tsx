import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FindPatternBasicsPage() {
  return (
    <TutorialPageShell
      sectionTitle="FIND PATTERN Basics"
      previousHref="/tutorial/pattern-matching"
      previousLabel="Overview"
      nextHref="/tutorial/pattern-matching/edge-directions"
      nextLabel="Edge directions"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In CleaveQL, <code>FIND PATTERN</code> matches subgraph paths across buckets and bond edges declaratively. Each document node in the pattern is assigned an alias using <code>AS alias</code>, and connections are defined with <code>LINKED VIA &quot;label&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Two-node pattern</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To find all staff members who manage another staff member, declare the starting node and connect it to the target node:
      </p>
      <TutorialCodeBlock label="Basic two-node pattern">{`FIND PATTERN staff AS x LINKED VIA "manages" TO staff AS y`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        You can also include the optional <code>IN</code> keyword if you prefer conversational phrasing:
      </p>
      <TutorialCodeBlock label="Using optional IN keyword">{`FIND PATTERN IN staff AS x LINKED VIA "manages" TO staff AS y`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB evaluates the pattern across the graph and returns all matching pairs, mapping each alias (<code>x</code> and <code>y</code>) to its full resolved JSON document.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Filtering aliases with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can filter on properties of any node alias anywhere along the pattern:
      </p>
      <TutorialCodeBlock label="Pattern with WHERE condition">{`FIND PATTERN staff AS x LINKED VIA "manages" TO staff AS y WHERE x.role = "lead"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB&apos;s query planner uses the <code>WHERE</code> condition as an index anchor to filter starting candidates before traversing the bond pointers, maximizing traversal speed.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Chaining multi-node paths</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Chain multiple <code>LINKED VIA</code> clauses together to express deeper relationship graphs:
      </p>
      <TutorialCodeBlock label="Three-node management & mentorship chain">{`-- Who does Ana manage that also mentors someone?
FIND PATTERN staff AS a
  LINKED VIA "manages" TO staff AS b
  LINKED VIA "mentors" TO staff AS c`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This returns complete 3-node paths matching the shape <code>a &rarr; b &rarr; c</code> (for example: <code>a = Ana</code> &rarr; <code>b = Ben</code> &rarr; <code>c = Dee</code>).
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Result structure</h3>
        <p>
          Unlike relational joins that flatten records into tabular columns with repeated keys, <code>FIND PATTERN</code> returns an array of subgraph mappings where each alias key contains the exact document object stored in that bucket.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
