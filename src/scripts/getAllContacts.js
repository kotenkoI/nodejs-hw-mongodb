import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

export const getAllContacts = async () => {
  const data = await fs.readFile(PATH_DB, { encoding: 'utf8' });
  const contacts = JSON.parse(data);
  return contacts;
};

console.log(await getAllContacts());