#!/usr/bin/env bash
# Usage: ./make_reel.sh <your_clip> <reference_reel.mp4> [out.mp4] [start_sec]
# Recreates the "Gym & Anime" reel: your clip (graded) for the first 2.9s,
# then the original anime section + original audio untouched.
set -euo pipefail
CLIP="$1"; REF="$2"; OUT="${3:-reel_out.mp4}"; SS="${4:-0}"
CUT=2.9
FONT=$(fc-match -f '%{file}' 'Inter:bold' 2>/dev/null || echo /usr/share/fonts/opentype/inter/Inter-Bold.otf)
TMP=$(mktemp -d)

# Gym grade matching the reference: dark, low saturation, crushed blacks,
# slightly cool shadows / warm-neutral highlights, soft vignette.
GRADE=${GRADE:-"eq=contrast=1.12:brightness=-0.05:saturation=0.62:gamma=0.88,\
curves=r='0/0 0.25/0.21 0.75/0.76 1/0.96':g='0/0 0.25/0.22 0.75/0.75 1/0.96':b='0/0.02 0.25/0.25 0.75/0.73 1/0.93',\
vignette=PI/5"}

TEXT="drawtext=fontfile=$FONT:text='${LINE1:-POV - The greatest hobby}':fontcolor=white:fontsize=27:x=(w-tw)/2:y=294,\
drawtext=fontfile=$FONT:text='${LINE2:-combo to exist}':fontcolor=white:fontsize=27:x=(w-tw)/2:y=328"

ffmpeg -v error -y -ss "$SS" -t $CUT -i "$CLIP" -an \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=30,$GRADE,$TEXT,format=yuv420p" \
  -c:v libx264 -crf 18 -preset medium "$TMP/a.mp4"
ffmpeg -v error -y -ss $CUT -i "$REF" -an -vf "fps=30,format=yuv420p" \
  -c:v libx264 -crf 18 -preset medium "$TMP/b.mp4"
printf "file '%s'\nfile '%s'\n" "$TMP/a.mp4" "$TMP/b.mp4" > "$TMP/l.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$TMP/l.txt" -i "$REF" -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
rm -rf "$TMP"; echo "Wrote $OUT"
