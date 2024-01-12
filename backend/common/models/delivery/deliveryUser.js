import {mongoose} from "mongoose";
import bcryptjs from "bcryptjs";
// Define the user schema
const deliveryUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  liveCoordinates: {
    type: [Number],
    required: true,
  },
});

// Hash the password before saving to the database
deliveryUserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  user.password = await bcryptjs.hash(user.password, saltRounds);
  next();
});

// Compare the provided password with the hashed password in the database
deliveryUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

// Create the User model
const DeliveryUser = mongoose.model('deliveryUser', deliveryUserSchema);

export default DeliveryUser;