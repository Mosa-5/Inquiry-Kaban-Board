import { Inquiry } from "@/types";

export const mockInquiries: Inquiry[] = [
  // updated: 1 day ago
  {
    id: "INQ-2026-0001",
    clientName: "Acme Corporation",
    contactPerson: "John Doe",
    eventType: "Corporate Conference",
    eventDate: "2026-03-10",
    guestCount: 120,
    potentialValue: 48000,
    phase: "new",
    hotels: ["Hotel Zurich Grand", "Lakeside Resort"],
    notes: "Needs 2 breakout rooms and vegetarian options.",
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },

  // updated: 3 days ago, high-value
  {
    id: "INQ-2026-0002",
    clientName: "Global Ventures",
    contactPerson: "Anna Smith",
    eventType: "Incentive Trip",
    eventDate: "2026-05-20",
    guestCount: 40,
    potentialValue: 120000,
    phase: "sent_to_hotels",
    hotels: ["Mountain View Lodge"],
    notes: "VIP group with wellness requirements.",
    createdAt: "2026-01-08T09:00:00.000Z",
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },

  // updated: 5 hours ago, high-value
  {
    id: "INQ-2026-0003",
    clientName: "TechStars Meetup",
    contactPerson: "Leo Brown",
    eventType: "Networking Event",
    eventDate: "2026-02-18",
    guestCount: 80,
    potentialValue: 65000,
    phase: "offers_received",
    hotels: ["Riverside Hotel", "Urban Loft"],
    notes: "Requires stage and sound system.",
    createdAt: "2026-01-09T12:00:00.000Z",
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },

  // updated: less than a minute ago, high-value
  {
    id: "INQ-2026-0004",
    clientName: "Family Wedding - Klein",
    contactPerson: "Sara Klein",
    eventType: "Wedding",
    eventDate: "2026-06-12",
    guestCount: 150,
    potentialValue: 90000,
    phase: "completed",
    hotels: ["Lakeside Resort"],
    notes: "Outdoor ceremony with buffet dinner.",
    createdAt: "2025-12-28T08:45:00.000Z",
    updatedAt: new Date(Date.now()).toISOString(),
  },

  {
    id: "INQ-2026-0005",
    clientName: "Optimus Events",
    contactPerson: "Maya Chen",
    eventType: "Product Launch",
    eventDate: "2026-04-14",
    guestCount: 200,
    potentialValue: 72000,
    phase: "new",
    hotels: ["City Center Hotel"],
    notes: "Needs LED wall and media coverage.",
    createdAt: "2026-01-05T10:00:00.000Z",
    updatedAt: "2025-12-20T09:30:00.000Z"  // OLD DATE, should show absolute date
  },

  {
    id: "INQ-2026-0006",
    clientName: "Test Relative Date",
    contactPerson: "QA Tester",
    eventType: "Demo Event",
    eventDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    guestCount: 10,
    potentialValue: 1000,
    phase: "new",
    hotels: [],
    notes: "Testing relative date for eventDate",
    createdAt: "2026-01-05T10:00:00.000Z",
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
];
