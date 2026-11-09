import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Footage, theme } from "./Footage";

export type RepCounterHudProps = {
  videoSrc?: string;
  exercise: string;
  /** Seconds into the clip where each rep finishes. */
  repTimes: number[];
  target?: number;
};

// Glitch-HUD style: corner brackets, live rep counter, progress bar, REC timer.
export const RepCounterHud: React.FC<RepCounterHudProps> = ({ videoSrc, exercise, repTimes, target }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const reps = repTimes.filter((r) => r <= t).length;
  const last = repTimes[reps - 1];
  const bump = last !== undefined ? interpolate(t - last, [0, 0.25], [1.35, 1], { extrapolateRight: "clamp" }) : 1;
  const goal = target ?? repTimes.length;
  const flicker = frame % 47 < 2 ? 0.4 : 1;
  const bracket = (pos: React.CSSProperties) => (
    <div style={{ position: "absolute", width: 90, height: 90, borderColor: theme.accent, borderStyle: "solid", borderWidth: 0, ...pos }} />
  );
  return (
    <AbsoluteFill style={{ fontFamily: "'JetBrains Mono', monospace", color: "white" }}>
      <Footage src={videoSrc} />
      <AbsoluteFill style={{ opacity: flicker }}>
        {bracket({ top: 60, left: 60, borderTopWidth: 8, borderLeftWidth: 8 })}
        {bracket({ top: 60, right: 60, borderTopWidth: 8, borderRightWidth: 8 })}
        {bracket({ bottom: 60, left: 60, borderBottomWidth: 8, borderLeftWidth: 8 })}
        {bracket({ bottom: 60, right: 60, borderBottomWidth: 8, borderRightWidth: 8 })}
        <div style={{ position: "absolute", top: 90, left: 180, fontSize: 34, display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ background: theme.red, padding: "4px 14px", borderRadius: 6, fontWeight: 800 }}>● REC</span>
          <span>{new Date(t * 1000).toISOString().slice(14, 22)}</span>
        </div>
        <div style={{ position: "absolute", bottom: 160, left: 100, right: 100 }}>
          <div style={{ fontSize: 40, letterSpacing: 6, color: theme.accent }}>{exercise.toUpperCase()}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <span style={{ fontSize: 220, fontWeight: 900, transform: `scale(${bump})`, transformOrigin: "left bottom", display: "inline-block", textShadow: `0 0 30px ${theme.accent}` }}>{reps}</span>
            <span style={{ fontSize: 70, opacity: 0.7 }}>/ {goal}</span>
          </div>
          <div style={{ height: 18, background: "rgba(255,255,255,.2)", borderRadius: 9, overflow: "hidden" }}>
            <div style={{ width: `${Math.min(1, reps / goal) * 100}%`, height: "100%", background: theme.accent }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
