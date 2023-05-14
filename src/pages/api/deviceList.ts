import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

const getList = async () => {
  const response = await axios(`https://api.switch-bot.com/v1.0/devices`, {
    headers: {
      Authorization: TOKEN,
    },
  });
  return response.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const getData = await getList();
        res.status(200).json(getData);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
