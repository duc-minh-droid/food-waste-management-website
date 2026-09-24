// Demo backend: everything lives in the browser (localStorage) and the
// ingredient / recipe "APIs" answer from canned data in demoData.js.
import { INGREDIENTS, RECIPES, byId, byName, seedState } from "./demoData";

const KEY = "wasteless-demo-v1";
const DEMO_USER = { uid: "demo", displayName: "Demo cook" };
const listeners = new Set();
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* storage unavailable: fall through to seed */ }
  return seedState();
}

let state = load();

function commit(next) {
  state = next;
  try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  listeners.forEach((fn) => fn(state));
}

function watch(select, cb) {
  const fn = (s) => cb(select(s));
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

const newId = (prefix) => {
  const id = `${prefix}-${state.nextId}`;
  state = { ...state, nextId: state.nextId + 1 };
  return id;
};

const toItem = (ingredient) => {
  const known = byId[ingredient.id] || byName[ingredient.name] || {};
  return { foodID: known.id ?? ingredient.id, name: known.name ?? ingredient.name, emoji: known.emoji ?? "🥫" };
};

export const demo = {
  isDemo: true,

  onAuthChange(cb) { cb(DEMO_USER); return () => {}; },
  signIn() {},
  signOut() {},
  reset() { commit(seedState()); },

  subscribeInventory(cb) {
    return watch((s) => s.inventory.map((i) => ({ ...i, expiryDate: i.expiryDate ? new Date(i.expiryDate) : null })), cb);
  },
  async addToInventory(ingredient) {
    const item = toItem(ingredient);
    if (state.inventory.some((i) => i.foodID === item.foodID)) return false;
    const id = newId("inv");
    commit({ ...state, inventory: [...state.inventory, { id, ...item, expiryDate: null }] });
    return true;
  },
  async removeFromInventory(id) {
    commit({ ...state, inventory: state.inventory.filter((i) => i.id !== id) });
  },
  async setExpiryDate(id, date) {
    commit({ ...state, inventory: state.inventory.map((i) => (i.id === id ? { ...i, expiryDate: date ? date.toISOString() : null } : i)) });
  },

  subscribeShopping(cb) { return watch((s) => s.shopping, cb); },
  async addToShopping(ingredient, quantity = 1) {
    const item = toItem(ingredient);
    if (state.shopping.some((i) => i.foodID === item.foodID)) return false;
    const id = newId("shop");
    commit({ ...state, shopping: [...state.shopping, { id, ...item, quantity }] });
    return true;
  },
  async removeFromShopping(id) {
    commit({ ...state, shopping: state.shopping.filter((i) => i.id !== id) });
  },
  async setShoppingQuantity(id, quantity) {
    commit({ ...state, shopping: state.shopping.map((i) => (i.id === id ? { ...i, quantity } : i)) });
  },

  async searchIngredients(q) {
    await delay(120);
    const needle = q.trim().toLowerCase();
    return INGREDIENTS
      .filter((i) => i.name.includes(needle))
      .sort((a, b) => a.name.indexOf(needle) - b.name.indexOf(needle))
      .slice(0, 8)
      .map((i) => ({ id: i.id, name: i.name, emoji: i.emoji, aisle: i.aisle }));
  },

  async getIngredientInfo(foodID) {
    await delay(250);
    const i = byId[foodID];
    if (!i) return null;
    const [cal, fat, sat, sugar, protein] = i.n;
    return {
      per: "100 g",
      categoryPath: i.cat,
      aisle: i.aisle,
      nutrients: [
        { name: "Calories", amount: cal, unit: "kcal" },
        { name: "Fat", amount: fat, unit: "g" },
        { name: "Saturated Fat", amount: sat, unit: "g" },
        { name: "Sugar", amount: sugar, unit: "g" },
        { name: "Protein", amount: protein, unit: "g" },
      ],
    };
  },

  // Same idea as Spoonacular's findByIngredients with ranking=1: maximise the
  // ingredients you already have, then minimise the ones you are missing.
  async findRecipes(inventory) {
    await delay(350);
    const have = new Set(inventory.map((i) => i.name));
    return RECIPES
      .map((rec) => {
        const used = rec.ingredients.filter((g) => have.has(g.name));
        const missed = rec.ingredients.filter((g) => !have.has(g.name));
        return { ...rec, usedIngredients: used, missedIngredients: missed };
      })
      .filter((rec) => rec.usedIngredients.length > 0)
      .sort((a, b) => b.usedIngredients.length - a.usedIngredients.length || a.missedIngredients.length - b.missedIngredients.length)
      .slice(0, 6);
  },

  async getRecipe(id) {
    await delay(200);
    const rec = RECIPES.find((x) => String(x.id) === String(id));
    if (!rec) return null;
    return {
      ...rec,
      extendedIngredients: rec.ingredients.map((g) => ({ ...g, id: byName[g.name]?.id, emoji: byName[g.name]?.emoji })),
      sourceUrl: null,
    };
  },
};
