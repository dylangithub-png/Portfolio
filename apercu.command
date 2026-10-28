#!/bin/bash
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"
printf 'Aperçu : http://localhost:1313/ — Ctrl+C pour arrêter.\n'
hugo server
