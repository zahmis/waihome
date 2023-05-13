import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const SECRET = process.env.NEXT_PUBLIC_SECRET;
const OHUROID = process.env.NEXT_PUBLIC_OHUROID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      `https://api.switch-bot.com/v1.0/devices/${OHUROID}/commands`,
      {
        command: `${req.body.command}`,
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
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
