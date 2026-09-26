#!/usr/bin/env bash
# Usage: scripts/set-design.sh classic|snazzy
# Copies the chosen design's index.html over the repo root index.html —
# the same mechanism used for local preview now and for going live later.
set -euo pipefail

DESIGN="${1:-}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "$DESIGN" != "classic" && "$DESIGN" != "snazzy" ]]; then
  echo "Usage: $0 classic|snazzy" >&2
  exit 1
fi

SRC="$REPO_ROOT/designs/$DESIGN/index.html"
DEST="$REPO_ROOT/index.html"

if [[ ! -f "$SRC" ]]; then
  echo "Error: $SRC not found" >&2
  exit 1
fi

cp "$SRC" "$DEST"
echo "Root index.html now set to: $DESIGN (copied from designs/$DESIGN/index.html)"
