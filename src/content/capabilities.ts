/*
 * Product content in one place, so the founders can correct it without touching layout.
 *
 * Stage labels describe intent, not shipped features:
 *   "beta"  — being built for the private beta. This includes real actions where a
 *             service is supported, always with approval for anything consequential.
 *   "later" — planned after the private beta.
 * CONFIRM WITH THE FOUNDERS before launch: which actions and services the beta will
 * actually support. See docs/DECISIONS.md.
 */

export type Stage = "beta" | "later";

export const stageLabel: Record<Stage, string> = {
  beta: "Private beta",
  later: "Coming later",
};

/** Homepage requests: things you'll be able to tell Orbit to get done. */
export const requests = [
  { text: "Find the best flight to Dubai next week and help me book it.", domain: "Travel" },
  { text: "Help me prepare my university application and keep track of deadlines.", domain: "Education" },
  { text: "Compare the best laptops for my budget and narrow them down for me.", domain: "Shopping" },
  { text: "Research this business idea and turn it into a clear plan.", domain: "Research" },
  { text: "Find a suitable appointment and help me arrange it.", domain: "Health" },
  { text: "Help me plan, create and organize a video project.", domain: "Creators" },
  { text: "Organize my week and keep track of everything I need to get done.", domain: "Productivity" },
] as const;

/** "Beyond answers": what makes Orbit different from a chatbot. */
export const differences: { title: string; body: string; stage: Stage }[] = [
  {
    title: "It takes action",
    body: "Orbit doesn't stop at a list of options. Where a service is supported, it can make the booking, fill in the form or send the message, once you've approved it.",
    stage: "beta",
  },
  {
    title: "It works with your services",
    body: "Connect the accounts you choose, like your calendar or email, and Orbit works with them directly instead of telling you what to click.",
    stage: "beta",
  },
  {
    title: "It keeps the context",
    body: "Your preferences, plans and earlier requests carry over, so you never start from zero.",
    stage: "beta",
  },
  {
    title: "It sees work through",
    body: "Hand over a bigger job and Orbit breaks it into steps, keeps it moving and shows you what's done and what's left.",
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
      { text: "Research a business idea and turn it into a clear plan.", stage: "beta" },
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
      { text: "Place the order once you approve it.", stage: "beta" },
    ],
  },
  {
    name: "Travel and mobility",
    summary: "From a rough idea of a trip to a plan that works.",
    examples: [
      { text: "Find the best flight to Dubai for your dates and budget.", stage: "beta" },
      { text: "Build a day-by-day itinerary around what you enjoy.", stage: "beta" },
      { text: "Book the flight you choose, with your approval.", stage: "beta" },
    ],
  },
  {
    name: "Education and careers",
    summary: "Applications, courses and job searches, without the overwhelm.",
    examples: [
      { text: "Shortlist universities and lay out every deadline.", stage: "beta" },
      { text: "Tailor your CV and cover letter to a specific role.", stage: "beta" },
      { text: "Fill in and submit applications after your review.", stage: "later" },
    ],
  },
  {
    name: "Creators and content production",
    summary: "More time making things, less time on everything around them.",
    examples: [
      { text: "Plan, script and organize a video project.", stage: "beta" },
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
      { text: "Find a suitable appointment and help you arrange it.", stage: "beta" },
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
      { text: "Organize your week and keep track of what needs doing.", stage: "beta" },
      { text: "Make a moving checklist with every deadline.", stage: "beta" },
      { text: "Add plans to your calendar and set reminders, with your approval.", stage: "beta" },
    ],
  },
  {
    name: "Communication and collaboration",
    summary: "Say the right thing, to the right people, on time.",
    examples: [
      { text: "Draft a difficult email in your voice.", stage: "beta" },
      { text: "Summarize a long thread and what's expected of you.", stage: "beta" },
      { text: "Send replies and coordinate times once you approve.", stage: "beta" },
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
