// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - এরর হ্যান্ডলিং মিডলওয়্যার
// ============================================
// এই ফাইলটি সমস্ত API এরর হ্যান্ডল করার জন্য ব্যবহৃত হয়।
// যেমন: ভ্যালিডেশন এরর, ডাটাবেজ এরর, 404 এরর - সব এই ফাইলে হ্যান্ডল হবে।

// 1. notFoundHandler = কোনো রুট মিললে না এই এরর হ্যান্ডলার চলবে
const notFoundHandler = (req, res, next) => {
  // req.originalUrl = ক্লায়েন্ট যে রুটে রিকোয়েস্ট করেছেন
  const error = new Error(`❌ ${req.originalUrl} এই রুটটি পাওয়া যায়নি`);
  res.status(404); // 404 = Not Found

  // পরবর্তী এরর হ্যান্ডলারে পাঠানো
  next(error);
};

// 2. globalErrorHandler = সমস্ত এরর কে handle করার জন্য
const globalErrorHandler = (err, req, res, next) => {
  // err.statusCode = কাস্টম স্ট্যাটাস কোড (যদি দেওয়া থাকে)
  // অথবা 500 = Internal Server Error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // 3. এরর রেসপন্স সাজানো
  res.status(statusCode).json({
    success: false,
    message: err.message, // এররের মেসেজ
    // প্রোডাকশন এ stack trace দিতে চাইলে null, ডেভেলপমেন্ট এ দেখাবে
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// 4. মডিউল এক্সপোর্ট করা
module.exports = { notFoundHandler, globalErrorHandler };
