import Home from "./Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Auth from "./Auth";
import Splash from "./Splash";
import ForgotPassword from "./Auth/ForgotPassword";
import Activity from "./Activity";
import Promo from "./Promo";
import Profile from "./Profile";
import UpdateProfile from "./Profile/UpdateProfile";
import Language from "./Profile/Language";
import PaymentMethod from "./Profile/PaymentMethod";
import Address from "./Profile/Address";
import AddAddress from "./Profile/Address/AddAddress";
import Notification from "./Home/Notification";
import Message from "./Home/Message";
import SearchFood from "./Home/FoodMenu/SearchFood";
import FoodMenu from "./Home/FoodMenu";
import FoodTransaction from "./Home/FoodMenu/FoodTransaction";
import FavoriteFood from "./Home/FoodMenu/FavoriteFood";
import Resto from "./Home/FoodMenu/Resto";
import FoodList from "./Home/FoodMenu/Resto/FoodList";
import ConfirmFoodOrder from "./Home/FoodMenu/Resto/FoodList/ConfirmFoodOrder";
import ConfirmPharmOrder from "./Home/PharmacyMenu/Apotek/Medicine/ConfirmPharmOrder";
import FoodRating from "./Home/FoodMenu/FoodTransaction/FoodRating";
import SelectAddress from "./Home/FoodMenu/Resto/FoodList/ConfirmFoodOrder/SelectAddress";
import PharmacyMenu from "./Home/PharmacyMenu";
import Apotek from "./Home/PharmacyMenu/Apotek";
import Medicine from "./Home/PharmacyMenu/Apotek/Medicine";
import DeliveryMenu from "./Home/DeliveryMenu";
import DeliveryDetail from "./Home/DeliveryMenu/DeliveryDetail";
import ConfirmDeliveryOrder from "./Home/DeliveryMenu/DeliveryDetail/ConfirmDeliveryOrder";
import DetailTransactionFood from "./Home/FoodMenu/FoodTransaction/DetailTransactionFood";
import UpdateAddress from "./Profile/Address/UpdateAddress";
import MessageDetail from "./Home/Message/MessageDetail";
import DetailTransactionPharmacy from "./Home/PharmacyMenu/PharmacyTransaction/DetailTransactionPharmacy";
import DetailTransactionDelivery from "./Home/DeliveryMenu/DeliveryTransaction/DetailTransactionDelivery";
import PickupDetail from "./Home/DeliveryMenu/DeliveryDetail/PickupDetail";
import TransportMenu from "./Home/TransportMenu";
import AddDestination from "./Home/TransportMenu/AddDestination";
import ConfirmTransportOrder from "./Home/TransportMenu/AddDestination/ConfirmTransportOrder";
import DetailTransactionTransport from "./Home/TransportMenu/TransportTransaction/DetailTransactionTransport";
import DeliveryRating from "./Home/DeliveryMenu/DeliveryTransaction/DeliveryRating";
import TransportRating from "./Home/TransportMenu/TransportTransaction/TransportRating";
import PharmacyRating from "./Home/PharmacyMenu/PharmacyTransaction/PharmacyRating";



export {
    Splash, Auth, Home, Login, Signup, ForgotPassword, Activity, Promo, Profile, UpdateProfile, Language, 
    PaymentMethod, Address, AddAddress, Message, Notification,SearchFood, FoodMenu, FavoriteFood, FoodTransaction, 
    Resto, FoodList, ConfirmFoodOrder, FoodRating, SelectAddress, PharmacyMenu, Apotek, Medicine, ConfirmPharmOrder,
    DeliveryMenu, DeliveryDetail, ConfirmDeliveryOrder, DetailTransactionFood, UpdateAddress, MessageDetail, DetailTransactionPharmacy,
    DetailTransactionDelivery, PickupDetail, TransportMenu, AddDestination, ConfirmTransportOrder,DetailTransactionTransport, DeliveryRating,
    TransportRating, PharmacyRating
};