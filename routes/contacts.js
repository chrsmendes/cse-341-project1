const express = require('express');
const router = express.Router();

const contactsControllers = require('../controllers/contacts');

router.get('/', contactsControllers.getAll);

router.get('/:id', contactsControllers.getSingle);

router.post('/', contactsControllers.createContact);

router.put('/:id', contactsControllers.updateContact);

router.delete('/:id', contactsControllers.deleteContact);

module.exports = router;
