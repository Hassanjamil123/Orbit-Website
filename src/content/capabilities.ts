/*
 * Product content in one place, so the founders can correct it without touching layout.
 *
 * Stage labels describe intent, not shipped features:
 *   "beta"  — an early focus for the private beta (research, planning, drafting)
 *   "later" — a longer-term ambition (Orbit acting on your behalf)
 * The split follows one rule: helping you decide is early; doing it for you is later.
 * CONFIRM WITH THE FOUNDERS before launch.
 */

export type Stage = "beta" | "later";

export const stageLabel: Record<Stage, string> = {
  beta: "Early focus",
  later: "Longer term",
};

/** Homepage requests. Each is something Orbit is being built to help with. */
export const requests = [
  { text: "Find me the best flight to Dubai.", domain: "Travel" },
  { text: "Help me apply to university.", domain: "Education" },
  { text: "Compare laptops within my budget.", domain: "Shopping" },
  { text: "Research this business idea.", domain: "Research" },
  { text: "Organize my schedule for next week.", domain: "Productivity" },
  { text: "Help me create and publish a video.", domain: "Creators" },
  { text: "Arrange an appointment.", domain: "Health" },
] as const;

/** "Beyond answers": how Orbit grows from information to outcomes. */
export const abilities: { title: string; body: string; stage: Stage }[] = [
  {
    title: "Research and reasoning",
    body: "Looks into a question properly, weighs the options and tells you what it found and why.",
    stage: "beta",
  },
  {
    title: "Planning and organization",
    body: "Turns a goal into a plan, keeps track of the moving parts and reminds you what's next.",
    stage: "beta",
  },
  {
    title: "Personalized assistance",
    body: "Learns your preferences and context, so you don't have to explain yourself every time.",
    stage: "beta",
  },
  {
    title: "Connected services",
    body: "Works with the apps and accounts you choose to connect, like your calendar and email.",
    stage: "later",
  },
  {
    title: "Delegation and execution",
    body: "Carries out tasks you hand over, such as bookings, forms and orders, with your approval.",
    stage: "later",
  },
  {
    title: "Coordinated helpers",
    body: "Splits bigger jobs into parts that run side by side, while you deal with one Orbit.",
    stage: "later",
  },
];

export type Domain = {
  name: string;
  summary: string;
  examples: { text: string; stage: Stage }[];
};

export const domains: Domain[] = [
  {
    name: "Research and knowledge",
    summary: "Get to the bottom of a question without twenty open tabs.",
    examples: [
      { text: "Summarize what's known about a medical treatment, with sources.", stage: "beta" },
      { text: "Size up the market for a business idea.", stage: "beta" },
      { text: "Keep watch on a topic and brief you when something changes.", stage: "later" },
    ],
  },
  {
    name: "Shopping and commerce",
    summary: "Buy the right thing at the right price, with less scrolling.",
    examples: [
      { text: "Compare laptops within your budget and explain the trade-offs.", stage: "beta" },
      { text: "Find a gift that matches what someone actually likes.", stage: "beta" },
      { text: "Place the order and track the delivery once you approve.", stage: "later" },
    ],
  },
  {
    name: "Travel and mobility",
    summary: "From a rough idea of a trip to a plan that works.",
    examples: [
      { text: "Find the best flight to Dubai for your dates and budget.", stage: "beta" },
      { text: "Build a day-by-day itinerary around what you enjoy.", stage: "beta" },
      { text: "Book flights and hotels, and rebook if plans change.", stage: "later" },
    ],
  },
  {
    name: "Education and careers",
    summary: "Applications, courses and job searches, without the overwhelm.",
    examples: [
      { text: "Shortlist universities and lay out every deadline.", stage: "beta" },
      { text: "Tailor your CV and cover letter to a specific role.", stage: "beta" },
      { text: "Complete and submit applications for your review.", stage: "later" },
    ],
  },
  {
    name: "Creators and content",
    summary: "Spend more time making things and less time on everything around them.",
    examples: [
      { text: "Turn an idea into a script, shot list and description.", stage: "beta" },
      { text: "Plan a month of posts around what your audience responds to.", stage: "beta" },
      { text: "Help produce and publish a video across your channels.", stage: "later" },
    ],
  },
  {
    name: "Health and wellness",
    summary: "Stay on top of appointments, routines and questions. Not a substitute for a doctor.",
    examples: [
      { text: "Prepare questions to ask at your next appointment.", stage: "beta" },
      { text: "Build a realistic routine around your week.", stage: "beta" },
      { text: "Arrange appointments and keep the reminders coming.", stage: "later" },
    ],
  },
  {
    name: "Finance and investments",
    summary: "Understand your money clearly. Not financial advice.",
    examples: [
      { text: "Explain a bill, a contract or an investment in plain language.", stage: "beta" },
      { text: "Put together a monthly budget from your spending.", stage: "beta" },
      { text: "Track subscriptions and flag charges that look wrong.", stage: "later" },
    ],
  },
  {
    name: "Personal productivity",
    summary: "A clearer week, and fewer things slipping through.",
    examples: [
      { text: "Organize your schedule for next week around your priorities.", stage: "beta" },
      { text: "Turn a messy list into a plan with dates.", stage: "beta" },
      { text: "Move meetings and follow up on loose ends for you.", stage: "later" },
    ],
  },
  {
    name: "Communication and collaboration",
    summary: "Say the right thing, to the right people, on time.",
    examples: [
      { text: "Draft a difficult email in your voice.", stage: "beta" },
      { text: "Summarize a long thread and what's expected of you.", stage: "beta" },
      { text: "Send replies and coordinate times once you approve.", stage: "later" },
    ],
  },
  {
    name: "Developers and engineering",
    summary: "A capable partner from first idea to shipped code.",
    examples: [
      { text: "Explain an unfamiliar codebase or error.", stage: "beta" },
      { text: "Compare tools and libraries for a project.", stage: "beta" },
      { text: "Take on well-scoped coding tasks and report back.", stage: "later" },
    ],
  },
  {
    name: "Business and operations",
    summary: "The admin of running something, handled with care.",
    examples: [
      { text: "Research suppliers and compare quotes.", stage: "beta" },
      { text: "Draft proposals, policies and customer replies.", stage: "beta" },
      { text: "Keep recurring operational tasks moving.", stage: "later" },
    ],
  },
  {
    name: "Real estate and life admin",
    summary: "Moves, paperwork and the jobs nobody looks forward to.",
    examples: [
      { text: "Shortlist rentals that fit your budget and commute.", stage: "beta" },
      { text: "Make a moving checklist with every deadline.", stage: "beta" },
      { text: "Fill in forms and book viewings once you approve.", stage: "later" },
    ],
  },
];

/** Shown in a collapsed "more" section on the Capabilities page. */
export const moreDomains = [
  { name: "Accounting", note: "Organizing receipts, preparing for your accountant, understanding returns." },
  { name: "Legal", note: "Explaining documents in plain language and preparing questions for a lawyer. Not legal advice." },
  { name: "Government services", note: "Finding the right form, the right office and the steps to get something done." },
  { name: "Entertainment", note: "What to watch, read, play or do, chosen around your taste." },
  { name: "Home and family", note: "Repairs, school logistics, events and the household calendar." },
];
