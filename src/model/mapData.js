const images = [
  {image: require('../assets/banners/food-banner1.jpg')},
  {image: require('../assets/banners/food-banner2.jpg')},
  {image: require('../assets/banners/food-banner3.jpg')},
  {image: require('../assets/banners/food-banner4.jpg')},
  {image: {uri: 'https://lh5.googleusercontent.com/p/AF1QipNtMKs14RLE6L-vcryynU5gJeZ4BbAZ0sQBXi9E=w426-h240-k-no'}},
  {image: {uri: 'https://lh5.googleusercontent.com/p/AF1QipMs6vEnkmxs6fHwYjBbmD3O_eght1evq47uMZp-=w156-h96-p-k-no'}},
];

const markers = [
  {
    id: 222,
    coordinate: {
      latitude: 6.6143384,
      longitude: 3.3490474,
    },
    title: 'Ocean Basket',
    description: 'Ikejja',
    image: images[0].image,
    rating: 4,
    reviews: 99,
  },
  {
    id: 223,
    coordinate: {
      latitude: 6.5975626,
      longitude: 3.3431357,
    },
    title: 'Commint Buka',
    description: 'Place like home',
    image: images[1].image,
    rating: 4,
    reviews: 99,
  },
  {
    id: 224,
    coordinate: {
      latitude: 6.5855255,
      longitude: 3.3482314,
    },
    title: 'ZEN Garden',
    description: 'Local delicacies',
    image: images[2].image,
    rating: 4,
    reviews: 99,
  },
  {
    id: 212,
    coordinate: {
      latitude: 6.5851424,
      longitude: 3.3483856,
    },
    title: 'Iyeru Okin',
    description: 'This is the best food place',
    image: images[3].image,
    rating: 2,
    reviews: 23,
  },
  {
    id: 22,
    coordinate: {
      latitude: 8.479703,
      longitude: 4.5423059,
    },
    title: 'item7 Takeaway',
    description: 'Takeaway giveaway opoor',
    image: images[4].image,
    rating: 4.2,
    reviews: 470,
  },
  {
    id: 12,
    coordinate: {
      latitude: 8.479703,
      longitude: 4.5423059,
    },
    title: 'T & K',
    description: 'This is the best food place',
    image: images[5].image,
    rating: 3.9,
    reviews: 550,
  },
];

const mapDarktheme = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

const mapStandardTheme = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export {markers, mapDarktheme, mapStandardTheme};
