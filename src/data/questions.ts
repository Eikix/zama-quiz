import type { Question } from '../types/quiz';

export const questions: Question[] = [
  // ============================================
  // BEGINNER QUESTIONS (20 questions, 6 sections)
  // ============================================

  // Section: FHE Fundamentals (4 questions)
  {
    id: "B001",
    difficulty: "beginner",
    section: "FHE Fundamentals",
    question: "What does Fully Homomorphic Encryption (FHE) enable?",
    options: [
      "Storing data in encrypted form on untrusted servers",
      "Performing computations on encrypted data without decrypting it",
      "Sending encrypted messages between two parties securely",
      "Generating cryptographic keys from passwords"
    ],
    correctAnswer: 1,
    explanation: "FHE allows computations directly on ciphertext. When decrypted, the result matches what you'd get from computing on the original plaintext. Traditional encryption only protects data at rest or in transit, not during computation.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/tfhe-rs",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B002",
    difficulty: "beginner",
    section: "FHE Fundamentals",
    question: "How does FHE differ from traditional encryption like AES?",
    options: [
      "FHE uses larger key sizes for better security",
      "FHE allows mathematical operations on ciphertext",
      "FHE is faster for encrypting large files",
      "FHE requires multiple parties to decrypt"
    ],
    correctAnswer: 1,
    explanation: "Traditional encryption protects data at rest—you must decrypt before processing. FHE preserves the ability to compute on encrypted data, producing encrypted results that decrypt to correct answers.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B003",
    difficulty: "beginner",
    section: "FHE Fundamentals",
    question: "What is 'ciphertext expansion' in FHE?",
    options: [
      "The process of adding more encryption layers",
      "Encrypted data being larger than the original plaintext",
      "The time it takes to encrypt larger inputs",
      "Converting one ciphertext into multiple ciphertexts"
    ],
    correctAnswer: 1,
    explanation: "In FHE, ciphertext is significantly larger than the original plaintext (often 1000x+ larger). This is a fundamental tradeoff for enabling computation on encrypted data.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/tfhe-rs",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B004",
    difficulty: "beginner",
    section: "FHE Fundamentals",
    question: "What is the main tradeoff when using FHE?",
    options: [
      "Security is weaker than traditional encryption",
      "Only certain data types can be encrypted",
      "Computations are slower than on plaintext",
      "Data must be stored on specialized hardware"
    ],
    correctAnswer: 2,
    explanation: "FHE operations are computationally expensive compared to plaintext operations. This is the cost of being able to compute without decrypting. Zama's TFHE implementation optimizes this, but the tradeoff remains fundamental.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: TFHE Scheme Basics (3 questions)
  {
    id: "B005",
    difficulty: "beginner",
    section: "TFHE Scheme Basics",
    question: "What does 'bootstrapping' accomplish in TFHE?",
    options: [
      "Initializes the encryption keys at startup",
      "Refreshes ciphertext to reduce accumulated noise",
      "Converts plaintext to encrypted form",
      "Distributes keys across multiple servers"
    ],
    correctAnswer: 1,
    explanation: "FHE operations add 'noise' to ciphertexts. Too much noise makes decryption impossible. Bootstrapping resets the noise level, allowing unlimited further computations. It's computationally expensive but essential.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/tfhe-rs",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B006",
    difficulty: "beginner",
    section: "TFHE Scheme Basics",
    question: "Why does noise accumulate in FHE ciphertexts?",
    options: [
      "Network transmission corrupts the encrypted data",
      "Each homomorphic operation adds mathematical error",
      "Storage media degrades the ciphertext over time",
      "Multiple users accessing the same ciphertext adds noise"
    ],
    correctAnswer: 1,
    explanation: "Noise is intentionally added during encryption for security. Each operation (especially multiplication) increases this noise. Without management via bootstrapping, noise eventually overwhelms the actual data.",
    source: {
      type: "paper",
      reference: "TFHE: Fast Fully Homomorphic Encryption over the Torus (Chillotti et al.)",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B007",
    difficulty: "beginner",
    section: "TFHE Scheme Basics",
    question: "What types of operations does TFHE handle efficiently?",
    options: [
      "Floating-point arithmetic and matrix operations",
      "Integer arithmetic, comparisons, and bitwise operations",
      "String manipulation and regular expressions",
      "Graph traversal and recursive algorithms"
    ],
    correctAnswer: 1,
    explanation: "TFHE is optimized for integer and boolean operations—additions, multiplications, comparisons, AND/OR/XOR. These cover most smart contract logic. Complex operations like floating-point require different approaches.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/tfhe-rs",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: fhEVM as Solidity Library (4 questions)
  {
    id: "B008",
    difficulty: "beginner",
    section: "fhEVM as Solidity Library",
    question: "What is fhEVM?",
    options: [
      "A modified Ethereum Virtual Machine for encrypted data",
      "A Solidity library that enables FHE operations in smart contracts",
      "A separate blockchain designed for private transactions",
      "A layer-2 scaling solution using encryption for compression"
    ],
    correctAnswer: 1,
    explanation: "fhEVM is a Solidity library and toolset. Developers import it to add encrypted types and operations to their contracts on existing EVM chains. It's not a separate blockchain or modified EVM.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B009",
    difficulty: "beginner",
    section: "fhEVM as Solidity Library",
    question: "What does the 'euint32' type represent in fhEVM?",
    options: [
      "An unsigned 32-bit integer stored in extended precision",
      "An encrypted unsigned 32-bit integer for FHE operations",
      "An Ethereum-specific integer optimized for gas costs",
      "An error-checked integer that reverts on overflow"
    ],
    correctAnswer: 1,
    explanation: "The 'e' prefix means 'encrypted.' euint32 is a 32-bit unsigned integer in encrypted form. You can perform FHE operations on it without revealing the underlying value.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/types",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B010",
    difficulty: "beginner",
    section: "fhEVM as Solidity Library",
    question: "What happens when you call TFHE.add(a, b) where both are encrypted?",
    options: [
      "The values are decrypted, added, then re-encrypted",
      "The operation fails because both inputs are encrypted",
      "An encrypted result is computed without decrypting inputs",
      "The addition happens on-chain using validator consensus"
    ],
    correctAnswer: 2,
    explanation: "This is the core FHE capability—computing on encrypted data. Neither 'a' nor 'b' is decrypted. The result is an encrypted value that, when decrypted, equals the sum of the original plaintexts.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/operations",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B011",
    difficulty: "beginner",
    section: "fhEVM as Solidity Library",
    question: "Who can decrypt an encrypted value in fhEVM?",
    options: [
      "Anyone with access to the blockchain",
      "Only the original encryptor of the value",
      "Addresses explicitly granted permission via the ACL",
      "Only the contract that created the encrypted value"
    ],
    correctAnswer: 2,
    explanation: "fhEVM uses an Access Control List (ACL) to manage decryption permissions. Contract developers specify which addresses can request decryption of specific values. This enables controlled data sharing.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/acl",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Developer Mental Model (3 questions)
  {
    id: "B012",
    difficulty: "beginner",
    section: "Developer Mental Model",
    question: "When should you use encrypted types in fhEVM?",
    options: [
      "For all variables to maximize security",
      "Only for data that needs to remain confidential",
      "Only for values that will never be decrypted",
      "For any value involved in arithmetic operations"
    ],
    correctAnswer: 1,
    explanation: "Encrypted operations are expensive. Use encrypted types for sensitive data (balances, votes, bids) and plaintext for everything else (timestamps, public counters, configuration). Encrypt selectively.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B013",
    difficulty: "beginner",
    section: "Developer Mental Model",
    question: "What is the result of comparing two encrypted values with TFHE.gt(a, b)?",
    options: [
      "A boolean true or false in plaintext",
      "An encrypted boolean (ebool) that hides the comparison result",
      "The operation reverts because comparisons aren't supported",
      "A numeric value indicating which operand is greater"
    ],
    correctAnswer: 1,
    explanation: "Comparisons between encrypted values produce encrypted results. You get an ebool—an encrypted boolean. To use the result in plaintext logic (like if statements), you'd need to decrypt it first.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/operations",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B014",
    difficulty: "beginner",
    section: "Developer Mental Model",
    question: "Why can't you log or display an encrypted value directly?",
    options: [
      "The EVM doesn't support logging encrypted types",
      "Encrypted values are ciphertext, not human-readable data",
      "Logging would consume too much gas",
      "Only the KMS has permission to read encrypted values"
    ],
    correctAnswer: 1,
    explanation: "An encrypted value is ciphertext—seemingly random bytes that only make sense after decryption. Logging it reveals nothing useful. To see the actual value, you must decrypt it through proper channels.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Real Use Cases (3 questions)
  {
    id: "B015",
    difficulty: "beginner",
    section: "Real Use Cases",
    question: "How does fhEVM enable confidential token transfers?",
    options: [
      "By routing transactions through private relay networks",
      "By keeping balances and transfer amounts encrypted on-chain",
      "By using zero-knowledge proofs to hide transaction data",
      "By storing token data off-chain in encrypted databases"
    ],
    correctAnswer: 1,
    explanation: "With fhEVM, token balances are stored as encrypted values (euint64). Transfers update encrypted balances using FHE operations. Observers see transactions happen but can't see amounts or resulting balances.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B016",
    difficulty: "beginner",
    section: "Real Use Cases",
    question: "What makes sealed-bid auctions possible with FHE?",
    options: [
      "Bids are committed as hashes and revealed later",
      "Bids remain encrypted and the winner is determined without revealing amounts",
      "A trusted auctioneer collects and compares bids privately",
      "Bidders encrypt bids with each other's public keys"
    ],
    correctAnswer: 1,
    explanation: "FHE allows comparing encrypted bids directly. The auction contract can determine the highest bid without decrypting any individual bid. Only the winning amount needs decryption, and only to relevant parties.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B017",
    difficulty: "beginner",
    section: "Real Use Cases",
    question: "How can FHE protect against MEV (Miner Extractable Value)?",
    options: [
      "By making transactions process faster than bots can react",
      "By encrypting transaction details so ordering can't be exploited",
      "By requiring validators to stake collateral against front-running",
      "By randomizing transaction order in each block"
    ],
    correctAnswer: 1,
    explanation: "MEV attacks exploit visible transaction data (swap amounts, bid values). With encrypted inputs, attackers can't see what they'd be front-running. The transaction intent remains hidden until execution.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Common Misconceptions (3 questions)
  {
    id: "B018",
    difficulty: "beginner",
    section: "Common Misconceptions",
    question: "'Using fhEVM makes my entire smart contract private.' This statement is:",
    options: [
      "True—all contract state becomes encrypted automatically",
      "False—only values you explicitly encrypt are private",
      "True—fhEVM encrypts all storage and function calls",
      "False—fhEVM only hides transaction sender addresses"
    ],
    correctAnswer: 1,
    explanation: "fhEVM encrypts what you tell it to encrypt. Public variables, function signatures, and plaintext state remain visible. You must deliberately use encrypted types for data you want to keep confidential.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B019",
    difficulty: "beginner",
    section: "Common Misconceptions",
    question: "'FHE is too slow to be practical.' How accurate is this for Zama's implementation?",
    options: [
      "Fully accurate—FHE is only useful for research",
      "Outdated—Zama has optimized TFHE for practical use cases",
      "Accurate for complex operations, false for simple ones",
      "Irrelevant—blockchain is already slow, FHE adds nothing"
    ],
    correctAnswer: 1,
    explanation: "While FHE has overhead, Zama's TFHE implementation with hardware acceleration makes many real-world use cases practical. Operations like encrypted transfers and comparisons run in reasonable time for blockchain applications.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B020",
    difficulty: "beginner",
    section: "Common Misconceptions",
    question: "Do developers need deep cryptography knowledge to use fhEVM?",
    options: [
      "Yes—you must understand lattice-based cryptography",
      "No—the library abstracts cryptographic complexity",
      "Partially—you need to implement custom encryption schemes",
      "Yes—key management requires cryptographic expertise"
    ],
    correctAnswer: 1,
    explanation: "fhEVM provides a high-level Solidity API. Developers work with types like euint32 and functions like TFHE.add(). The underlying cryptography (TFHE, bootstrapping, noise) is handled by the library and infrastructure.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },

  // ============================================
  // ADVANCED QUESTIONS
  // ============================================

  // Section 1: Architecture & Components
  {
    id: "TP8Q",
    difficulty: "advanced",
    section: "Architecture & Components",
    question: "Which component is responsible for performing the actual FHE computations on encrypted ciphertexts?",
    options: [
      "Gateway",
      "KMS (Key Management Service)",
      "Coprocessor",
      "Host Chain"
    ],
    correctAnswer: 2,
    explanation: "The Coprocessor is the off-chain computation engine that executes FHE operations (add, mul, div, cmp, etc.) using the tfhe-rs library. The Host Chain only handles symbolic execution, and the Gateway coordinates but doesn't compute.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "C567",
    difficulty: "advanced",
    section: "Architecture & Components",
    question: "The Zama Gateway is implemented as:",
    options: [
      "A Layer 1 blockchain like Ethereum",
      "An Arbitrum optimistic rollup (L2/L3)",
      "A centralized REST API server",
      "A set of IPFS nodes"
    ],
    correctAnswer: 1,
    explanation: "The Gateway is implemented using the Arbitrum stack as an optimistic rollup, with a sequencer operated by Conduit. This provides the coordination layer for the protocol.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "VJ5N",
    difficulty: "advanced",
    section: "Architecture & Components",
    question: "Zama's TKMS uses 13 MPC nodes with a corruption threshold of 4. How many node responses are required for User Decryption?",
    options: [
      "5 nodes (t+1)",
      "7 nodes (n/2)",
      "9 nodes (2t+1)",
      "13 nodes (all)"
    ],
    correctAnswer: 2,
    explanation: "User decryption requires 2t+1 = 9 nodes. Each KMS node encrypts its partial decryption share under the user's public key, so only the user can combine them and see the plaintext. This threshold ensures correctness even with t=4 malicious nodes. Public decryption only requires t+1 = 5 nodes since shares are combined on-chain.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    },
    volatile: true
  },
  {
    id: "EY35",
    difficulty: "advanced",
    section: "Architecture & Components",
    question: "Where are the actual FHE ciphertexts stored in the Zama protocol?",
    options: [
      "On the Host Chain (L1) in contract state",
      "In the Gateway smart contracts",
      "In the Coprocessor's local database (Coprocessor DA)",
      "In the user's browser localStorage"
    ],
    correctAnswer: 2,
    explanation: "Ciphertexts are stored off-chain in the Coprocessor DA. Only 32-byte handles (references) are stored on-chain to minimize gas costs. The Gateway stores ciphertext commits (digests/hashes), not the actual ciphertexts.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "XD2L",
    difficulty: "advanced",
    section: "Architecture & Components",
    question: "Which of the following is NOT a Host Chain (L1) smart contract?",
    options: [
      "ACL (Access Control List)",
      "TFHEExecutor",
      "MultichainACL",
      "InputVerifier"
    ],
    correctAnswer: 2,
    explanation: "MultichainACL is a Gateway contract, not a Host Chain contract. It tracks ciphertext ownership and access permissions across multiple chains on the Gateway. The Host Chain has its own ACL contract for local access control.",
    source: {
      type: "code",
      reference: "fhevm/gateway-contracts/",
      retrievedAt: "2026-01-07"
    }
  },

  // Section 2: Data Flow & Encryption
  {
    id: "GTY3",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "Which of the following is NOT a purpose of the ZKPoK (Zero-Knowledge Proof of Knowledge) in the Zama protocol?",
    options: [
      "Proving the user knows the plaintext value they encrypted",
      "Preventing selective failure attacks from malformed ciphertext noise",
      "Verifying the user has sufficient token balance to pay for computation",
      "Ensuring the ciphertext is correctly constructed under the FHE public key"
    ],
    correctAnswer: 2,
    explanation: "The ZKPoK serves to: (1) prove knowledge of the plaintext, (2) prevent selective failure attacks by validating noise distribution, and (3) ensure correct ciphertext construction. Token balance verification is handled separately by the payment system, not the ZKPoK.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "Z8WJ",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "How is a result handle derived after an FHE operation on the Host Chain?",
    options: [
      "Randomly generated by the Coprocessor",
      "Assigned sequentially by the TFHEExecutor contract",
      "hash(operation_type, argument_handles, chain_id) || result_type",
      "Copied from the first input handle"
    ],
    correctAnswer: 2,
    explanation: "Result handles are deterministically derived from the operation type, input handles, and chain ID. This allows the symbolic execution on-chain to compute the same handle that the Coprocessor will use to store the result.",
    source: {
      type: "code",
      reference: "fhevm/host-contracts/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "JNVZ",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "When a user submits encrypted input with a ZKPoK, which component performs the cryptographic verification of the zero-knowledge proof itself?",
    options: [
      "The Host Chain's InputVerifier contract",
      "The Coprocessors (off-chain)",
      "The KMS nodes",
      "The Gateway's InputVerification contract"
    ],
    correctAnswer: 1,
    explanation: "ZKPoK cryptographic verification is computationally expensive, so it's performed off-chain by Coprocessors. The Gateway's InputVerification contract only emits events to trigger verification. After verifying the proof, Coprocessors extract ciphertexts, derive handles, and sign an EIP-712 attestation.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "33TG",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "When FHE.fromExternal() is called on the Host Chain, what does the InputVerifier contract verify?",
    options: [
      "The ZKPoK cryptographic proof directly",
      "The Coprocessor signatures attesting that the ZKPoK was valid",
      "The plaintext value matches expected range",
      "The user's wallet balance"
    ],
    correctAnswer: 1,
    explanation: "The InputVerifier contract performs on-chain signature verification, not ZKPoK verification. It checks that a threshold of valid Coprocessor signatures attest to the handles. The inputProof contains: numHandles + numSigners + handles + coprocessorSignatures. This is an indirect verification - trusting Coprocessors' attestation that they verified the ZKPoK off-chain.",
    source: {
      type: "code",
      reference: "fhevm/host-contracts/InputVerifier.sol",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "LHSX",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "How many FHE key pairs are used in the Zama protocol?",
    options: [
      "One key pair per application (contract)",
      "One key pair per user",
      "One global key pair shared across all applications",
      "One key pair per blockchain (Host Chain)"
    ],
    correctAnswer: 2,
    explanation: "The protocol uses a single global FHE key pair shared across all applications. This enables ciphertext composability - encrypted values from different contracts can be used together in FHE operations (when authorized via ACL). Access control is enforced by ACL contracts, not by key separation.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "5WQE",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "Which of the following is NOT part of the auxiliary data embedded in a ZKPoK?",
    options: [
      "Chain ID",
      "User address",
      "Contract address",
      "Plaintext value"
    ],
    correctAnswer: 3,
    explanation: "The plaintext value is NEVER exposed. The auxiliary data contains: chain ID, ACL contract address, user address, contract address, and key_id. This binds the proof to a specific context without revealing the encrypted value.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },

  // Section 3: Decryption Mechanisms
  {
    id: "NCPV",
    difficulty: "advanced",
    section: "Decryption Mechanisms",
    question: "What is the key difference between public decryption and user decryption?",
    options: [
      "Public decryption is faster",
      "Public decryption reveals plaintext on-chain; user decryption keeps it private",
      "User decryption doesn't require KMS involvement",
      "Public decryption can be done by any user"
    ],
    correctAnswer: 1,
    explanation: "Public decryption makes the plaintext visible to everyone (e.g., for auction results). User decryption re-encrypts the result under the user's public key, so only they can decrypt it locally.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "7RMC",
    difficulty: "advanced",
    section: "Decryption Mechanisms",
    question: "In the public decryption flow, who initiates the call that leads to FHE.checkSignatures() on the Host Chain?",
    options: [
      "The KMS nodes, by pushing the result directly to the Host Chain",
      "The Gateway contract, via a cross-chain message to the Host Chain",
      "The user/relayer, by calling the App contract's callback",
      "The Coprocessor, after completing the decryption computation"
    ],
    correctAnswer: 2,
    explanation: "Public decryption follows a 'self-relaying' model. The user/relayer receives the signed plaintext from the Gateway, then submits it to the App contract's callback function, which in turn calls FHE.checkSignatures() to verify the KMS signatures.",
    source: {
      type: "code",
      reference: "fhevm/library-solidity/lib/FHE.sol",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "Q7KT",
    difficulty: "advanced",
    section: "Decryption Mechanisms",
    question: "How does a user verify that a user decryption result is legitimate?",
    options: [
      "They trust the App",
      "They check the KMS signatures against known verifier addresses in the context",
      "The blockchain verifies it automatically",
      "They re-encrypt and compare"
    ],
    correctAnswer: 1,
    explanation: "The user receives decryption shares signed by KMS nodes. They verify these signatures against the key-map (KMS verifier addresses from the context) to ensure no KMS node impersonation occurred.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "9LJA",
    difficulty: "advanced",
    section: "Decryption Mechanisms",
    question: "Gateway decryption request IDs follow the format [kmsRequestType | keychainId | counter]. What is the purpose of including kmsRequestType?",
    options: [
      "For billing purposes",
      "To route requests to the correct KMS protocol (public/user decrypt, keygen, etc.)",
      "For logging only",
      "To identify the user"
    ],
    correctAnswer: 1,
    explanation: "The first byte identifies the request type (e.g., 1=PublicDecrypt, 2=UserDecrypt, 3=PrepKeygen, 4=Keygen, 5=CRSgen). This allows the KMS to execute the appropriate MPC protocol.",
    source: {
      type: "code",
      reference: "fhevm/gateway-contracts/",
      retrievedAt: "2026-01-07"
    }
  },

  // Section 4: Service Interactions
  {
    id: "S2GR",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "Which statement about Coprocessor-Gateway communication is FALSE?",
    options: [
      "Coprocessors listen to Gateway events to receive ZKPoK verification requests",
      "Coprocessors listen to Gateway events to receive FHE computation requests",
      "Coprocessors push ACL updates to the Gateway's MultichainACL contract",
      "Coprocessors periodically pull key state information from the Gateway"
    ],
    correctAnswer: 1,
    explanation: "FHE computation requests come from the Host Chain, not the Gateway. Coprocessors listen to Host Chain events (via their embedded full node) for FHE operations. The Gateway is used for: (1) ZKPoK verification requests/responses, (2) ACL synchronization, (3) ciphertext commits, and (4) key management info. The Host Chain is where smart contracts emit FHE operation events.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "BGF8",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "Where does the Relayer sit in the Zama protocol architecture?",
    options: [
      "Between the user and the Host Chain",
      "Between the user and the Gateway",
      "Between the user and the Coprocessor",
      "Between the Coprocessor and the Gateway"
    ],
    correctAnswer: 1,
    explanation: "The Relayer sits between the user and the Gateway. It abstracts all Gateway interactions so users only need a Host Chain wallet. The Relayer forwards ZKPoK verification requests, handles decryption coordination, and pays Gateway gas on the user's behalf.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "UVDP",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "Which event types does the Coprocessor's Host Listener handle?",
    options: [
      "TFHE operation events and ACL allow/delegate events",
      "ZKPoK verification requests and decryption requests",
      "Decryption requests and TFHE operation events",
      "All of the above"
    ],
    correctAnswer: 0,
    explanation: "The Host Listener only handles TFHE operations and ACL events from the Host Chain. ZKPoK verification requests come from the Gateway (handled by GW Listener). Decryption requests are handled by Gateway contracts, then forwarded to KMS Core by the KMS Connector - not by the Coprocessor.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/fhevm-engine/host-listener/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "DBC6",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "What does the KMS Connector do?",
    options: [
      "Connects users to their wallets",
      "Interfaces between the Gateway and KMS Core, forwarding cryptographic requests",
      "Connects different KMS nodes together",
      "Manages database connections"
    ],
    correctAnswer: 1,
    explanation: "The KMS Connector picks up events (like decryption requests) from the Gateway via a GW Listener and forwards them to the KMS Core for MPC execution. It then relays responses back to the Gateway.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "WQAM",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "How many Coprocessors does Zama operate as of early 2026?",
    options: [
      "1 (single trusted operator)",
      "5 (majority consensus)",
      "13 (same as KMS nodes)",
      "Unlimited (permissionless)"
    ],
    correctAnswer: 0,
    explanation: "As of early 2026, Zama operates a single trusted Coprocessor. The architecture is designed to support multiple Coprocessors with majority consensus, and Zama plans to expand to 5 Coprocessors within the quarter. Eventually, Coprocessors will stake tokens and can be slashed for misbehavior.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    },
    volatile: true
  },

  // Section 5: Advanced Concepts
  {
    id: "F683",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "According to NIST SP 800-57 (followed by Zama), what can you do with an Active key that you CANNOT do with a Suspended key?",
    options: [
      "Perform FHE computations",
      "Decrypt existing ciphertexts",
      "Launch a new key rotation",
      "Be a source or target for key switching"
    ],
    correctAnswer: 2,
    explanation: "Both Active and Suspended keys allow inputs, FHE computation, decryption, and key switching (both as source and target). The key difference: you cannot launch a new key rotation from a Suspended key. Note: key switching (converting ciphertexts between keys) is different from key rotation (the administrative process of replacing a key with a new one).",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "YK7J",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "How will the Zama protocol handle key rotation for existing ciphertexts (planned feature, not yet implemented as of early 2026)?",
    options: [
      "All ciphertexts must be re-encrypted manually",
      "Key Switching Keys (KSK) will convert ciphertexts on-demand during computation",
      "Old ciphertexts become permanently inaccessible",
      "A migration ceremony decrypts and re-encrypts all data"
    ],
    correctAnswer: 1,
    explanation: "Note: Key rotation is not yet implemented as of early 2026. Once available, Zama will use FHE key switching. When a computation involves ciphertexts encrypted under older keys, the Coprocessor will use KSKs to convert them to the current key 'just-in-time' during execution.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    },
    volatile: true
  },
  {
    id: "HZ5Z",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "AWS Nitro Enclaves in TKMS protect key shares from which threat?",
    options: [
      "Network attackers intercepting traffic between KMS nodes",
      "Malicious smart contracts on the Host Chain",
      "The KMS node operator accessing the key in clear at runtime",
      "Coprocessors submitting fraudulent computation results"
    ],
    correctAnswer: 2,
    explanation: "Nitro Enclaves create an isolated execution environment where even the node operator (with root access to the host machine) cannot access the key shares in clear at runtime. The enclave's memory is encrypted and inaccessible from outside. Note: operators still have access to their encrypted backups.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "2E4G",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "What is the role of tfhe-rs in the Zama ecosystem?",
    options: [
      "A JavaScript SDK for web developers",
      "The core Rust library implementing TFHE cryptographic primitives used by Coprocessors",
      "A smart contract compiler",
      "A blockchain consensus mechanism"
    ],
    correctAnswer: 1,
    explanation: "tfhe-rs is the cryptographic foundation implementing LWE/GLWE-based TFHE. It provides Programmable Bootstrapping (PBS), keyswitching, and the FheUint/FheBool types. Coprocessors use it for all FHE computations.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/tfhe-rs",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "KU2X",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "Why is random 'noise' added to TFHE ciphertexts during encryption?",
    options: [
      "To compress the ciphertext size",
      "To make the encryption secure (without noise, encryption could be broken)",
      "To speed up homomorphic operations",
      "To enable key rotation between versions"
    ],
    correctAnswer: 1,
    explanation: "Noise is essential for security - without it, TFHE encryption could be broken. The noise is encoded in the least significant bits of the ciphertext. The tradeoff: each operation increases noise, and if it grows too large it corrupts the message.",
    source: {
      type: "paper",
      reference: "TFHE: Fast Fully Homomorphic Encryption over the Torus (Chillotti et al.)",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "49YE",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "What problem does Programmable Bootstrapping (PBS) solve in TFHE?",
    options: [
      "It generates the initial encryption keys",
      "It resets noise to prevent it from corrupting results",
      "It compresses ciphertexts to reduce storage",
      "It converts ciphertexts between different key versions"
    ],
    correctAnswer: 1,
    explanation: "Noise grows with each FHE operation. If it gets too large, it corrupts the encrypted result. PBS resets noise back to a safe level, allowing more operations to be performed. Without PBS, you'd hit a noise limit and need to decrypt early.",
    source: {
      type: "paper",
      reference: "TFHE: Fast Fully Homomorphic Encryption over the Torus (Chillotti et al.)",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "MPXV",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "Why would you re-randomize a ciphertext before using it in an FHE computation?",
    options: [
      "To make the ciphertext smaller",
      "To prevent attackers from learning information by observing repeated computations",
      "To convert it to a newer key version",
      "To reduce the noise level"
    ],
    correctAnswer: 1,
    explanation: "Re-randomization adds fresh randomness to a ciphertext. Without it, an attacker observing the same ciphertext used multiple times could potentially learn information about the plaintext. It's a security hardening measure for sensitive computations.",
    source: {
      type: "paper",
      reference: "TFHE: Fast Fully Homomorphic Encryption over the Torus (Chillotti et al.)",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "64VC",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "With Zama's latest GPU optimizations (8x NVIDIA H100, dedicated GPU parameters), approximately how long does a 64-bit encrypted multiplication take?",
    options: [
      "~8 ms",
      "~32 ms",
      "~95 ms",
      "~170 ms"
    ],
    correctAnswer: 1,
    explanation: "With 8x H100 GPUs and dedicated GPU parameters, euint64 multiplication takes approximately 32ms. This is a significant improvement over earlier benchmarks thanks to optimized GPU-specific parameters.",
    source: {
      type: "external",
      reference: "Zama GPU team benchmarks (Jan 2026)",
      retrievedAt: "2026-01-07"
    },
    volatile: true
  },
  {
    id: "PJUT",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "According to Zama's whitepaper benchmarks, approximately how long does a 64-bit encrypted addition take on CPU (AMD EPYC 9R14)?",
    options: [
      "~10 ms",
      "~50 ms",
      "~110 ms",
      "~400 ms"
    ],
    correctAnswer: 2,
    explanation: "A euint64 addition takes approximately 109ms on CPU (AMD EPYC 9R14 with 192 cores). Addition is faster than multiplication but slower than bitwise operations.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    },
    volatile: true
  },
  {
    id: "8XSA",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "Which FHE operation is fastest according to Zama's whitepaper benchmarks?",
    options: [
      "Multiplication",
      "Division",
      "Comparison (less than)",
      "Bitwise AND/OR"
    ],
    correctAnswer: 3,
    explanation: "Bitwise operations (AND/OR) are among the fastest at ~19-23ms on CPU for euint64. While they do require Programmable Bootstrapping (PBS) since they're non-linear, the lookup tables involved are simpler than those for arithmetic operations like multiplication or division.",
    source: {
      type: "whitepaper",
      reference: "fhevm-whitepaper.pdf",
      retrievedAt: "2026-01-07"
    },
    volatile: true
  },
  {
    id: "RDRR",
    difficulty: "advanced",
    section: "Data Flow & Encryption",
    question: "When a user calls FHE.add(handleA, handleB) on the Host Chain, what does the FHEVMExecutor contract return?",
    options: [
      "A result handle derived from hashing the inputs and operation type",
      "A pending request ID to query the Coprocessor for the result",
      "A transaction hash to poll for completion",
      "Nothing until the Coprocessor signals completion via callback"
    ],
    correctAnswer: 0,
    explanation: "The Host Chain performs 'symbolic execution' - it only manipulates handles, never ciphertexts. The result handle is deterministically derived as hash(op_type, input_handles, chain_id) || result_type, allowing it to be returned immediately. The actual FHE computation happens asynchronously in the Coprocessor.",
    source: {
      type: "code",
      reference: "fhevm/host-contracts/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "ATP8",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "How does the tfhe-worker know when new FHE computations are pending?",
    options: [
      "The host-listener calls the worker's gRPC endpoint directly",
      "The Gateway broadcasts a notification via its Arbitrum sequencer",
      "A database trigger notifies the worker when new work is inserted",
      "The worker subscribes to Host Chain events via RPC"
    ],
    correctAnswer: 2,
    explanation: "A PostgreSQL trigger (work_updated_trigger_from_computations_insertions) fires NOTIFY after INSERT statements on the computations table. The tfhe-worker listens on this channel via PgListener. It also has a fallback polling interval in case notifications are missed.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/fhevm-engine/tfhe-worker/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "T8MP",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "How do multiple tfhe-worker instances avoid processing the same computation twice?",
    options: [
      "Each worker is assigned specific tenant IDs at startup",
      "The database query locks selected rows so other workers skip them",
      "Workers coordinate via a Redis distributed lock",
      "The Gateway assigns work to specific workers round-robin"
    ],
    correctAnswer: 1,
    explanation: "The tfhe-worker's query uses SELECT ... FOR UPDATE SKIP LOCKED. This PostgreSQL feature locks selected rows for the duration of the transaction - other workers querying simultaneously skip already-locked rows and grab different work items. No external coordination service is needed.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/fhevm-engine/tfhe-worker/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "CNL6",
    difficulty: "advanced",
    section: "Service Interactions",
    question: "At what granularity does the tfhe-worker fetch pending computations?",
    options: [
      "One computation at a time for maximum consistency",
      "All computations from a single Host Chain block",
      "All computations from a single Ethereum transaction",
      "Up to a configurable batch limit across multiple transactions"
    ],
    correctAnswer: 3,
    explanation: "The tfhe-worker queries up to work_items_batch_size (default: 100) pending computations regardless of which block or transaction they came from. It then groups them by tenant and transaction to build the DFG. This allows efficient batching while respecting dependencies.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/fhevm-engine/tfhe-worker/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "V3JM",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "In the Coprocessor's DFG scheduler, what does the 'MaxParallelism' partition strategy do?",
    options: [
      "Assigns each operation to a separate CPU core",
      "Groups sequential chains while keeping independent branches separate for parallel execution",
      "Groups all operations from the same transaction into a single partition",
      "Distributes operations evenly across partitions by operation type"
    ],
    correctAnswer: 1,
    explanation: "MaxParallelism groups sequential chains (A→B→C where each has one parent and one child) into single execution units, but keeps independent branches separate so they can run in parallel. This balances parallelism against scheduling overhead.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/fhevm-engine/scheduler/",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "EHH4",
    difficulty: "advanced",
    section: "Advanced Concepts",
    question: "What happens if the DFG contains a dependency cycle (operation A needs B, B needs A)?",
    options: [
      "The cycle is broken by executing A first with a placeholder value",
      "Operations in the cycle are marked as failed and skipped",
      "The worker deadlocks until manual intervention",
      "The cycle is resolved by executing both operations simultaneously"
    ],
    correctAnswer: 1,
    explanation: "The DFG builder uses Tarjan's algorithm to detect strongly connected components (cycles). Operations in a cycle are marked as is_uncomputable, error results are stored, and the failure cascades to all dependent operations. The worker continues processing other work.",
    source: {
      type: "code",
      reference: "fhevm/coprocessor/fhevm-engine/scheduler/",
      retrievedAt: "2026-01-07"
    }
  },
];

export const beginnerSections = [
  "FHE Fundamentals",
  "TFHE Scheme Basics",
  "fhEVM as Solidity Library",
  "Developer Mental Model",
  "Real Use Cases",
  "Common Misconceptions"
];

export const advancedSections = [
  "Architecture & Components",
  "Data Flow & Encryption", 
  "Decryption Mechanisms",
  "Service Interactions",
  "Advanced Concepts"
];
