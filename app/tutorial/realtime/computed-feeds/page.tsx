import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ComputedFeedsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Live computed feeds"
      previousHref="/tutorial/realtime/subscribe-document"
      previousLabel="Subscribe to a document"
      nextHref="/tutorial/computed-fields"
      nextLabel="Computed Fields (ENRICH)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In many real-time applications, incoming raw data must be mathematically transformed, normalized, or unit-converted before display. Rather than writing client-side math functions in every frontend application, CleaveDB pairs <strong><code>ENRICH</code></strong> with <strong><code>LISTEN</code></strong> to create <strong>live computed feeds</strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Virtual enrichment on stream arrival</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When an <code>ENRICH</code> rule is active on a bucket, any incoming <code>POUR</code> or <code>CHANGE</code> mutation evaluates the formula on the fly and broadcasts the computed fields alongside raw data:
      </p>
      <TutorialCodeBlock label="Define computed feed and subscribe">{`-- 1. Declare dynamic temperature conversion formula
ENRICH sensors WITH fahrenheit AS (celsius * 9/5) + 32

-- 2. Open real-time stream subscription
LISTEN TO sensors`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The virtual field <code>fahrenheit</code> does not consume disk space in the primary B-tree, but is dynamically calculated by the query interpreter during broadcast dispatch.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Publishing raw data</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When an IoT sensor or backend service publishes raw telemetry:
      </p>
      <TutorialCodeBlock label="Raw telemetry insertion">{`POUR INTO sensors "s1" {"celsius": 20}`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Subscribed clients instantly receive the fully computed payload:
      </p>
      <TutorialCodeBlock label="Broadcast with computed fields">{`{
  "event": "POUR",
  "bucket": "sensors",
  "id": "s1",
  "data": {
    "celsius": 20,
    "fahrenheit": 68
  },
  "timestamp": 1728562500
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The frontend directly renders <code>68°F</code> without executing math routines or risking rounding discrepancies across different browser platforms.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Real-time business formulas</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can compute complex multi-field metrics such as profit margins, tax rates, or risk scores:
      </p>
      <TutorialCodeBlock label="Live e-commerce margin feed">{`-- Compute profit margin on sales events
ENRICH sales WITH margin AS price - cost, tax AS price * 0.12

-- Stream to accounting dashboards
LISTEN TO sales`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Every sale logged to the database immediately pushes <code>margin</code> and <code>tax</code> to active administrative dashboards.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Single Source of Truth</h3>
        <p>
          By computing formulas at the database engine level, every client platform (React web apps, iOS, Android, internal Python workers) receives identical calculations, preventing logic drift across client implementations.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
