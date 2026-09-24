// Canned sample data for demo mode. Nutrition figures are rough per-100 g
// values for illustration only; recipes are simple home-cooking ideas written
// for the demo, not taken from Spoonacular.

// [calories kcal, fat g, saturated fat g, sugar g, protein g] per 100 g
export const INGREDIENTS = [
  { id: 9003, name: "apple", emoji: "🍎", aisle: "Produce", cat: ["fruit"], n: [52, 0.2, 0, 10.4, 0.3] },
  { id: 9040, name: "banana", emoji: "🍌", aisle: "Produce", cat: ["tropical fruit", "fruit"], n: [89, 0.3, 0.1, 12.2, 1.1] },
  { id: 10011457, name: "spinach", emoji: "🥬", aisle: "Produce", cat: ["leafy greens", "vegetable"], n: [23, 0.4, 0.1, 0.4, 2.9] },
  { id: 11529, name: "tomato", emoji: "🍅", aisle: "Produce", cat: ["vegetable"], n: [18, 0.2, 0, 2.6, 0.9] },
  { id: 11282, name: "onion", emoji: "🧅", aisle: "Produce", cat: ["allium", "vegetable"], n: [40, 0.1, 0, 4.2, 1.1] },
  { id: 11215, name: "garlic", emoji: "🧄", aisle: "Produce", cat: ["allium", "vegetable"], n: [149, 0.5, 0.1, 1, 6.4] },
  { id: 11124, name: "carrot", emoji: "🥕", aisle: "Produce", cat: ["root vegetable", "vegetable"], n: [41, 0.2, 0, 4.7, 0.9] },
  { id: 11352, name: "potato", emoji: "🥔", aisle: "Produce", cat: ["root vegetable", "vegetable"], n: [77, 0.1, 0, 0.8, 2] },
  { id: 11507, name: "sweet potato", emoji: "🍠", aisle: "Produce", cat: ["root vegetable", "vegetable"], n: [86, 0.1, 0, 4.2, 1.6] },
  { id: 10211821, name: "bell pepper", emoji: "🫑", aisle: "Produce", cat: ["vegetable"], n: [31, 0.3, 0, 4.2, 1] },
  { id: 11090, name: "broccoli", emoji: "🥦", aisle: "Produce", cat: ["cruciferous", "vegetable"], n: [34, 0.4, 0, 1.7, 2.8] },
  { id: 11135, name: "cauliflower", emoji: "🥦", aisle: "Produce", cat: ["cruciferous", "vegetable"], n: [25, 0.3, 0.1, 1.9, 1.9] },
  { id: 11260, name: "mushroom", emoji: "🍄", aisle: "Produce", cat: ["fungi", "vegetable"], n: [22, 0.3, 0, 2, 3.1] },
  { id: 11477, name: "zucchini", emoji: "🥒", aisle: "Produce", cat: ["squash", "vegetable"], n: [17, 0.3, 0.1, 2.5, 1.2] },
  { id: 11206, name: "cucumber", emoji: "🥒", aisle: "Produce", cat: ["vegetable"], n: [15, 0.1, 0, 1.7, 0.7] },
  { id: 9150, name: "lemon", emoji: "🍋", aisle: "Produce", cat: ["citrus", "fruit"], n: [29, 0.3, 0, 2.5, 1.1] },
  { id: 9159, name: "lime", emoji: "🍋", aisle: "Produce", cat: ["citrus", "fruit"], n: [30, 0.2, 0, 1.7, 0.7] },
  { id: 9037, name: "avocado", emoji: "🥑", aisle: "Produce", cat: ["fruit"], n: [160, 14.7, 2.1, 0.7, 2] },
  { id: 9316, name: "strawberries", emoji: "🍓", aisle: "Produce", cat: ["berries", "fruit"], n: [32, 0.3, 0, 4.9, 0.7] },
  { id: 9050, name: "blueberries", emoji: "🫐", aisle: "Produce", cat: ["berries", "fruit"], n: [57, 0.3, 0, 10, 0.7] },
  { id: 11216, name: "ginger", emoji: "🫚", aisle: "Produce", cat: ["spice", "root"], n: [80, 0.8, 0.2, 1.7, 1.8] },
  { id: 2044, name: "basil", emoji: "🌿", aisle: "Produce", cat: ["herb"], n: [23, 0.6, 0, 0.3, 3.2] },
  { id: 1123, name: "egg", emoji: "🥚", aisle: "Milk, Eggs, Other Dairy", cat: ["egg"], n: [143, 9.5, 3.1, 0.4, 12.6] },
  { id: 1077, name: "milk", emoji: "🥛", aisle: "Milk, Eggs, Other Dairy", cat: ["dairy"], n: [61, 3.3, 1.9, 5.1, 3.2] },
  { id: 1001, name: "butter", emoji: "🧈", aisle: "Milk, Eggs, Other Dairy", cat: ["dairy", "fat"], n: [717, 81, 51, 0.1, 0.9] },
  { id: 1009, name: "cheddar cheese", emoji: "🧀", aisle: "Cheese", cat: ["cheese", "dairy"], n: [403, 33, 21, 0.5, 25] },
  { id: 1033, name: "parmesan", emoji: "🧀", aisle: "Cheese", cat: ["cheese", "dairy"], n: [431, 29, 17, 0.9, 38] },
  { id: 1256, name: "greek yogurt", emoji: "🥣", aisle: "Milk, Eggs, Other Dairy", cat: ["yogurt", "dairy"], n: [59, 0.4, 0.1, 3.2, 10] },
  { id: 5062, name: "chicken breast", emoji: "🍗", aisle: "Meat", cat: ["poultry", "meat"], n: [165, 3.6, 1, 0, 31] },
  { id: 10023572, name: "ground beef", emoji: "🥩", aisle: "Meat", cat: ["beef", "meat"], n: [254, 17, 6.7, 0, 26] },
  { id: 10123, name: "bacon", emoji: "🥓", aisle: "Meat", cat: ["pork", "meat"], n: [541, 42, 14, 1.3, 37] },
  { id: 15076, name: "salmon", emoji: "🐟", aisle: "Seafood", cat: ["fish", "seafood"], n: [208, 13, 3.1, 0, 20] },
  { id: 16213, name: "tofu", emoji: "⬜", aisle: "Refrigerated", cat: ["soy", "protein"], n: [76, 4.8, 0.7, 0.6, 8] },
  { id: 20444, name: "rice", emoji: "🍚", aisle: "Pasta and Rice", cat: ["grain"], n: [130, 0.3, 0.1, 0.1, 2.7] },
  { id: 20420, name: "pasta", emoji: "🍝", aisle: "Pasta and Rice", cat: ["grain"], n: [131, 1.1, 0.2, 0.6, 5] },
  { id: 18064, name: "bread", emoji: "🍞", aisle: "Bakery/Bread", cat: ["bakery"], n: [265, 3.2, 0.7, 5, 9] },
  { id: 20081, name: "flour", emoji: "🌾", aisle: "Baking", cat: ["baking"], n: [364, 1, 0.2, 0.3, 10] },
  { id: 8120, name: "oats", emoji: "🌾", aisle: "Cereal", cat: ["grain", "cereal"], n: [389, 6.9, 1.2, 1, 16.9] },
  { id: 19335, name: "sugar", emoji: "🍬", aisle: "Baking", cat: ["sweetener"], n: [387, 0, 0, 100, 0] },
  { id: 19296, name: "honey", emoji: "🍯", aisle: "Nut butters, Jams, and Honey", cat: ["sweetener"], n: [304, 0, 0, 82, 0.3] },
  { id: 4053, name: "olive oil", emoji: "🫒", aisle: "Oil, Vinegar, Salad Dressing", cat: ["oil", "fat"], n: [884, 100, 14, 0, 0] },
  { id: 2010, name: "cinnamon", emoji: "🟤", aisle: "Spices and Seasonings", cat: ["spice"], n: [247, 1.2, 0.3, 2.2, 4] },
  { id: 16124, name: "soy sauce", emoji: "🍶", aisle: "Ethnic Foods", cat: ["condiment"], n: [53, 0.6, 0.1, 0.4, 8.1] },
  { id: 16057, name: "chickpeas", emoji: "🫘", aisle: "Canned and Jarred", cat: ["legume"], n: [164, 2.6, 0.3, 4.8, 8.9] },
  { id: 12118, name: "coconut milk", emoji: "🥥", aisle: "Ethnic Foods", cat: ["plant milk"], n: [230, 24, 21, 3.3, 2.3] },
];

export const DAILY_VALUES = { Calories: 2000, Fat: 70, "Saturated Fat": 20, Sugar: 90, Protein: 50 };

export const byName = Object.fromEntries(INGREDIENTS.map((i) => [i.name, i]));
export const byId = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]));

const r = (id, title, emoji, hue, minutes, servings, ingredients, summary, steps) => ({
  id, title, emoji, hue, readyInMinutes: minutes, servings,
  ingredients: ingredients.map(([name, original]) => ({ name, original })),
  summary, steps,
});

export const RECIPES = [
  r(1001, "Spinach & Mushroom Omelette", "🍳", 48, 15, 1,
    [["egg", "3 eggs"], ["spinach", "a big handful of spinach"], ["mushroom", "4 mushrooms, sliced"], ["cheddar cheese", "30 g grated cheddar"], ["butter", "1 tsp butter"], ["onion", "1/4 onion, finely diced"]],
    "A fast way to use up <b>spinach that is starting to wilt</b>. Ready in 15 minutes and works with almost any leftover veg.",
    ["Soften the onion and mushrooms in butter.", "Add the spinach and let it wilt.", "Pour over the beaten eggs, scatter cheese, fold and serve."]),
  r(1002, "Banana Oat Pancakes", "🥞", 38, 20, 2,
    [["banana", "2 very ripe bananas"], ["oats", "100 g oats"], ["egg", "2 eggs"], ["milk", "100 ml milk"], ["cinnamon", "1/2 tsp cinnamon"], ["honey", "honey to serve"]],
    "The <b>browner the bananas, the better</b>. Blitz everything into a batter and fry small pancakes.",
    ["Blend bananas, oats, eggs, milk and cinnamon.", "Rest 5 minutes while the pan heats.", "Fry spoonfuls for 2 minutes a side and drizzle with honey."]),
  r(1003, "Tomato Basil Pasta", "🍝", 8, 20, 2,
    [["pasta", "200 g pasta"], ["tomato", "4 soft tomatoes, chopped"], ["garlic", "2 cloves garlic"], ["basil", "a handful of basil"], ["olive oil", "2 tbsp olive oil"], ["parmesan", "parmesan to serve"]],
    "Soft tomatoes collapse into a <b>quick fresh sauce</b> while the pasta cooks.",
    ["Cook the pasta.", "Fry garlic in olive oil, add tomatoes and simmer 8 minutes.", "Toss with pasta, basil and parmesan."]),
  r(1004, "Veggie Fried Rice", "🍚", 30, 15, 2,
    [["rice", "2 cups cooked rice (day-old is best)"], ["egg", "2 eggs"], ["carrot", "1 carrot, diced"], ["onion", "1 onion, diced"], ["bell pepper", "1 bell pepper, diced"], ["soy sauce", "2 tbsp soy sauce"], ["garlic", "1 clove garlic"]],
    "The classic <b>leftover rice</b> rescue. Throw in whatever vegetables need using.",
    ["Stir-fry onion, garlic, carrot and pepper on high heat.", "Push aside, scramble the eggs.", "Add the rice and soy sauce and fry until hot."]),
  r(1005, "Apple Cinnamon Crumble", "🥧", 20, 45, 4,
    [["apple", "4 apples, sliced"], ["oats", "60 g oats"], ["flour", "80 g flour"], ["butter", "70 g cold butter"], ["sugar", "60 g sugar"], ["cinnamon", "1 tsp cinnamon"]],
    "Bruised or floury apples are <b>perfect for baking</b>. Nobody will know.",
    ["Toss apples with cinnamon and half the sugar in a dish.", "Rub butter into flour, oats and remaining sugar.", "Scatter over and bake at 190 C for 30 minutes."]),
  r(1006, "Chickpea Coconut Curry", "🍛", 42, 30, 4,
    [["chickpeas", "1 tin chickpeas"], ["coconut milk", "1 tin coconut milk"], ["onion", "1 onion"], ["garlic", "2 cloves garlic"], ["ginger", "a thumb of ginger"], ["tomato", "2 tomatoes"], ["spinach", "2 handfuls spinach"], ["rice", "rice to serve"]],
    "A store-cupboard curry that happily <b>absorbs tired greens</b>.",
    ["Fry onion, garlic and ginger until soft.", "Add tomatoes, chickpeas and coconut milk; simmer 15 minutes.", "Stir in spinach and serve with rice."]),
  r(1007, "Lemon Garlic Salmon", "🐟", 12, 25, 2,
    [["salmon", "2 salmon fillets"], ["lemon", "1 lemon"], ["garlic", "2 cloves garlic"], ["butter", "1 tbsp butter"], ["broccoli", "1 head broccoli"]],
    "One tray, <b>25 minutes</b>, and the broccoli roasts in the salmon juices.",
    ["Put salmon and broccoli florets on a tray.", "Top with garlic butter and lemon slices.", "Roast at 200 C for 15 minutes."]),
  r(1008, "Loaded Sweet Potato", "🍠", 26, 40, 2,
    [["sweet potato", "2 sweet potatoes"], ["greek yogurt", "4 tbsp greek yogurt"], ["chickpeas", "1/2 tin chickpeas"], ["avocado", "1 avocado"], ["lime", "1 lime"]],
    "Crispy chickpeas and a <b>ripe avocado</b> on a baked sweet potato.",
    ["Bake the sweet potatoes for 35 minutes.", "Roast the chickpeas alongside.", "Split and top with yogurt, avocado, chickpeas and lime."]),
  r(1009, "Berry Yogurt Bowl", "🫐", 270, 5, 1,
    [["greek yogurt", "200 g greek yogurt"], ["blueberries", "a handful of blueberries"], ["strawberries", "a handful of strawberries"], ["honey", "1 tsp honey"], ["oats", "2 tbsp oats"]],
    "Soft berries that won't last another day go <b>straight into breakfast</b>.",
    ["Spoon yogurt into a bowl.", "Top with berries and oats.", "Drizzle with honey."]),
  r(1010, "Chicken Stir-fry", "🥢", 16, 20, 2,
    [["chicken breast", "2 chicken breasts, sliced"], ["bell pepper", "1 bell pepper"], ["broccoli", "1/2 head broccoli"], ["soy sauce", "3 tbsp soy sauce"], ["ginger", "a thumb of ginger"], ["garlic", "2 cloves garlic"], ["rice", "rice to serve"]],
    "A <b>clear-out-the-fridge</b> stir-fry. Swap vegetables freely.",
    ["Sear the chicken until golden.", "Add garlic, ginger and vegetables for 4 minutes.", "Splash in soy sauce and serve over rice."]),
  r(1011, "Smashed Avocado Toast", "🥑", 90, 10, 1,
    [["bread", "2 slices bread"], ["avocado", "1 avocado"], ["lime", "1/2 lime"], ["tomato", "1 tomato"], ["onion", "a little red onion"]],
    "Slightly stale bread <b>toasts better</b> than fresh.",
    ["Toast the bread.", "Smash avocado with lime and salt.", "Pile on with chopped tomato and onion."]),
  r(1012, "Cauliflower Cheese", "🧀", 45, 40, 4,
    [["cauliflower", "1 cauliflower"], ["cheddar cheese", "120 g cheddar"], ["milk", "500 ml milk"], ["butter", "40 g butter"], ["flour", "40 g flour"]],
    "Turns a whole cauliflower and the <b>end of the milk</b> into dinner.",
    ["Boil cauliflower florets for 5 minutes.", "Make a roux with butter and flour, whisk in milk, then cheese.", "Pour over and bake at 200 C for 20 minutes."]),
];

const day = 24 * 60 * 60 * 1000;
const inDays = (d) => new Date(Date.now() + d * day).toISOString();

export function seedState() {
  let n = 1;
  const inv = (name, days) => {
    const i = byName[name];
    return { id: `inv-${n++}`, foodID: i.id, name: i.name, emoji: i.emoji, expiryDate: days == null ? null : inDays(days) };
  };
  const shop = (name, quantity) => {
    const i = byName[name];
    return { id: `shop-${n++}`, foodID: i.id, name: i.name, emoji: i.emoji, quantity };
  };
  return {
    inventory: [
      inv("spinach", 1), inv("banana", 2), inv("egg", 5), inv("milk", -1),
      inv("tomato", 3), inv("cheddar cheese", 9), inv("onion", null),
      inv("garlic", null), inv("rice", null), inv("pasta", null),
    ],
    shopping: [shop("oats", 1), shop("basil", 1), shop("olive oil", 1), shop("mushroom", 2)],
    nextId: n,
  };
}
