// src/pages/roadmaps/BlockchainRoadmap.jsx
import React from "react";
import "../roadmaps/MobileRoadmap.css"; // Reuse shared roadmap styles

const BlockchainRoadmap = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="path-detail-header">
          <div className="path-icon-large">⛓️</div>
          <div className="path-info">
            <h1>Blockchain Development Roadmap</h1>
            <p>
              Learn to build secure, decentralized applications (dApps) using
              blockchain technologies like Ethereum, smart contracts, and Web3
              tools.
            </p>
          </div>
        </div>

        <div className="timeline">
          {/* Phase 1 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 1: Blockchain Basics
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">2-4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Understand the core principles of blockchain technology and how
                it works.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>What is a Blockchain?</li>
                  <li>Cryptography & Hashing</li>
                  <li>Consensus Mechanisms</li>
                  <li>Public vs Private Blockchains</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Blockchain Demo</span>
                  <span className="resource-badge">🎓 CryptoZombies</span>
                  <span className="resource-badge">📺 IBM Blockchain 101</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 2: Smart Contract Development
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn to write, deploy, and test smart contracts using Solidity
                and tools like Hardhat.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Solidity Basics</li>
                  <li>Ethereum Virtual Machine</li>
                  <li>Smart Contract Security</li>
                  <li>Remix IDE & Hardhat</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Solidity Docs</span>
                  <span className="resource-badge">🎓 Hardhat Tutorials</span>
                  <span className="resource-badge">📺 EatTheBlocks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 3: DApp Development
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Combine frontend skills with smart contracts to build
                decentralized applications (dApps).
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Web3.js / Ethers.js</li>
                  <li>Connecting Wallets (MetaMask)</li>
                  <li>Frontend Framework Integration</li>
                  <li>DeFi & NFT App Concepts</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Web3.js Docs</span>
                  <span className="resource-badge">
                    🎓 Ethers.js Crash Course
                  </span>
                  <span className="resource-badge">📺 Dapp University</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 4: Web3 & Advanced Topics
              <span className="difficulty-badge">Advanced</span>
              <span className="est-time-badge">3-5 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Dive into advanced topics such as Layer 2 solutions, IPFS,
                oracles, and DAOs.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>IPFS & Filecoin</li>
                  <li>Chainlink Oracles</li>
                  <li>Polygon / Arbitrum</li>
                  <li>Decentralized Governance</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Chainlink Docs</span>
                  <span className="resource-badge">🎓 Web3 University</span>
                  <span className="resource-badge">📺 Moralis Web3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainRoadmap;
