import { Composition } from "remotion";
import { HookTitle } from "./compositions/HookTitle";
import { RepCounterHud } from "./compositions/RepCounterHud";
import { SetBreakdownPanel } from "./compositions/SetBreakdownPanel";

const vertical = { width: 1080, height: 1920, fps: 30 } as const;

// videoSrc: put a clip in public/ and pass its filename via --props.
export const Root: React.FC = () => (
  <>
    <Composition id="HookTitle" component={HookTitle} durationInFrames={90} {...vertical}
      defaultProps={{ title: "10 Calisthenics Tricks In 60 Seconds", subtitle: "No gym needed" }} />
    <Composition id="RepCounterHud" component={RepCounterHud} durationInFrames={300} {...vertical}
      defaultProps={{ exercise: "Pull-ups", repTimes: [1.2, 2.6, 4.0, 5.4, 6.9, 8.5], target: 8 }} />
    <Composition id="SetBreakdownPanel" component={SetBreakdownPanel} durationInFrames={240} {...vertical}
      defaultProps={{ title: "Perfect Push-up", cues: ["Hands under shoulders", "Squeeze glutes", "Elbows at 45°", "Chest to floor"] }} />
  </>
);
