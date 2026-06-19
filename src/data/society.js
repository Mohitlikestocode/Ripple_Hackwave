/* RIPPLE — canonical character archetypes and a "Demo Society" seed.
   Economic data is in INR per month. Vulnerability = clamp(100 - savings/income*100). */

export const ARCHETYPES = {
  auto:         { emoji: "🚗",   label: "Auto-rickshaw Driver" },
  student:      { emoji: "🎓",   label: "Engineering Student" },
  kirana:       { emoji: "🏪",   label: "Kirana Store Owner" },
  farmer:       { emoji: "🧑‍🌾", label: "Marginal Farmer" },
  teacher:      { emoji: "👩‍🏫", label: "Government School Teacher" },
  police:       { emoji: "👮",   label: "Police Constable" },
  dairy:        { emoji: "🥛",   label: "Dairy Milk Distributor" },
  chai:         { emoji: "☕",   label: "Chai Stall Owner" },
  factory:      { emoji: "🏭",   label: "Factory Worker" },
  truck:        { emoji: "🚚",   label: "Truck Driver" },
  pharmacist:   { emoji: "💊",   label: "Pharmacist" },
  construction: { emoji: "👷",   label: "Construction Worker" },
};

export function vulnerability({ income, savings }) {
  if (!income) return 100;
  return Math.max(0, Math.min(100, Math.round(100 - (savings / income) * 100)));
}

export const DEMO_CHARACTERS = [
  {
    id: 1, key: "auto", emoji: "🚗", name: "Ramesh",
    archetype: "Auto-rickshaw Driver", location: "Pune",
    income: 18000, fixed: 8000, emi: 3200, savings: 2100,
    dependencies: [
      { name: "Petrol", monthlyCost: 4500, criticality: 10 },
      { name: "Vehicle Maintenance", monthlyCost: 1200, criticality: 7 },
    ],
  },
  {
    id: 2, key: "student", emoji: "🎓", name: "Priya",
    archetype: "Engineering Student", location: "Pune",
    income: 5000, fixed: 3500, emi: 0, savings: 800,
    dependencies: [
      { name: "Auto fare", monthlyCost: 1800, criticality: 6 },
      { name: "College Fees", monthlyCost: 1333, criticality: 10 },
      { name: "Data / Internet", monthlyCost: 500, criticality: 8 },
    ],
  },
  {
    id: 3, key: "kirana", emoji: "🏪", name: "Suresh",
    archetype: "Kirana Store Owner", location: "Pune",
    income: 35000, fixed: 18000, emi: 5000, savings: 12000,
    dependencies: [
      { name: "Wholesale Dairy", monthlyCost: 15000, criticality: 10 },
      { name: "Electricity", monthlyCost: 3000, criticality: 9 },
      { name: "Delivery transport", monthlyCost: 2500, criticality: 7 },
    ],
  },
  {
    id: 4, key: "farmer", emoji: "🧑‍🌾", name: "Bhagwat",
    archetype: "Marginal Farmer", location: "Maharashtra",
    income: 22000, fixed: 10000, emi: 8000, savings: 3000,
    dependencies: [
      { name: "Pump diesel", monthlyCost: 3500, criticality: 10 },
      { name: "Fertilizer", monthlyCost: 4000, criticality: 9 },
      { name: "Mandi access", monthlyCost: 1000, criticality: 8 },
    ],
  },
  {
    id: 5, key: "teacher", emoji: "👩‍🏫", name: "Meera",
    archetype: "Government School Teacher", location: "Pune",
    income: 28000, fixed: 14000, emi: 4500, savings: 5500,
    dependencies: [
      { name: "Transport to school", monthlyCost: 2000, criticality: 7 },
      { name: "Tuition materials", monthlyCost: 800, criticality: 5 },
    ],
  },
  {
    id: 6, key: "police", emoji: "👮", name: "Vikram",
    archetype: "Police Constable", location: "Pune",
    income: 32000, fixed: 16000, emi: 6000, savings: 4000,
    dependencies: [
      { name: "Fuel allowance gap", monthlyCost: 1500, criticality: 6 },
      { name: "Uniform / gear", monthlyCost: 500, criticality: 4 },
    ],
  },
  {
    id: 7, key: "dairy", emoji: "🥛", name: "Govind",
    archetype: "Dairy Distributor", location: "Pune",
    income: 40000, fixed: 22000, emi: 7000, savings: 8000,
    dependencies: [
      { name: "Truck diesel", monthlyCost: 8000, criticality: 10 },
      { name: "Cold storage", monthlyCost: 4000, criticality: 9 },
      { name: "Milk procurement", monthlyCost: 18000, criticality: 10 },
    ],
  },
  {
    id: 8, key: "chai", emoji: "☕", name: "Lakshmi",
    archetype: "Chai Stall Owner", location: "Pune",
    income: 15000, fixed: 7000, emi: 2000, savings: 1500,
    dependencies: [
      { name: "Milk supply", monthlyCost: 3000, criticality: 10 },
      { name: "Sugar", monthlyCost: 800, criticality: 8 },
      { name: "LPG cylinder", monthlyCost: 900, criticality: 9 },
    ],
  },
];

export const DEMO_CONNECTIONS = [
  { a: 1, b: 2, type: "serves",     strength: 7 },
  { a: 1, b: 8, type: "buys_from",  strength: 5 },
  { a: 3, b: 7, type: "buys_from",  strength: 9 },
  { a: 4, b: 3, type: "sells_to",   strength: 7 },
  { a: 5, b: 2, type: "teaches",    strength: 8 },
  { a: 6, b: 3, type: "patrols",    strength: 4 },
  { a: 7, b: 4, type: "depends_on", strength: 9 },
  { a: 8, b: 3, type: "buys_from",  strength: 6 },
];
