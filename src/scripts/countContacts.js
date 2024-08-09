import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

export const countContacts = async () => {
  const data = await fs.readFile(PATH_DB, { encoding: 'utf8' });
  const contacts = JSON.parse(data);
  return contacts.length;
};

console.log(await countContacts());