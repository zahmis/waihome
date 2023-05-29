import { NextResponse } from "next/server";

export async function middleware() {
  console.info("middleware");
  const url = "https://api.switch-bot.com/v1.0/devices";

  const externalRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });

  const data = await externalRes.json();

  const res = NextResponse.json(data);
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,POST,PUT,DELETE,OPTIONS"
  );

  return res;
}
