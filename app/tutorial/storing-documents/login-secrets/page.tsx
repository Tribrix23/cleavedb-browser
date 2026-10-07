import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function LoginSecretsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Login Secrets"
      previousHref="/tutorial/storing-documents/expiring-documents"
      previousLabel="Expiring documents"
      nextHref="/tutorial/storing-documents/nested-fields"
      nextLabel="Nested fields"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        <code>WITH SECRET</code> is for a parent account that needs to create another user within its own tenant. Picture the authenticated account as a boarding house: it can register a new resident, give that resident a separate login, and keep the relationship anchored to the parent tenant. Use this when an organization or customer account needs to add its own members, staff, or other sub-users.
      </p>

      <TutorialCodeBlock label="Register a nested user">{`POUR INTO users "bob" {"name": "Bob", "role": "viewer"} WITH SECRET "<password>"`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">What this command creates</h3>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li><strong className="text-zinc-800">The parent account:</strong> run the command while authenticated as the account that owns the tenant space—the boarding house in this picture.</li>
        <li><strong className="text-zinc-800"><code>POUR INTO users "bob"</code> and the JSON:</strong> create Bob’s user document in the <code>users</code> bucket, with profile fields such as <code>name</code> and <code>role</code>.</li>
        <li><strong className="text-zinc-800"><code>WITH SECRET</code>:</strong> register Bob as a sub-user under that parent account and create the authentication entry that lets him sign in.</li>
      </ul>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">The password belongs to the sub-user</h3>
        <p>CleaveDB hashes the supplied password with PBKDF2 and creates the sub-user’s entry in <code>_auth</code>. Replace <code>&lt;password&gt;</code> with the password provided during account creation; it is a placeholder in this syntax example, not a value to copy into production.</p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Where this fits in an application</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Consider a business customer that manages its own team. The business account is the parent tenant; when it adds Bob, the JSON stores his application profile and <code>WITH SECRET</code> provisions his sub-user login within that parent’s tenant. Bob is a distinct user, but he is not created as an unrelated top-level tenant. This is the difference between opening another boarding house and giving a new resident a room in the one that already exists.
      </p>

      <p className="leading-relaxed text-zinc-600">
        The user profile remains ordinary document data that your queries can find or update. The password is handled separately through the authentication entry, where CleaveDB stores its hash rather than a plain-text password. Keeping identity, profile data, and the parent-tenant relationship clear makes this command easier to reason about as an application grows from one account to many teams and members.
      </p>
    </TutorialPageShell>
  );
}
