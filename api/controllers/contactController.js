const {User, Contact} = require("../data");

module.exports = {
    async newContact(req, res) {
        const {firstName, lastName, phone} = req.body;
        const email = req.decoded
        try {
            const foundUser = await User.findOne({email});
            if (!foundUser) {
                return res
                    .status(401)
                    .json({error: "Need to be logged in to create a contact"});
            }
            if (!firstName) {
                return res
                    .status(400)
                    .json({error: "First name is required"});
            }
            if (!lastName) {
                return res
                    .status(400)
                    .json({error: "Last name is required"});
            }
            if (!phone) {
                return res
                    .status(400)
                    .json({error: "Phone is required"});
            }
            const contact = await Contact.create({
                user: foundUser._id,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            });
            contact.save();
            return res.status(200).json({contact});

        } catch (err) {
            return res
                .status(401)
                .json({error: "Need to be logged in to create a contact"});
        }
    },

    async getContacts(req, res) {
        
        let email = req.decoded;
        try {
            const foundUser = await User.find({email: email});
            const contactsList = await Contact.find({user: foundUser})
                .sort({firstName: 1})

            if (contactsList == null) {
                return res.status(400).json({message: "No contacts"});
            }
            return res.status(200).json({contactsList});
        } catch (error) {
            return res
                .status(500)
                .json({error: 'Something happened ' + error});
        }
    },

    async getContact(req, res) {
        const contactID = req.params;
        try {
            
            console.log(contactID);
            const foundContact = await Contact.findById(contactID);
            console.log(foundContact);
            if (foundContact == null) {
                return res.status(404).json({message: `No contact with ID: ${contactID}`});
            }
            return res.status(200).json({foundContact});
        } catch (error) {
            return res
                .status(500)
                .json({error: 'Something happened ' + error});
        }
    },

    async deleteContact(req, res) {
        const contactID = req.params;
        console.log('hol',contactID)
        try {
            const foundContact = await Contact.findById(contactID);

            if (foundContact == null) {
                return res.status(404).json({message: `No contact with ID: ${contactID}`});
            }
            await Contact.findOneAndDelete(contactID);

            return res.status(204).json({foundContact});
        } catch (error) {
            return res
                .status(500)
                .json({error: 'Something happened ' + error});
        }
    },
    async updateContact(req, res) {
        const {firstName, lastName, phone, _id} = req.body;
        const contactToUpdate = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            _id: _id
        }
        if(contactToUpdate.firstName == "" || contactToUpdate.lastName == "" || contactToUpdate.phone == ""){
            return res
                .status(400)
                .json({message: "All fields are required"});
        }
        try {
            let foundContact = await Contact.findOne({_id: contactToUpdate._id});
            if (foundContact == null) {
                return res.status(404).json({message: `No contact with: ${contactToUpdate}`});
            }
            // check for null values

            foundContact.firstName = contactToUpdate.firstName;
            foundContact.lastName = contactToUpdate.lastName;
            foundContact.phone = contactToUpdate.phone;
            foundContact.save()
            return res.status(200).json({foundContact});
        } catch (error) {
            return res
                .status(500)
                .json({error: 'Something happened ' + error});
        }
    }
};
