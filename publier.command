#!/bin/bash
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"
if [ "$(git branch --show-current)" != "main" ]; then
  printf 'Publication interrompue : ouvrez la branche main.\n'
  exit 1
fi
hugo --minify
git status --short
printf '\nDescription des modifications (Entrée pour « Mise à jour du portfolio ») : '
read -r message
message="${message:-Mise à jour du portfolio}"
git add -A
if ! git diff --cached --quiet; then
  git commit -m "$message"
fi
git push origin main
printf '\nEnvoi terminé. Cloudflare compile et publie automatiquement le site.\n'
printf 'Appuyez sur Entrée pour fermer.\n'
read -r reponse
