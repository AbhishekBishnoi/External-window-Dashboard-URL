import { createStore } from "redux";

import reducer from "../reducer.jsx";

class StoreService {
}
StoreService.STORE = createStore(reducer);
export default StoreService;