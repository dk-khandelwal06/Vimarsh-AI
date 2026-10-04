export interface TeamMember {
  name: string;
  role: string;
  institute: string;
  degree?: string;
  email: string;
  github: string;
  linkedin: string;
  avatarText: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Daksh Khandelwal",
    role: "Team Leader",
    institute: "Indian Institute of Technology (IIT), Jodhpur",
    degree: "B.S. in Applied AI & Data Science",
    email: "dk.khandelwaliit@gmail.com",
    github: "https://github.com/dk-khandelwal06",
    linkedin: "https://www.linkedin.com/in/daksh-khandelwal-b02748391/",
    avatarText: "DK",
  },
  {
    name: "Khushi Kushwah",
    role: "Team Member",
    institute: "Indian Institute of Technology (IIT), Jodhpur",
    email: "khushikushwah213@gmail.com",
    github: "https://github.com/khushikushwah213",
    linkedin: "https://www.linkedin.com/in/khushi-kushwah-94420b421/",
    avatarText: "KK",
  },
];

export const HACKATHON_METADATA = {
  name: "SANGYAN Investor Resilience Hackathon 2026",
  organizer: "SNTC, IIT (BHU) Varanasi",
  collaborators: "Securities and Exchange Board of India (SEBI) & National Securities Depository Limited (NSDL)",
  track: "Track A: Digital Fraud & Scam Resilience",
  mode: "Online (National Finalist)",
  year: "2026",
};
