import { Contact } from './contact';

export interface PhoneNumber {
  id?: number;
  number: string;
  contact?: Contact;
}
