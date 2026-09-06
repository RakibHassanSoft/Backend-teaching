// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - User ভ্যালিডেশন রুলস
// ============================================
// এই ফাইলটি一切 API এ ইনপুট ভ্যালিডেশন করার নিয়মগুলো রয়েছে।
// express-validator = রিকোয়েস্টের ডাটা চেক করার জন্য একটি লাইব্রেরি।

const { body } = require('express-validator');

// =====================
// রেজিস্ট্রেশন ভ্যালিডেশন
// =====================
const registerValidation = [
  // name ফিল্ড চেক
  body('name')
    .trim() // Whitespace মুছে ফেলা
    .notEmpty() // খালি থাকা যাবে না
    .withMessage('Name is required'), // এরর মেসেজ

  // email ফিল্ড চেক
  body('email')
    .isEmail() // ভ্যালিড ইমেইল ফরম্য@Test?
    .withMessage('A valid email is required')
    .normalizeEmail(), // ইমেইল lowercase এবং trim হবে

  // password ফিল্ড চেক
  body('password')
    .isLength({ min: 6 }) // কমপক্ষে ৬ অক্ষর
    .withMessage('Password must be at least 6 characters long'),

  // role ফিল্ড চেক (optional)
  body('role')
    .optional() // role পাঠানো না করলেও হবে
    .isIn(['member', 'librarian', 'admin']) // শুধুমাত্র এই ৩টা ভ্যালু Accepted
    .withMessage('Role must be member, librarian, or admin'),
];

// =====================
// লগইন ভ্যালিডেশন
// =====================
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// =====================
// প্রোফাইল আপডেট ভ্যালিডেশন
// =====================
const updateProfileValidation = [
  body('name')
    .optional() // নাম পরিবর্তন না করলেও হবে
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),

  body('phone')
    .optional()
    .trim(), // ফোন নম্বর optional, trim হবে
];

// =====================
// সব ভ্যালিডেশন এক্সপোর্ট করা
// =====================
module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
};
