import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Footage, theme } from "./Footage";

export type HookTitleProps = { videoSrc?: string; title: string; subtitle?: string };

// Bold boxed title over the face-to-camera opener.
export const HookTitle: React.FC<HookTitleProps> = ({ videoSrc, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ fontFamily: theme.font }}>
      <Footage src={videoSrc} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        <div style={{ transform: `scale(${pop}) rotate(${interpolate(pop, [0, 1], [-6, -2])}deg)`, background: "white", color: "black", padding: "28px 44px", borderRadius: 18, fontSize: 92, fontWeight: 900, lineHeight: 1, textAlign: "center", maxWidth: 940, boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ marginTop: 26, opacity: interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" }), background: theme.accent, color: "black", padding: "10px 24px", borderRadius: 10, fontSize: 48, fontWeight: 800 }}>
            {subtitle}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
