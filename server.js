// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - সার্ভার এন্ট্রি পয়েন্ট
// ============================================
// এই ফাইলটি পুরো অ্যাপ্লিকেশনের গেটওয়ে। সব কিছু এখান থেকে শুরু হয়।

// 1. environment variables লোড করা (.env ফাইল থেকে)
require('dotenv').config();

// 2. mongoose ডাটাবেজ কানেক্ট করা
const connectDB = require('./src/config/db.js');

// 3. Express অ্যাপ ইম্পোর্ট করা
const app = require('./src/app.js');

// 4.พา PORT নিশ্চিত করা - .env থেকে নেবে, না হলে 5000
const PORT = process.env.PORT || 5000;

// 5. ডাটাবেজ কানেক্ট করার ফাংশন কল
connectDB();

// 6. সার্ভার শুনEARTH শুরু করা
const server = app.listen(PORT, () => {
  console.log(`সার্ভার চালু হয়েছে পোর্ট ${PORT} - ${process.env.NODE_ENV} মোডে`);
});

// ============================================
// প্রসেস লেভেল এরর হ্যান্ডলিং
// ============================================
// কোনো Unhandled Promise রেজেকশন এসেলেই এই অংশ চলবে
process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Promise রেজেকশন:', err.message);
  // সার্ভার ক্লোস করা
  server.close(() => {
    console.log('🛑 সার্ভার ক্লোস করা হয়েছে due to unhandled rejection');
    process.exit(1);
  });
});
