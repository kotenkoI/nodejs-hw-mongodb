import createHttpError from 'http-errors';
import * as ContactsService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContacts(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await ContactsService.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts.contacts, 
      page: contacts.page,
      perPage: contacts.perPage,
      totalItems: contacts.totalItems,
      totalPages: contacts.totalPages,
      hasNextPage: contacts.hasNextPage,
      hasPreviousPage: contacts.hasPreviousPage,
    },
  });
}

export async function getContactById(req, res, next) {
  const { contactsId } = req.params;
  const getContactById = await ContactsService.getOneContactById(
    contactsId,
    req.user._id,
  );
  if (getContactById === null) {
    return next(createHttpError(404, 'Contact not found!'));
  }
  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactsId}`,
    data: getContactById,
  });
}

export async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };

  const newContact = await ContactsService.createNewContact(contact);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}

export async function deleteContact(req, res, next) {
  const { contactsId } = req.params;
  const deleted = await ContactsService.deleteOldContact(
    contactsId,
    req.user._id,
  );
  if (deleted === null) {
    return next(createHttpError(404, 'Contact not found!'));
  }
  res.status(204).end();
}

export async function updateContact(req, res, next) {
  const { contactsId } = req.params;
  console.log(req.user._id);
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const updated = await ContactsService.updateOldContact(
    contactsId,
    contact,
    req.user._id,
  );
  console.log(updated);
  if (updated === null) {
    return next(createHttpError(404, 'Contact not found!'));
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
}