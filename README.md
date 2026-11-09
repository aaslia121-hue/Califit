# CaliFit

Short-form workout video toolkit: Remotion templates plus Claude Code skills, modelled on the "10 Claude Editing Tricks in 60 Seconds" format.

## Setup
```
npm install
npm run studio        # live preview
```

## Templates (1080×1920, 30 fps)
| Composition | Skill | What it does |
|---|---|---|
| `HookTitle` | `/hook-title` | Bold boxed title over your opener |
| `RepCounterHud` | `/rep-hud` | HUD brackets, REC timer, live rep counter + progress bar |
| `SetBreakdownPanel` | `/set-breakdown` | Glowing panel of form cues above the clip |

Put clips in `public/` and pass props, e.g.
```
npx remotion render RepCounterHud out/pullups.mp4 --props='{"videoSrc":"clip.mp4","exercise":"Pull-ups","repTimes":[1.2,2.6,4.0],"target":8}'
```
Without `videoSrc`, a placeholder background is used.

## Content
`content/10-tricks-60-seconds-script.md`: a ready-to-film script in this format.
