import { Contact } from "./contact";

export interface Address {
    id?: number;
    address: string,
    contact?: Contact;
}