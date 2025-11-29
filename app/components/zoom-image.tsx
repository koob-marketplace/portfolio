"use client";

import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image, { ImageProps } from "next/image";

// Wrapper pour les images Next.js
export const ZoomImage = (props: ImageProps) => {
	return (
		<Zoom>
			<Image
				{...props}
				className={`rounded-md border border-zinc-200 bg-zinc-100 ${props.className || ""}`}
			/>
		</Zoom>
	);
};

// Wrapper pour les images HTML standard (Markdown ![alt](src))
export const ZoomHtmlImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
	return (
		<Zoom>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				{...props}
				className={`rounded-md border border-zinc-200 bg-zinc-100 ${props.className || ""}`}
			/>
		</Zoom>
	);
};

