declare module 'svelte-knob' {
	import { SvelteComponentTyped } from "svelte";

	export interface KnobProps {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		size?: number;
		strokeWidth?: number;
		color?: string;
		bgColor?: string;
	}

	export default class Knob extends SvelteComponentTyped<KnobProps, {}, {}> {}
}

declare module 'culori' {
	export function formatHex(color: { mode: 'hsl'; h: number; s: number; l: number }): string;
}
  