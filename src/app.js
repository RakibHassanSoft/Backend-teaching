// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - Express অ্যাপ কনফিগারেশন
// ============================================
// এই ফাইলটিতে Express অ্যাপের মৌলিক সেটিংস, মিডলওয়্যার, এবং রাউটগুলো সংযুক্ত করা হবে।

const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট
const cors = require('cors'); // CORS মিডলওয়ার ইম্পোর্ট

// 1. Express অ্যাপ ইনস্ট্যান্স তৈরি
const app = express();

// 2. CORS মিডলওয়্যার সেটআপ
// CORS = Cross-Origin Resource Sharing
// এটি আমাদের API কে অন্য ডোমেইন/পোর্ট থেকে কল করার অনুমতি দেবে
// যেমন: ফ্রন্টএন্ড http://localhost:3000 থেকে ব্যাকএন্ড http://localhost:5000 কে কল করতে পারবে
app.use(cors());

// 3. JSON ডাটা পার্স করার মিডলওয়্যার
// সব রিকোয়েস্টের বডি JSON হিসেবে পড়বে
// যেমন: client JSON ডাটা পাঠাবে, এই মিডলওয়্যার তা parse করে req.body-এ রাখবে
app.use(express.json());

// 4. URL-Encoded ডাটা পার্স করার মিডলওয়্যার
// HTML ফর্ম সাবমিট করার সময় এই ফরম্যাট ব্যবহার হয়
app.use(express.urlencoded({
    extended: true, // extended = true মানে nested objects পার্স করতে পারবে
}));

// 5. রাউট ফাইলগুলো ইম্পোর্ট এবং অ্যাপের সাথে সংযুক্ত করা
// API ভার্সন = v1, তাই সব রুট /api/v1/XXXX-এ থাকবে
const userRoutes = require('./user/user.routes.js');
app.use('/api/v1/auth', userRoutes);

// =====================
// এরর হ্যান্ডলিং মিডলওয়্যার
// =====================
// 6. 404 হ্যান্ডলার - কোনো রুট মিললে না এই অংশ চলবে
// এরর হ্যান্ডলিং মিডলওয়্যারগুলো app.js-এ directly রাখা হয়েছে (beginner friendly)
app.use('*', (req, res, next) => {
  const error = new Error(`❌ ${req.originalUrl} এই রুটটি পাওয়া যায়নি`);
  res.status(404); // 404 = Not Found

  // পরবর্তী এরর হ্যান্ডলারে পাঠানো
  next(error);
});

// 7. গ্লোবাল এরর হ্যান্ডলার - সমস্ত এরর কে handle করার জন্য
app.use((err, req, res, next) => {
  // err.statusCode = কাস্টম স্ট্যাটাস কোড (যদি দেওয়া থাকে)
  // অথবা 500 = Internal Server Error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // এরর রেসপন্স সাজানো
  res.status(statusCode).json({
    success: false,
    message: err.message, // এররের মেসেজ
    // প্রোডাকশন এ stack trace দিতে চাইলে null, ডেভেলপমেন্ট এ দেখাবে
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 8. মডুল এক্সপোর্ট করা - server.js এ ব্যবহার করার জন্য
module.exports = app;
