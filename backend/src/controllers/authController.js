const User = require('../models/User');
const { generateToken } = require('../utils/tokenGenerator');
const { sendResponse, handleError } = require('../utils/responseHandler');
const { findUser, createUser } = require('../config/mockDB');
const mongoose = require('mongoose');

// Check if MongoDB is connected
const isMongoDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return handleError(res, 400, 'All fields are required');
    }

    if (password !== confirmPassword) {
      return handleError(res, 400, 'Passwords do not match');
    }

    let existingUser = null;
    let newUser = null;

    if (isMongoDBConnected()) {
      // Use MongoDB
      existingUser = await User.findOne({ email });
      if (existingUser) {
        return handleError(res, 400, 'Email already registered');
      }

      newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();
    } else {
      // Use mock database
      existingUser = findUser(email);
      if (existingUser) {
        return handleError(res, 400, 'Email already registered');
      }

      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser = createUser({
        name,
        email,
        password: hashedPassword,
        role: 'user',
        isEmailVerified: false,
        isActive: true,
        preferences: {
          priceAlerts: true,
          emailNotifications: true,
          currency: 'INR',
          language: 'en',
        },
        lastLogin: null,
      });
    }

    const token = generateToken(newUser);

    const userData = {
      _id: newUser._id || newUser.id,
      id: newUser._id || newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || '',
      mobile: newUser.mobile || '',
      age: newUser.age || '',
      gender: newUser.gender || '',
      address: newUser.address || '',
      state: newUser.state || '',
      district: newUser.district || '',
      pincode: newUser.pincode || '',
      avatar: newUser.avatar || null,
      role: newUser.role || 'user',
      createdAt: newUser.createdAt || new Date().toISOString(),
    };

    sendResponse(res, 201, true, 'User registered successfully', {
      user: userData,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    handleError(res, 500, error.message);
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleError(res, 400, 'Email and password are required');
    }

    let user = null;

    if (isMongoDBConnected()) {
      // Use MongoDB
      user = await User.findOne({ email }).select('+password');
      if (!user) {
        return handleError(res, 401, 'Invalid email or password');
      }

      const isPasswordMatch = await user.matchPassword(password);
      if (!isPasswordMatch) {
        return handleError(res, 401, 'Invalid email or password');
      }

      user.lastLogin = new Date();
      await user.save();
    } else {
      // Use mock database
      user = findUser(email);
      if (!user) {
        return handleError(res, 401, 'Invalid email or password');
      }

      const bcrypt = require('bcryptjs');
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return handleError(res, 401, 'Invalid email or password');
      }
    }

    const token = generateToken(user);

    const userData = {
      _id: user._id || user.id,
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      mobile: user.mobile || '',
      age: user.age || '',
      gender: user.gender || '',
      address: user.address || '',
      state: user.state || '',
      district: user.district || '',
      pincode: user.pincode || '',
      avatar: user.avatar || null,
      role: user.role || 'user',
      createdAt: user.createdAt || new Date().toISOString(),
    };

    sendResponse(res, 200, true, 'Login successful', {
      user: userData,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    handleError(res, 500, error.message);
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    const userData = {
      _id: user._id || user.id,
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      mobile: user.mobile || '',
      age: user.age || '',
      gender: user.gender || '',
      address: user.address || '',
      state: user.state || '',
      district: user.district || '',
      pincode: user.pincode || '',
      avatar: user.avatar || null,
      role: user.role || 'user',
      createdAt: user.createdAt || new Date().toISOString(),
    };

    sendResponse(res, 200, true, 'Profile fetched', {
      user: userData,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    handleError(res, 500, error.message);
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      mobile,
      age,
      gender,
      address,
      state,
      district,
      pincode,
      avatar,
      preferences,
      currentPassword,
      newPassword,
    } = req.body;

    let user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    // Update basic profile fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (mobile !== undefined) user.mobile = mobile;
    if (age !== undefined) user.age = age;
    if (gender !== undefined) user.gender = gender;
    if (address !== undefined) user.address = address;
    if (state !== undefined) user.state = state;
    if (district !== undefined) user.district = district;
    if (pincode !== undefined) user.pincode = pincode;
    if (avatar !== undefined) user.avatar = avatar;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    // Handle password change
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await user.matchPassword(currentPassword);
      if (!isPasswordValid) {
        return handleError(res, 401, 'Current password is incorrect');
      }

      // Update password (will be hashed by pre-save hook)
      user.password = newPassword;
    }

    // Save updated user
    await user.save();

    // Prepare response data
    const userData = {
      _id: user._id || user.id,
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      mobile: user.mobile || '',
      age: user.age || '',
      gender: user.gender || '',
      address: user.address || '',
      state: user.state || '',
      district: user.district || '',
      pincode: user.pincode || '',
      avatar: user.avatar || null,
      role: user.role || 'user',
      createdAt: user.createdAt || new Date().toISOString(),
    };

    sendResponse(res, 200, true, 'Profile updated successfully', { user: userData });
  } catch (error) {
    console.error('Update profile error:', error);
    handleError(res, 500, error.message);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
