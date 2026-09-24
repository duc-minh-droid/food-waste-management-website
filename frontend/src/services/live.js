// Live backend: Firebase Auth + Firestore for user data, Spoonacular for
// ingredient search, nutrition and recipes. This is the original hackathon
// data flow, moved out of the components into one place.
import {
  collection, addDoc, deleteDoc, doc, getDocs, onSnapshot, query,
  serverTimestamp, updateDoc, where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebase, signInWithGoogle, signOutUser } from "../firebase";

const SPOON = "https://api.spoonacular.com";
const key = () => process.env.REACT_APP_SPOONACULAR_KEY;
const spoon = (path, params = {}) => {
  const qs = new URLSearchParams({ ...params, apiKey: key() });
  return fetch(`${SPOON}${path}?${qs}`).then((res) => {
    if (!res.ok) throw new Error(`Spoonacular ${res.status}`);
    return res.json();
  });
};

const toDate = (v) => (v && typeof v.toDate === "function" ? v.toDate() : v ? new Date(v) : null);

// Subscribe to a user-scoped collection, re-subscribing when auth changes.
function subscribeUserCollection(name, map, cb) {
  const { auth, db } = getFirebase();
  let unsubData = () => {};
  const unsubAuth = onAuthStateChanged(auth, (user) => {
    unsubData();
    if (!user) { cb([]); return; }
    unsubData = onSnapshot(query(collection(db, name), where("userID", "==", user.uid)), (snap) =>
      cb(snap.docs.map((d) => map({ ...d.data(), id: d.id })))
    );
  });
  return () => { unsubData(); unsubAuth(); };
}

async function existsFor(name, foodID) {
  const { auth, db } = getFirebase();
  if (!auth.currentUser) return false;
  const snap = await getDocs(query(collection(db, name), where("foodID", "==", foodID), where("userID", "==", auth.currentUser.uid)));
  return !snap.empty;
}

function requireUser() {
  const user = getFirebase().auth.currentUser;
  if (!user) throw new Error("Please log in first");
  return user;
}

export const live = {
  isDemo: false,

  onAuthChange(cb) { return onAuthStateChanged(getFirebase().auth, cb); },
  signIn: signInWithGoogle,
  signOut: signOutUser,
  reset() {},

  subscribeInventory(cb) {
    return subscribeUserCollection("inventory", (d) => ({ ...d, expiryDate: toDate(d.expiryDate) }), cb);
  },
  async addToInventory(ingredient) {
    const user = requireUser();
    if (ingredient.id && (await existsFor("inventory", ingredient.id))) return false;
    await addDoc(collection(getFirebase().db, "inventory"), {
      image: ingredient.image ?? null,
      name: ingredient.name,
      userID: user.uid,
      serverTimeStamp: serverTimestamp(),
      foodID: ingredient.id,
    });
    return true;
  },
  removeFromInventory(id) { return deleteDoc(doc(getFirebase().db, "inventory", id)); },
  setExpiryDate(id, date) { return updateDoc(doc(getFirebase().db, "inventory", id), { expiryDate: date }); },

  subscribeShopping(cb) { return subscribeUserCollection("shoppingList", (d) => d, cb); },
  async addToShopping(ingredient, quantity = 1) {
    const user = requireUser();
    if (await existsFor("shoppingList", ingredient.id)) return false;
    await addDoc(collection(getFirebase().db, "shoppingList"), {
      foodID: ingredient.id,
      image: ingredient.image ?? null,
      name: ingredient.name,
      userID: user.uid,
      quantity,
    });
    return true;
  },
  removeFromShopping(id) { return deleteDoc(doc(getFirebase().db, "shoppingList", id)); },
  setShoppingQuantity(id, quantity) { return updateDoc(doc(getFirebase().db, "shoppingList", id), { quantity }); },

  async searchIngredients(q) {
    const data = await spoon("/food/ingredients/search", { query: q, number: 10 });
    return data.results || [];
  },
  async getIngredientInfo(foodID) {
    const data = await spoon(`/food/ingredients/${foodID}/information`, { amount: 100, unit: "grams" });
    const wanted = ["Calories", "Fat", "Saturated Fat", "Sugar", "Protein"];
    return {
      per: "100 g",
      categoryPath: data.categoryPath || [],
      aisle: data.aisle,
      nutrients: wanted
        .map((name) => (data.nutrition?.nutrients || []).find((n) => n.name === name))
        .filter(Boolean),
    };
  },
  async findRecipes(inventory) {
    if (!inventory.length) return [];
    return spoon("/recipes/findByIngredients", {
      ingredients: inventory.map((i) => i.name).join(","),
      number: 6,
      ranking: 1,
    });
  },
  async getRecipe(id) {
    const data = await spoon(`/recipes/${id}/information`, { includeNutrition: false });
    const steps = (data.analyzedInstructions?.[0]?.steps || []).map((s) => s.step);
    return { ...data, steps, sourceUrl: data.spoonacularSourceUrl || data.sourceUrl };
  },
};
