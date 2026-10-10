import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function CountTallyPage() {
  return (
    <TutorialPageShell
      sectionTitle="Count & Tally"
      previousHref="/tutorial/aggregation/basic-aggregates"
      previousLabel="Sum, avg, min, max"
      nextHref="/tutorial/aggregation/where"
      nextLabel="Filtering with WHERE"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In CleaveQL, <strong><code>COUNT</code></strong> and <strong><code>TALLY</code></strong> are interchangeable synonyms for counting documents. They allow you to count total records in a bucket or count documents that have a specific field populated.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">1. Counting all documents in a bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When invoked without a field name, <code>COUNT</code> and <code>TALLY</code> return the total number of documents:
      </p>
      <TutorialCodeBlock label="Count entire bucket">{`DISTILL FROM staff COUNT`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or with the conversational <code>TALLY</code> keyword:
      </p>
      <TutorialCodeBlock label="Using TALLY synonym">{`DISTILL FROM staff TALLY`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both queries return the document volume (e.g., <code>&#123;&quot;count&quot;: 4&#125;</code> or <code>&#123;&quot;tally&quot;: 4&#125;</code>) by reading the bucket index header in constant time.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">2. Counting field presence</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When passed a field name, <code>COUNT</code> tallies only documents where that field exists and is non-null (of any data type: strings, objects, numbers, booleans):
      </p>
      <TutorialCodeBlock label="Count documents with a field">{`DISTILL FROM staff COUNT status`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        You can also use the prepositional <code>OF</code> syntax with <code>TALLY</code>:
      </p>
      <TutorialCodeBlock label="Conversational field tally">{`DISTILL FROM staff TALLY OF status`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Documents lacking the <code>status</code> property are skipped during the count.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">3. Renaming counts with AS</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>AS</code> to provide a semantic alias for your count:
      </p>
      <TutorialCodeBlock label="Aliased headcount">{`DISTILL FROM staff COUNT AS headcount`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns: <code>&#123;&quot;headcount&quot;: 4&#125;</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Key takeaway</h3>
        <p>
          Unlike mathematical functions like <code>TOTAL</code> and <code>AVERAGE</code> which only evaluate numeric values, <code>COUNT field</code> works on any data type to check whether the field exists in the document payload.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
