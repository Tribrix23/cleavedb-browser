import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function BucketConfigurationOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Bucket Configuration — Overview"
      previousHref="/tutorial/pipeline/group-aggregate"
      previousLabel="Group & aggregate stages"
      nextHref="/tutorial/bucket-configuration/shape"
      nextLabel="SHAPE — configure buckets"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In CleaveDB, a bucket is more than a simple document container. Each bucket possesses a dedicated storage policy, lifecycle rules, secondary indexes, write validation guards, and real-time event webhooks configured declaratively in CleaveQL.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Zero-downtime policy evolution</h3>
        <p>
          Bucket configurations in CleaveDB can be modified on the fly without database restarts or table locks. Storage policies, indexes, and validation rules take effect immediately across all active cluster nodes.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Core bucket management commands</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Command</th>
              <th className="py-2.5 px-4 font-semibold">Primary role</th>
              <th className="py-2.5 px-4 font-semibold">Key capabilities</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SHAPE</td>
              <td className="py-2.5 px-4">Bucket lifecycle &amp; storage policy</td>
              <td className="py-2.5 px-4"><code>AUDITED</code>, <code>VERSIONED</code>, <code>MAX DOCUMENTS</code>, <code>COMPRESSION</code>, <code>TTL</code></td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">GUARD</td>
              <td className="py-2.5 px-4">Write-time schema validation</td>
              <td className="py-2.5 px-4"><code>REQUIRED</code>, type assertions, numeric bounds, enumeration sets (<code>IN</code>)</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">INDEX</td>
              <td className="py-2.5 px-4">B+Tree index acceleration</td>
              <td className="py-2.5 px-4">Single-field and composite multi-field indexes</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">DESCRIBE &amp; SHOW</td>
              <td className="py-2.5 px-4">Metadata &amp; resource inspection</td>
              <td className="py-2.5 px-4">Summarize document volumes, list buckets, bonds, indexes, stats, and webhooks</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">WEBHOOK</td>
              <td className="py-2.5 px-4">Change Data Capture (CDC)</td>
              <td className="py-2.5 px-4">HTTP event dispatch on <code>POUR</code>, <code>CHANGE</code>, and <code>DRAIN</code> actions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Bucket Configuration topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Step through each lesson to configure your storage buckets:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/bucket-configuration/shape">
            SHAPE — configure buckets: audit logging, document versioning, capacity limits, and TTL retention.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/bucket-configuration/guard">
            GUARD — validation rules: enforce field presence, types, numeric thresholds, and allowed values.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/bucket-configuration/index">
            INDEX — speed up lookups: create single-field and composite B+Tree indexes.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/bucket-configuration/describe-show">
            DESCRIBE &amp; SHOW: inspect bucket contents, cluster statistics, and active system resources.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/bucket-configuration/webhooks">
            Webhooks: subscribe external services directly to mutation events without Kafka or Debezium.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
