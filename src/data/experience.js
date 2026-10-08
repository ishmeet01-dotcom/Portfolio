/**
 * Centralized Experience Data — Ishmeet Singh
 * Only includes information verified from the user's resume and academic records.
 * No fabricated dates, responsibilities, metrics, or achievements.
 */

export const experience = [
  {
    id: "hackhalt",
    role: "Cybersecurity Intern",
    organization: "HackHalt Cyber Intelligence Council",
    location: "India",
    type: "Internship",
    badge: "Offensive Security",
    summary:
      "Conducted security analysis, threat research, and vulnerability exploration within the Cyber Intelligence Council.",
    contributions: [
      "Assisted in attack surface mapping and reconnaissance workflows.",
      "Researched emerging vulnerability patterns and offensive security techniques.",
      "Collaborated on technical intelligence assessments and threat evaluations."
    ],
    technologies: ["Offensive Security", "OSINT", "Vulnerability Research", "Attack Surface Mapping"]
  },
  {
    id: "bluestock",
    role: "Data Analyst Intern",
    organization: "Bluestock Fintech",
    location: "India",
    type: "Internship",
    badge: "Analytics & Data",
    summary:
      "Performed data extraction, analytical modeling, and reporting across fintech datasets.",
    contributions: [
      "Analyzed structured datasets to identify trends and operational insights.",
      "Supported data cleaning, visualization, and metric calculation pipelines."
    ],
    technologies: ["Python", "Data Analysis", "Data Cleaning", "Quantitative Analysis"]
  }
];

export default experience;
