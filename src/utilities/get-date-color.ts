import dayjs from "dayjs";

type DateColors = "success" | "processing" | "error" | "default" | "warning";

// return a color based on the date
export const getDateColor = (args: {
  date: string;
  defaultColor?: DateColors;
}): DateColors => {
  const date = dayjs(args.date);
  const today = dayjs();

  if (date.isBefore(today)) {
    return "error";
  }

  if (date.isBefore(today.add(3, "day"))) {
    return "warning";
  }

  // ?? is the nullish coalescing operator. It returns the right-hand side operator when the left-hand is null or undefined.
  return args.defaultColor ?? "default";
};
