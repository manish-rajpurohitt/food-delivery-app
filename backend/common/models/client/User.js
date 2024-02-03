import { mongoose } from "mongoose";
import bcryptjs from "bcryptjs";
// Define the user schema
const userSchema = new mongoose.Schema({
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
  logoUrl: {
    type: String,
  },
  // Add more fields as needed for your user model
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  user.password = await bcryptjs.hash(user.password, saltRounds);
  next();
});

// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;