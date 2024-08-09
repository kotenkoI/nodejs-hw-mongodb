import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  try {
    const data = await fs.readFile(PATH_DB, { encoding: 'utf8' });
    const fakeContact = createFakeContact();
    const contacts = JSON.parse(data);
    contacts.push(fakeContact);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, undefined, 2));
    console.log('Contact added successfully:', fakeContact);
  } catch (error) {
    console.log('Error adding contact:', error);
  }
};

addOneContact();