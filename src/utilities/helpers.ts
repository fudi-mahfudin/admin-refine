import { GetFieldsFromList } from "@refinedev/nestjs-query";
import dayjs from "dayjs";
import { DashboardDealsChartQuery } from "@/graphql/types";

type DealStage = GetFieldsFromList<DashboardDealsChartQuery>;

type DealAggregate = DealStage["dealsAggregate"][0];

interface MappedDealData {
  timeUnix: number;
  timeText: string;
  value: number;
  state: string;
}

// Get the date in the format "DD MMM YYYY - HH:mm"
export const getDate = (startDate: string, endDate: string) => {
  const start = dayjs(startDate).format("DD MMM YYYY - HH:mm");
  const end = dayjs(endDate).format("DD MMM YYYY - HH:mm");

  return `${start} - ${end}`;
};

// Filter out deals that don't have a closeDateMonth or CloseDateYear
const filterDeal = (deal?: DealAggregate) =>
  deal?.groupBy && deal.groupBy?.closeDateMonth && deal.groupBy?.closeDateYear;

const mapDeals = (
  deals: DealAggregate[] = [],
  state: string
): MappedDealData[] => {
  // filter out deals that don't have a closeDateMonth or closeDateYear
  return deals.filter(filterDeal).map((deal) => {
    // Get the closeDateMonth and closeDateYear from the deal
    const { closeDateMonth, closeDateYear } = deal.groupBy as NonNullable<
      DealAggregate["groupBy"]
    >;

    // Create a date object from the closeDateMonth and closeDateYear
    const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);

    // Return the mapped deal data
    return {
      // Convert the date to a unix timestamp i.e., 1622505600000
      timeUnix: date.unix(),
      // Conver the date to a string i.e., " May 2021"
      timeText: date.format("MMM YYYY"),
      // Get the sum of all deals in this stage
      value: deal.sum?.value ?? 0,
      state,
    };
  });
};

// Map deals data to the format required by the chart
export const mapDealsData = (
  dealStages: DealStage[] = []
): MappedDealData[] => {
  // Get the deal stage with the title "WON"
  const won = dealStages.find((stage) => stage.title === "WON");
  const wonDeals = mapDeals(won?.dealsAggregate, "Won");

  // Get the deal stage with title "LOST"
  const lost = dealStages.find((stage) => stage.title === "LOST");
  const lostDeals = mapDeals(lost?.dealsAggregate, "Lost");

  // Combine the won and lost deals and sort them by time
  return [...wonDeals, ...lostDeals].sort((a, b) => a.timeUnix - b.timeUnix);
};
