# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - পার্ট ৪: হেল্পার ফাইল এবং মিডলওয়্যার

> **এই পার্টটিতে আমরা utility files এবং authentication middleware তৈরি করব।** এই ফাইল গুলো আমাদের API গুলোকে reusable এবং secure বানাবে।

---

## 🎯 এই পার্টের লক্ষ্য

- `src/utils/apiResponse.js` - API response helper
- `src/utils/generateToken.js` - JWT token generate
- `src/middleware/auth.middleware.js` - JWT verify করার middleware

---

## 📂 ফাইল ১: `src/utils/apiResponse.js` - Response Helper

### কখন তৈরি করবেন?
`src/user/user.model.js` এর পরে। Utility files হলো ছোট ছোট রebiz usefulness ফাংশন গুলো, যা বারবার ব্যবহার করা হয়।

### `src/utils/apiResponse.js` এর কোড:

```javascript
// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - API Response Helper
// ============================================
// এই ফাইলটি API রেসপন্স সঠিক ফরম্যাটে পাঠাতে সাহায্য করে।
// কোনো API কল সফল বা ব্যর্থ হলে সবসময় একটি unified রেসপন্স ফরম্যাট follow করবে।

// 1. sendResponse ফাংশন = সফল API রেসপন্স পাঠানোর জন্য
// ব্যবহার: sendResponse(res, 200, true, 'Data fetched successfully', data)
const sendResponse = (res, statusCode, success, message, data = null) => {
  // res = Express response object
  // statusCode = HTTP স্ট্যাটাস (200, 201, 400, 404, 500 etc.)
  // success = boolean (true = সফল, false = ব্যর্থ)
  // message = ক্লায়েন্টকে দেখানোর জন্য বার্তা
  // data = ফron্টএন্ডে পাঠানোর actual ডাটা (যদি থাকে)

  const response = {
    success, // true বা false
    message, // বার্তা
  };

  // ডাটা থাকলে response-এ data যোগ করা
  if (data) {
    response.data = data;
  }

  // রেসপন্স পাঠানো
  res.status(statusCode).json(response);
};

// 2. মডিউল এক্সপোর্ট করা
module.exports = { sendResponse };
```

### ব্যাখা প্রতিটি প্যারামিটার:

| প্যারামিটার | টাইপ | উদাহরণ | ব্যাখ্যা |
|------------|------|--------|---------|
| `res` | Object | `res` | Express response object |
| `statusCode` | Number | `200`, `201`, `400` | HTTP status code |
| `success` | Boolean | `true`, `false` | সফল কিনা |
| `message` | String | `'Data fetched'` | ক্লায়েন্টকে দেখানোর বার্তা |
| `data` | Any | `{ user: {...} }` | actual ডাটা (optional) |

### ব্যবহার উদাহরণ:

```javascript
// সফল response
sendResponse(res, 200, true, 'Data fetched successfully', {
  users: [{ name: 'রহিম' }, { name: 'করিম' }]
});

// এরর response
sendResponse(res, 404, false, 'User not found');
```

### Response format:

```json
// সফল response
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "users": [{ "name": "রহিম" }]
  }
}

// এরর response
{
  "success": false,
  "message": "User not found"
}
```

> **কেন এই ফাইল দরকার?**
> - প্রতিটি API response একটি unified format এ থাকবে
> - বারবার `res.status().json({...})` লিখতে হবে না
> - code maintain easier

---

## 📂 ফাইল ২: `src/utils/generateToken.js` - JWT Token Generator

### কখন তৈরি করবেন?
`src/utils/apiResponse.js` এর পরে। JWT token generate করার কোড আলাদা ফাইলে রাখা ভাল, যাতে reusable হয়।

### `src/utils/generateToken.js` এর কোড:

```javascript
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
```

### ব্যাখা প্রতিটি অংশের:

| অংশ | কোড | ব্যাখ্যা |
|------|-----|---------|
| **jwt import** | `const jwt = require('jsonwebtoken')` | JWT লাইব্রেরি import |
| **generateToken function** | `(payload) => { ... }` | নতুন টোকেন তৈরি করে |
| **jwt.sign** | `jwt.sign(payload, secret, options)` | টোকেন create করে |
| **payload** | `{ id, role }` | টোকেনে যে তথ্য থাকবে |
| **secret** | `process.env.JWT_SECRET` | টোকেন verify করার কোড |
| **expiresIn** | `'7d'` | ৭ দিন পর expire হবে |

### JWT Token কিভাবে কাজ করে?

```
1. User login করলে
   ↓
2. Server একটি টোকেন তৈরি করে
   - payload: { id: user._id, role: user.role }
   - secret: JWT_SECRET
   - expiresIn: 7d
   ↓
3. টোকেন client কে দেওয়া হয়
   ↓
4. প্রতিটি request এ client টোকেন পাঠায়
   - Header: Authorization: Bearer <token>
   ↓
5. Server টোকেন verify করে userId বের করে
   - jwt.verify(token, JWT_SECRET)
   - decoded = { id: user._id, role: user.role }
```

### JWT Token এর গঠন:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjEyMzQ1Njc4OTBhY2RlZjEyMzQ1Iiwicm9sZSI6Im1lbWJlciJ9.signature
│                              │                                                                     │
│                              │                                                                     └── Signature (verify করার জন্য)
│                              └── Payload (তথ্য: userId, role)
└── Header (algorithm, token type)
```

> **⚠️ গুরুত্বপূর্ণ:** JWT token decode করা যায় (base64), তাই পাসওয়ার্ড বা sensitive information রাখবেন না।

---

## 📂 ফাইল ৩: `src/middleware/auth.middleware.js` - Authentication

### কখন তৈরি করবেন?
`src/utils/` ফাইল গুলোর পরে। Middleware হলো request এবং response এর মাঝের একটি ছব, যা request process করার আগে/পরে চলে।

### `src/middleware/auth.middleware.js` এর কোড:

```javascript
// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - Authentication মিডলওয়্যার
// ============================================
// এই ফাইলটি JWT টোকেন ভেরিফাই করার মিডলওয়্যার রয়েছে।
// যখন কোনো প্রটেক্টেড রুটে রিকোয়েস্ট আসবে, তখন এই মিডলওয়্যার চেক করবে:
// "এই রিকোয়েস্টের সাথে একটি ভ্যালিড JWT টোকেন আছে কিনা?"

const jwt = require('jsonwebtoken');
const User = require('../user/user.model.js');

// ============================================
// protect = প্রটেক্টেড রুটের জন্য মিডলওয়্যার
// ============================================
// ব্যবহার: router.get('/profile', protect, controller.getProfile)
// এই মিডলওয়্যার আগে চলবে, তারপর controller চলবে
const protect = async (req, res, next) => {
  let token; // টোকেন সংরক্ষণের জন্য ভেরিয়েবল

  // 1. রিকোয়েস্টের হেডার থেকে Authorization হেডার চেক করা
  // Authorization হেডার ফরম্যাট: "Bearer <token>"
  // যেমন: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    try {
      // 2. Authorization হেডার থেকে টোকেন আলাদা করা
      // "Bearer eyJhbGc..." থেকে "eyJhbGc..." অংশটি আলাদা
      token = req.headers.authorization.split(' ')[1];

      // 3. JWT টোকেন ভেরিফাই করা
      // process.env.JWT_SECRET = আমরা যে গোপন কোড ব্যবহার করেছি টোকেন জেনারেট করার সময়
      // ভেরিফাই করলে আমরা পাব যে কে এই রিকোয়েস্ট করছে (userId)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. decoded তে userId থাকবে, তাই User খুঁজে বের করা
      // select: false বা -password = পাসওয়ার্ড ফিল্ড বাদ দিয়ে আনবে
      req.user = await User.findById(decoded.id).select('-password');

      // 5. পরবর্তী মিডলওয়্যার/controller-কে চালিয়ে যাওয়া
      next();

    } catch (error) {
      // 6. যদি টোকেন ভেরিফিকেশন ফেল হয়
      console.log('❌ JWT ভেরিফিকেশন এরর:', error.message);
      res.status(401).json({
        success: false,
        message: 'টোকেন ভেরিফিকেশন ফেইল হয়েছে, আবার লগইন করুন',
      });
    }
  }

  // 7. যদি Authorization হেডার না থাকে
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'লগইন করার জন্য অনুমতি নেই, টোকেন নেই',
    });
  }
};

// 8. মডিউল এক্সপোর্ট করা
module.exports = { protect };
```

### ব্যাখা প্রতিটি অংশের:

| লাইন | কোড | কাজ |
|------|-----|-----|
| 16 | `let token` | Token store করার variable |
| 22 | `req.headers.authorization` | Request header থেকে Authorization নেওয়া |
| 23 | `.startsWith('Bearer')` | Bearer দিয়ে শুরু হয়েছে কিনা চেক |
| 27 | `.split(' ')[1]` | "Bearer token" থেকে "token" আলাদা |
| 32 | `jwt.verify(token, secret)` | Token verify করা |
| 36 | `User.findById(decoded.id)` | User data fetch করা |
| 39 | `next()` | পরবর্তী middleware চালানো |
| 52-57 | `if (!token)` | Token না হলে 401 error |

### Authorization Header Structure:

```
Authorization: Bearer <token>
│             │       │
│             │       └── আপনার actual JWT token
│             └── Token type (fixed word)
└── Header name
```

### protect Middleware এর কাজ:

```
Request → protect middleware → token check → User find → next() → Controller
```

### route এ ব্যবহার:

```javascript
// protect middleware use করার নিয়ম
router.get('/me', protect, getProfile);
//                          ↑
//                  logged in user only access করতে পারে
```

> **কেন `protect` নাম?**
> - এই middleware রুটকে "protect" করে, যাতে শুধুমাত্র logged in user access করতে পারে
> - ব্যবহার: `router.get('/profile', protect, getProfile)`

---

## 🔐 JWT Verification Process

```
1. Client request পাঠায়
   Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
2. protect middleware চেক করে
   - Authorization header আছে কিনা
   - Bearer দিয়ে শুরু হয়েছে কিনা
   ↓
3. Token আলাদা করা
   "Bearer eyJhbGc..." → "eyJhbGc..."
   ↓
4. Token verify করা
   jwt.verify(token, JWT_SECRET)
   - Secret মিলে গেলে ✅
   - Secret মিল না গেলে ❌
   ↓
5. decoded পাই
   { id: user._id, role: user.role }
   ↓
6. User find করা
   User.findById(decoded.id).select('-password')
   ↓
7. req.user-এ সংরক্ষণ করা
   req.user = { _id: ..., name: ..., email: ..., role: ... }
   ↓
8. পরবর্তী middleware/controller চালানো
   next()
```

---

## 🧩 Common Middleware Patterns

| Pattern | উদাহরণ | কাজ |
|---------|--------|-----|
| **Authentication** | `protect` | logged in user check |
| **Authorization** | `authorize('admin')` | specific role check |
| **Validation** | `registerValidation` | input data check |
| **Error Handling** | `(err, req, res, next) => ...` | এরর catch করা |

---

## 🧪 Quick Test

### ধাপ ১: Server চালু করুন

```powershell
npm run dev
```

### ধাপ ২: Register API কল করুন (Postman দিয়ে)

- Method: `POST`
- URL: `http://localhost:5000/api/v1/auth/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "name": "রহিম আহমেদ",
    "email": "rahim@example.com",
    "password": "123456",
    "role": "member"
  }
  ```

### ধাপ ৩: Response দেখুন

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

> **✅ Register API কাজ করছে!** Token কপি করুন পরবর্তী use করার জন্য।

---

## 📝 এই পার্টে যা যা শিখেছি

| বিষয় | ব্যাখ্যা |
|------|---------|
| apiResponse helper | Unified response format |
| JWT token generation | Token create করার process |
| JWT token structure | Header, Payload, Signature |
| protect middleware | Authentication check করার process |
| Authorization header | Bearer token format |

---

## 🚀 পরবর্তী পার্টে যা যা থাকবে

**পার্ট ৫-এ আমরা শিখব:**
- `src/user/user.validation.js` - Input validation
- `src/user/user.controller.js` - API business logic

---

**শুভকামনা! 🎉** 
Helpers এবং Middleware setup সম্পূর্ণ! পরবর্তী পার্টে যান।
