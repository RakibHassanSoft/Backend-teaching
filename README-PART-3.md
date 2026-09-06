# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - পার্ট ৩: ডাটাবেজ কানেক্ট এবং মডেল

> **এই পার্টটিতে আমরা MongoDB কানেক্ট করব এবং User model তৈরি করব।** এটি আমাদের ডাটাবেজের কাঠামো তৈরি করে।

---

## 🎯 এই পার্টের লক্ষ্য

- `src/config/db.js` দিয়ে MongoDB কানেক্ট করা
- `src/user/user.model.js` দিয়ে User schema তৈরি করা
- Mongoose Model তৈরি এবং export করা

---

## 📂 ফাইল ১: `src/config/db.js` - MongoDB Connection

### কখন তৈরি করবেন?
`src/app.js` এর পরে। ডাটাবেজ কানেক্ট করার কোড আলাদা ফাইলে রাখা ভাল, যাতে reusable হয়।

### `src/config/db.js` এর কোড:

```javascript
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

    // 4. প্রসেস ক্লোস করা (প্রডাকশন এ এরর হ্যান্ডলিং আরও ভাল করার দরকার)
    process.exit(1);
  }
};

// 5. module export করা - অন্য ফাইল থেকে এই ফাংশন ব্যবহার করার জন্য
module.exports = connectDB;
```

### ব্যাখা প্রতিটি অংশের:

| অংশ | কোড | ব্যাখ্যা |
|------|-----|---------|
| **mongoose import** | `const mongoose = require('mongoose')` | MongoDB JavaScript driver |
| **connectDB function** | `async () => { ... }` | Async function because DB connection takes time |
| **mongoose.connect** | `await mongoose.connect(...)` | Connect to MongoDB |
| **success log** | `console.log(...)` | Connection successful হলে print |
| **catch error** | `catch (error) { ... }` | Connection fail হলে error handle |
| **process.exit** | `process.exit(1)` | App close করা (DB ছাড়া অ্যাপ চলতে পারে না) |

### Mongoose কী?

Mongoose হলো MongoDB-এর জন্য একটি ODM (Object Document Mapper)। এটি MongoDB কে JavaScript অবজেক্টের মতো ব্যবহার করার সুবিধা দেয়।

```
Mongoose = MongoDB + JavaScript = 우리가 MongoDB কে JavaScript এর মতো use করতে পারি
```

### MongoDB connection string ক套这样?

```
mongodb://localhost:27017/library_management
│           │          │              │
│           │          │              └── Database name
│           │          └── Port number
│           └── Host (localhost = your computer)
└── Protocol
```

---

## 📂 ফাইল ২: `src/user/user.model.js` - User Schema

### কখন তৈরি করবেন?
`src/config/db.js` এর পরে। Model হলো MongoDB collection এর schema (গঠন)। এতে বলে দিই কোন fields থাকবে, কোন type হবে, কোন required হবে।

### `src/user/user.model.js` এর কোড:

```javascript
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
      trim: true, // শুরুর ও শেষের whitespace মুছে ফেলবে
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
      sparse: true, // null হলে uniqueness violate হবে না
    },

    // =====================
    // স্ট্যাটাস ফিল্ড
    // =====================
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
```

### ব্যাখা প্রতিটি Field এর:

| Field | Type | Required | Default | কেন এই Field? |
|-------|------|----------|---------|---------------|
| `name` | String | Yes | - | ইউজারের পুরো নাম |
| `email` | String | Yes | - | লগইনের জন্য, unique |
| `password` | String | Yes | - | হ্যাশড পাসওয়ার্ড |
| `role` | String | No | member | member/librarian/admin |
| `phone` | String | No | - | যোগাযোগ নম্বর |
| `membershipId` | String | No | - | লাইব্রেরি membership ID |
| `status` | String | No | active | active/suspended |
| `fineBalance` | Number | No | 0 | বকেয়া জরিমানা |

### Schema options কী?

```javascript
{ timestamps: true }
```

এর মানে:
- `createdAt` অটোমেটিক যোগ হবে (কখন created হয়)
- `updatedAt` অটোমেটিক যোগ হবে (কখন updated হয়)

> **কেন manually এই fields add করি না?** 
> - Mongoose automatically manage করে
> - আমাদের manual tracking করার দরকার নেই

---

## 🔍 Schema Validations BuJanO

### Required Validations:

```javascript
name: {
  type: String,
  required: [true, 'Name is required'], // [true, errorMessage] array এ দিতে হয়
}
```

> **`required: [true, 'Name is required']` কেন array?**
> - প্রথম element = true (required)
> - দ্বিতীয় element = custom error message

### Unique Validations:

```javascript
email: {
  type: String,
  unique: true, // MongoDB index তৈরি করে, duplicate পাবেনা
}
```

> **unique ক套这样 কাজ করে?**
> - MongoDB automatically index তৈরি করে
> - duplicate email insert করার চেষ্টা করলে error throw করে

### Enum Validation:

```javascript
role: {
  type: String,
  enum: ['member', 'librarian', 'admin'], // শুধুমাত্র এই ৩টা ভ্যালু Accepted
  default: 'member',
}
```

> **এমনকি enum কেন দরকার?**
> - ভুল value insert হওয়ার আগে থেমে যাবে
> - data consistency maintain থাকে

### Match Validation (Regex):

```javascript
email: {
  match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
}
```

> **এই regex কী চেক করে?**
> - `\S+@\S+\.\S+` =至少 একটি character, @,至少 একটি character, dot,至少 একটি character
> - উদাহরণ: `rahim@example.com` ✅, `rahim@` ❌

---

## 🔐 `select: false` কেন?

```javascript
password: {
  type: String,
  select: false, // ডিফল্ট রেজাল্টে পাসওয়ার্ড না দেখাবে
}
```

### fetch করার সময়:

```javascript
//密码 automatically excluded হবে
const user = await User.findById(userId);
console.log(user.password); // undefined

// explicitly select করলে আসবে
const user = await User.findById(userId).select('+password');
console.log(user.password); // hashedPassword123
```

> **কেন `select: false`?**
> - পাসওয়ার্ড accidental exposes হওয়ার chance কমে
> - Security layer যোগ করা
> - শুধুমাত্র login এর সময় explicitly select করতে হবে

---

## 🧩 Model vs Schema

| Schema | Model |
|--------|-------|
| ডাটার গঠন নির্ধারণ করে | ডাটা create, read, update, delete করার method |
| `new mongoose.Schema({...})` | `mongoose.model('User', schema)` |
|Blueprint | Factory |
| Fields, validation | CRUD operations |

### Model create করার নিয়ম:

```javascript
// 1. Schema তৈরি
const userSchema = new mongoose.Schema({ name: String, email: String });

// 2. Model তৈরি
const User = mongoose.model('User', userSchema);

// 3. Model ব্যবহার
const newUser = await User.create({ name: 'রহিম', email: 'rahim@example.com' });
```

---

## 🧪 Quick Test

### ধাপ ১: MongoDB চালু করুন

```powershell
net start MongoDB
```

### ধাপ ২: সার্ভার চালু করুন

```powershell
npm run dev
```

### ধাপ ৩: Console Output চেক করুন

```
✅ MongoDB কানেক্টেড: localhost
সার্ভার চালু হয়েছে পোর্ট 5000 - development মোডে
```

> **✅ MongoDB কানেক্ট হয়েছে!**

### ধাপ ৪: ম্যানুয়ালি টেস্ট করুন

MongoDB Compass বা terminal দিয়ে check করুন:

```powershell
# MongoDB shell ওপেন করুন
mongosh

# database দেখুন
show dbs

# library_management database use করুন
use library_management

# users collection দেখুন
show collections

# সব users দেখুন
db.users.find()
```

> **✅ Database এবং collection created হয়েছে!**

---

## 📝 এই পার্টে যা যা শিখেছি

| বিষয় | ব্যাখ্যা |
|------|---------|
| MongoDB Connection | Mongoose দিয়ে MongoDB কানেক্ট করা |
| Schema | Collection এর গঠন নির্ধারণ |
| Model | CRUD operations করার জন্য |
| Validations | required, unique, enum, match |
| Timestamps | createdAt, updatedAt অটোমেটিক |
| select: false | পাসওয়ার্ড hiding করার জন্য |

---

## 🚀 পরবর্তী পার্টে যা যা থাকবে

**পার্ট ৪-এ আমরা শিখব:**
- `src/utils/apiResponse.js` - Response helper
- `src/utils/generateToken.js` - JWT token generate
- `src/middleware/auth.middleware.js` - Authentication middleware

---

**শুভকামনা! 🎉** 
Database এবং Model setup সম্পূর্ণ! পরবর্তী পার্টে যান।
