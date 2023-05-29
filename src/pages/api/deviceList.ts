import useSWR from "swr";

export const useDeviceList = () => {
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
      },
    });

  const { data, error } = useSWR(
    "https://api.switch-bot.com/v1.0/devices",
    fetcher
  );

  console.log(data, 16);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
