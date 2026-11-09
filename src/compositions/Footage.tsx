import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

// Plays the user's clip from public/, or a placeholder so previews work without footage.
export const Footage: React.FC<{ src?: string; style?: React.CSSProperties }> = ({ src, style }) =>
  src ? (
    <OffthreadVideo src={src.startsWith("http") ? src : staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", ...style }} />
  ) : (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #3a3f47, #0d0f12)", ...style }} />
  );

export const theme = { accent: "#e8ff3a", red: "#ff3b3b", font: "Inter, Helvetica, Arial, sans-serif" };
