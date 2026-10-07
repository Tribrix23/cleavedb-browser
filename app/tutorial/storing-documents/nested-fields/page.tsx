import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function NestedFieldsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Writing to Nested Fields"
      previousHref="/tutorial/storing-documents/login-secrets"
      previousLabel="Login secrets"
      nextHref="/tutorial/retrieving-documents"
      nextLabel="Retrieving Documents"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A profile is rarely complete on the day it is created. A user may add a nickname later; an employee may gain a skill; a product may receive new specifications. The <code>INSIDE … AT</code> form of POUR writes JSON at a field path on an existing document, so you can update one nested part without resending the document’s full contents.
      </p>

      <TutorialCodeBlock label="Set profile details">{`POUR '{"nick": "JJ"}' INSIDE users "jane" AT profile`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Follow the target and the path</h3>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li><strong className="text-zinc-800">The quoted JSON:</strong> <code>'&#123;"nick": "JJ"&#125;'</code> is the value you want to write. In this POUR form, pass the JSON as a quoted string.</li>
        <li><strong className="text-zinc-800"><code>INSIDE users "jane"</code>:</strong> identify the existing document by its bucket and ID.</li>
        <li><strong className="text-zinc-800"><code>AT profile</code>:</strong> choose the field path to receive that value. Use a dotted path to point deeper into an object, such as <code>profile.skills</code>.</li>
      </ul>

      <p className="mb-4 leading-relaxed text-zinc-600">
        In this example, the payload is written at Jane’s <code>profile</code> path. To target a deeper field, keep the document address the same and change the path after <code>AT</code>:
      </p>

      <TutorialCodeBlock label="Write into a nested path">{`POUR '{"tool": "CleaveDB"}' INSIDE users "alice" AT profile.skills`}</TutorialCodeBlock>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">One important prerequisite</h3>
        <p>The destination document must already exist. Use a regular POUR to create a new document first; use <code>INSIDE … AT</code> when you want to set data at a specific path on a record that is already there.</p>
      </aside>
    </TutorialPageShell>
  );
}
