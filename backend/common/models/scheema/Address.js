import mongoose from 'mongoose';

const AddressScheema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },  
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    enum: ["Restaurant", "Delivery", "Client"],
    required: true
  }
});

const Address = mongoose.model('Address', AddressScheema);

export default Address;
