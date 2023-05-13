"use client";
import { Button } from "@nextui-org/react";

export default function Home() {
  const handleOhuro = async (s: string) => {
    try {
      const res = await fetch("api/switch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: s }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <h1>Home</h1>
      <Button onPress={() => handleOhuro("turnOn")}>お風呂 ON</Button>
      <br />
      <Button onPress={() => handleOhuro("turnOff")}>お風呂 OFF</Button>
    </main>
  );
}
