"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const handleOhuro = async (s: string) => {
    try {
      await fetch("api/huro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: s }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");

  if (!login) {
    return (
      <main>
        <h1>ログイン</h1>
        <Textarea
          label="パスワード"
          placeholder="パスワードを入力してください"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onPress={() => {
            if (password === "xCdVYW3MBf%8!*@zamis") setLogin(true);
          }}
        >
          サインイン
        </Button>
      </main>
    );
  }
  return (
    <main>
      <h1>Home</h1>
      <Button onPress={() => handleOhuro("turnOn")}>お風呂 ON</Button>
      <br />
      <Button onPress={() => handleOhuro("turnOff")}>お風呂 OFF</Button>
    </main>
  );
}
