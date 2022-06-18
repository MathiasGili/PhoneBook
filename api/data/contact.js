const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
