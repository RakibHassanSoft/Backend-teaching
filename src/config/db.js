// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - MongoDB কানেক্টিভিটি
// ============================================
// এই ফাইলটিতে MongoDB ডাটাবেজের সাথে কানেক্ট করার কোড রয়েছে।

const mongoose = require('mongoose');

// connectDB ফাংশন - ডাটাবেজ কানেক্ট করার জন্য
const connectDB = async () => {
  try {
    // 1. Mongoose এর connect মেথড দিয়ে MongoDB- কানেক্ট করা
    // process.env.MONGO_URL = .env ফাইলে আমরা আমাদের ডাটাবেজের ঠিকানা দিয়েছি
    // যেমন: mongodb://localhost:27017/library_management
    const con = await mongoose.connect(process.env.MONGO_URL);

    // 2. কানেক্ট সফল হলে কনসোল এ মেসেজ
    console.log(`✅ MongoDB কানেক্টেড: ${con.connection.host}`);

  } catch (error) {
    // 3. যদি কোনো এরর হয় তবে কনসোলে এরর প্রিন্ট করা
    console.log('❌ MongoDB কানেক্ট PROBLEM:', error.message);

    // 4. প্রসেস ক্লোস করা (প্রডাকশন এ এরর হ্যান্ডলিং আরও ভাল করার nécessaire)
    process.exit(1);
  }
};

// 5. module export করা - অন্য ফাইল থেকে এই ফাংশন ব্যবহার করার জন্য
module.exports = connectDB;
