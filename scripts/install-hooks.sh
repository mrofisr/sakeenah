#!/bin/bash
HOOK_SRC="$(dirname "$0")/../.githooks"
HOOK_DST="$(dirname "$0")/../.git/hooks"
if [ -d "$HOOK_SRC" ]; then
  cp "$HOOK_SRC/pre-commit" "$HOOK_DST/pre-commit"
  cp "$HOOK_SRC/pre-push" "$HOOK_DST/pre-push"
  chmod +x "$HOOK_DST/pre-commit" "$HOOK_DST/pre-push"
  echo "hooks installed"
fi
