<script lang="ts">
  import "../styles.css";
  import { formatHex } from "culori";
  import Knob from 'svelte-knob';
  import { browser } from "$app/environment";

  interface HSLColor {
    h: number;
    s: number;
    l: number;
  }

  const initialHexColours: HSLColor[] = [
    { h: 240, s: 60, l: 50 }, { h: 120, s: 60, l: 50 },
    { h: 270, s: 60, l: 50 }, { h: 60, s: 60, l: 50 },
    { h: 0, s: 60, l: 50 }, { h: 30, s: 60, l: 50 }
  ];

  let hexColours: HSLColor[] = [...initialHexColours];
  let centerColor: HSLColor = { h: 0, s: 0, l: 50 };
  let modValue: number = 10;
  let initialized: boolean = false;
  let savedColors: HSLColor[] = browser ? JSON.parse(localStorage.getItem("savedColors") || "[]") : [];

  function selectColor(index: number): void {
    centerColor = { ...hexColours[index] };
    initialized = true;
  }

  function resetColors(): void {
    hexColours = [...initialHexColours];
    centerColor = { h: 0, s: 0, l: 50 };
    modValue = 10;
    initialized = false;
  }

  function convertToHex(color: HSLColor): string {
    return formatHex({ mode: "hsl", h: color.h, s: color.s / 100, l: color.l / 100 });
  }

  function saveCenterColor(): void {
    if (!initialized) return;
    savedColors = [{ ...centerColor }, ...savedColors.filter(c => convertToHex(c) !== convertToHex(centerColor))];
  }

  function copyColor(hex: string): void {
    navigator.clipboard.writeText(hex);
  }

  function deleteColor(index: number): void {
    savedColors = savedColors.filter((_, i) => i !== index);
  }

  function clearSavedColors(): void {
    savedColors = [];
  }

  $: if (initialized) {
    hexColours = [
      { ...centerColor, l: Math.max(centerColor.l - modValue, 0) },
      { ...centerColor, s: Math.min(centerColor.s + modValue, 100) },
      { ...centerColor, h: (centerColor.h - modValue + 360) % 360 },
      { ...centerColor, h: (centerColor.h + modValue) % 360 },
      { ...centerColor, s: Math.max(centerColor.s - modValue, 0) },
      { ...centerColor, l: Math.min(centerColor.l + modValue, 100) }
    ];
  }

  $: if (browser) {
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }
</script>

<main>
  <div>
    <img src="/header.png" alt="Picky - Colour Picker" class="header"/>
  </div>
  <div class="hex-container">
    <button class="hex {initialized ? 'initialized' : ''}" style="background-color: hsl({hexColours[0].h}, {hexColours[0].s}%, {hexColours[0].l}%);" on:click={() => selectColor(0)} type="button">
      <span class="hex-label">Darken</span>
    </button>
    <button class="hex {initialized ? 'initialized' : ''}" style="background-color: hsl({hexColours[1].h}, {hexColours[1].s}%, {hexColours[1].l}%);" on:click={() => selectColor(1)} type="button">
      <span class="hex-label">Saturate</span>
    </button>
  </div>
  <div class="hex-container">
    <button class="hex {initialized ? 'initialized' : ''}" style="background-color: hsl({hexColours[2].h}, {hexColours[2].s}%, {hexColours[2].l}%);" on:click={() => selectColor(2)} type="button">
      <span class="hex-label">Hue -</span>
    </button>
    <button class="hex center {initialized ? 'initialized' : ''}" style="background-color: hsl({centerColor.h}, {centerColor.s}%, {centerColor.l}%);" on:click={saveCenterColor} type="button">
      <span class="hex-label">{convertToHex(centerColor)}</span>
    </button>
    <button class="hex {initialized ? 'initialized' : ''}" style="background-color: hsl({hexColours[3].h}, {hexColours[3].s}%, {hexColours[3].l}%);" on:click={() => selectColor(3)} type="button">
      <span class="hex-label">Hue +</span>
    </button>
  </div>
  <div class="hex-container">
    <button class="hex {initialized ? 'initialized' : ''}" style="background-color: hsl({hexColours[4].h}, {hexColours[4].s}%, {hexColours[4].l}%);" on:click={() => selectColor(4)} type="button">
      <span class="hex-label">Desaturate</span>
    </button>
    <button class="hex {initialized ? 'initialized' : ''}" style="background-color: hsl({hexColours[5].h}, {hexColours[5].s}%, {hexColours[5].l}%);" on:click={() => selectColor(5)} type="button">
      <span class="hex-label">Lighten</span>
    </button>
  </div>
  
  <div class="knob-container">
    <Knob 
      bind:value={modValue}
      min={1}
      max={20}
      step={1}
      size={80}
      strokeWidth={10}
      color="white"
      bgColor="rgba(255,255,255,0.2)"
    />
    <p>Variation: {modValue}</p>
    <button on:click={resetColors}>Reset</button>
  </div>
  <div class="saved-colors">
    {#each savedColors as color, index}
      <div class="saved-color" style="background-color: hsl({color.h}, {color.s}%, {color.l}%);">
        <span>{convertToHex(color)}</span>
        <button on:click={() => copyColor(convertToHex(color))}>Copy</button>
        <button on:click={() => { centerColor = { ...color }; initialized = true; }}>Pick</button>
        <button on:click={() => deleteColor(index)}>Delete</button>
      </div>
    {/each}
  </div>
  {#if savedColors.length > 0}
    <div class="clear-button-container">
      <button on:click={clearSavedColors}>Clear</button>
    </div>
  {/if}
</main>
