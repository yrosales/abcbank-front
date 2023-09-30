export interface Contact {
  id?: number;
  firstName: string;
  secondName: string;
  addresses: string;
  dateOfBirth: Date;
  phoneNumbers: string;
  personalPhoto: BinaryType;
}

export interface ActionContact {
  action: string;
  contact: Contact;
}
