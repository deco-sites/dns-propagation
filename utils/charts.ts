import { DailyMetrics } from "deco-sites/admin/utils/billing.ts";

interface Series {
  values: number[];
  label: string;
}

export interface Dataset {
  categories: string[];
  series: Series[];
}

const EMPTY_SCALE = {
  ticks: {
    display: false,
  },
  grid: {
    display: false,
  },
  border: {
    display: false,
  },
};

export const CHART_OPTIONS = {
  EMPTY: {
    layout: {
      padding: 0,
    },
    scales: {
      x: EMPTY_SCALE,
      y: EMPTY_SCALE,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
};

/**
 * Formats a number into a readable format with suffixes for large numbers.
 *
 * @param value - The number or string to be formatted.
 * @param digits - The number of decimal places to include in the formatted number (default is 1).
 * @returns The formatted number as a string.
 */
export function formatNumber(value: string | number, digits = 1): string {
  const num = Number(value);
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

/**
 * Extracts and returns the day from a date string in "YYYY-MM-DD" format.
 *
 * @param date - The date string to extract the day from.
 * @returns The day extracted from the date.
 */
export function formatDay(date: string): string {
  return date.split("-")[2];
}

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export function convertToChartData(
  rawData: DailyMetrics[],
  properties: string[],
  period?: string,
  siteId?: string,
) {
  const date = period ? new Date(period) : new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInMonth = getDaysInMonth(month + 1, year);
  const categories: string[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    categories.push(formatDate(date));
  }

  const aggregatedData: { [date: string]: { [prop: string]: number } } = {};
  rawData.forEach((item) => {
    if (
      (siteId === "*" || item.site === siteId) &&
      !aggregatedData[item.date]
    ) {
      aggregatedData[item.date] = {};
      properties.forEach((prop) => {
        aggregatedData[item.date][prop] = 0;
      });
    }
    properties.forEach((prop) => {
      if (siteId === "*" || item.site === siteId) {
        aggregatedData[item.date][prop] += (item[prop] as number) || 0;
      }
    });
  });

  const seriesData: { [prop: string]: number[] } = {};
  properties.forEach((prop) => {
    seriesData[prop] = new Array(daysInMonth).fill(0);
  });

  Object.keys(aggregatedData).forEach((date) => {
    const index = categories.indexOf(date);
    if (index !== -1) {
      properties.forEach((prop) => {
        seriesData[prop][index] = aggregatedData[date][prop];
      });
    }
  });

  const series = properties.map((prop) => {
    return {
      label: prop
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      values: seriesData[prop],
    };
  });

  return { categories, series };
}

/**
 * Calculates the total of all values in a dataset.
 * @param {Object} dataset - The dataset containing a 'values' array.
 * @returns {number} - The total sum of the values.
 */
export function calculateTotal(dataset: Series) {
  if (!dataset || !Array.isArray(dataset.values)) {
    return 0;
  }

  return dataset.values.reduce((acc, curr) => acc + curr, 0);
}
