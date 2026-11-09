---
name: rep-hud
description: Overlay a HUD-style live rep counter on a CaliFit workout clip. Use when the user attaches or names a workout clip and types /rep-hud or asks for a rep counter.
---
1. Copy the clip into `public/` (e.g. `public/clip.mp4`). Get its length with `ffprobe`.
2. Find when each rep finishes. Ask the user if unknown, or estimate by extracting frames (`ffmpeg -vf fps=4`) and spotting the top/bottom positions.
3. Render:
   `npx remotion render RepCounterHud out/rep-hud.mp4 --props='{"videoSrc":"clip.mp4","exercise":"Pull-ups","repTimes":[1.2,2.6],"target":8}' --frames=0-<seconds*30-1>`
4. Show a still (`npx remotion still ... --frame=<n>`) and give the output path.
