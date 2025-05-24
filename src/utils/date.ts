// 2025-05-24
export const getDateFromTimestamp = (timestamp: string) => timestamp.split("T")[0];

export const convertIntToTimestamp = (dateInt: number) => new Date(dateInt * 1000).toISOString();

export const getYesterdayDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return getDateFromTimestamp(yesterday.toISOString());
}
