import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    const data = await fs.readFile(PATH_DB, { encoding: 'utf8' });
    const contacts = JSON.parse(data);
    for (let i = 0; i < number; i++) {
      const fakeContact = createFakeContact();
      contacts.push(fakeContact);
    }
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, undefined, 2));
    console.log(`Successfully added ${number} contacts.`);
  } catch (error) {
    console.error('Error generating contacts:', error);
  }
};

generateContacts(5);