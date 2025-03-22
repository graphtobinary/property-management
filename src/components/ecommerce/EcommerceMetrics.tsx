export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Properties
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              25
            </h4>
          </div>
        </div>
        <span className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Your total properties across all locations has increased by{" "}
          <b>4.6%</b> since last month
        </span>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Occupancy Rate
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              78%
            </h4>
          </div>
        </div>
        <span className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Your occupancy rate across all locations has increased by <b>8.6%</b>{" "}
          since last month
        </span>
      </div>

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Revenue This Month
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              $125889
            </h4>
          </div>
        </div>
        <span className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Your revenue across all locations has decreased by <b>12.9%</b> since
          last month
        </span>
      </div>

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tenant Satisfaction Score
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              4.65/5
            </h4>
          </div>
        </div>
        <span className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Your overall tenant satisfaction score has risen by <b>15%</b> since
          last month
        </span>
      </div>

      {/* <!-- Metric Item End --> */}
    </div>
  );
}
