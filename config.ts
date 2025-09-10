import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
	appName: "RED TEAM PORTAL",
	projectId: (import.meta as any).env?.VITE_PROJECT_ID || "RED_TEAM_ID",
	chains: [mainnet],
	ssr: false,
});
