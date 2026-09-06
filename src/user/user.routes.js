// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - User রাউটস
// ============================================
// এই ফাইলটি User রিলেটেড সব API এন্ডপয়েন্ট (Routes) সংজ্ঞায়িত করে।
// Route = API এর URL pattern এবং কোন Controller ফাংশন স运行 করবে তা নির্ধারণ করে।

const express = require('express');
const router = express.Router(); // Express Router - sub-routes group করার জন্য

// 1. Controller এবং Validation ফাইল ইম্পোর্ট
const {
  register,
  login,
  getProfile,
} = require('./user.controller.js');

const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require('./user.validation.js');

// 2. Middleware ইম্পোর্ট
const { protect } = require('../middleware/auth.middleware.js');

// =====================
// Auth Routes - লগইন, রেজিস্ট্রেশন
// =====================

// POST /api/v1/auth/register
// কাজ: নতুন অ্যাকাউন্ট তৈরি করা
// Public = লগইন ছাড়া任何人 এই API কে কল করতে পারবে
router.post(
  '/register',
  // express-validator দিয়ে ইনপুট চেক
  registerValidation,
  // register controller ফাংশন কল
  register
);

// POST /api/v1/auth/login
// কাজ: লগইন করা
// Public = কোনো অ্যাকাউন্ট ছাড়াই লগইন করতে পারবে
router.post(
  '/login',
  loginValidation,
  login
);

// GET /api/v1/auth/me
// কাজ: নিজের প্রোফাইল দেখানো
// protect = শুধুমাত্র লগইন করা ইউজার এই API কে access করতে পারবে
router.get('/me', protect, getProfile);

// =====================
// অতিরিক্ত রাউটস (future)
// =====================
// PUT /api/v1/auth/profile - প্রোফাইল আপডেট
// router.put('/profile', protect, updateProfileValidation, updateProfile);

// =====================
// রাউট এক্সপোর্ট করা
// =====================
module.exports = router;
