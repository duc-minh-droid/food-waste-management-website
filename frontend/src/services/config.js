// Demo mode runs the whole app in the browser with canned sample data
// (no Firebase project, no Spoonacular key). It is on unless the live
// credentials are present and REACT_APP_DEMO_MODE is not "true".
const hasLiveConfig =
  Boolean(process.env.REACT_APP_FIREBASE_API_KEY) &&
  Boolean(process.env.REACT_APP_SPOONACULAR_KEY);

export const DEMO_MODE =
  process.env.REACT_APP_DEMO_MODE === "true" || !hasLiveConfig;
