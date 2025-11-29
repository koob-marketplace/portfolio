"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Initialize mermaid with your preferred theme
mermaid.initialize({
	startOnLoad: false,
	theme: "dark",
	securityLevel: "loose",
	fontFamily: "inherit",
});

interface MermaidProps {
	chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			mermaid.run({
				nodes: [ref.current],
				suppressErrors: true,
			});
		}
	}, [chart]);

	return (
		<div
			ref={ref}
			className="mermaid flex justify-center p-4 my-8 bg-zinc-900/50 rounded-lg border border-zinc-800 overflow-x-auto"
		>
			{chart}
		</div>
	);
};
