import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Footage, theme } from "./Footage";

export type SetBreakdownProps = {
  videoSrc?: string;
  title: string;
  /** Cues revealed one after another, e.g. "Scapula depressed". */
  cues: string[];
  secondsPerCue?: number;
};

// Explainer-panel style: glowing panel builds above the video, one cue at a time.
export const SetBreakdownPanel: React.FC<SetBreakdownProps> = ({ videoSrc, title, cues, secondsPerCue = 1.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelIn = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ fontFamily: theme.font, background: "#0b0d10" }}>
      <AbsoluteFill style={{ top: "42%" }}>
        <Footage src={videoSrc} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 90, left: 60, right: 60, transform: `translateY(${interpolate(panelIn, [0, 1], [-80, 0])}px)`, opacity: panelIn, border: `3px solid ${theme.accent}`, borderRadius: 28, padding: 44, background: "rgba(20,24,18,.85)", boxShadow: `0 0 60px ${theme.accent}55` }}>
        <div style={{ color: theme.accent, fontSize: 56, fontWeight: 900, marginBottom: 24 }}>{title}</div>
        {cues.map((cue, i) => {
          const start = (0.6 + i * secondsPerCue) * fps;
          const p = interpolate(frame, [start, start + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={cue} style={{ opacity: p, transform: `translateX(${(1 - p) * -40}px)`, color: "white", fontSize: 44, fontWeight: 600, margin: "14px 0", display: "flex", gap: 18 }}>
              <span style={{ color: theme.accent }}>{String(i + 1).padStart(2, "0")}</span>
              {cue}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
