export type ProductSize = {
  label: string
  price: number
  netWeight: string
  netWeightMetric: string
}

export interface CottageLabel {
  productName: string
  homekitchenStatement: string
  permitNumber: string
  countyIssued: string
  businessName: string
  businessCity: string
  businessState: string
  businessZip: string
  ingredients: string
  fillingIngredients?: string
  toppingIngredients?: string
  allergens: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  sizes: ProductSize[]
  image: string
  category: string
  available: boolean
  label: CottageLabel
}

// Shared business info
const BUSINESS = {
  name: 'Xubie Snacks',
  city: 'San Jose',
  state: 'CA',
  zip: '95116',
  county: 'Santa Clara County',
  permitNumber: 'CFO-PENDING-XXXX',
}

export const products: Product[] = [
  {
    id: 'banana-pudding',
    name: 'Banana Pudding',
    description: 'Creamy, layered banana pudding with fresh bananas and vanilla wafers. Snacks That Smack.',
    sizes: [
      { label: 'Regular', price: 8, netWeight: '10 oz', netWeightMetric: '283 g' },
      { label: 'Large',   price: 12, netWeight: '16 oz', netWeightMetric: '454 g' },
    ],
    image: '/images/banana-pudding.jpg',
    category: 'pudding',
    available: true,
    label: {
      productName: 'Banana Pudding',
      homekitchenStatement: 'Made in a Home Kitchen',
      permitNumber: BUSINESS.permitNumber,
      countyIssued: BUSINESS.county,
      businessName: BUSINESS.name,
      businessCity: BUSINESS.city,
      businessState: BUSINESS.state,
      businessZip: BUSINESS.zip,
      ingredients:
        'Vanilla wafers (enriched flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid], sugar, vegetable oil [soybean and/or canola oil], high fructose corn syrup, leavening [sodium bicarbonate, ammonium bicarbonate], salt, soy lecithin, natural and artificial flavor), whole milk, heavy cream, sugar, egg yolks, cornstarch, pure vanilla extract, bananas, salt.',
      allergens: ['Wheat', 'Milk', 'Eggs', 'Soy'],
    },
  },
  {
    id: 'biscoff-banana-pudding',
    name: 'Biscoff Banana Pudding',
    description: 'Our signature banana pudding layered with Biscoff cookies and caramel drizzle. Next level.',
    sizes: [
      { label: 'Regular', price: 9,  netWeight: '10 oz', netWeightMetric: '283 g' },
      { label: 'Large',   price: 13, netWeight: '16 oz', netWeightMetric: '454 g' },
    ],
    image: '/images/biscoff-pudding.jpg',
    category: 'pudding',
    available: true,
    label: {
      productName: 'Biscoff Banana Pudding',
      homekitchenStatement: 'Made in a Home Kitchen',
      permitNumber: BUSINESS.permitNumber,
      countyIssued: BUSINESS.county,
      businessName: BUSINESS.name,
      businessCity: BUSINESS.city,
      businessState: BUSINESS.state,
      businessZip: BUSINESS.zip,
      ingredients:
        'Biscoff cookies (wheat flour, sugar, vegetable oils [palm oil, soybean oil, rapeseed oil], brown sugar syrup, sodium bicarbonate, soy flour, salt, cinnamon), whole milk, heavy cream, sugar, egg yolks, cornstarch, pure vanilla extract, bananas, caramel sauce (sugar, butter [milk], heavy cream, salt), salt.',
      allergens: ['Wheat', 'Milk', 'Eggs', 'Soy'],
    },
  },
  {
    id: 'xubie-cake',
    name: 'Xubie Cake',
    description: 'Our signature moist homemade cake with caramel glaze. The one everyone keeps coming back for.',
    sizes: [
      { label: 'Regular', price: 6,  netWeight: '4 oz', netWeightMetric: '113 g' },
      { label: 'Large',   price: 14, netWeight: '12 oz', netWeightMetric: '340 g' },
    ],
    image: '/images/xubie-cake.jpg',
    category: 'cakes',
    available: true,
    label: {
      productName: 'Xubie Cake',
      homekitchenStatement: 'Made in a Home Kitchen',
      permitNumber: BUSINESS.permitNumber,
      countyIssued: BUSINESS.county,
      businessName: BUSINESS.name,
      businessCity: BUSINESS.city,
      businessState: BUSINESS.state,
      businessZip: BUSINESS.zip,
      ingredients:
        'All-purpose flour (enriched wheat flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid]), sugar, unsalted butter (cream [milk], natural flavoring), eggs, whole milk, baking powder (sodium acid pyrophosphate, sodium bicarbonate, corn starch, monocalcium phosphate), pure vanilla extract, salt.',
      toppingIngredients:
        'Caramel glaze: sugar, butter (cream [milk]), heavy cream, pure vanilla extract, salt.',
      allergens: ['Wheat', 'Milk', 'Eggs'],
    },
  },
]

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category)
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}
