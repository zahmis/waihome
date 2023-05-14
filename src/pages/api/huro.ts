import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { CommonResponse, GetHuroStatusResponse } from "../types";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const SECRET = process.env.NEXT_PUBLIC_SECRET;
const OHUROID = process.env.NEXT_PUBLIC_OHUROID;

const sendCommand = async (command: string) => {
  const response = await axios.post(
    `https://api.switch-bot.com/v1.0/devices/${OHUROID}/commands`,
    {
      command,
      parameter: "default",
      commandType: "command",
    },
    {
      headers: {
        Authorization: TOKEN,
        secret: SECRET,
      },
    }
  );
  return response.data as CommonResponse;
};

const getStatus = async () => {
  const response = await axios.get(
    `https://api.switch-bot.com/v1.0/devices/${OHUROID}/status`,
    {
      headers: {
        Authorization: TOKEN,
        secret: SECRET,
      },
    }
  );
  return response.data as GetHuroStatusResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const postData = await sendCommand(req.body.command);
        res.status(200).json(postData);
        break;
      case "GET":
        const getData = await getStatus();
        console.info(getData.body.power);
        res.status(200).json(getData);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
