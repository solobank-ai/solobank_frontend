#!/bin/bash
set -e

# ─── Solobank CLI Installer ───
# Usage: curl -fsSL https://solobank.lol/install.sh | bash

BOLD='\033[1m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}  Solobank${RESET}"
echo -e "  AI bank account on Solana"
echo ""

# ─── Check Node.js ───
if ! command -v node &>/dev/null; then
  echo -e "${RED}Node.js not found.${RESET}"
  echo ""
  echo "  Install Node.js first:"
  echo "    macOS:   brew install node"
  echo "    Ubuntu:  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs"
  echo "    Windows: https://nodejs.org"
  echo ""
  exit 1
fi

NODE_VERSION=$(node -v)
echo -e "  Node.js  ${GREEN}${NODE_VERSION}${RESET}"

# ─── Check npm ───
if ! command -v npm &>/dev/null; then
  echo -e "${RED}npm not found. Install Node.js properly.${RESET}"
  exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "  npm      ${GREEN}v${NPM_VERSION}${RESET}"
echo ""

# ─── Install CLI ───
echo -e "  Installing ${BOLD}@solobank/cli${RESET}..."
npm install -g @solobank/cli@latest 2>&1 | tail -1
echo ""

# ─── Init wallet ───
echo -e "  Initializing wallet..."
solobank init 2>/dev/null || true
echo ""

# ─── Done ───
ADDR=$(solobank address 2>/dev/null || echo "run 'solobank address' to see")
echo -e "${GREEN}${BOLD}  ✓ Solobank installed${RESET}"
echo ""
echo -e "  Wallet:    ${ADDR}"
echo -e "  Balance:   solobank balance"
echo -e "  Send:      solobank send 10 USDC <address>"
echo -e "  Pay API:   solobank pay https://mpp.solobank.lol/openai/v1/chat/completions"
echo -e "  MCP:       solobank mcp install"
echo ""
echo -e "  Docs:      https://solobank.lol/docs"
echo -e "  GitHub:    https://github.com/decentrathon"
echo ""
