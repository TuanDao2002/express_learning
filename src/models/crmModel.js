import mongoose from "mongoose";

const Schema = mongoose.Schema;

// a Schema of the Contact model
export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name' 
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    createdDate: {
        type: Date,
        default: Date.now() // default value of this attribute
    }
})


// put a "required" in an attribute so when that attribute is null, an error JSON object will be sent to client as this:
/*
{
    "errors": {
        "firstName": {
            "name": "ValidatorError",
            "message": "Enter a first name",
            "properties": {
                "message": "Enter a first name",
                "type": "required",
                "path": "firstName",
                "value": ""
            },
            "kind": "required",
            "path": "firstName",
            "value": ""
        }
    },
    "_message": "Contact validation failed",
    "name": "ValidationError",
    "message": "Contact validation failed: firstName: Enter a first name"
}
*/