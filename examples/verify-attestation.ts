// Verify a CanonicalHash attestation using viem.
// Requires: bun add viem

import { recoverTypedDataAddress } from "viem"

const BASE = "https://canonicalhash-production.up.railway.app"

// Suppose `response` is the JSON you received after payment.
// For this example, fetch the pubkey document to get the expected signer.
const pubkey = await (await fetch(`${BASE}/.well-known/pubkey.json`)).json()

// In a real flow, `attestation` comes from your paid response.
// This is a shape example.
const attestation = {
  signed_hash: "60196f74f027a2b2a0c2eb1143dd6cc1a2319c87479a846ed0d140e4bc2403e7",
  hash_alg: "sha256",
  issued_at_unix: 1791987600,
  domain: { name: "CanonicalHash", version: "1.0.0", chainId: 8453 },
  signature: "0x...",
}

const recovered = await recoverTypedDataAddress({
  domain: attestation.domain,
  types: {
    Attestation: [
      { name: "hash", type: "string" },
      { name: "algorithm", type: "string" },
      { name: "issuedAt", type: "uint256" },
    ],
  },
  primaryType: "Attestation",
  message: {
    hash: attestation.signed_hash,
    algorithm: attestation.hash_alg,
    issuedAt: BigInt(attestation.issued_at_unix),
  },
  signature: attestation.signature as `0x${string}`,
})

console.log("Recovered signer:", recovered)
console.log("Expected (pubkey):", pubkey.address)
console.log("Match:", recovered.toLowerCase() === pubkey.address.toLowerCase())
