/*
 * Product content in one place, so the founders can correct it without touching layout.
 *
 * Stage labels describe intent, not shipped features:
 *   "beta"  — being developed for the private beta (research, planning, drafting, continuity)
 *   "later" — a broader future capability (Orbit acting on your behalf)
 * The split follows one rule: helping you decide is early; doing it for you is later.
 * CONFIRM WITH THE FOUNDERS before launch.
 */

export type Stage = "beta" | "later";

export const stageLabel: Record<Stage, string> = {
  beta: "Private beta focus",
  later: "Future",
};

/** Homepage requests. Each is something Orbit is being built to help with. */
export const requests = [
  { text: "Find me the best flight to Dubai.", domain: "Travel" },
  { text: "Help me apply to university.", domain: "Education" },
  { text: "Compare laptops within my budget.", domain: "Shopping" },
  { text: "Research this business idea.", domain: "Research" },
  { text: "Arrange an appointment for tomorrow.", domain: "Health" },
  { text: "Help me create a video.", domain: "Creators" },
  { text: "Organize everything I need to do this week.", domain: "Productivity" },
] as const;

/** "Beyond answers": what makes Orbit different from a chatbot. */
export const differences: { title: string; body: string; stage: Stage }[] = [
  {
    title: "It acts, not just answers",
    body: "Orbit is being built to take the next step for you: fill in the form, make the booking, send the message, once you've approved it.",
    stage: "later",
  },
  {
    title: "It works with your services",
    body: "Connect the apps and accounts you choose, like your calendar or email, and Orbit can work with them instead of telling you what to click.",
    stage: "later",
  },
  {
    title: "It remembers the context",
    body: "Your preferences, plans and past requests carry over, so you don't start from zero every time.",
    stage: "beta",
  },
  {
    title: "You can hand work over",
    body: "Give Orbit a bigger job, like planning a trip or preparing an application, and it breaks it into steps and keeps it moving.",
    stage: "beta",
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
      { text: "Research a business idea and size up the market.", stage: "beta" },
      { text: "Summarize what's known about a topic, with sources.", stage: "beta" },
      { text: "Keep watch on a subject and brief you when something changes.", stage: "later" },
    ],
  },
  {
    name: "Shopping and commerce",
    summary: "Buy the right thing at the right price, with less scrolling.",
    examples: [
      { text: "Compare laptops within your budget and explain the trade-offs.", stage: "beta" },
      { text: "Find a gift that matches what someone actually likes.", stage: "beta" },
      { text: "Place the order and track delivery once you approve.", stage: "later" },
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
      { text: "Complete and submit applications after your review.", stage: "later" },
    ],
  },
  {
    name: "Creators and content production",
    summary: "More time making things, less time on everything around them.",
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
      { text: "Arrange an appointment and keep the reminders coming.", stage: "later" },
    ],
  },
  {
    name: "Finance and investments",
    summary: "Understand your money clearly. Not financial advice.",
    examples: [
      { text: "Explain a bill, contract or investment in plain language.", stage: "beta" },
      { text: "Put together a monthly budget from your spending.", stage: "beta" },
      { text: "Track subscriptions and flag charges that look wrong.", stage: "later" },
    ],
  },
  {
    name: "Productivity and life admin",
    summary: "A clearer week, and fewer things slipping through.",
    examples: [
      { text: "Organize everything you need to do this week.", stage: "beta" },
      { text: "Make a moving checklist with every deadline.", stage: "beta" },
      { text: "Reschedule, renew and follow up on loose ends for you.", stage: "later" },
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
    name: "Software development",
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
];

/** Future domains, shown together on the Capabilities page. All longer term. */
export const moreDomains = [
  { name: "Real estate", note: "Shortlisting homes, comparing areas and organizing viewings." },
  { name: "Legal", note: "Explaining documents in plain language and preparing questions for a lawyer. Not legal advice." },
  { name: "Accounting", note: "Organizing receipts and getting ready for your accountant." },
  { name: "Government services", note: "Finding the right form, the right office and the steps to get something done." },
  { name: "Entertainment", note: "What to watch, read, play or do, chosen around your taste." },
  { name: "Home and family", note: "Repairs, school logistics, events and the household calendar." },
];
