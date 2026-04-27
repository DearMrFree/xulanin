export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
}

export const products: Product[] = [
  {
    id: 'chocolate-chip',
    name: 'Chocolate Chip Cookies',
    description: 'Classic homemade cookies loaded with gooey chocolate chips',
    price: 12,
    image: '/images/product-1.jpg',
    category: 'cookies',
    available: true,
  },
  {
    id: 'banana-pudding',
    name: 'Banana Pudding',
    description: 'Creamy, layered banana pudding with vanilla wafers',
    price: 8,
    image: '/images/product-2.jpg',
    category: 'pudding',
    available: true,
  },
  {
    id: 'chocolate-cake',
    name: 'Chocolate Layer Cake',
    description: 'Rich chocolate cake with chocolate frosting (feeds 6-8)',
    price: 25,
    image: '/images/product-3.jpg',
    category: 'cakes',
    available: true,
  },
  {
    id: 'vanilla-cupcakes',
    name: 'Vanilla Cupcakes',
    description: 'Dozen vanilla cupcakes with colorful frosting (12 pack)',
    price: 18,
    image: '/images/product-1.jpg',
    category: 'cakes',
    available: true,
  },
  {
    id: 'brownies',
    name: 'Fudgy Brownies',
    description: 'Dense and fudgy brownies - half dozen',
    price: 14,
    image: '/images/product-2.jpg',
    category: 'cookies',
    available: true,
  },
  {
    id: 'carrot-cake',
    name: 'Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting (feeds 6-8)',
    price: 24,
    image: '/images/product-3.jpg',
    category: 'cakes',
    available: true,
  },
  {
    id: 'caramel-pudding',
    name: 'Caramel Pudding',
    description: 'Smooth and silky caramel pudding perfection',
    price: 8,
    image: '/images/product-1.jpg',
    category: 'pudding',
    available: true,
  },
  {
    id: 'sugar-cookies',
    name: 'Sugar Cookies',
    description: 'Decorative sugar cookies - half dozen',
    price: 16,
    image: '/images/product-2.jpg',
    category: 'cookies',
    available: true,
  },
]

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category)
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}
