#!/usr/bin/env bash
# Canonicalize a JSON payload — shows the 402 challenge and the expected 200 response.

ENDPOINT="https://canonicalhash-production.up.railway.app/v1/canonicalize"
BODY='{"payload": {"b": 2, "a": 1}, "algorithm": "sha256"}'

# Unpaid request — shows the challenge
curl -s -X POST "$ENDPOINT" \
  -H 'Content-Type: application/json' \
  -d "$BODY" | jq .

# Paid request — retry with PAYMENT-SIGNATURE from your x402 client
# curl -s -X POST "$ENDPOINT" \
#   -H 'Content-Type: application/json' \
#   -H 'PAYMENT-SIGNATURE: <signature>' \
#   -d "$BODY" | jq .
