import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./providers/index.tsx";
import "./index.css";
import { Toaster } from "sonner";

// Test with ErrorBoundary to catch any errors
createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<Providers>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<Toaster theme="dark" richColors />
		</Providers>
	</ErrorBoundary>
);
