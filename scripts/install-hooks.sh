#!/usr/bin/env bash
HOOK_SRC="$(dirname "$0")/../.githooks"
HOOK_DST="$(dirname "$0")/../.git/hooks"

if [ -d "$HOOK_SRC" ]; then
  for hook in pre-commit pre-push; do
    cp "$HOOK_SRC/$hook" "$HOOK_DST/$hook"
    chmod +x "$HOOK_DST/$hook"
  done
  echo "hooks installed"
fi
