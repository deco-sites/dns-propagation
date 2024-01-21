import { capitalize } from "deco-sites/admin/sdk/utils/string.ts";

export interface DailyMetrics {
  date: string;
  [key: string]: string | number;
}

export type Period = keyof typeof INTERVALS;

export const INTERVALS = {
  "1d": "1 day",
  "1w": "1 week",
  "1m": "1 month",
  "3m": "3 months",
} as const;

const PERIOD_MAP_INTO_DAYS = {
  d: 1,
  w: 7,
  m: 30,
};

export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}
export function calculatePeriodInDays(period: Period): number {
  const periodNumber = parseInt(period.slice(0, -1));
  const periodUnit = period.at(-1) as keyof typeof PERIOD_MAP_INTO_DAYS;
  const periodDays = PERIOD_MAP_INTO_DAYS[periodUnit];
  if (!periodDays) return -1;
  return periodDays * periodNumber;
}

export function getMonthInterval(date: Date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    since: firstDay,
    until: lastDay,
  };
}

export function currentMonthInterval() {
  return getMonthInterval(new Date());
}

export function getEnterpriseNextBillingDate() {
  const today = new Date();
  const month = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  return BillingFormatter.formatDueDate(month.toISOString());
}

/**
 * Represents a billing invoice
 */
export interface Invoice {
  id: string;
  team: number;
  status: string;
  due_date: string;
  value: number;
  description: string;
  nf_url: string;
  bank_slip_url: string;
}

/**
 * Represents a billing subscription
 */
export interface Subscription {
  team: number;
  status: string;
  plan: number;
  go_live_date: string;
  signed_date: string;
}

/**
 * Represents a billing plan
 */
export interface Plan {
  id: number;
  name: string;
  currency: string;
  fixed_price: number;
  takerate_gmv?: number;
  gmv_threshold?: number;
  performance_bonus?: number;
  discount?: number;
  price_review?: number;
  price_per_10k?: number;
  price_per_additional_1gb_bw?: number;
  included_pageviews?: number;
  included_bw?: number;
  included_bw_per_10k_pageviews?: number;
  included_requests_per_10k_pageviews?: number;
  price_extra_1k_requests_after_included_per_10k_pageviews?: number;
  price_extra_1gb_bw_after_included_per_10k_pageviews?: number;
}

export class BillingFormatter {
  static formatDueDate(date: string): string {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "long" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  static formatValue(value: number): string {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "BRL",
    });
  }

  static formatInvoiceStatus(status: string) {
    switch (status) {
      case "paid":
      case "overdue":
        return capitalize(status);
      case "registered":
        return "Pending";
      default:
        return "Unknown";
    }
  }
}

const BILL_CYCLE_ORIGIN_DATE = new Date(Date.UTC(2023, 10, 1));

export function getChartMonthOptions(goLiveDate: string) {
  const start = new Date(goLiveDate) < BILL_CYCLE_ORIGIN_DATE
    ? BILL_CYCLE_ORIGIN_DATE
    : new Date(goLiveDate + "T00:00:00Z");
  const end = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
    ),
  );
  const months = [];

  for (
    const d = new Date(start);
    d <= end;
    d.setUTCMonth(d.getUTCMonth() + 1)
  ) {
    months.push({
      label: `${
        new Date(d.getUTCFullYear(), d.getUTCMonth()).toLocaleString(
          "default",
          { month: "long", year: "numeric", timeZone: "UTC" },
        )
      }`,
      value: `${d.getUTCFullYear()}/${
        String(d.getUTCMonth() + 1).padStart(
          2,
          "0",
        )
      }`,
    });
  }

  return months.reverse();
}
