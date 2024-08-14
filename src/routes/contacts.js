const express = require('express');
const { getContacts } = require('../controllers/contactsController');

const router = express.Router();

router.get('/', getContacts);

module.exports = router;

const { getContactById } = require('../controllers/contactsController');

router.get('/:contactId', getContactById);
