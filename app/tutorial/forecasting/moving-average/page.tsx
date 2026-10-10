import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function MovingAveragesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Moving averages"
      previousHref="/tutorial/forecasting/linear"
      previousLabel="Linear regression"
      nextHref="/tutorial"
      nextLabel="Tutorial Overview"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In real-world telemetry, server loads, and retail traffic, metrics frequently exhibit noise, spikes, and non-linear patterns where standard linear regression can over-extrapolate. CleaveDB provides <strong><code>METHOD MOVING_AVERAGE</code></strong> and <strong><code>METHOD EXPONENTIAL</code></strong> to smooth out short-term fluctuations and project stable baseline estimates.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Rolling window moving average</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The moving average method calculates predictions by averaging the most recent <i>W</i> observations in the time series:
      </p>
      <TutorialCodeBlock label="Insert telemetry metrics">{`POUR INTO server_metrics "m1" {"timestamp": "2026-10-05T08:00:00Z", "cpu_pct": 32.5}
POUR INTO server_metrics "m2" {"timestamp": "2026-10-05T09:00:00Z", "cpu_pct": 45.0}
POUR INTO server_metrics "m3" {"timestamp": "2026-10-05T10:00:00Z", "cpu_pct": 41.5}
POUR INTO server_metrics "m4" {"timestamp": "2026-10-05T11:00:00Z", "cpu_pct": 52.0}`}</TutorialCodeBlock>
      <p className="my-4 leading-relaxed text-zinc-600">
        Execute a 3-hour forecast using a sliding window of 3 periods:
      </p>
      <TutorialCodeBlock label="Moving average query">{`FORECAST server_metrics PREDICT cpu_pct OVER timestamp NEXT 3 HOURS METHOD MOVING_AVERAGE WINDOW 3`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If the <code>WINDOW</code> clause is omitted or set to <code>0</code>, CleaveDB defaults to a 3-period rolling window.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Autoregressive projection output</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB evaluates the sliding window autoregressively: step 1 averages the last <i>W</i> points, and step 2 rolls forward incorporating the newly predicted value:
      </p>
      <TutorialCodeBlock label="Moving average response">{`{
  "status": "ok",
  "method": "MOVING_AVERAGE",
  "window": 3,
  "predictions": [
    {
      "date": "2026-10-05T12:00:00+00:00",
      "predicted_cpu_pct": 46.1667
    },
    {
      "date": "2026-10-05T13:00:00+00:00",
      "predicted_cpu_pct": 46.5556
    },
    {
      "date": "2026-10-05T14:00:00+00:00",
      "predicted_cpu_pct": 48.2407
    }
  ]
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This prevents momentary anomalies from skewing future projections.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Exponential smoothing (METHOD EXPONENTIAL)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When recent points carry more predictive weight than older historical records, use <code>METHOD EXPONENTIAL</code>:
      </p>
      <TutorialCodeBlock label="Exponential smoothing query">{`FORECAST orders PREDICT volume OVER created_at NEXT 5 DAYS METHOD EXPONENTIAL`}</TutorialCodeBlock>
      <p className="my-4 leading-relaxed text-zinc-600">
        CleaveDB applies single exponential smoothing with a decay parameter (&alpha; = 0.5):
      </p>
      <TutorialCodeBlock label="Exponential response">{`{
  "status": "ok",
  "method": "EXPONENTIAL",
  "alpha": 0.5,
  "predictions": [
    { "date": "2026-10-06", "predicted_volume": 128.5 },
    { "date": "2026-10-07", "predicted_volume": 128.5 },
    { "date": "2026-10-08", "predicted_volume": 128.5 },
    { "date": "2026-10-09", "predicted_volume": 128.5 },
    { "date": "2026-10-10", "predicted_volume": 128.5 }
  ]
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Exponential smoothing quickly adapts to recent regime changes without being overwhelmed by distant historical outliers.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Choosing the right forecasting method</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Best Used For</th>
              <th className="px-4 py-3">Key Output Fields</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">LINEAR</td>
              <td className="px-4 py-3">Consistent upward or downward growth trends</td>
              <td className="px-4 py-3 font-mono text-zinc-800">r_squared, predictions</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">MOVING_AVERAGE</td>
              <td className="px-4 py-3">Volatile, noisy time-series metrics requiring smoothing</td>
              <td className="px-4 py-3 font-mono text-zinc-800">window, predictions</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">EXPONENTIAL</td>
              <td className="px-4 py-3">Fast adaptation to recent changes with exponential decay</td>
              <td className="px-4 py-3 font-mono text-zinc-800">alpha, predictions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Congratulations!</h3>
        <p>
          You have completed all sections of the canonical CleaveDB tutorial! You now have a complete foundation covering documents, ACID transactions, graph bonds, AVX SIMD aggregations, time travel, diagnostics, distributed clustering, and in-database statistical forecasting.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
