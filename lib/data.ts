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
    tagline: "Snacks That Spark Joy",
    mission:
      "Handcrafted snacks made with love, inspired by culture, and designed to bring people together.",
    story:
      "Born from Nina Lux's passion for entrepreneurship and human flourishing, Xubie Snacks began as a dream at the School of AI. What started as a student project became a real business — blending artisan flavors with modern convenience. Every snack tells a story of creativity, community, and the belief that food is the universal language of joy.",
    stats: {
      flavors: 12,
      happyCustomers: 500,
      eventsServed: 25,
      satisfactionRate: 99,
    },
  },
  founder: {
    name: "Nina Lux",
    title: "Founder & Chief Snack Officer",
    bio: "Nina Lux is a student entrepreneur studying entrepreneurship and human flourishing at the School of AI. She founded Xuliani LLC with a simple belief: that great snacks can change the world, one bite at a time. With guidance from Dr. Freedom Cheteni and the engineering brilliance of Devin, Nina is building Xubie Snacks into a brand that celebrates culture, community, and conscious snacking.",
    professor: "Dr. Freedom Cheteni",
    engineer: "Devin (AI Software Engineer)",
    school: "School of AI (sof.ai)",
    agent: "Xuliani",
  },
  categories: [
    {
      id: "signature",
      name: "Signature Collection",
      description: "Our most-loved creations that started it all",
      emoji: "star",
    },
    {
      id: "sweet",
      name: "Sweet Bites",
      description: "Indulgent treats for your sweet tooth",
      emoji: "candy",
    },
    {
      id: "savory",
      name: "Savory Crunch",
      description: "Bold flavors that keep you coming back",
      emoji: "fire",
    },
    {
      id: "wellness",
      name: "Wellness Bites",
      description: "Nourishing snacks for the mindful snacker",
      emoji: "leaf",
    },
    {
      id: "seasonal",
      name: "Seasonal Specials",
      description: "Limited-edition flavors that celebrate the moment",
      emoji: "sparkles",
    },
  ],
  products: [
    {
      id: 1,
      name: "Golden Crunch Mix",
      category: "signature",
      price: 8.99,
      description:
        "Our signature trail mix with roasted almonds, golden raisins, dark chocolate chips, and a hint of sea salt. The snack that started it all.",
      tags: ["bestseller", "vegan"],
      image: "/snacks/golden-crunch.jpg",
    },
    {
      id: 2,
      name: "Spiced Plantain Chips",
      category: "signature",
      price: 6.99,
      description:
        "Thinly sliced plantains seasoned with our secret spice blend. Crispy, savory, and utterly addictive.",
      tags: ["bestseller", "gluten-free"],
      image: "/snacks/plantain-chips.jpg",
    },
    {
      id: 3,
      name: "Honey Lavender Granola Bites",
      category: "sweet",
      price: 9.99,
      description:
        "Delicate clusters of oats, honey, and dried lavender. A calming treat perfect with your morning coffee.",
      tags: ["new"],
      image: "/snacks/lavender-granola.jpg",
    },
    {
      id: 4,
      name: "Cocoa Cashew Clusters",
      category: "sweet",
      price: 10.99,
      description:
        "Rich dark cocoa dusted over toasted cashew clusters. Decadent but not too sweet — just the way we like it.",
      tags: ["vegan"],
      image: "/snacks/cocoa-cashew.jpg",
    },
    {
      id: 5,
      name: "Chili Lime Peanuts",
      category: "savory",
      price: 5.99,
      description:
        "Roasted peanuts tossed with chili powder and fresh lime zest. A fiery, tangy kick in every handful.",
      tags: ["gluten-free", "spicy"],
      image: "/snacks/chili-lime.jpg",
    },
    {
      id: 6,
      name: "Rosemary Parmesan Crackers",
      category: "savory",
      price: 7.99,
      description:
        "Artisan crackers infused with fresh rosemary and aged parmesan. Elegant enough for a charcuterie board, delicious enough to eat straight from the bag.",
      tags: ["new"],
      image: "/snacks/rosemary-crackers.jpg",
    },
    {
      id: 7,
      name: "Turmeric Ginger Energy Balls",
      category: "wellness",
      price: 11.99,
      description:
        "Packed with turmeric, ginger, oats, and dates. Anti-inflammatory goodness rolled into bite-sized energy.",
      tags: ["vegan", "gluten-free"],
      image: "/snacks/turmeric-balls.jpg",
    },
    {
      id: 8,
      name: "Matcha Coconut Bites",
      category: "wellness",
      price: 10.99,
      description:
        "Ceremonial-grade matcha meets toasted coconut in these antioxidant-rich energy bites. Clean energy, beautiful flavor.",
      tags: ["vegan"],
      image: "/snacks/matcha-coconut.jpg",
    },
    {
      id: 9,
      name: "Maple Pecan Brittle",
      category: "seasonal",
      price: 12.99,
      description:
        "Pure Vermont maple syrup and toasted pecans in a perfectly snappy brittle. Limited spring edition.",
      tags: ["seasonal", "limited"],
      image: "/snacks/maple-brittle.jpg",
    },
    {
      id: 10,
      name: "Strawberry Basil Fruit Leather",
      category: "seasonal",
      price: 8.99,
      description:
        "Sun-ripened strawberries and fresh basil, slow-dried into chewy, vibrant fruit leather. A taste of California summer.",
      tags: ["seasonal", "vegan"],
      image: "/snacks/strawberry-leather.jpg",
    },
    {
      id: 11,
      name: "Everything Bagel Nut Mix",
      category: "savory",
      price: 7.49,
      description:
        "Almonds, cashews, and pumpkin seeds coated in everything bagel seasoning. The snack that turns heads at every party.",
      tags: ["bestseller"],
      image: "/snacks/everything-mix.jpg",
    },
    {
      id: 12,
      name: "Vanilla Bean Caramel Corn",
      category: "sweet",
      price: 9.49,
      description:
        "Artisan caramel corn made with real vanilla bean and a touch of fleur de sel. Movie night, elevated.",
      tags: ["new"],
      image: "/snacks/caramel-corn.jpg",
    },
  ],
  testimonials: [
    {
      name: "Sarah M.",
      text: "The Golden Crunch Mix is absolutely addictive! I ordered three bags the first time and they were gone in a week. Nina puts so much love into everything she makes.",
      rating: 5,
      product: "Golden Crunch Mix",
    },
    {
      name: "Marcus T.",
      text: "I brought the Spiced Plantain Chips to our office potluck and everyone was asking where I got them. Already placed a bulk order for our next team event.",
      rating: 5,
      product: "Spiced Plantain Chips",
    },
    {
      name: "Jennifer K.",
      text: "As someone with dietary restrictions, finding snacks that taste amazing AND are gluten-free is rare. The Turmeric Ginger Energy Balls are a game-changer.",
      rating: 5,
      product: "Turmeric Ginger Energy Balls",
    },
    {
      name: "David & Lisa R.",
      text: "We ordered the party box for our wedding reception. Every single guest raved about the snacks. Xubie made our day even more special.",
      rating: 5,
      product: "Party Box",
    },
    {
      name: "Professor Chen",
      text: "Nina's entrepreneurial spirit shines through in every product. These aren't just snacks — they're a masterclass in building a brand with purpose and heart.",
      rating: 5,
      product: "Signature Collection",
    },
    {
      name: "Aisha W.",
      text: "The Matcha Coconut Bites are my pre-yoga fuel. Clean energy, beautiful packaging, and I love supporting a student entrepreneur. Keep going, Nina!",
      rating: 5,
      product: "Matcha Coconut Bites",
    },
  ],
  faqs: [
    {
      q: "Where do you ship?",
      a: "We currently ship throughout the San Jose Bay Area with same-day and next-day options. We're expanding to nationwide shipping soon! For local pickup, visit us at 2095 Fruitdale Avenue, San Jose.",
    },
    {
      q: "Are your snacks made fresh?",
      a: "Every batch is handcrafted in small quantities to ensure peak freshness and flavor. We never mass-produce — each order is prepared with care.",
    },
    {
      q: "Do you cater events?",
      a: "Absolutely! We offer custom snack boxes for corporate events, weddings, parties, and private gatherings. Contact us for a personalized quote and menu consultation.",
    },
    {
      q: "Do you accommodate dietary restrictions?",
      a: "Yes! Many of our snacks are vegan, gluten-free, or both. Each product is clearly labeled. For specific allergen concerns, please reach out and we'll help you find the perfect options.",
    },
    {
      q: "What is Xuliani?",
      a: "Xuliani is our AI-powered concierge, trained at the School of AI (sof.ai). Xuliani can answer questions about our menu, help you place orders, recommend snacks based on your preferences, and even tell you about upcoming specials. Look for the chat bubble in the corner!",
    },
    {
      q: "Can I order custom flavors or bulk quantities?",
      a: "We love custom requests! Whether it's a unique flavor combination for a corporate gift or bulk orders for an event, get in touch and we'll create something special just for you.",
    },
    {
      q: "Who is behind Xubie Snacks?",
      a: "Xubie Snacks is founded by Nina Lux, a student entrepreneur studying at the School of AI under Professor Dr. Freedom Cheteni. Our technology is built by Devin, an AI software engineer. Together, we're proving that great food and great technology can create extraordinary experiences.",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Browse Our Menu",
      description:
        "Explore our handcrafted collection of sweet, savory, and wellness snacks. Each one is made with premium ingredients and love.",
    },
    {
      step: 2,
      title: "Build Your Box",
      description:
        "Mix and match your favorites into a custom snack box, or choose one of our curated collections. Need help? Ask Xuliani!",
    },
    {
      step: 3,
      title: "We Craft & Ship",
      description:
        "Your order is handcrafted fresh and carefully packaged. Bay Area orders get same-day or next-day delivery.",
    },
    {
      step: 4,
      title: "Enjoy & Share",
      description:
        "Open your box, taste the joy, and share the love. Tag us @xubie_snacks on Instagram!",
    },
  ],
};
