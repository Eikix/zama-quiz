import type { Question } from '../types/quiz';

export const questions: Question[] = [
  // ============================================
  // BEGINNER QUESTIONS
  // ============================================

  // Section: FHE Fundamentals
  {
    id: "B001",
    difficulty: "beginner",
    section: "FHE Fundamentals",
    question: "What does FHE stand for?",
    options: [
      "Fast Homomorphic Execution",
      "Fully Homomorphic Encryption",
      "Federated Hash Encoding",
      "Functional Hash Encryption"
    ],
    correctAnswer: 1,
    explanation: "FHE stands for Fully Homomorphic Encryption. It's a form of encryption that allows computations to be performed directly on encrypted data without decrypting it first.",
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
    question: "What is the main benefit of Fully Homomorphic Encryption?",
    options: [
      "It makes encryption faster than traditional methods",
      "It allows computation on encrypted data without revealing the plaintext",
      "It reduces the size of encrypted data",
      "It eliminates the need for encryption keys"
    ],
    correctAnswer: 1,
    explanation: "The key benefit of FHE is that it enables computation on encrypted data. The data remains encrypted throughout the computation, and only the final result needs to be decrypted by authorized parties.",
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
    question: "In TFHE, what is 'noise' and why does it matter?",
    options: [
      "Random data added for compression purposes",
      "A security measure that grows with each operation and must be managed",
      "Audio interference in encrypted communications",
      "Unused bits in the ciphertext that can be ignored"
    ],
    correctAnswer: 1,
    explanation: "In TFHE, noise is random data added during encryption that provides security. However, noise grows with each homomorphic operation. If it grows too large, it corrupts the result. This is why noise management (through bootstrapping) is essential.",
    source: {
      type: "paper",
      reference: "TFHE: Fast Fully Homomorphic Encryption over the Torus (Chillotti et al.)",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B004",
    difficulty: "beginner",
    section: "FHE Fundamentals",
    question: "What does 'bootstrapping' do in FHE?",
    options: [
      "Initializes the encryption system for first use",
      "Resets the noise level so more operations can be performed",
      "Generates new encryption keys",
      "Converts plaintext to ciphertext"
    ],
    correctAnswer: 1,
    explanation: "Bootstrapping is an operation that resets (reduces) the noise in a ciphertext. Without bootstrapping, the accumulated noise would eventually corrupt the encrypted data. It's what makes FHE 'fully' homomorphic - enabling unlimited operations.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/tfhe-rs",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Zama Architecture
  {
    id: "B005",
    difficulty: "beginner",
    section: "Zama Architecture",
    question: "What is fhEVM?",
    options: [
      "A new programming language for encryption",
      "A modified EVM that supports operations on encrypted data",
      "A hardware accelerator for FHE computations",
      "A wallet for storing encrypted assets"
    ],
    correctAnswer: 1,
    explanation: "fhEVM is Zama's confidential smart contract protocol. It extends the Ethereum Virtual Machine (EVM) to support encrypted data types and operations, allowing developers to write smart contracts that process encrypted data.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B006",
    difficulty: "beginner",
    section: "Zama Architecture",
    question: "In the Zama architecture, what is the role of the Coprocessor?",
    options: [
      "To store encrypted data permanently",
      "To perform the actual FHE computations off-chain",
      "To manage user authentication",
      "To process blockchain transactions"
    ],
    correctAnswer: 1,
    explanation: "The Coprocessor is the off-chain computation engine that performs actual FHE operations. Since FHE computations are expensive, they run off-chain on the Coprocessor while the blockchain handles coordination and verification.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B007",
    difficulty: "beginner",
    section: "Zama Architecture",
    question: "What is the KMS (Key Management Service) responsible for in Zama?",
    options: [
      "Storing user passwords",
      "Managing the FHE keys and performing threshold decryption",
      "Compiling smart contracts",
      "Processing cryptocurrency payments"
    ],
    correctAnswer: 1,
    explanation: "The KMS manages the global FHE keys used for encryption and decryption. It uses threshold cryptography, meaning multiple KMS nodes must cooperate to decrypt data - no single node can decrypt alone.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B008",
    difficulty: "beginner",
    section: "Zama Architecture",
    question: "Why are FHE computations performed off-chain rather than directly on the blockchain?",
    options: [
      "Blockchains don't support mathematical operations",
      "FHE computations are too expensive (time and resources) for on-chain execution",
      "Off-chain is more secure than on-chain",
      "FHE only works on centralized servers"
    ],
    correctAnswer: 1,
    explanation: "FHE operations are computationally intensive - a single encrypted multiplication can take tens of milliseconds. Running these directly on a blockchain would be prohibitively expensive in terms of gas costs and would slow down the network.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Developer Basics
  {
    id: "B009",
    difficulty: "beginner",
    section: "Developer Basics",
    question: "Which of the following is a valid encrypted integer type in fhEVM?",
    options: [
      "encryptedInt",
      "euint64",
      "fheNumber",
      "secureInt256"
    ],
    correctAnswer: 1,
    explanation: "fhEVM provides encrypted types like euint8, euint16, euint32, euint64, etc. The 'e' prefix stands for 'encrypted'. These types work similarly to regular Solidity integers but operate on encrypted values.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/types",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B010",
    difficulty: "beginner",
    section: "Developer Basics",
    question: "What is an 'ebool' in fhEVM?",
    options: [
      "An error boolean for exception handling",
      "An encrypted boolean value (true/false)",
      "An external boolean from another contract",
      "A boolean that expires after one use"
    ],
    correctAnswer: 1,
    explanation: "ebool is an encrypted boolean type in fhEVM. It stores a true/false value in encrypted form, allowing confidential conditional logic in smart contracts without revealing the actual condition.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/types",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B011",
    difficulty: "beginner",
    section: "Developer Basics",
    question: "Can you directly compare two encrypted values (e.g., check if euint64 a > euint64 b) in fhEVM?",
    options: [
      "No, encrypted values cannot be compared at all",
      "Yes, but the result is an encrypted boolean (ebool), not a plaintext boolean",
      "Yes, and it returns a regular true/false value",
      "Only if you decrypt them first"
    ],
    correctAnswer: 1,
    explanation: "You can compare encrypted values in fhEVM, but the result is an encrypted boolean (ebool). The actual comparison result remains hidden. You cannot directly use it in a regular if statement without decryption.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/operations",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B012",
    difficulty: "beginner",
    section: "Developer Basics",
    question: "What is an 'eaddress' in fhEVM?",
    options: [
      "An email address stored on-chain",
      "An encrypted Ethereum address",
      "An external address from another blockchain",
      "An emergency recovery address"
    ],
    correctAnswer: 1,
    explanation: "eaddress is an encrypted Ethereum address type in fhEVM. It allows contracts to work with addresses confidentially, useful for scenarios like private voting or confidential transfers where the recipient should be hidden.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/types",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Trust & Security
  {
    id: "B013",
    difficulty: "beginner",
    section: "Trust & Security",
    question: "In Zama's architecture, who can decrypt encrypted data?",
    options: [
      "Anyone with the transaction hash",
      "Only parties authorized via the Access Control List (ACL)",
      "Any node on the blockchain",
      "Only the contract deployer"
    ],
    correctAnswer: 1,
    explanation: "Decryption is controlled by the ACL (Access Control List). Smart contracts must explicitly grant decryption permissions. This ensures that even though data is on a public blockchain, only authorized parties can decrypt it.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/acl",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B014",
    difficulty: "beginner",
    section: "Trust & Security",
    question: "What is 'threshold decryption' in the Zama KMS?",
    options: [
      "Decryption that only works below a certain file size",
      "A system where multiple parties must cooperate to decrypt - no single party can decrypt alone",
      "Decryption that happens after a time delay",
      "A faster decryption method for large files"
    ],
    correctAnswer: 1,
    explanation: "Threshold decryption means the decryption key is split among multiple KMS nodes. A minimum number (threshold) of nodes must participate to decrypt. This prevents any single party from accessing encrypted data unilaterally.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B015",
    difficulty: "beginner",
    section: "Trust & Security",
    question: "What is the difference between 'public decryption' and 'user decryption' in fhEVM?",
    options: [
      "Public decryption is free, user decryption costs gas",
      "Public decryption reveals the plaintext on-chain, user decryption keeps it private to the user",
      "Public decryption is faster than user decryption",
      "There is no difference, they are the same"
    ],
    correctAnswer: 1,
    explanation: "Public decryption reveals the decrypted value on-chain for everyone to see (useful for auction results, game outcomes, etc.). User decryption encrypts the result under the user's personal key, so only they can see it.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm/fundamentals/decryption",
      retrievedAt: "2026-01-07"
    }
  },

  // Section: Use Cases
  {
    id: "B016",
    difficulty: "beginner",
    section: "Use Cases",
    question: "Which of the following is a good use case for fhEVM?",
    options: [
      "Public token transfers where everyone should see the amounts",
      "Confidential voting where votes should remain private",
      "Displaying public NFT metadata",
      "Publishing blog posts on-chain"
    ],
    correctAnswer: 1,
    explanation: "Confidential voting is an excellent use case for fhEVM. Votes can be encrypted, tallied homomorphically (without revealing individual votes), and only the final result is decrypted. This provides both privacy and verifiability.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B017",
    difficulty: "beginner",
    section: "Use Cases",
    question: "How can FHE help with DeFi (Decentralized Finance) applications?",
    options: [
      "It cannot - DeFi requires transparent transactions",
      "By enabling private trading amounts, hidden order books, and confidential lending",
      "By making transactions faster",
      "By reducing gas costs"
    ],
    correctAnswer: 1,
    explanation: "FHE enables confidential DeFi where trading amounts, positions, and strategies can remain private. This prevents front-running, MEV extraction, and provides the same privacy expectations users have in traditional finance.",
    source: {
      type: "docs",
      reference: "https://docs.zama.ai/fhevm",
      retrievedAt: "2026-01-07"
    }
  },
  {
    id: "B018",
    difficulty: "beginner",
    section: "Use Cases",
    question: "What problem does fhEVM solve for blockchain gaming?",
    options: [
      "It makes games run faster",
      "It enables hidden information (like cards in hand or fog of war) on a transparent blockchain",
      "It reduces the cost of minting NFTs",
      "It allows games to run without internet"
    ],
    correctAnswer: 1,
    explanation: "Blockchains are transparent by default, making games with hidden information (poker hands, strategy games) difficult. fhEVM allows game state to be encrypted, enabling true hidden information while maintaining blockchain verifiability.",
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

export const sections = [
  "Architecture & Components",
  "Data Flow & Encryption", 
  "Decryption Mechanisms",
  "Service Interactions",
  "Advanced Concepts"
];
