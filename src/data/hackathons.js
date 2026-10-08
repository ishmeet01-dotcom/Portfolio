/**
 * Centralized Hackathons & CTFs Data — Ishmeet Singh
 * Strictly documented events without fabricated ranks or false awards.
 */

export const hackathons = [
  {
    id: "null-origin",
    name: "Null Origin CTF 2026",
    category: "International Offensive Security CTF",
    result: "Official Participation Certificate",
    date: "19 September 2026",
    team: "Individual / Squad",
    project: "Offensive Security & Web Exploitation Challenges",
    certificateImage: "/assets/null_origin_certificate.jpg",
    credentialId: "NO-2026-F5D734",
    partnerOrgs: "INE · Unstop · OffSec · Render · Altered Security",
    summary:
      "A grueling 24-hour international competition challenging offensive security researchers on binary exploitation, web security, reverse engineering, and OSINT."
  },
  {
    id: "h7ctf-2026",
    name: "H7CTF 2026",
    category: "Cybersecurity Capture The Flag Competition",
    result: "Official Participation Certificate",
    date: "26–27 September 2026",
    team: "Cybersecurity Research Squad",
    project: "Capture The Flag Problem Sets",
    certificateImage: "/assets/ctf_certificate.png",
    credentialId: "H7CTF26-45K5-FXWS-XGEM",
    partnerOrgs: "ABU · OtterSec · Payatu · JSMON · aisafe",
    summary:
      "Competitive two-day security contest tackling real-world vulnerabilities, cryptographic challenges, and system privilege escalation flags."
  },
  {
    id: "sih-nexus",
    name: "Smart India Hackathon (SIH26153)",
    category: "National Hardware & Software Hackathon",
    result: "Prototype Built & Submitted",
    date: "2026",
    team: "Nexus Research Team",
    project: "NEXUS: AI-Based Network Attack Forecasting from Traffic Data",
    certificateImage: null,
    credentialId: "SIH26153",
    partnerOrgs: "Government of India / AICTE",
    summary:
      "Engineered an autoregressive attack forecasting world model (PyTorch LSTM + Scapy) predicting MITRE ATT&CK stages before adversaries breach core networks."
  }
];

export default hackathons;
