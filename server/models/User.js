const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const bookSchema = require('./Book'); // Make sure bookSchema is correctly defined

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [
      {
        type: Schema.Types.ObjectId, // Corrected line
        ref: 'Book'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password before saving to database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Method to validate password during login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual to retrieve the count of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;

