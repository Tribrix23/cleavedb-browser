import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function DescribeShowPage() {
  return (
    <TutorialPageShell
      sectionTitle="DESCRIBE & SHOW"
      previousHref="/tutorial/bucket-configuration/index"
      previousLabel="INDEX — speed up lookups"
      nextHref="/tutorial/bucket-configuration/webhooks"
      nextLabel="Webhooks"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Monitoring cluster health, inspecting bucket statistics, and listing database metadata are essential administrative duties. CleaveQL provides two specialized commands: <strong><code>DESCRIBE</code></strong> for detailed per-bucket summaries, and <strong><code>SHOW</code></strong> for global resource catalogs.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">1. Inspecting a bucket with DESCRIBE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Run <code>DESCRIBE</code> to obtain an immediate diagnosis of document count and health for any bucket:
      </p>
      <TutorialCodeBlock label="Describe a populated bucket">{`DESCRIBE emp`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Returns a human-readable confirmation with computed statistics:
      </p>
      <TutorialCodeBlock label="Output confirmation">{`Bucket 'emp' (7 docs). Stats computed successfully.`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If a bucket contains zero documents or has not yet been written to, it reports: <code>Bucket &apos;nosuch&apos; is empty.</code>
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">2. Listing system resources with SHOW</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>SHOW</code> suite queries internal registries and presents organized JSON outputs:
      </p>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Command</th>
              <th className="py-2.5 px-4 font-semibold">Purpose</th>
              <th className="py-2.5 px-4 font-semibold">Example return payload</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SHOW BUCKETS</td>
              <td className="py-2.5 px-4">Lists all visible bucket collections</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&#123;&quot;data&quot;: [&quot;emp&quot;, &quot;mix&quot;]&#125;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SHOW BONDS</td>
              <td className="py-2.5 px-4">Lists every active graph bond relationship</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&#123;&quot;count&quot;: 1, &quot;data&quot;: [...]&#125;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SHOW INDEXES</td>
              <td className="py-2.5 px-4">Lists all active B+Tree secondary indexes</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&#123;&quot;count&quot;: 1, &quot;data&quot;: [...]&#125;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SHOW STATS</td>
              <td className="py-2.5 px-4">Aggregates document and bucket totals</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&#123;&quot;buckets&quot;: 1, &quot;documents&quot;: 3, ...&#125;</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SHOW WEBHOOKS</td>
              <td className="py-2.5 px-4">Lists registered Change Data Capture webhooks</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&#123;&quot;count&quot;: 1, &quot;data&quot;: [...]&#125;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cluster Statistics (SHOW STATS)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>SHOW STATS</code> provides an instant snapshot of your storage utilization:
      </p>
      <TutorialCodeBlock label="Retrieve global stats">{`SHOW STATS`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Returns a breakdown across all collections:
      </p>
      <TutorialCodeBlock label="Stats JSON payload">{`{
  "buckets": 2,
  "documents": 14,
  "bonds": 8,
  "per_bucket": {
    "emp": 7,
    "mix": 7
  }
}`}</TutorialCodeBlock>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Tenant visibility and internal buckets</h3>
        <p>
          <code>SHOW</code> results only include resources belonging to the authenticated tenant. Internal system buckets (starting with an underscore <code>_</code>, such as <code>_rubbish</code> or <code>_audit_orders</code>) are filtered from ordinary queries and require developer administrative access.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
