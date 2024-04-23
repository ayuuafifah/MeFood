import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

// export const API = 'https://larav.fad.web.id';

export const SIZES = {
    // app dimensions
    width,
    height
};

export default SIZES;
export const ColorPrimary = '#FFFFFF';
export const ColorSecondary = '#31CB00';
export const TextColor = '#070D07';


//STATUS MAKANAN
export const STATUS_DITERIMA = 1;
export const STATUS_DIMASAK = 2;
export const STATUS_DIAMBIL = 3;
export const STATUS_SELESAI = 4;

//Status Pharmacy
export const STATUS_DIBELI = 1;
export const STATUS_DIBAWA = 2;


