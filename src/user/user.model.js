// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - User মডেল/সার্স
// ============================================
// এই ফাইলটি MongoDB-এ "users" Collection এর Schema (গঠন) নির্ধারণ করে।
// Mongoose = MongoDB কে JavaScript অবজেক্টের মতো ব্যবহার করার জন্য একটি ODM (Object Document Mapper)।

const mongoose = require('mongoose');

// 1. User Schema তৈরি - এটি MongoDB-এ users collection-এর গঠন নির্ধারণ করে
const userSchema = new mongoose.Schema(
  {
    // =====================
    // নাম ফিল্ড
    // =====================
    name: {
      type: String, // ডাটা টাইপ = স্ট্রিং
      required: [true, 'Name is required'], // mandatory ফিল্ড, এরর মেসেজ দেওয়া হয়েছে
      trim: true, // শুরুর ও শেষের-space মুছে ফেলবে
    },

    // =====================
    // ইমেইল ফিল্ড
    // =====================
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // শুধুমাত্র একটি অনন্য ইমেইল থাকবে, দুplicate হবে না
      lowercase: true, // সবসময় ছোট হাতের অক্ষরে রাখবে
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'], // ইমেইল ফরম্যাট চেক
    },

    // =====================
    // পাসওয়ার্ড ফিল্ড
    // =====================
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6, // কমপক্ষে ৬ অক্ষর হতে হবে
      select: false, // ডিফল্ট রেজাল্টে পাসওয়ার্ড না দেখাবে (সিকিউরিটির জন্য)
    },

    // =====================
    // রোল ফিল্ড
    // =====================
    // কোন ধরনের ইউজার - member, librarian, বা admin
    role: {
      type: String,
      enum: ['member', 'librarian', 'admin'], // শুধুমাত্র এই ৩টা ভ্যালু Accepted
      default: 'member', // ডিফল্ট ভ্যালু = member
    },

    // =====================
    // ফোন নম্বর ফিল্ড
    // =====================
    phone: {
      type: String,
      trim: true, // whitespace মুছে ফেলা
    },

    // =====================
    // Membership ID ফিল্ড
    // =====================
    membershipId: {
      type: String,
      unique: true, // অনন্য হতে হবে
      sparse: true, // null হলে uniqueness ভiolate হবে না
    },

    // =====================
    // স্ট্যাটাস ফিল্ড
    // =====================
    // ইউজার অ্যাকটিভ বা সাসপেন্ডেড - সাসপেনডেড হলে কোন কাজ করতে পারবে না
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },

    // =====================
    // জরিমানা ব্যালেন্স ফিল্ড
    // =====================
    fineBalance: {
      type: Number,
      default: 0, // ডিফল্ট ০ টাকা
      min: 0, // মিনিমাম ০, নেগেটিভ হতে পারবে না
    },
  },
  // 2. Schema Options
  { timestamps: true } // createdAt এবং updatedAt ফিল্ড অটোমেটিক যোগ হবে
);

// 3. Mongoose Model তৈরি
// mongoose.model('User', schema) = MongoDB-এ "users" নামে Collection তৈরি হবে
// Capital 'U' = Mongoose automatically pluralize এবং lowercase করে "users" করে
const User = mongoose.model('User', userSchema);

// 4. Model এক্সপোর্ট করা - অন্য ফাইল থেকে require করে ব্যবহার করা যাবে
module.exports = User;
