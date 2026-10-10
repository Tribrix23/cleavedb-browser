import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function LinearRegressionPage() {
  return (
    <TutorialPageShell
      sectionTitle="Linear regression"
      previousHref="/tutorial/forecasting"
      previousLabel="Overview"
      nextHref="/tutorial/forecasting/moving-average"
      nextLabel="Moving averages"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When historical observations follow a steady upward or downward trajectory, <strong><code>METHOD LINEAR</code></strong> fits an Ordinary Least Squares (OLS) regression line directly over your time-series data. It evaluates historical slope and intercept, measures the goodness-of-fit via the <i>R²</i> metric, and projects future milestones.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Setting up sample time-series data</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Consider a bucket containing sequential daily revenue records:
      </p>
      <TutorialCodeBlock label="Insert historical sales records">{`POUR INTO sales "s1" {"created_at": "2026-10-01", "total": 100.0}
POUR INTO sales "s2" {"created_at": "2026-10-02", "total": 115.0}
POUR INTO sales "s3" {"created_at": "2026-10-03", "total": 130.0}
POUR INTO sales "s4" {"created_at": "2026-10-04", "total": 145.0}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Each document stores an ISO date string in <code>created_at</code> and a numeric revenue figure in <code>total</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Executing a linear forecast</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Predict the next 7 days of sales by specifying the target bucket, prediction field, timestamp field, horizon, and method:
      </p>
      <TutorialCodeBlock label="Forecast query">{`FORECAST sales PREDICT total OVER created_at NEXT 7 DAYS METHOD LINEAR`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB scans the bucket, parses timestamps into Unix epochs, computes the regression coefficients via <code>numpy.linalg.lstsq</code>, and generates the projection.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Structured forecast response</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The engine returns the model details, goodness-of-fit score, and an array of predicted future dates:
      </p>
      <TutorialCodeBlock label="Linear regression output">{`{
  "status": "ok",
  "method": "LINEAR",
  "r_squared": 1.0,
  "predictions": [
    { "date": "2026-10-05", "predicted_total": 160.0 },
    { "date": "2026-10-06", "predicted_total": 175.0 },
    { "date": "2026-10-07", "predicted_total": 190.0 },
    { "date": "2026-10-08", "predicted_total": 205.0 },
    { "date": "2026-10-09", "predicted_total": 220.0 },
    { "date": "2026-10-10", "predicted_total": 235.0 },
    { "date": "2026-10-11", "predicted_total": 250.0 }
  ]
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Future dates are incremented automatically according to the specified <code>DAYS</code> delta (86,400 seconds).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Understanding the R² coefficient</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>r_squared</code> field represents the coefficient of determination (ranging from 0.0 to 1.0):
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">R² Range</th>
              <th className="px-4 py-3">Interpretation</th>
              <th className="px-4 py-3">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-emerald-700">0.85 &ndash; 1.00</td>
              <td className="px-4 py-3">Strong linear correlation; high confidence in projected trend</td>
              <td className="px-4 py-3">Use <code>METHOD LINEAR</code> for production planning</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-amber-700">0.50 &ndash; 0.84</td>
              <td className="px-4 py-3">Moderate variance or seasonal noise present in data</td>
              <td className="px-4 py-3">Compare against <code>METHOD MOVING_AVERAGE</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-red-700">&lt; 0.50</td>
              <td className="px-4 py-3">Weak linear fit; historical trend is non-linear or erratic</td>
              <td className="px-4 py-3">Switch to rolling smoothing or moving window models</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Sub-daily forecasting</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        For infrastructure monitoring, sensor feeds, or IoT time series, you can extrapolate across smaller intervals:
      </p>
      <TutorialCodeBlock label="Hourly CPU utilization projection">{`FORECAST telemetry PREDICT cpu_pct OVER recorded_at NEXT 12 HOURS METHOD LINEAR`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB sets a delta of 3,600 seconds per step and generates hourly forecast points formatted with ISO UTC timestamps.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Data Minimums & Safety Limits</h3>
        <p>
          Linear regression requires at least 2 distinct data points to compute slope and intercept. The maximum horizon allowed is <strong>10,000</strong> steps to prevent excessive memory allocations.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
