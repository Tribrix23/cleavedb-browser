import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ShapingResultsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Sorting and Choosing Fields"
      previousHref="/tutorial/retrieving-documents/filtering-results"
      previousLabel="Filtering results"
      nextHref="/tutorial/retrieving-documents/summaries-and-totals"
      nextLabel="Summaries and totals"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A query can identify exactly the right documents and still return more than a page needs. SCOOP can order those documents, cap the result, and project only selected fields. This keeps the result legible and tailored to its destination: a catalog can show a few products in price order, with just the title and price visible in each item.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Choose the order</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>ARRANGED BY</code> sorts on a field. Follow it with <code>GOING UP</code> for ascending order or <code>GOING DOWN</code> for descending order. CleaveQL also accepts <code>ORDER BY</code> and <code>SORTED BY</code>, along with <code>ASC</code> and <code>DESC</code> direction forms. Use sorting when rank or sequence matters: a price comparison is more useful when the highest or lowest prices appear where the reader expects them.
      </p>
      <TutorialCodeBlock label="Sort a product result">{`SCOOP products ARRANGED BY price GOING DOWN
SCOOP products ORDER BY price GOING UP
SCOOP products SORTED BY price DESC`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Sorting is most valuable when the order communicates something: prices from high to low, or a score from low to high. If your screen needs a specific order, name the field and direction explicitly rather than relying on the incidental order in which documents happen to be returned.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Set a useful result size</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Add <code>LIMIT</code> to cap how many documents SCOOP returns. It is useful for result pages, previews, or any view that should show an initial slice instead of every matching record. Pair it with a deliberate sort so the limited set contains the records you meant to prioritize.
      </p>
      <TutorialCodeBlock label="Sort and limit a filtered result">{`SCOOP products WHERE category = "Books" ARRANGED BY price GOING DOWN LIMIT 5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This query first narrows the catalog to books, then orders those matches by descending price, and finally keeps the first five. The limit now means “the five highest-priced books,” rather than an arbitrary five books. CleaveDB can use an index when one supports the requested field; without one, the documents are evaluated and the requested ordering is applied to the result.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Return only the fields the caller needs</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>YIELD</code> to project selected fields from each document. This is especially useful when the caller only needs a few values, such as a list view showing a product’s title and price rather than every stored attribute. Projection reduces the amount of document data sent back to the application.
      </p>
      <TutorialCodeBlock label="Select fields for a list view">{`SCOOP products YIELD title, price
SCOOP users WHERE city = "Manila" YIELD name, age`}</TutorialCodeBlock>
      <p className="leading-relaxed text-zinc-600">
        In the second query, the filter decides which users qualify and <code>YIELD</code> decides which fields appear in the result. Combine these ideas with ordering and a limit: first define the records the caller wants, then return them in a useful order and shape.
      </p>
    </TutorialPageShell>
  );
}
