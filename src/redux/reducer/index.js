import {combineReducers} from "redux";
import { userReducer } from "./userReducer";
import {productReducer} from "./ProductReducer";
import {cartReducer} from "./cartReducer"

export default combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer
})