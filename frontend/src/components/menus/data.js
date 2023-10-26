import c1 from "../../assets/category/c1.webp";
import c2 from "../../assets/category/c2.webp";
import c3 from "../../assets/category/c3.webp";
import c4 from "../../assets/category/c4.webp";
import c5 from "../../assets/category/c5.webp";
import c6 from "../../assets/category/c6.webp";
import img1 from "../../assets/category/img1.webp";
import img2 from "../../assets/category/img2.webp";
import img3 from "../../assets/category/img3.webp";
import img5 from "../../assets/category/img5.webp";
import img6 from "../../assets/category/img6.webp";
import b1 from "../../assets/category/b1.jpg";
import b2 from "../../assets/category/b2.jpg";

const data = {
  categories: [
    {
      id: 1,
      icon: c1,
      background: "",
      img: "",
      name: "Electronics",
      description: "Popular gadgets and accessories",
      subCategories: [
        {
          name: "Computers",
          img: img1,
          subItems: ["Laptops", "Desktops", "Accessories"],
        },
        {
          name: "Smartphones",
          img: img2,
          subItems: ["iPhone", "Android", "Accessories"],
        },
        {
          name: "Accessories",
          img: img3,
          subItems: ["Headphones", "Chargers", "Cables"],
        },
        {
          name: "Game consoles",
          img: img6,
          subItems: ["Peripheral devices", "Consoles"],
        },
        {
          name: "TV & Video",
          img: img5,
          subItems: [
            "LED TVs",
            "Plasma TVs",
            "3D TVs",
            "DVD & Blu-ray Players",
            "Home Theater Systems",
          ],
        },
      ],
    },
    {
      id: 2,
      icon: c2,
      img: "",
      background: b1,
      name: "Sports & Outdoors",
      description: "Popular gadgets and accessories",
      subCategories: [
        {
          name: "Outdoor Gear",
          subItems: ["Tents", "Backpacks", "Camping Accessories"],
        },
        {
          name: "Athletic Clothing",
          subItems: ["Shirts", "Shorts", "Running Shoes"],
        },
        {
          name: "Footwear",
          subItems: ["Hiking Boots", "Sneakers", "Sandals"],
        },
      ],
    },
    {
      id: 3,
      icon: c3,
      img: "",
      background: "",
      name: "Apparel",
      description: "Popular clothing for all ages",
      subCategories: [
        {
          name: "Men's Clothing",
          subItems: ["Shirts", "Pants", "Jackets"],
        },
        {
          name: "Women's Clothing",
          subItems: ["Dresses", "Blouses", "Skirts"],
        },
        {
          name: "Kids' Clothing",
          subItems: [`Children's Dresses`, `Kids' T-Shirts`, "Baby Clothes"],
        },
      ],
    },
    {
      id: 4,
      icon: c4,
      img: "",
      background: "",
      name: "Office Supplies",
      description: "Essential office products",
      subCategories: [
        {
          name: "Stationery",
          subItems: ["Pens", "Notebooks", "Staplers"],
        },
        {
          name: "Office Furniture",
          subItems: ["Desks", "Chairs", "File Cabinets"],
        },
      ],
    },
    {
      id: 5,
      icon: c5,
      img: "",
      background: b2,
      name: "Multimedia",
      description: "Entertainment and media products",
      subCategories: [
        {
          name: "Movies",
          subItems: ["Action", "Comedy", "Drama"],
        },
        {
          name: "Music",
          subItems: ["Rock", "Pop", "Hip-Hop"],
        },
        {
          name: "Video Games",
          subItems: ["Action", "Adventure", "Simulation"],
        },
      ],
    },
    {
      id: 6,
      icon: c6,
      img: "",
      background: "",
      name: "AB: Sports and outdoors",
      description: "Popular gadgets and accessories",
      subCategories: [
        {
          name: "Outdoor Equipment",
          subItems: ["Climbing Gear", "Cycling Accessories", "Hiking Gear"],
        },
        {
          name: "Sports Clothing",
          subItems: ["Jerseys", "Shorts", "Sportswear"],
        },
        {
          name: "Footwear",
          subItems: ["Running Shoes", "Hiking Boots", "Sneakers"],
        },
      ],
    },
  ],
};

export default data;
