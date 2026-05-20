export const MENU_PRODUCTS = {
  "kopi-panas": {
    id: "kopi-panas",
    name: "Kopi Panas",
    items: [
      {
        id: "arabika-single",
        title: "Kopi Arabika Single Origin",
        description: "Arabika premium dari berbagai daerah",
        harga: 35000,
        category: "kopi-panas",
        image: "",
      },
      {
        id: "robusta-blend",
        title: "Kopi Robusta Blend",
        description: "Blend robusta yang kuat dan bold",
        harga: 28000,
        category: "kopi-panas",
        image: "",
      },
      {
        id: "espresso-shot",
        title: "Espresso Shot",
        description: "Espresso murni 1-2 shot",
        harga: 20000,
        category: "kopi-panas",
        image: "",
      },
      {
        id: "americano",
        title: "Americano",
        description: "Espresso + air panas",
        harga: 25000,
        category: "kopi-panas",
        image: "",
      },
    ],
  },
  "kopi-dingin": {
    id: "kopi-dingin",
    name: "Kopi Dingin",
    items: [
      {
        id: "iced-arabika",
        title: "Iced Arabika",
        description: "Arabika premium dengan es",
        harga: 40000,
        category: "kopi-dingin",
        image: "",
      },
      {
        id: "cold-brew",
        title: "Cold Brew",
        description: "Cold brew 12 jam premium",
        harga: 38000,
        category: "kopi-dingin",
        image: "",
      },
      {
        id: "iced-americano",
        title: "Iced Americano",
        description: "Americano dingin dengan es",
        harga: 28000,
        category: "kopi-dingin",
        image: "",
      },
      {
        id: "affogato",
        title: "Affogato",
        description: "Es krim + espresso shot panas",
        harga: 35000,
        category: "kopi-dingin",
        image: "",
      },
    ],
  },
  "specialty": {
    id: "specialty",
    name: "Specialty",
    items: [
      {
        id: "latte",
        title: "Latte",
        description: "Espresso + susu steamed",
        harga: 35000,
        category: "specialty",
        image: "",
      },
      {
        id: "cappuccino",
        title: "Cappuccino",
        description: "Espresso + susu foam tebal",
        harga: 35000,
        category: "specialty",
        image: "",
      },
      {
        id: "macchiato",
        title: "Macchiato",
        description: "Espresso dengan sedikit susu",
        harga: 30000,
        category: "specialty",
        image: "",
      },
      {
        id: "mocha",
        title: "Mocha",
        description: "Espresso + cokelat + susu",
        harga: 40000,
        category: "specialty",
        image: "",
      },
      {
        id: "flat-white",
        title: "Flat White",
        description: "Espresso + microfoam susu",
        harga: 38000,
        category: "specialty",
        image: "",
      },
    ],
  },
};

export const getCategoryList = () => {
  return Object.values(MENU_PRODUCTS);
};

export const getProductById = (productId) => {
  for (const category of Object.values(MENU_PRODUCTS)) {
    const product = category.items.find((item) => item.id === productId);
    if (product) return product;
  }
  return null;
};
