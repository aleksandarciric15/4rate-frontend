export interface AnalyticsItem {
  name: string;
  uv: number; // unique views
  pv: number; // page views
  amt: number; // amount
}

export type AnalyticCounts = {
  users: number;
  reviews: number;
  restaurants: number;
};
