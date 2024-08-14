async function getContactById(req, res) {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (contact) {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getContacts, getContactById };
