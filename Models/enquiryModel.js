const { Schema, models, model } = require("mongoose");

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactModel = models.Contact || model("Contact", ContactSchema);

export default ContactModel;
