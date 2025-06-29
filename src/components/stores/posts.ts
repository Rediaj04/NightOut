import { defineStore } from 'pinia';

// Importa las imágenes directamente
import dulcineaPost1 from '@/assets/imagenes/feed/dulcinea/post1.jpg';
import dulcineaPost2 from '@/assets/imagenes/feed/dulcinea/post2.jpg';
import dulcineaPost3 from '@/assets/imagenes/feed/dulcinea/post3.jpg';
import dulcineaPost4 from '@/assets/imagenes/feed/dulcinea/post4.jpg';
import dulcineaPost5 from '@/assets/imagenes/feed/dulcinea/post5.jpg';
import dulcineaLogo from '@/assets/imagenes/feed/dulcinea/logodulci.jpg';

import hiIbizaPost1 from '@/assets/imagenes/feed/hi/post1.jpg';
import hiIbizaPost2 from '@/assets/imagenes/feed/hi/post2.jpg';
import hiIbizaPost3 from '@/assets/imagenes/feed/hi/post3.jpg';
import hiIbizaPost4 from '@/assets/imagenes/feed/hi/post4.jpg';
import hiIbizaPost5 from '@/assets/imagenes/feed/hi/post5.jpg';
import hiIbizaLogo from '@/assets/imagenes/feed/hi/logohi.png';

import greenValleyPost1 from '@/assets/imagenes/feed/green/post1.jpg';
import greenValleyPost2 from '@/assets/imagenes/feed/green/post2.jpg';
import greenValleyPost3 from '@/assets/imagenes/feed/green/post3.jpg';
import greenValleyPost4 from '@/assets/imagenes/feed/green/post4.jpg';
import greenValleyPost5 from '@/assets/imagenes/feed/green/post5.jpg';
import greenValleyLogo from '@/assets/imagenes/feed/green/logogreen.jpg';

import bootshausPost1 from '@/assets/imagenes/feed/bootshaus/post1.jpg';
import bootshausPost2 from '@/assets/imagenes/feed/bootshaus/post2.jpg';
import bootshausPost3 from '@/assets/imagenes/feed/bootshaus/post3.jpg';
import bootshausPost4 from '@/assets/imagenes/feed/bootshaus/post4.jpg';
import bootshausPost5 from '@/assets/imagenes/feed/bootshaus/post5.jpg';
import bootshausLogo from '@/assets/imagenes/feed/bootshaus/bootshauslogo.jpg';

import echostagePost1 from '@/assets/imagenes/feed/echostage/post1.jpg';
import echostagePost2 from '@/assets/imagenes/feed/echostage/post2.jpg';
import echostagePost3 from '@/assets/imagenes/feed/echostage/post3.jpg';
import echostagePost4 from '@/assets/imagenes/feed/echostage/post4.jpg';
import echostagePost5 from '@/assets/imagenes/feed/echostage/post5.jpg';
import echostageLogo from '@/assets/imagenes/feed/echostage/echostagelogo.jpg';

// Definir la interfaz para el tipo Post
interface Post {
  id: number;
  name: string;
  images: string[];
  profileImage: string;
  description: string;
  location: string;
  coordinates: [number, number];
  minAge: number;
  musicType: string;
  price: string;
  schedule: string;
  vip: string;
  likes: number;
  rating: number;
  ratingValue: string;
  isLiked: boolean;
  isFollowing: boolean;
  isSaved: boolean;
  fecha: string;
}

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [
      {
        id: 1,
        name: "Dulcinea MD",
        images: [
          dulcineaPost1,
          dulcineaPost2,
          dulcineaPost3,
          dulcineaPost4,
          dulcineaPost5,
        ],
        profileImage: dulcineaLogo,
        description: "Un lugar vibrante con música en vivo y ambiente único.",
        location: "Carrer de Marina, 19-21, Barcelona",
        coordinates: [41.4503, 2.1934] as [number, number],
        minAge: 18,
        musicType: "Electrónica, Pop, Reguetón",
        price: "$12,000 COP por entrada",
        schedule: "9:00 PM - 4:00 AM",
        vip: "Sí, disponibles con reserva",
        likes: 9853,
        rating: 4,
        ratingValue: "3.9",
        fecha: "25 Enero 2024",
        isLiked: false,
        isFollowing: false,
        isSaved: false
      },
      {
        id: 2,
        name: "Hi Ibiza BCN",
        images: [
          hiIbizaPost1,
          hiIbizaPost2,
          hiIbizaPost3,
          hiIbizaPost4,
          hiIbizaPost5,
        ],
        profileImage: hiIbizaLogo,
        description: "Uno de los clubes más famosos de Ibiza, conocido por sus fiestas épicas.",
        location: "Carrer dels Almogàvers, 123, Barcelona",
        coordinates: [41.4612, 2.1876] as [number, number],
        minAge: 21,
        musicType: "House, Techno",
        price: "€50 por entrada",
        schedule: "11:00 PM - 6:00 AM",
        vip: "Sí, disponibles con reserva",
        likes: 15000,
        rating: 3,
        ratingValue: "4.0",
        fecha: "27 Enero 2024",
        isLiked: false,
        isFollowing: false,
        isSaved: false
      },
      {
        id: 3,
        name: "Green Valley BCN",
        images: [
          greenValleyPost1,
          greenValleyPost2,
          greenValleyPost3,
          greenValleyPost4,
          greenValleyPost5,
        ],
        profileImage: greenValleyLogo,
        description: "Un paraíso para los amantes de la música electrónica en medio de la naturaleza.",
        location: "Carrer de Pere IV, 412, Barcelona",
        coordinates: [41.4578, 2.2145] as [number, number],
        minAge: 18,
        musicType: "Techno, Trance",
        price: "R$100 por entrada",
        schedule: "10:00 PM - 5:00 AM",
        vip: "Sí, disponibles con reserva",
        likes: 12500,
        rating: 2,
        ratingValue: "3.8",
        fecha: "29 Enero 2024",
        isLiked: false,
        isFollowing: false,
        isSaved: false
      },
      {
        id: 4,
        name: "Bootshaus BCN",
        images: [
          bootshausPost1,
          bootshausPost2,
          bootshausPost3,
          bootshausPost4,
          bootshausPost5,
        ],
        profileImage: bootshausLogo,
        description: "Uno de los clubes más reconocidos de Alemania, famoso por su producción de eventos de alta calidad.",
        location: "Carrer de la Llacuna, 25, Barcelona",
        coordinates: [41.4432, 2.2067] as [number, number],
        minAge: 18,
        musicType: "Techno, House",
        price: "€30 por entrada",
        schedule: "11:00 PM - 7:00 AM",
        vip: "Sí, disponibles con reserva",
        likes: 18000,
        rating: 5,
        ratingValue: "4.5",
        fecha: "1 Febrero 2024",
        isLiked: false,
        isFollowing: false,
        isSaved: false
      },
      {
        id: 5,
        name: "Echostage BCN",
        images: [
          echostagePost1,
          echostagePost2,
          echostagePost3,
          echostagePost4,
          echostagePost5,
        ],
        profileImage: echostageLogo,
        description: "Uno de los clubes más grandes y populares de Estados Unidos, conocido por su producción de eventos de clase mundial.",
        location: "Rambla de Poblenou, 186, Barcelona",
        coordinates: [41.4489, 2.1789] as [number, number],
        minAge: 18,
        musicType: "EDM, House, Techno",
        price: "$40 por entrada",
        schedule: "10:00 PM - 4:00 AM",
        vip: "Sí, disponibles con reserva",
        likes: 20000,
        rating: 5,
        ratingValue: "4.7",
        fecha: "3 Febrero 2024",
        isLiked: false,
        isFollowing: false,
        isSaved: false
      }
    ] as Post[],
    recentItems: [
      { id: 1, name: 'Dulcinea MD', image: dulcineaLogo },
      { id: 2, name: 'Hi Ibiza', image: hiIbizaLogo },
      { id: 3, name: 'Green Valley', image: greenValleyLogo },
      { id: 4, name: 'Bootshaus', image: bootshausLogo },
      { id: 5, name: 'Echostage', image: echostageLogo }
    ]
  }),
  actions: {
    addRecentItem(item: any) {
      this.recentItems.unshift(item);
    },
    removeRecentItem(index: number) {
      this.recentItems.splice(index, 1);
    }
  }
});