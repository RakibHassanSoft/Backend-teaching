# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - পার্ট ২: এনভায়রনমেন্ট ও সার্ভার কনফিগারেশন

> **এই পার্টটিতে আমরা `.env`, `server.js`, এবং `src/app.js` ফাইল গুলো লিখব।** এই ফাইল গুলো আমাদের অ্যাপ্লিকেশনেরFoundation কাঠামো তৈরি করে।

---

## 🎯 এই পার্টের লক্ষ্য

- `.env` ফাইলে গোপন তথ্য সংরক্ষণ করা
- `server.js` দিয়ে সার্ভার start করা
- `src/app.js` তে Express অ্যাপ কনফিগার করা

---

## 📂 ফাইল ১: `.env` - গোপন তথ্যেরsafe

### কখন তৈরি করবেন?
সবसे প্রথমে। `.env` ফাইলে আমরা গোপন তথ্য রাখি। এতে JWT secret, MongoDB URL ইত্যাদি থাকে। যেহেতু এই ফাইল Git এ push করা হয় না (`.gitignore` এ add করা থাকে), তাই এতে কোনো sensitive information রাখা নিরাপদ।

### `.env` ফাইলের কোড:

```env
PORT=5000
NODE_ENV=development

# MongoDB connection string
MONGO_URL=mongodb://localhost:27017/library_management

# JWT
JWT_SECRET=my_super_secret_key_12345_change_this_in_production
JWT_EXPIRES_IN=7d
```

### ব্যাখা প্রতিটি line এর:

| Variable | মান | কেন এই মান? |
|----------|-----|------------|
| `PORT` | `5000` | আমাদের সার্ভার কোন পোর্টে চলবে। 5000是最常用 |
| `NODE_ENV` | `development` | Development mode (production এ পরিবর্তন হবে) |
| `MONGO_URL` | `mongodb://...` | MongoDB ডাটাবেজের ঠিকানা |
| `JWT_SECRET` | `my_super_secret...` | JWT টোকেন সাইন করার গোপন কোড |
| `JWT_EXPIRES_IN` | `7d` | টোকেন ৭ দিন valid থাকবে |

### `.env` ফাইল তৈরি করার steps:

1. `G:\Live-Node` ফোল্ডারে যান
2. Notepad বা VS Code ওপেন করুন
3. উপরের কোড পেস্ট করুন
4. `G:\Live-Node\.env` নামে সেভ করুন

> **⚠️ গুরুত্বপূর্ণ নিয়মাবলী:**
> - `.env` ফাইল Git এ push করবেন না
> - `.env.example` ফাইল create করুন (নিচে দেখুন)
> - Production এ complex, random secret ব্যবহার করুন

### `.env.example` ফাইল:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/library_management
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

> **`.env.example` কেন দরকার?** 
> - অন্য ডেভেলপাররা বুঝতে পারে কোন environment variables দরকার
> - Git এ push করা যায় (কোনো sensitive information নেই)

### `.gitignore` ফাইল:

`.gitignore` ফাইলে আমরা哪些 ফাইল গুলো Git এ track করা হবে না তা mention করি:

```
node_modules/
.env
package-lock.json
```

> **কেন `node_modules` ignore?** 
> - এটি অনেক বড় (হাজারাও ফাইল)
> - `npm install` চালিয়ে নতুন করে install করা যায়
> - Git এ push করার দরকার নেই

---

## 📂 ফাইল ২: `server.js` - সার্ভারের main entrance

### কখন তৈরি করবেন?
`package.json` তৈরি করার পরে। `server.js` হলো আমাদের অ্যাপ্লিকেশনের main entry point।一切 এখান থেকে শুরু হয়।

### `server.js` এর কোড:

```javascript
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

// 4. PORT নিশ্চিত করা - .env থেকে নেবে, না হলে 5000
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
    console.log('🛑 সার্ভার ক্লোজ করা হয়েছে due to unhandled rejection');
    process.exit(1);
  });
});
```

### ব্যাখা প্রতিটি লাইনের:

| লাইন | কোড | কাজ |
|------|-----|-----|
| 7 | `require('dotenv').config()` | `.env` ফাইলে থাকা variables গুলো `process.env` তে load করা |
| 10 | `const connectDB = require('./src/config/db.js')` | MongoDB connection ফাংশন import |
| 13 | `const app = require('./src/app.js')` | Express অ্যাপ import |
| 16 | `const PORT = process.env.PORT \|\| 5000` | PORT নিতে হবে, না হলে 5000 use হবে |
| 19 | `connectDB()` | ডাটাবেজ কানেক্ট করা শুরু |
| 22-24 | `app.listen(PORT, ...)` | সার্ভার start করা |
| 30-37 | `process.on('unhandledRejection', ...)` | কোনো unpredicted এরর হলে সার্ভার gracefully close হবে |

> **এই ফাইলটিতে আমরা route define করি না, কারণ তা一切 `src/app.js` এ করা হবে।**

---

## 📂 ফাইল ৩: `src/app.js` - Express অ্যাপ কনফিগারেশন

### কখন তৈরি করবেন?
`server.js` তৈরি করার পরে। `app.js` তে আমরা Express অ্যাপের মৌলিক সেটিংস এবং মিডলওয়্যার গুলো add করি।

### `src/app.js` এর কোড:

```javascript
// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - Express অ্যাপ কনফিগারেশন
// ============================================
// এই ফাইলটিতে Express অ্যাপের মৌলিক সেটিংস, মিডলওয়্যার, এবং রাউটগুলো সংযুক্ত করা হবে।

const express = require('express'); // Express ফ্রেমওয়ারework ইম্পোর্ট
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
```

### ব্যাখা প্রতিটি অংশের:

| অংশ | কোড | কেন দরকার? |
|------|-----|-----------|
| **Express import** | `const express = require('express')` | ওয়েব সার্ভার বানানোর framework |
| **CORS import** | `const cors = require('cors')` | Cross-origin request allow করার জন্য |
| **app instance** | `const app = express()` | Express অ্যাপ তৈরি |
| **CORS middleware** | `app.use(cors())` | ফ্রন্টএন্ড থেকে API কল করার অনুমতি |
| **JSON middleware** | `app.use(express.json())` | JSON body parse করার জন্য |
| **URL-encoded** | `app.use(express.urlencoded({extended: true}))` | HTML form data parse করার জন্য |
| **Routes** | `app.use('/api/v1/auth', userRoutes)` | API routes সংযুক্ত |
| **404 handler** | `app.use('*', ...)` |ไม่มี রুটের জন্য এরর |
| **Global error** | `app.use((err, req, res, next) => ...)` | সব এরর centralized handling |
| **Export** | `module.exports = app` | অন্য ফাইল থেকে use করার জন্য |

### Middleware চেইন কিভাবে কাজ করে?

```
Request → CORS → JSON Parser → URL-encoded Parser → Routes → Controller → Response
```

> **Middleware বলতে কী বোঝা?**
> - Request এবং Response এর মাঝের একটি ছব
> - Request process করার আগে/পরে চলে
> - যেমন: CORS middleware সব request এ আগে চলে, তারপর JSON parser চলে

---

## 🧩 Express.js.json() এবং urlencoded() এর differences?

| Middleware | ফরম্যাট | ব্যবহার |
|-----------|---------|---------|
| `express.json()` | JSON | API request গুলোতে (React, Angular থেকে) |
| `express.urlencoded()` | Form data | HTML form submit করার সময় |

### উদাহরণ:

**JSON request:**
```json
{
  "name": "রহিম",
  "email": "rahim@example.com"
}
```

**Form data request:**
```
name=রহিম&email=rahim@example.com
```

---

## 🧪 Quick Test

### ধাপ ১: সার্ভার চালু করুন

```powershell
npm run dev
```

### ধাপ ২: ব্রাউজারে চেক করুন

`http://localhost:5000/` ওপেন করুন। নিচের মতো দেখাবে:

```
লাইব্রেরি ম্যানেজমেন্ট API চালু হয়েছে!
```

> **✅ সার্ভার চালু হয়েছে!** এখন আমরা API গুলো তৈরি করতে পারব।

### ধাপ ৩: 404 টেস্ট করুন

`http://localhost:5000/api/v1/test` ওপেন করুন। নিচের মতো error দেখাবে:

```json
{
  "success": false,
  "message": "❌ /api/v1/test এই রুটটি পাওয়া যায়নি"
}
```

> **✅ এরর handling কাজ করছে!**

---

## 📝 এই পার্টে যা যা শিখেছি

| বিষয় | ব্যাখ্যা |
|------|---------|
| `.env` ফাইল | গোপন তথ্য সংরক্ষণের জন্য |
| `server.js` | সার্ভার entry point |
| `src/app.js` | Express অ্যাপ কনফিগারেশন |
| Middleware | Request/Response এর মাঝের processing |
| CORS | Cross-origin request allow |
| Error handling | 404 এবং global error handler |

---

## 🚀 পরবর্তী পার্টে যা যা থাকবে

**পার্ট ৩-এ আমরা শিখব:**
- `src/config/db.js` - MongoDB connection
- `src/user/user.model.js` - User schema তৈরি

---

**শুভকামনা! 🎉** 
Environment configuration সম্পূর্ণ! পরবর্তী পার্টে যান।
