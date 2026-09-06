// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - JWT টোকেন জেনারেটর
// ============================================
// এই ফাইলটি JWT (JSON Web Token) তৈরি করার কোড রয়েছে।
// JWT = একটি secure টোকেন, যার মাধ্যমে আমরা ইউজারকে identify করতে পারি।

const jwt = require('jsonwebtoken');

// generateToken ফাংশন = নতুন JWT টোকেন তৈরি করে
// payload = টোকেনের ভেতরে যেসব তথ্য থাকবে (যেমন: userId, role)
const generateToken = (payload) => {
  // 1. jwt.sign() = নতুন টোকেন সাইন/তৈরি করা
  // প্রথম প্যারামিটার = পেলোড (টোকেনে রাখা যাবে এমন তথ্য)
  // দ্বিতীয় প্যারামিটার = গোপন সিক্রেট (শুধুমাত্র সার্ভার knows this)
  // তৃতীয় প্যারামিটার = এক্সপায়ারেশন সময়
  return jwt.sign(
    payload, // যেমন: { id: user._id, role: user.role }
    process.env.JWT_SECRET, // .env ফাইলে সংরক্ষিত গোপন কোড
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // ডিফল্ট ৭ দিন
  );
};

// 2. মডিউল এক্সপোর্ট করা - অন্যান্য ফাইল থেকে ব্যবহার করার জন্য
module.exports = { generateToken };
