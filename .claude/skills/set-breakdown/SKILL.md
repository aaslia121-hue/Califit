---
name: set-breakdown
description: Build a glowing form-cue panel above a CaliFit exercise clip. Use for /set-breakdown or when asked to explain an exercise's form on video.
---
1. Put the clip in `public/`. Write 3–5 short form cues (max ~4 words each) for the exercise, or use the user's.
2. Render:
   `npx remotion render SetBreakdownPanel out/set-breakdown.mp4 --props='{"videoSrc":"clip.mp4","title":"Perfect Push-up","cues":["Hands under shoulders","Squeeze glutes"],"secondsPerCue":1.5}'`
3. Duration defaults to 8 s; pass `--frames` to match the clip length.
