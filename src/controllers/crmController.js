import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => { // a function to create a new Contact object
    let newContact = new Contact(req.body); // create a new Contact object with the request body
    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }

        res.json(contact);
    });
}