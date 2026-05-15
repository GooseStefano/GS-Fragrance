const perfumes = [
  {
    id: 1,

    brand: "Tom Ford",

    name: "Oud Wood",

    image: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.56737.2x.avif",

    description: "Тёплый древесный аромат с мягким удом и сливочной ванилью.",

    rating: 9.1,

    accords: ["Woody", "Warm spicy", "Luxury"],

    topNotes: ["Cardamom", "Pepper"],

    middleNotes: ["Oud", "Sandalwood"],

    baseNotes: ["Vanilla", "Amber"],

    accordBars: [
      {
        name: "Woody",
        strength: 90,
      },

      {
        name: "Warm spicy",
        strength: 75,
      },

      {
        name: "Sweet",
        strength: 40,
      },
    ],

    season: ["Winter", "Autumn"],

    daytime: ["Night"],

    performance: {
      longevity: "8-10h",

      sillage: "Strong",
    },

    category: ["woody"],

    reviews: [
      {
        user: "Alex",

        avatar: "https://i.pravatar.cc/150?img=12",

        rating: 9,

        text: "Очень тёплый и дорогой аромат. Идеален для осени.",

        likes: 24,
      },

      {
        user: "Daniel",

        avatar: "https://i.pravatar.cc/150?img=15",

        rating: 8,

        text: "Мягкий уд без агрессии. Очень luxury vibe.",

        likes: 12,
      },
    ],
  },

  {
    id: 2,

    brand: "Jean Paul Gaultier",

    name: "Le Beau",

    image: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.55785.2x.avif",

    description: "Свежий сладкий летний аромат с кокосом и тонкой сладостью.",

    rating: 8.7,

    accords: ["Sweet", "Fresh", "Summer"],

    topNotes: ["Bergamot"],

    middleNotes: ["Coconut"],

    baseNotes: ["Tonka Bean"],

    accordBars: [
      {
        name: "Sweet",
        strength: 80,
      },

      {
        name: "Fresh",
        strength: 70,
      },
    ],

    season: ["Summer", "Spring"],

    daytime: ["Day"],

    performance: {
      longevity: "6-8h",

      sillage: "Medium",
    },

    category: ["sweet"],
  },
];
