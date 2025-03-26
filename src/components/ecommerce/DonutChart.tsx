import React, { Fragment } from "react";
import Chart from "react-apexcharts";
const labels = [
  "Bookings",
  "Discounts",
  "Salaries",
  "Taxes & Deductions",
  "Platform Fees",
];

const DonutChart: React.FC = () => {
  const series = [100000, 15889, 8500, 1200, 300];
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: ["#F26724", "#B0B0B0", "#515858", "#FCC3AC", "#FFFFFF"], // Updated Colors
    legend: {
      show: false, // Using a custom legend
    },
    dataLabels: {
      enabled: false, // Hiding the percentage labels
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%", // Adjusted thickness
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Earnings",
              formatter: () => "$125,889", // Central text
              color: "#000",
              fontSize: "16px",
              fontWeight: 600,
            },
          },
        },
      },
    },
    tooltip: {
      enabled: false,
      custom: ({ series, seriesIndex, w }) => {
        return `
          <div class="bg-white rounded-lg px-3 py-2 shadow-md flex items-center text-gray-700 font-semibold text-sm">
            <span class="w-2.5 h-2.5 rounded-full inline-block mr-2" style="background: ${
              w.globals.colors[seriesIndex]
            };"></span>
            ${w.globals.labels[seriesIndex]}: ${series[
          seriesIndex
        ].toLocaleString()}
          </div>
        `;
      },
    },
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Earning & Payouts
        </h3>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Left Side Donut Chart */}
        <div className="flex justify-center items-center">
          <div className="w-72 h-72">
            <Chart options={options} series={series} type="donut" />
          </div>
        </div>

        {/* Right Side Summary */}
        <div className="ml-6 w-full md:w-auto mt-6 md:mt-0 bg-gray-100 px-6 py-4 rounded-2xl">
          <ul className="space-y-3">
            {labels.map((label, index) => (
              <Fragment key={index}>
                <li className="flex justify-between  gap-5">
                  <span className="flex items-center text-xs text-gray-500 font-light">
                    <span
                      className="w-3 h-3 rounded-full inline-block mr-2 "
                      style={{ backgroundColor: options.colors?.[index] }}
                    ></span>
                    {label}
                  </span>
                  <span className=" text-gray-900 text-sm">
                    ${series[index].toLocaleString()}
                  </span>
                </li>
                {index + 1 !== labels.length && (
                  <hr className="border-gray-300" />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
