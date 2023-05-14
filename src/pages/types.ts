export type CommonResponse = {
  statusCode: string;
  message: string;
  body: {};
};

export type GetHuroStatusResponse = CommonResponse & {
  body: {
    deviceId: string;
    deviceType: string;
    hubDeviceId: string;
    power: "on" | "off";
  };
};
