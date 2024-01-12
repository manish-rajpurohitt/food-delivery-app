import {mongoose} from "mongoose";
import bcryptjs from "bcryptjs";
// Define the user schema
const restaurantSchema = new mongoose.Schema({
  restaurantName: {
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
  liveCoordinates: {
    type: [Number],
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  logoUrl: {
    type: String,
  },
});

// Hash the password before saving to the database
restaurantSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  user.password = await bcryptjs.hash(user.password, saltRounds);
  next();
});

// Compare the provided password with the hashed password in the database
restaurantSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

// Create the User model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;