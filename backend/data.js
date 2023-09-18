import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Tunji",
      lastName: "Akande",
      email: "Shopmate400@gmail.com",
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687182438/dvez9uaxz53b0vfakide.jpg",
      password: bcrypt.hashSync("Shopmate400"),
      isAdmin: true,
      isBlocked: false,
      isSeller: true,
      affiliateCode: 0,
      isAccountVerified: true,
    },
    {
      firstName: "John",
      lastName: "Mathew",
      email: "mathew12@gmail.com",
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687182438/dvez9uaxz53b0vfakide.jpg",
      password: bcrypt.hashSync("Mathew95"),
      isAdmin: false,
      isBlocked: false,
      affiliateCode: 1,
      isSeller: false,
      isAccountVerified: false,
    },
  ],
  products: [
    {
      _id: "64f1d00bceef0863e6419811",
      name: "Sony cctv",

      slug: "sony-cctv",
      keygen: "SKU BK3569",
      category: ["Electronic", "Home & Garden"],
      size: [],
      color: [],
      price: 600,
      countInStock: 20,
      numSales: 0,
      discount: 75,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693569024/vcsapokkym8ahayqzehx.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:50:35.466Z",
      updatedAt: "2023-09-01T11:50:35.466Z",
      __v: 0,
      id: "64f1d00bceef0863e6419811",
    },
    {
      _id: "64f1cfc9ceef0863e641980a",
      name: "RG product",

      slug: "rg-product",
      keygen: "SKU BK3569",
      category: ["Electronic"],
      size: [],
      color: [],
      price: 1200,
      countInStock: 20,
      numSales: 0,
      discount: 90,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568957/t170hdb8g1ohckztngq8.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:49:29.459Z",
      updatedAt: "2023-09-01T11:49:29.459Z",
      __v: 0,
      id: "64f1cfc9ceef0863e641980a",
    },
    {
      _id: "64f1cf8fceef0863e6419803",
      name: "Sony Tv1080p",

      slug: "sony-tv1080p",
      keygen: "SKU BK3569",
      category: ["Electronic"],
      size: [],
      color: [],
      price: 500,
      countInStock: 20,
      numSales: 0,
      discount: 75,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568896/p7xivs80se9dn8wq6yw6.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:48:31.541Z",
      updatedAt: "2023-09-01T11:48:31.541Z",
      __v: 0,
      id: "64f1cf8fceef0863e6419803",
    },
    {
      _id: "64f1cf36ceef0863e64197fc",
      name: "Silver Cap",

      slug: "silver-cap",
      keygen: "SKU BK3569",
      category: ["Clothings", "Fashion"],
      size: [],
      color: [],
      price: 120,
      countInStock: 20,
      numSales: 0,
      discount: 55,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568804/yjq8ynwgad16cbqb3pjo.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:47:02.656Z",
      updatedAt: "2023-09-01T11:47:02.656Z",
      __v: 0,
      id: "64f1cf36ceef0863e64197fc",
    },
    {
      _id: "64f1cee2ceef0863e64197f5",
      name: "Airpod",

      slug: "airpod",
      keygen: "SKU BK3569",
      category: ["Electronic", "Music"],
      size: [],
      color: [],
      price: 300,
      countInStock: 10,
      numSales: 0,
      discount: 80,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568726/bykrmp1ihvlznhshu7fu.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:45:38.352Z",
      updatedAt: "2023-09-01T11:45:38.352Z",
      __v: 0,
      id: "64f1cee2ceef0863e64197f5",
    },
    {
      _id: "64f1cebbceef0863e64197ee",
      name: "Xeats Bluetooth earphon",

      slug: "xeats-bluetooth-earphon",
      keygen: "SKU BK3569",
      category: ["Music", "Electronic"],
      size: [],
      color: [],
      price: 100,
      countInStock: 20,
      numSales: 0,
      discount: 30,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568665/cegsa5igquiusfj7xwdc.webp",
      flashdeal: true,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:44:59.563Z",
      updatedAt: "2023-09-01T11:52:50.768Z",
      __v: 0,
      id: "64f1cebbceef0863e64197ee",
    },
    {
      _id: "64f1ce54ceef0863e64197e7",
      name: "Redimi Phone",

      slug: "redimi-phone",
      keygen: "SKU BK3569",
      category: ["Phone", "Electronic"],
      size: [],
      color: [],
      price: 700,
      countInStock: 60,
      numSales: 0,
      discount: 68,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568574/sf3zjk9k5k0e0w6uaxd2.webp",
      flashdeal: true,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:43:16.748Z",
      updatedAt: "2023-09-01T11:52:42.273Z",
      __v: 0,
      id: "64f1ce54ceef0863e64197e7",
    },
    {
      _id: "64f1ce15ceef0863e64197e0",
      name: "Ceats wireless earphone",

      slug: "ceats-wireless-earphone",
      keygen: "SKU BK3569",
      category: ["Music", "Electronic"],
      size: [],
      color: [],
      price: 80,
      countInStock: 40,
      numSales: 0,
      discount: 70,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568515/xbuzlhbfy5kxptqp2jbw.webp",
      flashdeal: true,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:42:13.405Z",
      updatedAt: "2023-09-01T11:52:34.466Z",
      __v: 0,
      id: "64f1ce15ceef0863e64197e0",
    },
    {
      _id: "64f1cde4ceef0863e64197d9",
      name: "Iphone",

      slug: "iphone",
      keygen: "SKU BK3569",
      category: ["Phone"],
      size: [],
      color: [],
      price: 900,
      countInStock: 100,
      numSales: 0,
      discount: 90,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568472/srkuhqudfr6zxpqreunu.webp",
      flashdeal: true,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:41:24.237Z",
      updatedAt: "2023-09-01T11:52:26.821Z",
      __v: 0,
      id: "64f1cde4ceef0863e64197d9",
    },
    {
      _id: "64f1cdaeceef0863e64197d2",
      name: "Sony Light",

      slug: "sony-light",
      keygen: "SKU BK3569",
      category: ["Phone"],
      size: [],
      color: [],
      price: 200,
      countInStock: 20,
      numSales: 0,
      discount: 50,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568416/lxbnxrqokhv0tjfscpav.webp",
      flashdeal: true,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:40:30.177Z",
      updatedAt: "2023-09-01T11:52:17.218Z",
      __v: 0,
      id: "64f1cdaeceef0863e64197d2",
    },
    {
      _id: "64f1cd76ceef0863e64197c3",
      name: "Vivo android one",

      slug: "vivo-android-one",
      keygen: "SKU BK3569",
      category: ["Phone", "Electronic"],
      size: [],
      color: [],
      price: 500,
      countInStock: 12,
      numSales: 0,
      discount: 50,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568370/h7aaugsh98dmiut0syiv.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: null,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:39:34.908Z",
      updatedAt: "2023-09-01T11:39:34.908Z",
      __v: 0,
      id: "64f1cd76ceef0863e64197c3",
    },
    {
      _id: "64f1cd2bceef0863e641979f",
      name: "Mapple Earphones",

      slug: "mapple-earphones",
      keygen: "SKU BK3569",
      category: ["Electronic"],
      size: [],
      color: [],
      price: 180,
      countInStock: 20,
      numSales: 0,
      discount: 68,
      brand: [],
      image:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1693568293/plzxsztsmnni8rnhp6q0.webp",
      flashdeal: false,
      images: [],
      desc: "",
      rating: 0,
      numReviews: 0,
      weight: 0,
      numWish: 0,
      affiliateEnabled: false,
      affiliateCommissionRate: 0,
      sold: [],
      reviews: [],
      wish: [],
      createdAt: "2023-09-01T11:38:19.759Z",
      updatedAt: "2023-09-01T11:39:49.441Z",
      __v: 1,
      id: "64f1cd2bceef0863e641979f",
    },
  ],
  banners: [
    {
      title: "Flower verse 50% off",
      background:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1686848034/hsr8nzjz7y3wi1h5lzc1.png",
      category: "Dinning Table",
      descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.",
    },
    {
      title: "50% Off For Your First Shopping",
      background:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1686847287/jzlspyhgkwegtaxvmkai.png",
      category: "office chair",
      descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.",
    },
    {
      title: "Shop With Confidence",
      background:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1686844702/prj99rsxuhl5buu2ohei.png",
      category: "office chair",
      descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.",
    },
  ],
  categories: [
    {
      category: "Electronic",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687618056/dhnpmuobkqa1celdckik.png",
    },
    {
      category: "Fashion",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687618030/hhourhlfwv9fth5urla5.png",
    },
    {
      category: "Cars",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687617301/pvbpzxpf4d4sbtgdzhrc.png",
    },
    {
      category: "Home & Garden",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687614419/teuxnuaceijwrwtfbmdx.png",
    },
    {
      category: "Gift",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021470/aspjmty0b26mi6oxcnku.png",
    },
    {
      category: "Music",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021396/kokvbdyb9qoihlhma2kc.png",
    },
    {
      category: "Health & Beauty",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021344/iyoblb2ltsxnwc6udc3y.png",
    },
    {
      category: "Pet",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021304/tsgdfjawgnlmjzbrqbyl.png",
    },
    {
      category: "Baby Toys",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021267/eahvhf8p0laty3z0y8nm.png",
    },
    {
      category: "Groceries",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021235/eoanvixxgzzvtqo2pzvc.png",
    },
    {
      category: "Books",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021138/phyoo2oxku5rm1rqzkrt.png",
    },
    {
      category: "Clothings",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687021073/qmng45nlmso7l5nitika.png",
    },
    {
      category: "Phone",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687009069/sf3fyyiqyqstylksigde.png",
    },
    {
      category: "Wrist Watch",
      categoryImg:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1687008971/fdxm0z42w7wjnhc5i9jn.png",
    },
  ],
  showrooms: [
    {
      _id: "64c1b2b26a205f442bc027ea",
      smallImage:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1690969751/opi4ssf2mjjtk5mhgqir.jpg",
      largeImage:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1692441878/dks5l3zrratax0qrhamp.jpg",
      titleOne: "Want more!",
      titleTwo: "Our Show Room",
      normalText: [
        "Explore the vastness of our store",
        "Discover the latest collections",
        "Shop with confidence",
        "Experience unparalleled quality",
        "Find your perfect style",
      ],
      createdAt: "2023-07-26T23:56:34.542Z",
      updatedAt: "2023-08-19T10:44:45.010Z",
      __v: 5,
      id: "64c1b2b26a205f442bc027ea",
    },
  ],
  wrappers: [
    {
      _id: "64c77356f4d741dd24bd586d",
      wrappers: [
        {
          icon: "fa-solid fa-truck-fast",
          header: "Worldwide Delivery",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae",
          _id: "64c77356f4d741dd24bd586e",
        },
      ],
      createdAt: "2023-07-31T08:39:50.114Z",
      updatedAt: "2023-08-02T07:07:53.613Z",
      __v: 0,
    },
    {
      _id: "64c782412f2ad216031459e0",
      wrappers: [
        {
          icon: "fa-solid fa-id-card",
          header: "Safe Payment",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae",
          _id: "64c782412f2ad216031459e1",
        },
      ],
      createdAt: "2023-07-31T09:43:29.320Z",
      updatedAt: "2023-08-02T07:08:04.481Z",
      __v: 0,
    },
    {
      _id: "64c78eef2f2ad21603145f6c",
      wrappers: [
        {
          icon: "fa-solid fa-shield",
          header: "Shop With Confidence",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae",
          _id: "64c78eef2f2ad21603145f6d",
        },
      ],
      createdAt: "2023-07-31T10:37:35.181Z",
      updatedAt: "2023-08-02T07:08:19.414Z",
      __v: 0,
    },
    {
      _id: "64c78f552f2ad21603145f97",
      wrappers: [
        {
          icon: "fa-solid fa-headset",
          header: "24/7 Support",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae",
          _id: "64c78f552f2ad21603145f98",
        },
      ],
      createdAt: "2023-07-31T10:39:17.927Z",
      updatedAt: "2023-08-02T07:08:33.255Z",
      __v: 0,
    },
  ],
  settings: [
    {
      _id: "64f1c5a742495b7151dfc9c6",
      about:
        '<p><span style="font-size: 24px;"><strong>About</strong></span></p><br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae quo quia quod accusamus. Beatae minus voluptatum delectus sint explicabo vel in mollitia, eum unde aliquam pariatur facere odit voluptatibus deleniti cum culpa totam? Ab eaque cum molestias commodi, incidunt facilis quis magnam nisi eligendi aliquam atque distinctio corrupti animi in ut iusto facere enim culpa officiis excepturi tenetur aut numquam alias. Sed cum voluptatibus aliquam qui nostrum minus maiores, nulla veritatis illum delectus voluptatem ab minima, quas quod eaque reprehenderit recusandae itaque perferendis optio aut. Minima natus perspiciatis illo.</p><p><br></p>',
      terms:
        '<p><strong style="font-size: 24px;">Terms</strong></p><br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae quo quia quod accusamus. Beatae minus voluptatum delectus sint explicabo vel in mollitia, eum unde aliquam pariatur facere odit voluptatibus deleniti cum culpa totam? Ab eaque cum molestias commodi, incidunt facilis quis magnam nisi eligendi aliquam atque distinctio corrupti animi in ut iusto facere enim culpa officiis excepturi tenetur aut numquam alias. Sed cum voluptatibus aliquam qui nostrum minus maiores, nulla veritatis illum delectus voluptatem ab minima, quas quod eaque reprehenderit recusandae itaque perferendis optio aut. Minima natus perspiciatis illo.</p>',
      returns: "<p>Your return here</p>",
      privacy:
        '<p><span style="font-size: 24px;"><strong>Privacy Policy</strong></span></p><br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae quo quia quod accusamus. Beatae minus voluptatum delectus sint explicabo vel in mollitia, eum unde aliquam pariatur facere odit voluptatibus deleniti cum culpa totam? Ab eaque cum molestias commodi, incidunt facilis quis magnam nisi eligendi aliquam atque distinctio corrupti animi in ut iusto facere enim culpa officiis excepturi tenetur aut numquam alias. Sed cum voluptatibus aliquam qui nostrum minus maiores, nulla veritatis illum delectus voluptatem ab minima, quas quod eaque reprehenderit recusandae itaque perferendis optio aut. Minima natus perspiciatis illo.</p>',
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellendus doloremque beatae consequuntur qui dolorem, laudantium reprehenderit, est deserunt vitae",
      currency: "USD",
      rate: 81.99,
      tax: "0.2",
      shipping: "24",
      express: " Express shipping: (1-2 business days)",
      expressCharges: "28",
      standard: "Standard shipping: (2-3 business days)",
      standardCharges: "0",
      messenger: "unknown.unknown",
      email: "info@example.com",
      playstore: "",
      appstore: "",
      whatsapp: "+0 123-456-7890",
      webname: "shopFinity",
      storeAddress: "unknown, unknown India",
      logo: "https://res.cloudinary.com/dstj5eqcd/image/upload/v1692095770/d26wuxkgcqvsh8mue9m7.png",
      faviconUrl:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1690410281/mhhrdg6d7yxzqvqd8vwm.png",
      buyInfo: "How to buy",
      bulk: "Corporate & Bulk Purchasing",
      themeFaq: "<p>theme faq guidelines</p>",
      careers: "careers here",
      ourcares: "Our cares info here",
      ourstores: "Our stores info here",
      paypal:
        "AVSqcwu8gCktEtMw2sSWrXdATPkiXfrfJIGPJvp7YJYqEcrwcXOhujirF6QEBIdigzqQzw6tSJ3_rgey",
      razorkeyid: "rzp_test_yyI1vXw8dNpnfO",
      razorsecret: "kIwDzb0JYPzwzoePpseCBEXe",
      paytmid: "frogiro89f409r099rofhepko",
      paytmkey: "frogiro89f409r099rofhepko",
      payUPub: "6cd530c6-f2d3-41ab-b1f2-8d56418ac919",
      payUPriv: "584af1fe-ad9c-4ae3-b18f-da86b3933c7d",
      exhangerate: "10270e08382c90d68a845cdd",
      stripeApiKey:
        "sk_test_51LddZCG74SnLVBhQgEpJEtwmrZun228Px4rYGTLUZ1xC81NzN2TP2svtDGXT3UPaYcEy8jtfj6X6k5EbzcEROpFu00eKwTYye4",
      stripePubKey:
        "pk_test_51LddZCG74SnLVBhQAzsedUUcKxd33HOpAIThNyxKl2l4mxvCj8uywmQFZHNq5EmiIn6jNrAVGrBqT1tWHprcD3XF00xOSuchsE",
      paystackkey: "pk_test_ef13bcd8c41beba368902728447ba2b4f79a3287",
      googleAnalytics: "G-MNF3WLVGEC",
      messengerAppId: "6222862251176447",
      messengerPageId: "107454247668619",
    },
  ],
};

export default data;
