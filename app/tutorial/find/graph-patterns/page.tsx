import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FindGraphPatternsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Graph Patterns"
      previousHref="/tutorial/find/bond-lookups"
      previousLabel="Following a bond"
      nextHref="/tutorial/find/semantic-search"
      nextLabel="Semantic search"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A single bond answers a one-step question. When the answer lives several links away, <code>FIND PATTERN</code> describes a path across document types and relationship labels. The query below traces a user’s purchase to a product and then to its manufacturer, keeping only paths that lead to Acme Corp.
      </p>

      <TutorialCodeBlock label="Trace a product to its manufacturer">{`FIND PATTERN users AS u
  LINKED VIA "purchased" TO products AS p
  LINKED VIA "manufactured_by" TO brands AS b
  WHERE b.name = "Acme Corp"`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Read the path from its named parts</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        <code>users AS u</code> names the starting documents. <code>LINKED VIA &quot;purchased&quot; TO products AS p</code> follows the first bond and gives the product node a short alias. The next <code>LINKED VIA</code> clause follows the product’s <code>manufactured_by</code> bond to a brand. Finally, <code>WHERE b.name = &quot;Acme Corp&quot;</code> constrains the brand node, so CleaveDB returns paths that satisfy the full pattern.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Anchor the walk with a selective condition</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB can use the most restrictive node condition as an anchor, then walk backward along the specified bonds to resolve complete paths. In this example, the brand-name condition gives the engine a focused target. On a dense graph, an unconstrained pattern can create many intermediate paths, so add a meaningful <code>WHERE</code> condition whenever the domain provides one.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Patterns return connected paths</h3>
        <p>
          A pattern describes which nodes and bonds must connect. It is useful for provenance, memberships, ownership, and social connections—cases where the path itself is part of the answer, not merely a way to find one isolated record.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
