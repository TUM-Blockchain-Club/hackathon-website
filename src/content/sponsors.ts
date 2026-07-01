import type { Sponsor } from "@/types/content";

import bitvavoLogo from "../../assets/c26-assets/sponsors/bitvavo_logo.png";
import ethereumFasLogo from "../../assets/c26-assets/sponsors/ethereum_fas_logo.png";
import baseLogo from "../../assets/c26-assets/sponsors/base_logo.png";
import ledgerLogo from "../../assets/c26-assets/sponsors/ledger_logo.png";
import commonsLogo from "../../assets/c26-assets/sponsors/xrpl.png";
import iotaLogo from "../../assets/c26-assets/sponsors/iota_logo.png";
import polkadotLogo from "../../assets/c26-assets/sponsors/Polkadot_Logo.png";
import neodymeLogo from "../../assets/c26-assets/sponsors/neodyme_logo.png";
import tumLogo from "../../assets/c26-assets/partners/tum_logo.png";
import unternehmerTumLogo from "../../assets/c26-assets/partners/UnternehmerTUM.png";
import frankfurtSchoolLogo from "../../assets/c26-assets/partners/frankfurt_school_logo.png";
import bundesblockLogo from "../../assets/c26-assets/partners/bundesblock_logo.png";
import btcEchoLogo from "../../assets/c26-assets/partners/btc_echo_logo.png";
import encodeLogo from "../../assets/c26-assets/partners/encode_logo.png";
import ethWarsawLogo from "../../assets/c26-assets/partners/eth_warsaw_logo.png";
import w3VisionLogo from "../../assets/c26-assets/partners/w3.vision_white.png";

export const sponsors: Sponsor[] = [
  {
    name: "Bitvavo",
    tier: "Partner",
    href: "https://bitvavo.com",
    logoSrc: bitvavoLogo.src,
  },
  {
    name: "Ethereum Foundation Academic Secretariat",
    tier: "Partner",
    href: "https://ethereum.foundation",
    logoSrc: ethereumFasLogo.src,
  },
  {
    name: "Base",
    tier: "Partner",
    href: "https://base.org",
    logoSrc: baseLogo.src,
  },
  {
    name: "Ledger",
    tier: "Partner",
    href: "https://www.ledger.com",
    logoSrc: ledgerLogo.src,
  },
  {
    name: "XRPL Commons",
    tier: "Partner",
    href: "https://www.xrpl-commons.org",
    logoSrc: commonsLogo.src,
  },
  {
    name: "IOTA",
    tier: "Partner",
    href: "https://www.iota.org",
    logoSrc: iotaLogo.src,
  },
  {
    name: "Polkadot",
    tier: "Partner",
    href: "https://polkadot.com",
    logoSrc: polkadotLogo.src,
  },
  {
    name: "Neodyme",
    tier: "Partner",
    href: "https://neodyme.io",
    logoSrc: neodymeLogo.src,
  },
];

export const partners: Sponsor[] = [
  {
    name: "Technical University of Munich",
    tier: "Partner",
    href: "https://www.tum.de",
    logoSrc: tumLogo.src,
  },
  {
    name: "UnternehmerTUM",
    tier: "Partner",
    href: "https://www.unternehmertum.de",
    logoSrc: unternehmerTumLogo.src,
  },
  {
    name: "Frankfurt School of Finance & Management",
    tier: "Partner",
    href: "https://www.frankfurt-school.de",
    logoSrc: frankfurtSchoolLogo.src,
  },
  {
    name: "Bundesblock",
    tier: "Partner",
    href: "https://bundesblock.de",
    logoSrc: bundesblockLogo.src,
    logoTreatment: "dark-mark",
  },
  {
    name: "BTC-ECHO",
    tier: "Partner",
    href: "https://www.btc-echo.de",
    logoSrc: btcEchoLogo.src,
    logoTreatment: "dark-mark",
  },
  {
    name: "Encode Club",
    tier: "Partner",
    href: "https://www.encode.club",
    logoSrc: encodeLogo.src,
    logoTreatment: "dark-mark",
  },
  {
    name: "ETHWarsaw",
    tier: "Partner",
    href: "https://www.ethwarsaw.dev",
    logoSrc: ethWarsawLogo.src,
    logoTreatment: "dark-mark",
  },
  {
    name: "w3.vision",
    tier: "Partner",
    href: "https://w3.vision",
    logoSrc: w3VisionLogo.src,
    logoTreatment: "dark-mark",
  },
];

export const currentYearSponsors: Sponsor[] = [
  {
    name: "Devfolio",
    tier: "Partner",
    href: "https://devfolio.co/",
    logoSrc: "/sponsors/devfolio_logo_black.png",
    logoAlt: "DEVFOLIO LOGO",
    logoScale: 1.08,
  },
  {
    name: "BSV Blockchain",
    tier: "Partner",
    href: "https://bsvblockchain.org/",
    logoSrc: "/sponsors/bsv_blockchain_logo.svg",
    logoPadding: "p-4",
  },
];

// Top 20 crypto sponsors sorted by size and importance
export const allSponsors: Sponsor[] = [
  // Top Row (Absolute Giants)
  {
    name: "Sui",
    tier: "Platinum",
    href: "https://sui.io/",
    logoSrc: "/sponsors/sui_logo_blue.svg",
    logoScale: 1.35,
    logoPadding: "p-0",
  },
  {
    name: "Solana",
    tier: "Gold",
    href: "https://solana.com/",
    logoSrc: "/sponsors/solana_logo.png",
  },
  {
    name: "Base",
    tier: "Gold",
    href: "https://www.base.org/",
    logoSrc: "/sponsors/base_logo.png",
  },
  {
    name: "Ethereum ESP",
    tier: "Gold",
    href: "https://esp.ethereum.foundation/",
    logoSrc: "/sponsors/ethereum_esp_logo.png",
  },
  {
    name: "Starknet",
    tier: "Silver",
    href: "https://www.starknet.io/",
    logoSrc: "/sponsors/starknet_logo.jpg",
  },
  {
    name: "Polkadot",
    tier: "Silver",
    href: "https://polkadot.com/",
    logoSrc: "/sponsors/Polkadot_Logo.png",
  },
  {
    name: "Lido",
    tier: "Partner",
    href: "https://lido.fi/",
    logoSrc: "/sponsors/lido_logo.png",
  },
  {
    name: "Ledger",
    tier: "Gold",
    href: "https://www.ledger.com/",
    logoSrc: "/sponsors/ledger_logo.png",
  },
  {
    name: "1inch",
    tier: "Gold",
    href: "https://1inch.io/",
    logoSrc: "/sponsors/1inch_logo.png",
    logoScale: 1.3,
    logoPadding: "p-0.5",
  },
  {
    name: "Bitvavo",
    tier: "Platinum",
    href: "https://bitvavo.com/",
    logoSrc: "/sponsors/bitvavo_logo.png",
  },

  // Bottom Row (Next Tier Protocols & Ecosystems)
  {
    name: "Scroll",
    tier: "Partner",
    href: "https://scroll.io/",
    logoSrc: "/sponsors/scroll_logo.png",
  },
  {
    name: "Polygon",
    tier: "Partner",
    href: "https://polygon.technology/",
    logoSrc: "/sponsors/polygon.png",
  },
  {
    name: "XRPL Commons",
    tier: "Silver",
    href: "https://www.xrpl-commons.org/",
    logoSrc: "/sponsors/xrpl.png",
  },
  {
    name: "ENS",
    tier: "Partner",
    href: "https://ens.domains/",
    logoSrc: "/sponsors/ens_logo.png",
  },
  {
    name: "Gnosis",
    tier: "Partner",
    href: "https://www.gnosis.io/",
    logoSrc: "/sponsors/gnosis_logo.png",
  },
  {
    name: "Filecoin",
    tier: "Partner",
    href: "https://fil.org/",
    logoSrc: "/sponsors/filecoin_foundation_logo.png",
  },
  {
    name: "Fetch.ai",
    tier: "Partner",
    href: "https://fetch.ai/",
    logoSrc: "/sponsors/fetch_ai_logo.png",
  },
  {
    name: "IOTA",
    tier: "Silver",
    href: "https://www.iota.org/",
    logoSrc: "/sponsors/iota_logo.png",
  },
  {
    name: "Arcium",
    tier: "Silver",
    href: "https://www.arcium.com/",
    logoSrc: "/sponsors/arcium_logo.png",
  },
  {
    name: "API3",
    tier: "Partner",
    href: "https://api3.org/",
    logoSrc: "/sponsors/api3_logo.png",
    logoScale: 1.25,
    logoPadding: "p-0.5",
  },
];
