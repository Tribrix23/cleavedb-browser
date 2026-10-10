import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ShapeBucketPage() {
  return (
    <TutorialPageShell
      sectionTitle="SHAPE — Configure Buckets"
      previousHref="/tutorial/bucket-configuration"
      previousLabel="Overview"
      nextHref="/tutorial/bucket-configuration/guard"
      nextLabel="GUARD — validation rules"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <strong><code>SHAPE</code></strong> command configures persistence parameters, retention policies, and lifecycle behaviors for an entire bucket. In CleaveDB, repeated <code>SHAPE</code> invocations accumulate onto the bucket&apos;s saved policy without overwriting prior options.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported configuration options</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Policy</th>
              <th className="py-2.5 px-4 font-semibold">Canonical syntax</th>
              <th className="py-2.5 px-4 font-semibold">Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Audit Trail</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">SHAPE BUCKET orders AUDITED</td>
              <td className="py-2.5 px-4">Logs every write to <code>_audit_&lt;bucket&gt;</code></td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Versioning</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">SHAPE BUCKET orders VERSIONED</td>
              <td className="py-2.5 px-4">Retains full historical document snapshots on mutations</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Capacity Cap</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">SHAPE BUCKET orders MAX DOCUMENTS 100</td>
              <td className="py-2.5 px-4">Enforces a hard document quota ceiling</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Compression</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">SHAPE BUCKET orders COMPRESSION zstd</td>
              <td className="py-2.5 px-4">Applies transparent block-level compression</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">TTL Expiry</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">SHAPE BUCKET orders TTL 3600</td>
              <td className="py-2.5 px-4">Automatically purges records after TTL seconds</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Audit logging with AUDITED</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Enabling <code>AUDITED</code> automatically records every modification (<code>POUR</code>, <code>CHANGE</code>, <code>DRAIN</code>) into an immutable ledger named <code>_audit_&lt;bucket&gt;</code>:
      </p>
      <TutorialCodeBlock label="Enable audit trail">{`SHAPE BUCKET orders AUDITED`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        To prevent unauthorized tampering, audit buckets are system-protected: querying <code>FIND _audit_orders</code> requires developer credentials.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Document versioning</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Preserve complete point-in-time snapshots of records as they change:
      </p>
      <TutorialCodeBlock label="Enable versioning">{`SHAPE BUCKET orders VERSIONED`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        With <code>VERSIONED</code> active, prior versions can be queried using historical time-travel commands (like <code>AS OF</code> and <code>REWIND</code>).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Combining multiple policies</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can configure multiple attributes in a single statement, or use the concise form without the <code>BUCKET</code> keyword:
      </p>
      <TutorialCodeBlock label="Multi-policy configuration">{`-- Full multi-attribute statement:
SHAPE BUCKET orders VERSIONED AUDITED MAX DOCUMENTS 50

-- Short form omitting BUCKET keyword:
SHAPE orders AUDITED`}</TutorialCodeBlock>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Incremental updates</h3>
        <p>
          Running <code>SHAPE</code> multiple times is additive. For instance, executing <code>SHAPE orders AUDITED</code> followed by <code>SHAPE orders TTL 3600</code> results in a bucket that is both audited and has a 3600-second TTL.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
