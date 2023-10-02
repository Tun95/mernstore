import abstract from "../../../assets/banner/abstract.mp4";
import woman from "../../../assets/banner/woman.webp";
import iphone from "../../../assets/banner/iphone.webp";
import mp3 from "../../../assets/banner/mp3.webp";
import iphone12 from "../../../assets/banner/iphone12.webp";

const data = {
  banners: [
    {
      id: 1,
      title: "EVERYWHERE, SEE EVERYTHING",
      description:
        "Whatever you can do in real life, you can do it better and more safely in a virtual world",
      img: woman,
      imgBackground: "",
      videoBackground: abstract,
      buttonText: "",
      color: "#ffffff",
      pColor: "var(--color-light-light-gray)",
    },
    {
      id: 2,
      title: "iPhone 12 Blast past fast.",
      description:
        "5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display.",
      img: iphone,
      imgBackground: "",
      videoBackground: "",
      buttonText: "iPhone 12 Pre-order",
      color: "",
      pColor: "var(--color-gray)",
    },
    {
      id: 3,
      title: "Party Booster",
      description:
        "EXTRA BASS ™ for powerful sound. It's time to shake things up with the new XB41. More durable and durable, the XB41 allows parties to be held anywhere, even near water.",
      img: "",
      imgBackground: mp3,
      videoBackground: "",
      buttonText: "View catalog",
      color: "#ffffff",
      pColor: "var(--color-light-light-gray)",
    },
    {
      id: 4,
      title: "iPhone 12 Pro, It’s a leap year",
      description:
        "5G goes Pro. A14 Bionic rockets past every other smartphone chip. The Pro camera system takes low-light photography to the next level — with an even bigger jump on iPhone 12 Pro Max. And Ceramic Shield delivers four times better drop performance. Let’s see what this thing can do.",
      img: "",
      imgBackground: iphone12,
      videoBackground: "",
      buttonText: "I need it!",
      color: "#ffffff",
      pColor: "var(--color-light-gray)",
    },
  ],
};
export default data;
