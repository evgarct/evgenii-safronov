import { ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Resume" };

const experience = [
  {
    org: "Wrike",
    role: "Staff Product Designer — Design Systems",
    location: "Prague, Czechia",
    period: "Jan 2020 — Present",
    points: [
      "Executed two major product redesigns, including a brand-driven overhaul shaped by a scalable token system covering several thousand tokens across patterns and components.",
      "Created comprehensive, intuitive documentation that enabled AI tools to use the design system directly, accelerating onboarding for new designers.",
      "Maintained 100+ synchronized components (code & Figma), supporting 20+ designers and developers.",
      "Ensured WCAG AA accessibility compliance across all delivered UI through guidance, audits, and remediation.",
      "Maintained a library of 200+ icons and illustrations, and developed themes and mods for flexible, consistent product theming.",
    ],
  },
  {
    org: "Wrike",
    role: "Front-End Developer — Accessible UI & HTML/CSS",
    location: "Saint Petersburg, Russia",
    period: "Nov 2014 — Jan 2020",
    points: [
      "Core member of a front-end subteam responsible for HTML/CSS, design system support, and accessibility across Wrike's product ecosystem.",
      "Led accessibility efforts achieving WCAG AA compliance by remediating issues in 90%+ of the product's UI components, enabling successful signing of major contracts.",
      "Built a stable team of 6 front-end developers focused on accessible UI and high-quality implementation.",
    ],
  },
  {
    org: "CODDY — International Programming School For Children",
    role: "Curriculum Designer & Instructor — Programming for Kids",
    location: "Russia",
    period: "Sep 2016 — Nov 2019",
    points: [
      "Designed and taught programming and web-development courses for children aged 6–16.",
      "Created all materials from scratch: interactive lessons, exercises, and visual aids using Scratch, HTML/CSS, and beginner-friendly tools.",
      "Adapted complex technical concepts into engaging, age-appropriate formats.",
    ],
  },
  {
    org: "ENDY",
    role: "HTML/CSS Front-End Developer",
    location: "Saint Petersburg, Russia",
    period: "Jul 2013 — Nov 2014",
    points: [
      "Developed and delivered websites and web services for prominent local brands.",
      "Collaborated with designers and backend developers to deliver polished interfaces under tight deadlines.",
    ],
  },
];

const competencies = [
  ["Design Systems & Infrastructure", "Design systems, pattern design, scalable design, systematic approach, components"],
  ["UX & Accessibility", "UX/UI design, WCAG, redesign, rapid prototyping"],
  ["Front-End", "HTML & CSS, product design, prototyping"],
  ["Education & Communication", "Curriculum development, teaching"],
] as const;

export default function ResumePage() {
  return (
    <div className="page-shell py-16 sm:py-24">
      <div className="grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="font-heading mt-3 text-5xl font-medium tracking-tight sm:text-7xl">
            Experience.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground">
            Design System Designer with 10+ years in front-end development
            and product design — currently enhancing AI-ready design systems
            at Wrike.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Button asChild>
            <a href={siteConfig.resumePdfHref} download>
              Download PDF <ArrowDownToLine />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            {`${siteConfig.location} — open to remote & relocation`}
          </p>
        </div>
      </div>

      <div className="mt-16 border-t">
        {experience.map((job) => (
          <div key={`${job.org}-${job.period}`} className="grid gap-4 border-b py-10 sm:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-xl font-medium">{job.org}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{job.role}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{job.period}</p>
              <p className="font-mono text-xs text-muted-foreground">{job.location}</p>
            </div>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-foreground/80">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 border-t pt-10 lg:grid-cols-[0.75fr_1.25fr]">
        <p className="eyebrow">Education</p>
        <div>
          <h2 className="text-xl font-medium">
            Zhukovsky Omsk Aviation College
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Specialist Diploma (5-year vocational program) — Software for
            Computer Systems and Automated Systems
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Sep 2005 — Jun 2010
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Applied computer science and automation systems, including
            programming, system architecture, databases, and computer
            networks — specialized in web development and digital design in
            the final year.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t border-b pt-10 pb-16 lg:grid-cols-[0.75fr_1.25fr]">
        <p className="eyebrow">Core competencies</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {competencies.map(([title, body]) => (
            <div key={title}>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
