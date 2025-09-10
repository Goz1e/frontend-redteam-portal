import React from "react";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						minHeight: "100vh",
						backgroundColor: "#000000",
						color: "#ffffff",
						padding: "20px",
						fontFamily: "monospace",
					}}
				>
					<h1 style={{ color: "#dc2626" }}>Something went wrong!</h1>
					<details style={{ marginTop: "20px" }}>
						<summary>Error Details</summary>
						<pre
							style={{
								backgroundColor: "#1f1f1f",
								padding: "10px",
								borderRadius: "5px",
								marginTop: "10px",
								overflow: "auto",
							}}
						>
							{this.state.error?.toString()}
							{"\n"}
							{this.state.error?.stack}
						</pre>
					</details>
					<button
						onClick={() => this.setState({ hasError: false })}
						style={{
							backgroundColor: "#dc2626",
							color: "white",
							padding: "10px 20px",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
							marginTop: "20px",
						}}
					>
						Try Again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
