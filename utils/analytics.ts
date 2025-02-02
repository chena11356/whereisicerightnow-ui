import { getAnalytics } from "firebase/analytics";
import firebaseApp from "./firebaseConfig";

const analytics = getAnalytics(firebaseApp);
export default analytics;
