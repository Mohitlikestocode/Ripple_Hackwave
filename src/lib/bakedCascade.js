/**
 * RIPPLE — pre-baked cascade for "🛢️ Petrol Price +₹20" on the Demo Society.
 *
 * The product is meant to call Claude live (see ./cascade.js). This baked
 * response is the deterministic fallback so the app stays beautiful when no
 * API key is configured, the network is down, or rate limits hit.
 */
export const BAKED_CASCADE = {
  event: { emoji: "🛢️", name: "Petrol Price +₹20", tone: "amber" },
  waves: [
    {
      n: 1, title: "Direct Impact", tone: "amber",
      impacts: [
        {
          id: 1, bubble: "Fuel +₹900/mo",
          diary: "Petrol phir mehnga ho gaya. ₹4500 ka budget tha fuel ka, ab ₹5400 lagega. Mahine ke end mein ₹900 ka shortfall.",
          rows: [
            ["💰", "Monthly fuel cost", "₹4,500 → ₹5,400 (+₹900)", "red"],
            ["📊", "Savings buffer", "2.3 → 1.4 months", "amber"],
          ],
        },
        {
          id: 7, bubble: "Diesel +₹2,400/mo",
          diary: "Truck ka diesel ₹8000 se ₹10,400 ho gaya. Cold storage bhi mehnga. Procurement rate badhana padega.",
          rows: [
            ["💰", "Diesel cost", "₹8,000 → ₹10,400", "red"],
            ["📊", "Savings buffer", "2.0 → 1.5 months", "amber"],
          ],
        },
        {
          id: 4, bubble: "Pump diesel +₹1,000",
          diary: "Pump chalane ka diesel mehnga. Irrigation ka kharcha badhega, lekin mandi rate wahi hai.",
          rows: [
            ["💰", "Pump diesel", "₹3,500 → ₹4,500", "red"],
            ["📊", "Savings buffer", "1.6 → 1.2 months", "amber"],
          ],
        },
      ],
    },
    {
      n: 2, title: "Behavioral Response", tone: "orange",
      impacts: [
        {
          id: 1, bubble: "Raised fare ₹15",
          diary: "Socha bohot — minimum fare ₹15 badhana padega. Shaam ki chai bhi band. Lakshmi didi ko bura lagega lekin majboori hai.",
          rows: [
            ["⚡", "Decision", "Raised minimum fare ₹15", "orange"],
            ["⚡", "Decision", "Stopped evening chai (−₹900/mo)", "orange"],
            ["🔗", "Impact on", "Priya · Lakshmi", "amber"],
          ],
        },
        {
          id: 3, bubble: "Prices up 4%",
          diary: "Govind ne dairy rate badha diya, transport bhi mehnga. Customer ko thoda mehnga bechna padega.",
          rows: [
            ["⚡", "Decision", "Raised shelf prices ~4%", "orange"],
            ["🔗", "Impact on", "Lakshmi · neighbourhood", "amber"],
          ],
        },
        {
          id: 8, bubble: "Lost a regular",
          diary: "Ramesh ab chai nahi peeta. Doodh aur sugar dono mehnga. Ek cylinder ka kharcha alag. Bohot tight ho raha hai.",
          rows: [
            ["🔄", "Lost customer", "Ramesh (auto driver)", "red"],
            ["💰", "Input cost", "Milk + sugar up", "red"],
            ["📊", "Savings buffer", "1.0 → 0.8 months", "red"],
          ],
        },
      ],
    },
    {
      n: 3, title: "Second-Order Cascade", tone: "red",
      impacts: [
        {
          id: 2, bubble: "Walks 4km daily",
          diary: "Auto ka kiraya badh gaya, ab paidal college jaati hoon. Thak jaati hoon, padhai pe asar pad raha hai. Scholarship ka tension.",
          rows: [
            ["🔄", "Can't afford", "Auto fare +₹15", "red"],
            ["⚡", "Decision", "Walks 4km to college", "orange"],
            ["🔗", "At risk", "Attendance · scholarship", "red"],
          ],
        },
        {
          id: 5, bubble: "New auto customer",
          diary: "School jaane ke liye ab Ramesh ka auto leti hoon subah. Thoda mehnga hai lekin time bachta hai.",
          rows: [
            ["🔄", "New arrangement", "Rides with Ramesh AM", "green"],
            ["🔗", "Helps", "Ramesh — partial recovery", "green"],
          ],
        },
      ],
    },
  ],
  summary: {
    totalWaves: 3, affected: 6, incomeLost: 4200,
    mostVulnerable: "Lakshmi", breaking: 1, recoveryDays: 45,
    loops: [
      "Ramesh raises fare → Priya walks → Ramesh gains Meera → partial recovery",
    ],
  },
};
