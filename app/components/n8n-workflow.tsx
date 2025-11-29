"use client";

import React, { useEffect, useRef } from "react";

interface N8nWorkflowProps {
	data: any;
}

export const N8nWorkflow = ({ data }: N8nWorkflowProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadScripts = async () => {
			// Fonction pour charger un script proprement
			const loadScript = (src: string, type?: string, noModule?: boolean) => {
				return new Promise((resolve, reject) => {
					if (document.querySelector(`script[src="${src}"]`)) {
						resolve(true);
						return;
					}
					const script = document.createElement("script");
					script.src = src;
					if (type) script.type = type;
					if (noModule) script.noModule = true;
					script.onload = () => resolve(true);
					script.onerror = () => reject(new Error(`Failed to load ${src}`));
					document.head.appendChild(script);
				});
			};

			try {
				// 1. Web Components Loader
				await loadScript("https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js");
				
				// 2. Lit Polyfill Support
				await loadScript("https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js");
				
				// 3. n8n Demo Component (Module)
				await loadScript("https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js", "module");

			} catch (error) {
				console.error("Error loading n8n scripts:", error);
			}
		};

		loadScripts();
	}, []);

	useEffect(() => {
		if (containerRef.current && data) {
			containerRef.current.innerHTML = '';
			
			const demoElement = document.createElement('n8n-demo');
			const workflowJson = typeof data === 'string' ? data : JSON.stringify(data);
			
			demoElement.setAttribute('workflow', workflowJson);
			// Note: Avec le nouveau script bundled, asset-base n'est peut-être plus nécessaire mais je le garde par sécurité
			// si la documentation de cette version spécifique le requiert.
			// Cependant, essayons sans d'abord si c'est un "bundled.js" autosuffisant, 
			// ou avec une URL standard si ça ne marche pas.
			
			containerRef.current.appendChild(demoElement);
		}
	}, [data]);

	return (
		<div 
			ref={containerRef} 
			className="my-8 w-full overflow-hidden rounded-lg border border-zinc-800 bg-white"
			style={{ height: 'h-fit' }}
		>
			<div className="flex h-full items-center justify-center text-zinc-500">
				Chargement du workflow...
			</div>
		</div>
	);
};

export default N8nWorkflow;
