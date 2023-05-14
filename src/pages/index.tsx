"use client";
import { Button, Textarea, Badge, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GetHuroStatusResponse } from "./api/types";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [huroStatus, setHuroStatus] = useState(false);
  const [lightsStatus, setLightsStatus] = useState(false);

  // 新しくデバイスを追加するときはここでdeviceIdを確認する
  // const getList = async () => {
  //   try {
  //     const res = await fetch("api/deviceList");
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (err) {
  //     if (err instanceof Error)
  //       throw new Error(`リスト取得 Error: ${err.message}`);
  //   }
  // };
  // getList();

  const handleOhuro = async (s: string) => {
    try {
      await fetch("api/huro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: s }),
      });
      // 割と反映に時間かかるので5秒待つ
      await new Promise((resolve) => setTimeout(resolve, 5000));
      getOhuroStatus();
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`風呂スイッチ Error: ${err.message}`);
    }
  };

  const getOhuroStatus = async () => {
    try {
      const res = await fetch("api/huro");
      const data: GetHuroStatusResponse = await res.json();

      if (data.body.power === "on") setHuroStatus(true);
      else setHuroStatus(false);
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`風呂状態 Error: ${err.message}`);
    }
  };

  const handleLights = async (s: string) => {
    try {
      await fetch("api/lights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: s }),
      });

      // 割と反映に時間かかるので5秒待つ
      await new Promise((resolve) => setTimeout(resolve, 5000));
      getLightsStatus();
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`照明スイッチ Error: ${err.message}`);
    }
  };

  const getLightsStatus = async () => {
    try {
      const res = await fetch("api/lights");
      const data = await res.json();

      if (data === "on") setLightsStatus(true);
      else setLightsStatus(false);

      console.log(data);
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`照明状態 Error: ${err.message}`);
    }
  };

  useEffect(() => {
    getOhuroStatus();
  }, []);

  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    if (savedLoginState) {
      setLogin(JSON.parse(savedLoginState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify("xCdVYW3MBf%8!*@zamis"));
  }, [login]);

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
      <Grid.Container gap={1}>
        <Grid>
          <Button color="error" onClick={() => handleOhuro("turnOn")}>
            お風呂 ON
          </Button>
        </Grid>
        <Grid>
          <Button onClick={() => handleOhuro("turnOff")}>お風呂 OFF</Button>
        </Grid>
        <Badge color={huroStatus ? "error" : "primary"}>
          {huroStatus ? "ON" : "OFF"}
        </Badge>
      </Grid.Container>
      <Grid.Container gap={1}>
        <Grid>
          <Button color="error" onClick={() => handleLights("turnOn")}>
            照明 ON
          </Button>
        </Grid>
        <Grid>
          <Button onClick={() => handleLights("turnOff")}>照明 OFF</Button>
        </Grid>
        <Badge color={lightsStatus ? "error" : "primary"}>
          {lightsStatus ? "ON" : "OFF"}
        </Badge>
      </Grid.Container>
    </main>
  );
}
