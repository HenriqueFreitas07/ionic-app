import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "The Big Hand",
  webDir: "dist",
  bundledWebRuntime: false,
  server: { androidScheme: "http", allowNavigation: [ "http://192.168.0.86:8080/" ] }
};

export default config;
