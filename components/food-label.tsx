import { XUBIE_DATA } from "@/lib/data";

// Santa Clara County CFO Cottage Food Product Labels
// Compliant with the Federal Food, Drug, and Cosmetic Act (21 U.S.C. Sec. 343 et seq.)
// and California Department of Public Health Cottage Food Operation requirements.

export interface ProductLabel {
  productId: number;
  productName: string;
  netWeightOz: number;
  netWeightG: number;
  ingredients: string;
  fillingIngredients?: string;
  allergens: string[];
}

// Per-product label data
export const PRODUCT_LABELS: ProductLabel[] = [
  {
    productId: 1,
    productName: "Banana Pudding Cup",
    netWeightOz: 8,
    netWeightG: 226.8,
    ingredients:
      "Whole milk, sugar, banana (fresh), vanilla instant pudding mix (sugar, modified food starch, disodium phosphate, tetrasodium pyrophosphate, mono- and diglycerides, natural and artificial flavor, yellow 5, yellow 6), vanilla wafers (enriched flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid], sugar, palm oil, whey, salt, natural flavor), heavy whipping cream, vanilla extract",
    allergens: ["Wheat", "Milk", "Eggs", "Soy"],
  },
  {
    productId: 2,
    productName: "Xubie Cake Slice",
    netWeightOz: 4,
    netWeightG: 113.4,
    ingredients:
      "Enriched flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), sugar, butter (pasteurized cream, salt), eggs, whole milk, baking powder (monocalcium phosphate, sodium bicarbonate, corn starch), vanilla extract (vanilla bean extractives in water, alcohol 35%), salt",
    fillingIngredients:
      "Buttercream Frosting: powdered sugar (cane sugar, cornstarch), butter (pasteurized cream, salt), vanilla extract, whole milk",
    allergens: ["Wheat", "Milk", "Eggs"],
  },
  {
    productId: 3,
    productName: "Peach Cobbler Jar",
    netWeightOz: 10,
    netWeightG: 283.5,
    ingredients:
      "Peaches (fresh), sugar, brown sugar, enriched flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), butter (pasteurized cream, salt), cinnamon, nutmeg, vanilla extract (vanilla bean extractives in water, alcohol 35%), lemon juice, baking powder (monocalcium phosphate, sodium bicarbonate, corn starch), salt",
    allergens: ["Wheat", "Milk"],
  },
  {
    productId: 4,
    productName: "Cookies & Cream Pudding Cup",
    netWeightOz: 8,
    netWeightG: 226.8,
    ingredients:
      "Whole milk, sugar, chocolate sandwich cookies (enriched flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid], sugar, palm oil, cocoa [processed with alkali], high fructose corn syrup, leavening [baking soda, calcium phosphate], salt, soy lecithin, vanillin artificial flavor), vanilla instant pudding mix (sugar, modified food starch, disodium phosphate, tetrasodium pyrophosphate, mono- and diglycerides, natural and artificial flavor), heavy whipping cream",
    allergens: ["Wheat", "Milk", "Soy"],
  },
  {
    productId: 5,
    productName: "Hot Honey Plantain Crunch",
    netWeightOz: 4,
    netWeightG: 113.4,
    ingredients:
      "Plantains, honey, coconut oil, cayenne pepper, chili powder, smoked paprika, garlic powder, salt",
    allergens: [],
  },
  {
    productId: 6,
    productName: "Chili Lime Party Mix",
    netWeightOz: 6,
    netWeightG: 170.1,
    ingredients:
      "Corn tortilla chips (ground corn, vegetable oil [sunflower, safflower, and/or canola oil], salt), pretzels (enriched flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid], vegetable oil, salt, malt syrup), rice crackers (rice, vegetable oil, salt, soy sauce [water, soybeans, wheat, salt]), chili lime seasoning (chili powder, citric acid, sea salt, lime juice powder, garlic powder, cumin)",
    allergens: ["Wheat", "Soy"],
  },
  {
    productId: 7,
    productName: "Coconut Date Energy Bites",
    netWeightOz: 5,
    netWeightG: 141.7,
    ingredients:
      "Medjool dates (pitted), shredded unsweetened coconut, rolled oats (gluten-free certified oats), almond butter (dry roasted almonds), maple syrup, vanilla extract (vanilla bean extractives in water, alcohol 35%), chia seeds, sea salt",
    allergens: ["Tree Nuts (Almonds)"],
  },
  {
    productId: 8,
    productName: "Citrus Ginger Fruit Cup",
    netWeightOz: 10,
    netWeightG: 283.5,
    ingredients:
      "Strawberries (fresh), blueberries (fresh), mandarin orange segments (fresh), kiwi (fresh), pineapple (fresh), honey, fresh ginger (grated), lemon juice, lime juice, mint (fresh)",
    allergens: [],
  },
  {
    productId: 9,
    productName: "Lake Merritt Sunday Box",
    netWeightOz: 28,
    netWeightG: 793.8,
    ingredients:
      "Contains a combination of the following: whole milk, sugar, banana (fresh), vanilla instant pudding mix (sugar, modified food starch, disodium phosphate, tetrasodium pyrophosphate, mono- and diglycerides, natural and artificial flavor), vanilla wafers (enriched flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid], sugar, palm oil, whey, salt, natural flavor), heavy whipping cream, enriched flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), butter (pasteurized cream, salt), eggs, baking powder (monocalcium phosphate, sodium bicarbonate, corn starch), vanilla extract (vanilla bean extractives in water, alcohol 35%), salt",
    allergens: ["Wheat", "Milk", "Eggs", "Soy"],
  },
  {
    productId: 10,
    productName: "Vendor Table Treat Tray",
    netWeightOz: 48,
    netWeightG: 1360.8,
    ingredients:
      "Assorted cottage food products — see individual product labels for full ingredient and allergen information. Contents vary by order.",
    allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Almonds)"],
  },
  {
    productId: 11,
    productName: "Mini Dessert Flight",
    netWeightOz: 18,
    netWeightG: 510.3,
    ingredients:
      "Assorted cottage food products — see individual product labels for full ingredient and allergen information. Contents may include: whole milk, sugar, banana, vanilla instant pudding mix, vanilla wafers (wheat), heavy whipping cream, enriched flour (wheat), butter, eggs, baking powder, vanilla extract, salt.",
    allergens: ["Wheat", "Milk", "Eggs", "Soy"],
  },
  {
    productId: 12,
    productName: "Celebration Crowd Pack",
    netWeightOz: 64,
    netWeightG: 1814.4,
    ingredients:
      "Assorted cottage food products — see individual product labels for full ingredient and allergen information. Contents vary by custom order.",
    allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Almonds)"],
  },
];

interface FoodLabelProps {
  label: ProductLabel;
  compact?: boolean;
}

export function FoodLabel({ label, compact = false }: FoodLabelProps) {
  const business = XUBIE_DATA.company;

  return (
    <div
      className={`border-2 border-[var(--foreground)] bg-white text-[var(--foreground)] font-sans ${
        compact ? "p-4 rounded-xl text-xs" : "p-6 rounded-2xl text-sm"
      }`}
      role="region"
      aria-label={`Cottage food label for ${label.productName}`}
    >
      {/* Front panel — required elements */}
      <div className={`border-b-2 border-[var(--foreground)] pb-4 mb-4`}>
        <p
          className={`font-bold uppercase tracking-wide ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          MADE IN A HOME KITCHEN
        </p>
        <p className={`font-bold uppercase tracking-wide ${compact ? "text-[10px]" : "text-xs"}`}>
          Permit #: [PENDING — CFO Permit Application Submitted]
        </p>
        <p className={`font-bold uppercase tracking-wide ${compact ? "text-[10px]" : "text-xs"}`}>
          Issued in county: Santa Clara
        </p>

        <h3
          className={`font-serif font-bold mt-3 leading-tight ${
            compact ? "text-base" : "text-xl"
          }`}
        >
          {label.productName}
        </h3>
      </div>

      {/* Business info */}
      <div className={`mb-4 ${compact ? "text-[10px]" : "text-xs"}`}>
        <p className="font-semibold">{business.name}</p>
        <p>San Jose, CA 95128</p>
      </div>

      {/* Ingredients */}
      <div className="mb-3">
        <p className={`leading-relaxed ${compact ? "text-[10px]" : "text-xs"}`}>
          <span className="font-bold">Ingredients: </span>
          {label.ingredients}
        </p>
        {label.fillingIngredients && (
          <p className={`leading-relaxed mt-1 ${compact ? "text-[10px]" : "text-xs"}`}>
            <span className="font-bold">Filling/Topping Ingredients: </span>
            {label.fillingIngredients}
          </p>
        )}
      </div>

      {/* Allergens */}
      {label.allergens.length > 0 && (
        <div className="mb-3">
          <p className={`font-bold ${compact ? "text-[10px]" : "text-xs"}`}>
            Contains:{" "}
            <span className="font-normal">{label.allergens.join(", ")}</span>
          </p>
        </div>
      )}

      {/* Net weight */}
      <div>
        <p className={`font-bold ${compact ? "text-[10px]" : "text-xs"}`}>
          Net Wt.{" "}
          <span className="font-normal">
            {label.netWeightOz} oz ({label.netWeightG}g)
          </span>
        </p>
      </div>
    </div>
  );
}

export function FoodLabelGrid() {
  return (
    <section id="food-labels" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            Cottage Food Compliance
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            Product Labels
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-2xl leading-relaxed">
            All Xubie Snacks products are prepared under a California Cottage
            Food Operation (CFO) permit with Santa Clara County Department of
            Environmental Health. Labels comply with the Federal Food, Drug, and
            Cosmetic Act (21 U.S.C. Sec. 343 et seq.).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_LABELS.map((label) => (
            <FoodLabel key={label.productId} label={label} compact={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
