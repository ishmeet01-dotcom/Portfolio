/**
 * Centralized Education Data — Ishmeet Singh
 * University education is visually dominant, school education is secondary.
 */

export const education = [
  {
    id: "cu",
    dominant: true,
    degree: "B.Tech — Computer Science Engineering",
    institution: "Chandigarh University",
    location: "Mohali, Punjab, India",
    period: "2025–2029",
    gradeLabel: "CGPA",
    gradeValue: "8.45",
    summary:
      "Core focus on computer systems architecture, operating systems, offensive security, and generative artificial intelligence.",
    highlights: [
      "Active member of Cysecsphere Club (Chandigarh University)",
      "Hands-on research in autonomous application security tooling",
      "Specialization in Cybersecurity & Generative AI"
    ]
  },
  {
    id: "senior-secondary",
    dominant: false,
    degree: "Senior Secondary (Class XII) — CBSE",
    institution: "U.M.P.S Sr. Sec. School",
    location: "Punjab, India",
    period: "2023–2024",
    gradeLabel: "Board",
    gradeValue: "CBSE",
    summary: "Science curriculum with strong foundation in Mathematics, Physics, and Computer Science."
  },
  {
    id: "matriculation",
    dominant: false,
    degree: "Matriculation (Class X) — CBSE",
    institution: "U.M.P.S Sr. Sec. School",
    location: "Punjab, India",
    period: "2021–2022",
    gradeLabel: "Board",
    gradeValue: "CBSE",
    summary: "Secondary school education covering fundamental sciences, mathematics, and analytical reasoning."
  }
];

export default education;
