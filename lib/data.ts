export const XUBIE_DATA = {
  company: {
    name: "Xubie Snacks",
    legalName: "Xuliani LLC",
    dba: "Xubie Snacks",
    founded: 2026,
    location: "2095 Fruitdale Avenue, San Jose, CA 95128",
    phone: "(650) 656-0483",
    email: "13goonies@gmail.com",
    website: "https://xulanin.com",
    instagram: "https://www.instagram.com/xubie_snacks",
    tagline: "Snacks That Smack",
    mission:
      "Handcrafted sweets and treats rooted in community, built for DM-to-order pickup, local delivery, and unforgettable Bay Area pop-ups.",
    story:
      "Xubie Snacks grew out of Nina Lux's entrepreneurial journey at the School of AI and quickly became a real-world Bay Area brand. The booth, the spin wheel, the menu boards, the merch, the QR codes, the pudding cups, and the Xubie Cake all work together to create a joyful experience that feels alive before the first bite. Every pop-up is part bakery, part community gathering, and part proof that a student founder can build something magnetic in public.",
    stats: {
      posts: 29,
      followers: 614,
      popUps: 25,
      approval: 100,
    },
  },
  founder: {
    name: "Nina Lux",
    title: "Founder & Chief Snack Officer",
    bio: "Nina Lux is a student entrepreneur studying entrepreneurship and human flourishing at the School of AI. Through Xuliani LLC, she turned Xubie Snacks into a living brand with real booths, returning customers, social proof, and a visual identity people instantly recognize. With mentorship from Dr. Freedom Cheteni and product support from Devin and Xuliani, Nina is building a business that feels both community-first and internet-native.",
    professor: "Dr. Freedom Cheteni",
    engineer: "Devin (AI Software Engineer)",
    school: "School of AI (sof.ai)",
    agent: "Xuliani",
  },
  categories: [
    {
      id: "signature",
      name: "Signature Drops",
      description: "The items people recognize from the booth first",
      emoji: "star",
    },
    {
      id: "sweet",
      name: "Sweets & Treats",
      description: "Dessert-forward favorites with serious repeat energy",
      emoji: "candy",
    },
    {
      id: "savory",
      name: "Savory Crunch",
      description: "Salty, spicy, snackable counterpoints to the sweets",
      emoji: "fire",
    },
    {
      id: "wellness",
      name: "Feel-Good Bites",
      description: "Lighter options that still feel unmistakably Xubie",
      emoji: "leaf",
    },
    {
      id: "seasonal",
      name: "Pop-Up Specials",
      description: "Limited runs inspired by events, weekends, and crowd favorites",
      emoji: "sparkles",
    },
  ],
  products: [
    {
      id: 1,
      name: "Banana Pudding Cup",
      category: "signature",
      price: 8,
      description:
        "Creamy, layered, and instantly recognizable from the booth. The cup that keeps showing up in reaction videos and repeat orders.",
      tags: ["bestseller", "crowd-favorite"],
      image: "/branding/community-closeup.jpeg",
    },
    {
      id: 2,
      name: "Xubie Cake Slice",
      category: "signature",
      price: 6,
      description:
        "The namesake dessert with full brand energy — soft, sweet, and built to make first-time tasters believers.",
      tags: ["bestseller", "signature"],
      image: "/branding/community-side.jpeg",
    },
    {
      id: 3,
      name: "Peach Cobbler Jar",
      category: "sweet",
      price: 9.5,
      description:
        "Warm-spiced peaches layered into a grab-and-go dessert jar that feels like comfort food at pop-up speed.",
      tags: ["new"],
      image: "/branding/community-smile.jpeg",
    },
    {
      id: 4,
      name: "Cookies & Cream Pudding Cup",
      category: "sweet",
      price: 8.5,
      description:
        "A chilled dessert cup with creamy texture, cookie crunch, and the kind of sweetness that photographs beautifully.",
      tags: ["customer-loved"],
      image: "/branding/community-hero.jpeg",
    },
    {
      id: 5,
      name: "Hot Honey Plantain Crunch",
      category: "savory",
      price: 7,
      description:
        "Sweet heat and a crisp finish — the perfect snack-table balance when the dessert cups are selling out fast.",
      tags: ["spicy", "gluten-free"],
      image: "/branding/community-side.jpeg",
    },
    {
      id: 6,
      name: "Chili Lime Party Mix",
      category: "savory",
      price: 7.5,
      description:
        "A tangy, salty mix built for sharing at events, creative sessions, and late-night Bay Area linkups.",
      tags: ["gluten-free"],
      image: "/branding/community-closeup.jpeg",
    },
    {
      id: 7,
      name: "Coconut Date Energy Bites",
      category: "wellness",
      price: 9,
      description:
        "Naturally sweet bites with a softer energy profile for customers who want the feel-good side of the brand.",
      tags: ["vegan", "gluten-free"],
      image: "/branding/community-smile.jpeg",
    },
    {
      id: 8,
      name: "Citrus Ginger Fruit Cup",
      category: "wellness",
      price: 8,
      description:
        "Bright, fresh, and clean — a cooler counterpoint to richer desserts without losing the handcrafted feel.",
      tags: ["vegan"],
      image: "/branding/community-hero.jpeg",
    },
    {
      id: 9,
      name: "Lake Merritt Sunday Box",
      category: "seasonal",
      price: 18,
      description:
        "A weekend-only combo inspired by the booth moments and reel captions that helped the brand catch fire.",
      tags: ["seasonal", "limited"],
      image: "/branding/instagram-grid.png",
    },
    {
      id: 10,
      name: "Vendor Table Treat Tray",
      category: "seasonal",
      price: 28,
      description:
        "Designed for gatherings, birthdays, and community tables that want the full Xubie visual spread.",
      tags: ["seasonal", "preorder"],
      image: "/branding/community-side.jpeg",
    },
    {
      id: 11,
      name: "Mini Dessert Flight",
      category: "sweet",
      price: 14,
      description:
        "A tasting set for anyone deciding between pudding, cake, and whatever else is moving at the booth that day.",
      tags: ["new"],
      image: "/branding/community-closeup.jpeg",
    },
    {
      id: 12,
      name: "Celebration Crowd Pack",
      category: "signature",
      price: 32,
      description:
        "A larger-format order for creators, families, and event hosts who want the Xubie table to feel instantly stocked.",
      tags: ["custom"],
      image: "/branding/community-hero.jpeg",
    },
  ],
  testimonials: [
    {
      name: "Lake Merritt customer",
      text: "We came for one cup and left talking about Xubie the whole way home. The booth felt alive and the banana pudding absolutely delivered.",
      rating: 5,
      product: "Banana Pudding Cup",
    },
    {
      name: "Snack Sundays regular",
      text: "Xubie Cake is the kind of dessert you try once and immediately start telling other people about. The branding pulled us in and the flavor closed the deal.",
      rating: 5,
      product: "Xubie Cake Slice",
    },
    {
      name: "Bay Area pop-up guest",
      text: "The whole table looked premium — merch, menu board, samples, QR code, all of it. It felt like a real brand, not a temporary booth.",
      rating: 5,
      product: "Vendor Table Treat Tray",
    },
    {
      name: "Parent at the booth",
      text: "You know it’s good when the kids like it. We tried the desserts first and ended up following the page before we even left.",
      rating: 5,
      product: "Mini Dessert Flight",
    },
    {
      name: "Event host",
      text: "Xubie brought energy, not just food. The sweets-and-treats setup made our event feel warmer and way more memorable.",
      rating: 5,
      product: "Celebration Crowd Pack",
    },
    {
      name: "Instagram follower",
      text: "The reels convinced me to order and the real thing was even better. You can feel that this brand is being built with intention.",
      rating: 5,
      product: "Lake Merritt Sunday Box",
    },
  ],
  faqs: [
    {
      q: "How do I order?",
      a: "You can order directly through the site, DM @xubie_snacks on Instagram, or scan the booth QR code when Xubie is live at a pop-up. If you already know what you want, DM is the fastest path.",
    },
    {
      q: "Do you offer pickup or delivery?",
      a: "Yes. Xubie currently focuses on San Jose pickup and Bay Area local delivery. Same-day options may be available depending on the menu and event schedule.",
    },
    {
      q: "What should I try first?",
      a: "Start with the Banana Pudding Cup or the Xubie Cake Slice. Those are the clearest expressions of the brand and the easiest way to understand why people keep posting their reactions.",
    },
    {
      q: "Do you cater events or pop-ups?",
      a: "Absolutely. Xubie can prepare dessert trays, tasting tables, and custom event spreads for birthdays, community events, creator gatherings, and brand activations.",
    },
    {
      q: "What is Xuliani?",
      a: "Xuliani is the AI concierge behind the brand. It helps answer menu questions, guide orders, support customers, and keep the digital experience feeling as responsive as the real booth.",
    },
    {
      q: "Can I preorder for a specific date?",
      a: "Yes. Preorders are ideal for larger trays, pop-up pickup, and custom event requests. Use the contact form or DM with your preferred date, quantities, and pickup window.",
    },
    {
      q: "Who is behind Xubie Snacks?",
      a: "Xubie Snacks is founded by Nina Lux through Xuliani LLC. The venture is being built at the School of AI with guidance from Dr. Freedom Cheteni and engineering support from Devin.",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Pick Your Favorites",
      description:
        "Browse the live menu and choose the desserts, snackables, or event-ready trays that fit your mood.",
    },
    {
      step: 2,
      title: "Send the Order",
      description:
        "Checkout on the site or DM @xubie_snacks for quick custom requests, preorder questions, and event needs.",
    },
    {
      step: 3,
      title: "Fresh Prep Begins",
      description:
        "Each order is assembled with the same visual care and flavor focus that shows up at the booth and across the Instagram page.",
    },
    {
      step: 4,
      title: "Pick Up or Get It Delivered",
      description:
        "Grab it in San Jose, arrange local delivery, or catch Xubie live at the next Bay Area pop-up.",
    },
  ],
};
