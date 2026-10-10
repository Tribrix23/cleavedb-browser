import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function ForecastingOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Forecasting (FORECAST) — Overview"
      previousHref="/tutorial/cluster/scatter"
      previousLabel="SCATTER writes"
      nextHref="/tutorial/forecasting/linear"
      nextLabel="Linear regression"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In conventional data stacks, computing statistical predictions and time-series projections requires exporting raw tables into external Python scripts or analytical warehouses. CleaveDB integrates <strong>Feature 29: Statistical Prediction (FORECAST)</strong> directly into its query engine, enabling in-database machine learning and trend extrapolation with zero data movement.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">In-Engine Predictive Modeling</h3>
        <p>
          The <code>FORECAST</code> statement operates on time-series documents stored in any bucket. It evaluates date fields, sorts historical milestones, executes linear regression or moving window algorithms in memory, and returns projection intervals with goodness-of-fit metrics.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported Prediction Methods</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. METHOD LINEAR</h4>
          <p className="text-xs text-zinc-600">
            Computes Ordinary Least Squares (OLS) linear regression via vector math. Fits a best-fit trendline, calculates the <i>R²</i> coefficient of determination, and extrapolates values across future periods.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. METHOD MOVING_AVERAGE</h4>
          <p className="text-xs text-zinc-600">
            Smooths short-term fluctuations and noisy time series by computing rolling mean projections across a customizable window frame (<code>WINDOW &lt;n&gt;</code>, default 3).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. METHOD EXPONENTIAL</h4>
          <p className="text-xs text-zinc-600">
            Applies single exponential smoothing with a decay coefficient (&alpha; = 0.5), placing greater weight on recent observations while dampening historical variance.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">4. Flexible Time Horizons</h4>
          <p className="text-xs text-zinc-600">
            Project forward across granular units including <code>DAYS</code>, <code>HOURS</code>, <code>MINUTES</code>, and <code>SECONDS</code>, with built-in security caps up to 10,000 steps.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">General Syntax</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Every forecast statement follows a structured declarative pattern:
      </p>
      <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-900 p-4 font-mono text-sm text-zinc-200">
        <span className="font-semibold text-sky-400">FORECAST</span> &lt;bucket&gt;{" "}
        <span className="text-violet-300">PREDICT</span> &lt;value_field&gt;{" "}
        <span className="text-violet-300">OVER</span> &lt;time_field&gt;{" "}
        <span className="text-violet-300">NEXT</span> &lt;horizon&gt; &lt;time_unit&gt;{" "}
        <span className="text-violet-300">METHOD</span> &lt;method&gt; [
        <span className="text-violet-300">WINDOW</span> &lt;window&gt;]
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore Forecasting Guides</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Select a guide below to master time-series extrapolation in CleaveDB:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/forecasting/linear">
            Linear regression: predict trends using ordinary least squares with <i>R²</i> goodness-of-fit validation.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/forecasting/moving-average">
            Moving averages: smooth volatile metrics using sliding window frames and exponential smoothing.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
