"use client";

import React from "react";

interface WhimsicalProps {
	url: string;
	aspectRatio?: string;
}

export const Whimsical = ({ url, aspectRatio = "16/9" }: WhimsicalProps) => {
	// L'URL attendue est de la forme https://whimsical.com/embed/ID
	// Si l'utilisateur colle une URL publique https://whimsical.com/ID, on la transforme.
	
	let embedUrl = url;
	
	// Transformation simple pour s'assurer qu'on utilise bien l'endpoint /embed/
	if (url.includes("whimsical.com") && !url.includes("/embed/")) {
		// Remplace whimsical.com/ par whimsical.com/embed/
		embedUrl = url.replace("whimsical.com/", "whimsical.com/embed/");
	}

	return (
		<div 
			className="my-8 w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
			style={{ aspectRatio }}
		>
			<iframe 
				src={embedUrl} 
				className="w-full h-full border-0"
				allowFullScreen 
				title="Whimsical Board"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
			/>
		</div>
	);
};

export default Whimsical;
