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

export const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => { // the filter condition is empty so all data will be retrieved from the database
        if (err) {
            res.send(err);
        }

        res.json(contact);
    })
}

export const getContactWithId = (req, res) => {
    Contact.findById(req.params.contactID, (err, contact) => { // find by the id specified in the request params
        if (err) {
            res.send(err);
        }

        res.json(contact);
    })
}

export const updateContact = (req, res) => {
    /*
        - find the object with id that matches with the request params
        - update the object with only modified attribute
        - new: true to return the updated object
        - useFindAndModify: false to turn off the deprecated message
    */
    Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true, useFindAndModify: false }, (err, contact) => {
        if (err) {
            res.send(err);
        }

        res.json(contact);
    }) 
}

export const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactID }, (err, contact) => {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'successfully deleted contact' })
    })
}

export const deleteAllContact = (req, res) => {
    Contact.deleteMany({}, (err, contact) => {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'clear all documents' })
    })
}