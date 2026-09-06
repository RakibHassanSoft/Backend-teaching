# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - পার্ট ৬: রাউট এবং টেস্টিং

> **এই পার্টটিতে আমরা API routes তৈরি করব এবং Postman দিয়ে সব API টেস্ট করব।** এটি আমাদের API গুলোকে accessible এবং verified বানাবে।

---

## 🎯 এই পার্টের লক্ষ্য

- `src/user/user.routes.js` - API endpoints তৈরি
- Postman দিয়ে সব API টেস্ট করা

---

## 📂 ফাইল ১: `src/user/user.routes.js` - API Endpoints

### কখন তৈরি করবেন?
`src/user/user.controller.js` এর পরে। Routes হলো API এর URL pattern এবং কোন Controller ফাংশন চলবে তা নির্ধারণ করে।

### `src/user/user.routes.js` এর কোড:

```javascript
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
```

### ব্যাখা প্রতিটি অংশের:

| অংশ | কোড | ব্যাখ্যা |
|------|-----|---------|
| **Router create** | `const router = express.Router()` | Sub-router তৈরি |
| **Controller import** | `require('./user.controller.js')` | Controller functions import |
| **Validation import** | `require('./user.validation.js')` | Validation rules import |
| **Middleware import** | `require('../middleware/auth.middleware.js')` | protect middleware import |
| **POST /register** | `router.post('/register', registerValidation, register)` | Register endpoint |
| **POST /login** | `router.post('/login', loginValidation, login)` | Login endpoint |
| **GET /me** | `router.get('/me', protect, getProfile)` | Profile endpoint (protected) |

### Route Middleware Chain:

```
router.post('/register',
  registerValidation,  // আগে validation চেক
  register             // validation pass হলে controller
)
```

> **Route এ middleware chain:**
> - Validation আগে চলবে
> - Validation pass হলে controller চলবে
> - Validation fail হলে error return হবে

### API URL Structure:

```
http://localhost:5000/api/v1/auth/register
│           │      │    │     │
│           │      │    │     └── Endpoint (register)
│           │      │    └── Resource (auth)
│           │      └── API version (v1)
│           └── Base URL
└── Protocol
```

---

## 🧪 Postman দিয়ে API টেস্টিং

### Postman কি?

Postman হলো API testing tool। এটা ব্যবহার করে আমরা API call করতে পারি, response দেখতে পারি, এবং API গুলো test করতে পারি।

### Postman ইনস্টল:

1. https://www.postman.com/downloads/ ওপেন করুন
2. **Download for Windows** ক্লিক করুন
3. ইনস্টল করুন
4. Skip sign up (গুরুত্বপূর্ণ: Sign Up করার দরকার নেই)

---

## 📮 API ১: Register (Member)

### Steps:

1. **New Request** তৈরি করুন
2. Method = `POST` সিলেক্ট করুন
3. URL = `http://localhost:5000/api/v1/auth/register`
4. **Headers** tab ক্লিক করুন:
   - Key: `Content-Type`
   - Value: `application/json`
5. **Body** tab ক্লিক করুন:
   - raw সিলেক্ট করুন
   - JSON সিলেক্ট করুন
   - নিচের JSON পেস্ট করুন:
   ```json
   {
     "name": "রহিম আহমেদ",
     "email": "rahim@example.com",
     "password": "123456",
     "role": "member",
     "phone": "01712345678"
   }
   ```
6. **Send** ক্লিক করুন

### Expected Response:

```json
{
  "success": true,
  "message": "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে",
  "data": {
    "user": {
      "id": "65b1234567890abcdef12345",
      "name": "রহিম আহমেদ",
      "email": "rahim@example.com",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

> **✅ Token কপি করুন পরবর্তী API কলের জন্য!**

---

## 📮 API ২: Login (Member)

### Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/login`
3. **Headers**: `Content-Type: application/json`
4. **Body** (raw JSON):
   ```json
   {
     "email": "rahim@example.com",
     "password": "123456"
   }
   ```
5. **Send** ক্লিক করুন

### Expected Response:

```json
{
  "success": true,
  "message": "লগইন সফল",
  "data": {
    "user": {
      "id": "65b1234567890abcdef12345",
      "name": "রহিম আহমেদ",
      "email": "rahim@example.com",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

> **✅ নতুন Token কপি করুন!**

---

## 📮 API ৩: Get Profile (Protected)

### Steps:

1. Method = `GET`
2. URL = `http://localhost:5000/api/v1/auth/me`
3. **Headers**:
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (পুরো token পেস্ট করুন)
4. **Send** ক্লিক করুন

### Expected Response:

```json
{
  "success": true,
  "message": "প্রোফাইল লোড হয়েছে",
  "data": {
    "user": {
      "id": "65b1234567890abcdef12345",
      "name": "রহিম আহমেদ",
      "email": "rahim@example.com",
      "role": "member",
      "status": "active",
      "fineBalance": 0,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

> **✅ Protected API কাজ করছে!**

---

## 📮 API ৪: Unauthorized Test (401)

### Steps:

1. Method = `GET`
2. URL = `http://localhost:5000/api/v1/auth/me`
3. কোনো Header যোগ করবেন না
4. **Send** ক্লিক করুন

### Expected Response:

```json
{
  "success": false,
  "message": "লগইন করার জন্য অনুমতি নেই, টোকেন নেই"
}
```

> **✅ Security properly কাজ করছে!**

---

## 📮 API ৫: Validation Test (400)

### Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers**: `Content-Type: application/json`
4. **Body** (raw JSON):
   ```json
   {
     "name": "করিম",
     "password": "123456"
   }
   ```
   > **⚠️ email field deliberately remove করা হয়েছে**
5. **Send** ক্লিক করুন

### Expected Response:

```json
{
  "success": false,
  "message": "A valid email is required"
}
```

> **✅ Validation কাজ করছে!**

---

## 📮 API ৬: Duplicate Email Test (409)

### Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers**: `Content-Type: application/json`
4. **Body**:
   ```json
   {
     "name": "আরো কেউ",
     "email": "rahim@example.com",
     "password": "123456",
     "role": "member"
   }
   ```
   > **⚠️ email = rahim@example.com (পুরানো email)**
5. **Send** ক্লিক করুন

### Expected Response:

```json
{
  "success": false,
  "message": "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে"
}
```

> **✅ Duplicate check কাজ করছে!**

---

## 📊 সম্পূর্ণ টেস্ট চেকলিস্ট

| # | API | Method | Endpoint | Expected Status |
|---|-----|--------|----------|----------------|
| 1 | Register Member | POST | `/api/v1/auth/register` | 201 |
| 2 | Login Member | POST | `/api/v1/auth/login` | 200 |
| 3 | Get Profile | GET | `/api/v1/auth/me` | 200 |
| 4 | Unauthorized | GET | `/api/v1/auth/me` | 401 |
| 5 | Validation | POST | `/api/v1/auth/register` | 400 |
| 6 | Duplicate | POST | `/api/v1/auth/register` | 409 |

### প্রতিটি API টেস্ট করার Checklist:

- [ ] Status Code সঠিক কিনা চেক করুন
- [ ] Response message সঠিক কিনা চেক করুন
- [ ] Response data accurate কিনা চেক করুন
- [ ] Token পাওয়া গেছে কিনা চেক করুন (Register/Login এ)
- [ ] পুরো flow কাজ করছে কিনা চেক করুন

---

## 🔧 Authorization Header Format

```
Authorization: Bearer <token>
│             │       │
│             │       └── আপনার actual JWT token
│             └── Token type (fixed word)
└── Header name
```

### Common Mistakes:

| ভুল | সঠিক |
|-----|------|
| `Bearer:eyJhbG...` | `Bearer eyJhbG...` (colon নেই, space আছে) |
| `bearer eyJhbG...` | `Bearer eyJhbG...` (বড় হাতের B) |
| `eyJhbG...` | `Bearer eyJhbG...` (Bearer শব্দটি আসবে) |

---

## 🧪 Quick Test - সব API একসাথে

### Test ১: Register → Login → Get Profile Flow

```
1. Register → Token 1 পাওয়া যাবে
2. Login → Token 2 পাওয়া যাবে
3. Get Profile (Token 2 দিয়ে) → Profile data পাওয়া যাবে
4. Get Profile (Token 1 দিয়ে) → Profile data পাওয়া যাবে (both tokens valid)
```

### Test ২: Error Handling Flow

```
1. Register with duplicate email → 409 Conflict
2. Register without email → 400 Bad Request
3. Get Profile without token → 401 Unauthorized
4. Get Profile with invalid token → 401 Unauthorized
```

---

## 📝 এই পার্টে যা যা শিখেছি

| বিষয় | ব্যাখ্যা |
|------|---------|
| Express Router | Sub-routes group করার জন্য |
| Route middleware chain | Validation → Controller |
| API URL structure | `/api/v1/:resource/:endpoint` |
| Postman basics | Request builder, Headers, Body |
| API testing | Status codes, Response format |
| Error handling | 400, 401, 409 status codes |

---

## 🚀 পরবর্তী পার্টে যা যা থাকবে

**পার্ট ৭-এ আমরা শিখব:**
- সম্পূর্ণ flow recap
- সাধারণ সমস্যা ও সমাধান
- পরবর্তী পদক্ষেপ

---

**শুভকামনা! 🎉** 
Routes এবং Testing সম্পূর্ণ! পরবর্তী পার্টে যান।
