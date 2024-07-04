const fs = require("fs");
const bycrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const tokenService = require("./tokenService");
const cloudinary = require("../configs/cloudinary");
const { User } = require("../models/index");
const { resetPasswordSender } = require("../utils/email/index");
dotenv.config();

// Login service
const login = async ({ email, password }) => {
  try {
    let existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new Error("Wrong email or password");
    }
    let isMatch = await bycrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Wrong email or password");
    }
    // Create JSON web token
    const payload = {
      _id: existingUser._id,
      email: existingUser.email,
    };

    const token = await tokenService.createToken(
      payload,
      process.env.JWT_SECRET,
      "10m"
    );

    // Create refresh token
    const refreshToken = await tokenService.createToken(
      payload,
      process.env.JWT_REFRESH_SECRET,
      "7d"
    );

    return {
      user: {
        ...existingUser._doc,
        password: "",
        token,
      },
      refreshToken,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Register service
const register = async ({ firstName, lastName, email, password }) => {
  try {
    let existingUser = await findUserByEmail(email);
    if (!!existingUser) {
      //Check not null and exist user
      throw new Error("User already exists");
    }
    // Encrypt password
    const hashedPassword = await bycrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Insert to database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return { ...newUser._doc, password: "" };
  } catch (error) {
    throw error;
  }
};

// Update user service
const updateUser = async ({ id, firstName, lastName, profileImage }) => {
  try {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    if (profileImage) {
      // Delete old image from Cloudinary
      if (user.imagePath) {
        // const publicId = user.imagePath.split("/").pop().split(".")[0];
        const parts = user.imagePath.split("/");
        const uploadIndex = parts.indexOf("upload");
        let publicId = parts.slice(uploadIndex + 2).join("/");
        publicId = publicId.split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(profileImage.path, {
        folder: `user/${id}/user-profiles`, // Upload to a specific folder the same for folder in multer.js
      });
      user.imagePath = result.secure_url; // Use the URL provided by Cloudinary

      await cloudinary.uploader.destroy(profileImage.filename); //Delete local file
      // await fs.promises.unlink(profileImage.path); //Delete local file
    }

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Forgot password service
const forgotPassword = async ({ email }) => {
  try {
    let existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new Error("User not found");
    }
    // Create JSON web token
    const payload = {
      _id: existingUser._id,
      email: existingUser.email,
    };

    const token = await tokenService.createToken(
      payload,
      process.env.JWT_RESET_PASSWORD_SECRET,
      "10m"
    );

    const info = await resetPasswordSender({
      userName: `${existingUser.firstName} ${existingUser.lastName}`,
      emailReceiver: existingUser.email,
      token,
    });
    return info;
  } catch (error) {
    throw error;
  }
};

// Reset password service
const resetPassword = async ({ token, password }) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
    let existingUser = await findUserById(decoded._id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    // Encrypt password
    const hashedPassword = await bycrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    existingUser.password = hashedPassword;
    await existingUser.save();
    return existingUser;
  } catch (error) {
    throw error;
  }
};

// Change password service
const changePassword = async ({ id, oldPassword, newPassword }) => {
  try {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");

    let isMatch = await bycrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    // Encrypt password
    const hashedPassword = await bycrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  let existingUser = await User.findOne({ _id: id }).exec();
  return existingUser;
};

const findUserByEmail = async (email) => {
  let existingUser = await User.findOne({ email }).exec();
  return existingUser;
};

module.exports = {
  login,
  register,
  findUserById,
  findUserByEmail,
  updateUser,
  forgotPassword,
  resetPassword,
  changePassword,
};
