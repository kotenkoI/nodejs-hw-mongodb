import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

export const removeAllContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, { encoding: 'utf8' });
    const contacts = JSON.parse(data);
    contacts.splice(0, contacts.length);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, undefined, 2));
    console.log('All contacts have been removed.');
  } catch (error) {
    console.error('Error removing contacts:', error);
  }
};

removeAllContacts();