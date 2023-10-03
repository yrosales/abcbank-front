import { Address } from "./address";
import { PhoneNumber } from "./phoneNumber";

export interface Contact {
  id?: number;
  firstName: string;
  secondName: string;
  dateOfBirth: Date;
  personalPhoto: BinaryType;
  phoneNumbers?: PhoneNumber[];
  addresses?: Address[];
}

export interface ActionContact {
  action: string;
  contact: Contact;
}
