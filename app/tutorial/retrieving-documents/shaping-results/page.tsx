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
        After finding the right documents, decide how the answer should arrive. A product page might need the most expensive matches first, only a handful of results, and just each item’s title and price. CleaveQL combines sorting, limiting, and field selection so the query can return that useful view directly.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Choose the order</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>ARRANGED BY</code> sorts on a field. Follow it with <code>GOING UP</code> for ascending order or <code>GOING DOWN</code> for descending order. The reference also lists <code>ORDER BY</code> and <code>SORTED BY</code> as aliases, with <code>ASC</code> and <code>DESC</code> as direction forms. Use sorting when rank or sequence matters; for example, a price comparison is more useful when the highest or lowest prices appear where the reader expects them.
      </p>
      <TutorialCodeBlock label="Sort a product result">{`SCOOP products ARRANGED BY price GOING DOWN
SCOOP products ORDER BY price GOING UP
SCOOP products SORTED BY price DESC`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Sorting is most valuable when the order communicates something: prices from high to low, or a score from low to high. If your screen needs a specific field order, name it explicitly rather than relying on the incidental order in which documents happen to be returned.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Set a useful result size</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Add <code>LIMIT</code> to cap the number of returned documents. It is useful for search-result pages, previews, or any view that should show an initial slice instead of every matching record. Pair it with a deliberate sort so the limited set contains the records you meant to prioritize.
      </p>
      <TutorialCodeBlock label="Sort and limit a filtered result">{`SCOOP products WHERE category = "Books" ARRANGED BY price GOING DOWN LIMIT 5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This query first narrows the catalog to books, then orders those matches by descending price, and finally keeps the first five. The order matters to the human reading it: the limit now means “the five highest-priced books,” rather than an arbitrary five books.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Return only the fields the caller needs</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>YIELD</code> to project selected fields from each document; <code>SHOW</code> is its documented alias. A compact result can keep a list view focused on a title and price, while the full document remains available for a detail view that needs more context.
      </p>
      <TutorialCodeBlock label="Select fields for a list view">{`SCOOP products YIELD title, price
SCOOP users WHERE city = "Manila" SHOW name, age`}</TutorialCodeBlock>
      <p className="leading-relaxed text-zinc-600">
        In the second query, the filter decides which users qualify and <code>SHOW</code> decides which fields appear in the result. You can combine the same ideas with ordering and a limit: first define the records the caller wants, then return them in a useful order and shape.
      </p>
    </TutorialPageShell>
  );
}
