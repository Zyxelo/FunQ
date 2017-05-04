const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user model
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String
});

// Compare user password
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

// Performed before the user is saved
UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            // replace a password string with hash value
            user.password = hash;

            return next();
        });
    });
});

export default mongoose.model('User', UserSchema);