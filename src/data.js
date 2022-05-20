export const sliderItems = [
  {
    id: 1,
    bg: "f5fafd",
    title: "Summer Sale",
    desc: "BEST SELLER SELF DEVELOPMENT BOOK! GET DISCOUNT 30% OFF",
    img: "https://cf.shopee.co.id/file/749f58aea3e0754929823bd113bdc73b"
  },
  {
    id: 2,
    bg: "f5fafd",
    title: "Winter Sale",
    desc: "BEST SELLER BUSINESS BOOK! GET DISCOUNT 30% OFF",
    img: "https://images-na.ssl-images-amazon.com/images/I/5112YFsXIJL.jpg"
  },
  {
    id: 3,
    bg: "f5fafd",
    title: "Computer Science Day",
    desc: "BEST SELLER Javascript BOOK! GET DISCOUNT 30% OFF",
    img: "https://miro.medium.com/max/1200/1*zBRkcBbsjWzcPjtcxqhb3Q.jpeg"
  }
]

export const carouselProducts = [
  {
    id: 1,
    imgUrl: '/assets/no-image.jpeg',
    title: 'How to make money just in the bedroom',
    author: 'Hafiz, Fadli',
    price: 50000
  },
  {
    id: 2,
    imgUrl: '/assets/no-image.jpeg',
    title: 'Elasticsearch definitive guide',
    author: 'Hafiz, Fadli',
    price: 150000
  },
  {
    id: 3,
    imgUrl: '/assets/no-image.jpeg',
    title: 'Mongo, Express, React, and Node (MERN) Stack',
    author: 'Hafiz, Fadli',
    price: 150000
  },
  {
    id: 4,
    imgUrl: '/assets/no-image.jpeg',
    title: 'Apache Kafka and Debezium',
    author: 'Hafiz, Fadli',
    price: 150000
  },
  {
    id: 5,
    imgUrl: '/assets/no-image.jpeg',
    title: 'How Linux Works',
    author: 'Hafiz, Fadli',
    price: 150000
  }
]

// cart data
export const productsDummy = [
  {
    id: 1,
    imgUrl: '/assets/no-image.jpeg',
    title: 'How to make money just in the bedroom',
    identifier: '987654321121',
    author: 'Hafiz, Fadli',
    price: 50000,
    stock: 2,
    totalAddedToCart: 1
  },
  {
    id: 2,
    imgUrl: '/assets/no-image.jpeg',
    title: 'Elasticsearch definitive guide',
    author: 'Hafiz, Fadli',
    identifier: '987654321122',
    price: 150000,
    stock: 1,
    totalAddedToCart: 1
  },
  {
    id: 3,
    imgUrl: '/assets/no-image.jpeg',
    title: 'Mongo, Express, React, and Node (MERN) Stack',
    author: 'Hafiz, Fadli',
    identifier: '987654321123',
    price: 150000,
    stock: 4,
    totalAddedToCart: 1
  },
  {
    id: 4,
    imgUrl: '/assets/no-image.jpeg',
    title: 'Apache Kafka and Debezium',
    author: 'Hafiz, Fadli',
    identifier: '987654321124',
    price: 150000,
    stock: 2,
    totalAddedToCart: 1
  },
  {
    id: 5,
    imgUrl: '/assets/no-image.jpeg',
    title: 'How Linux Works',
    author: 'Hafiz, Fadli',
    identifier: '987654321125',
    price: 150000,
    stock: 1,
    totalAddedToCart: 1
  }
]

// expected data structure for cart pages
export const cartsDummy = [
  {
    userId: 1,
    product: {
      id: 5,
      imgUrl: '/assets/no-image.jpeg',
      title: 'How Linux Works',
      author: 'Hafiz, Fadli',
      identifier: '987654321125',
      price: 100000,
      stock: 5
    },
    quantity: 3
  },
  {
    userId: 2,
    product: {
      id: 6,
      imgUrl: '/assets/no-image.jpeg',
      title: 'Apache Kafka and Debezium',
      author: 'Hafiz, Fadli',
      identifier: '987654321124',
      price: 150000,
      stock: 3
    },
    quantity: 1
  }
]

// expected province data
export const provinceDummy = [
  {
    id: 1,
    name: 'Jawa Barat'
  },
  {
    id: 2,
    name: 'Jawa Tengah'
  }
]

// expected city data
export const citiesDummy = [
  {
    id: 1,
    name: 'Bandung',
    prov_id: 1
  },
  {
    id: 2,
    name: 'Semarang',
    prov_id: 2
  }
]

// expected district data
export const districtsDummy = [
  {
    id: 1,
    name: 'Babakan Ciparay',
    city_id: 1
  },
  {
    id: 2,
    name: 'Banyumanik',
    city_id: 2
  }
]

// expected subdistrict data
export const subdistrictsDummy = [
  {
    id: 1,
    name: 'Babakan Ciparay',
    district_id: 1
  },
  {
    id: 2,
    name: 'Srondol Wetan',
    district_id: 2
  }
]

export const postalcodeDummy = [
  {
    id: 1,
    prov_id: 1,
    city_id: 1,
    district_id: 1,
    subdistrict_id :1,
    postal_code: '40223'
  },
  {
    id: 2,
    prov_id: 2,
    city_id: 2,
    district_id: 2,
    subdistrict_id: 2,
    postal_code: '50263'
  }
]