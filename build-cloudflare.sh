#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
sass_version=1.106.1
tools_dir="$PWD/work/build-tools/$sass_version"
mkdir -p "$tools_dir"
if [ ! -x "$tools_dir/dart-sass/sass" ]; then
  curl --fail --silent --show-error --location --retry 3 \
    "https://github.com/sass/dart-sass/releases/download/$sass_version/dart-sass-$sass_version-linux-x64.tar.gz" \
    --output "$tools_dir/dart-sass.tar.gz"
  tar -xzf "$tools_dir/dart-sass.tar.gz" -C "$tools_dir"
fi
export PATH="$tools_dir/dart-sass:$PATH"
sass --version
hugo --minify
