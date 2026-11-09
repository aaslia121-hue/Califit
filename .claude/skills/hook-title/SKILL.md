---
name: hook-title
description: Add the bold boxed hook title to the opening of a CaliFit short. Use for /hook-title or when asked for an opener or hook.
---
1. Put the face-to-camera opener in `public/`.
2. Write a title of 8 words or fewer with a number and a promise (e.g. "10 Calisthenics Tricks In 60 Seconds"), plus an optional short subtitle.
3. Render:
   `npx remotion render HookTitle out/hook.mp4 --props='{"videoSrc":"intro.mp4","title":"...","subtitle":"..."}'`
