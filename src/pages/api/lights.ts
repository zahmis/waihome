import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { CommonResponse, GetHuroStatusResponse } from "../types";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const SECRET = process.env.NEXT_PUBLIC_SECRET;
const LIGHT1ID = process.env.NEXT_PUBLIC_LIGHT1;
const LIGHT2ID = process.env.NEXT_PUBLIC_LIGHT2;

const sendCommand = async (command: string) => {
  await axios.post(
    `https://api.switch-bot.com/v1.0/devices/${LIGHT1ID}/commands`,
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

  await axios.post(
    `https://api.switch-bot.com/v1.0/devices/${LIGHT2ID}/commands`,
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
};

const getStatus = async () => {
  const light1 = await axios.get(
    `https://api.switch-bot.com/v1.0/devices/${LIGHT1ID}/status`,
    {
      headers: {
        Authorization: TOKEN,
        secret: SECRET,
      },
    }
  );

  const light2 = await axios.get(
    `https://api.switch-bot.com/v1.0/devices/${LIGHT2ID}/status`,
    {
      headers: {
        Authorization: TOKEN,
        secret: SECRET,
      },
    }
  );

  const response = {
    power:
      light1.data.body.power === "on" && light2.data.body.power === "on"
        ? "on"
        : "off",
  };

  return response.power;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const getData = await getStatus();

        res.status(200).json(getData);
      case "POST":
        const postData = await sendCommand(req.body.command);
        res.status(200).json(postData);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
