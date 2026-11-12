export interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Muhammad Akif Naveed",
    role: "Full-Stack AI Engineer",
    description:
      "Building intelligent products that combine modern software engineering with practical AI solutions. Focused on developing scalable applications, integrating AI capabilities, and turning complex ideas into products that deliver real value.",
    imageUrl: "/images/Muhammad-Akif-Naveed-Full-Stack-Ai-Engineer.png",
    linkedinUrl: "https://www.linkedin.com/in/akif-naveed-malik30",
    githubUrl: "https://github.com/AkifNaveed12",
  },
  {
    name: "Hamza Ali",
    role: "Full-Stack Engineer",
    description:
      "Focused on building reliable, scalable web applications with clean architecture and thoughtful user experiences. Passionate about turning ideas into functional digital products through modern full-stack development.",
    imageUrl: "/images/Hamza-Ali-Full-Stack-Engineer.png",
    linkedinUrl: "https://www.linkedin.com/in/hamza-ali-k712",
    githubUrl: "https://github.com/hamzaali-712",
  },
  {
    name: "Umer Hayat",
    role: "Security & Quality Assurance Engineer",
    description:
      "Dedicated to building secure and dependable software through systematic testing, quality assurance, and security-focused thinking. Focused on identifying vulnerabilities, improving application reliability, and ensuring every product meets high-quality standards.",
    imageUrl: "/images/Umer-Hayat-Testing-and-Q.png",
    linkedinUrl: "https://www.linkedin.com/in/umer-hayat-699028410/",
    githubUrl: "https://github.com/Umer-Hayatt",
  },
];
