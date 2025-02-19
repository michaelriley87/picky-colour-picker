<script lang="ts">
  import { formatHex } from "culori";
  import Knob from "svelte-knob";

  const initialHexColours = [
    { h: 240, s: 60, l: 40 },
    { h: 120, s: 50, l: 45 },
    { h: 270, s: 50, l: 50 },
    { h: 60, s: 60, l: 55 },
    { h: 0, s: 65, l: 45 },
    { h: 30, s: 70, l: 50 }
  ];

  let hexColours = [...initialHexColours];
  let centerColor = { h: 0, s: 0, l: 50 };
  let modValue = 10;
  let initialized = false;
  let savedColors: { h: number; s: number; l: number }[] = [];

  function selectColor(index: number) {
    centerColor = { ...hexColours[index] };
    initialized = true;
  }

  function resetColors() {
    hexColours = [...initialHexColours];
    centerColor = { h: 0, s: 0, l: 50 };
    modValue = 10;
    initialized = false;
  }

  function convertToHex(color: { h: number; s: number; l: number }): string {
    return formatHex({ mode: "hsl", h: color.h, s: color.s / 100, l: color.l / 100 });
  }

  function saveCenterColor() {
    if (!initialized) return;
    const hexValue = convertToHex(centerColor);
    const existingIndex = savedColors.findIndex(c => convertToHex(c) === hexValue);
    if (existingIndex !== -1) {
      savedColors.splice(existingIndex, 1);
    }
    savedColors = [{ ...centerColor }, ...savedColors];
  }

  function copyColor(hex: string) {
    navigator.clipboard.writeText(hex).then(() => {
      console.log(`Copied: ${hex}`);
    });
  }

  function deleteColor(index: number) {
    savedColors = savedColors.filter((_, i) => i !== index);
  }

  $: if (initialized) {
    hexColours = [
      { h: centerColor.h, s: centerColor.s, l: Math.max(centerColor.l - modValue, 0) },
      { h: centerColor.h, s: Math.min(centerColor.s + modValue, 100), l: centerColor.l },
      { h: (centerColor.h - modValue + 360) % 360, s: centerColor.s, l: centerColor.l },
      { h: (centerColor.h + modValue) % 360, s: centerColor.s, l: centerColor.l },
      { h: centerColor.h, s: Math.max(centerColor.s - modValue, 0), l: centerColor.l },
      { h: centerColor.h, s: centerColor.s, l: Math.min(centerColor.l + modValue, 100) }
    ];
  }
</script>

<main>
  <h1>Picky</h1>
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
    <p>Adjustment: {modValue}</p>
  </div>
  <button on:click={resetColors}>Reset</button>
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
  <div class="saved-colors">
    {#each savedColors as color, index}
      <div class="saved-color" style="background-color: hsl({color.h}, {color.s}%, {color.l}%);">
        <span>{convertToHex(color)}</span>
        <button on:click={() => copyColor(convertToHex(color))}>Copy</button>
        <button on:click={() => deleteColor(index)}>Delete</button>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    background-color: black;
    color: white;
    text-align: center;
    font-family: sans-serif;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .hex-container {
    display: flex;
    justify-content: center;
    margin-bottom: -60px;
    gap: 2.5px;
  }
  .hex {
    width: 250px;
    height: 250px;
    background-color: gray;
    clip-path: polygon(
      50% 0%, 100% 25%, 100% 75%,
      50% 100%, 0% 75%, 0% 25%
    );
    cursor: pointer;
    transition: transform 0.2s ease, z-index 0s;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .hex:hover {
    transform: scale(1.1);
    z-index: 10;
  }
  .hex-label {
    display: none;
    position: absolute;
    bottom: 15px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 3px 6px;
    border-radius: 4px;
    text-shadow: 2px 2px 4px black;
    user-select: none;
    pointer-events: none;
  }
  .hex.initialized:hover .hex-label {
    display: block;
  }
  .saved-colors {
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    margin: 150px auto;
    gap: 8px;
    justify-content: center;
  }
  .saved-color {
    display: flex;
    align-items: center;
    height: 75px;
    gap: 5px;
    padding: 5px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
    user-select: none;
  }
  .knob-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
