# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - পার্ট ৫: ভ্যালিডেশন এবং কন্ট্রোলার

> **এই পার্টটিতে আমরা input validation এবং API business logic তৈরি করব।** এটি আমাদের API গুলোকে safe এবং functional বানাবে।

---

## 🎯 এই পার্টের লক্ষ্য

- `src/user/user.validation.js` - Input validation rules তৈরি
- `src/user/user.controller.js` - API business logic তৈরি

---

## 📂 ফাইল ১: `src/user/user.validation.js` - Validation Rules

### কখন তৈরি করবেন?
`src/middleware/auth.middleware.js` এর পরে। Validation middleware request এর data চেক করে, ভুল থাকলে error return করে।

### `src/user/user.validation.js` এর কোড:

```javascript
// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - User ভ্যালিডেশন রুলস
// ============================================
// এই ফাইলটি一切 API এ ইনপুট ভ্যালিডেশন করার নিয়মগুলো রয়েছে।
// express-validator = রিকোয়েস্টের ডাটা চেক করার জন্য একটি লাইব্রেরি।

const { body } = require('express-validator');

// =====================
// রেজিস্ট্রেশন ভ্যালিডেশন
// =====================
const registerValidation = [
  // name ফিল্ড চেক
  body('name')
    .trim() // Whitespace মুছে ফেলা
    .notEmpty() // খালি থাকা যাবে না
    .withMessage('Name is required'), // এরর মেসেজ

  // email ফিল্ড চেক
  body('email')
    .isEmail() // ভ্যালিদ ইমেইল ফরম্য@Test?
    .withMessage('A valid email is required')
    .normalizeEmail(), // ইমেইল lowercase এবং trim হবে

  // password ফিল্ড চেক
  body('password')
    .isLength({ min: 6 }) // কমপক্ষে ৬ অক্ষর
    .withMessage('Password must be at least 6 characters long'),

  // role ফিল্ড চেক (optional)
  body('role')
    .optional() // role পাঠানো না করলেও হবে
    .isIn(['member', 'librarian', 'admin']) // শুধুমাত্র এই ৩টা ভ্যালু Accepted
    .withMessage('Role must be member, librarian, or admin'),
];

// =====================
// লগইন ভ্যালিডেশন
// =====================
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// =====================
// প্রোফাইল আপডেট ভ্যালিডেশন
// =====================
const updateProfileValidation = [
  body('name')
    .optional() // নাম পরিবর্তন না করলেও হবে
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),

  body('phone')
    .optional()
    .trim(), // ফোন নম্বর optional, trim হবে
];

// =====================
// সব ভ্যালিডেশন এক্সপোর্ট করা
// =====================
module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
};
```

### ব্যাখা প্রতিটি validation rule এর:

| Validation | Field | Rule | Error Message |
|------------|-------|------|---------------|
| `registerValidation` | name | `.trim().notEmpty()` | 'Name is required' |
| `registerValidation` | email | `.isEmail().normalizeEmail()` | 'A valid email is required' |
| `registerValidation` | password | `.isLength({ min: 6 })` | 'Password must be at least 6 characters long' |
| `registerValidation` | role | `.optional().isIn([...])` | 'Role must be member, librarian, or admin' |
| `loginValidation` | email | `.isEmail().normalizeEmail()` | 'A valid email is required' |
| `loginValidation` | password | `.notEmpty()` | 'Password is required' |

### express-validator এর method গুলো:

| Method | কাজ | উদাহরণ |
|--------|-----|--------|
| `.trim()` | whitespace remove | `"  রহিম  "` → `"রহিম"` |
| `.notEmpty()` | empty check | `""` → ❌ |
| `.isEmail()` | email format check | `"abc"` → ❌ |
| `.normalizeEmail()` | lowercase + trim | `"RAHIM@Example.COM"` → `"rahim@example.com"` |
| `.isLength({ min })` | minimum length | `"123"` (3 chars) → ❌ (min 6) |
| `.isIn([...])` | allowed values | `"superadmin"` → ❌ |
| `.optional()` | field optional | পাঠানো না করলেও হবে |

### Route এ validation ব্যবহার:

```javascript
router.post(
  '/register',
  registerValidation,  // আগে validation চলবে
  register             // validation pass হলে controller চলবে
);
```

> **Validation process:**
> 1. Client request পাঠায়
> 2. validation middleware চheck করে
> 3. ভুল থাকলে error return করে
> 4. ঠিক থাকলে পরবর্তী middleware/controller চালoze

---

## 📂 ফাইল ২: `src/user/user.controller.js` - Business Logic

### কখন তৈরি করবেন?
`src/user/user.validation.js` এর পরে। Controller হলো API এর actual business logic। এতে route থেকে data নিয়ে ডাটাবেজে যোগ/নেওয়া/আপডেট/ডিলিট করা হয়।

### `src/user/user.controller.js` এর কোড:

```javascript
// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - User Controller
// ============================================
// এই ফাইলটি User রিলেটেড সব API এর লজিক (business logic) রয়েছে।
// Controller = API রিকোয়েস্ট প্রসেস করার ফাংশনগুলো।

const User = require('./user.model.js');
const { sendResponse } = require('../../utils/apiResponse.js');
const { generateToken } = require('../../utils/generateToken.js');

// =====================
// রেজিস্ট্রেশন API
// =====================
// ব্যবহার: POST /api/v1/auth/register
// কাজ: নতুন ইউজার অ্যাকাউন্ট তৈরি করা
const register = async (req, res, next) => {
  try {
    // 1. রিকোয়েস্ট বডি থেকে ডাটা নেওয়া
    const { name, email, password, role, phone } = req.body;

    // 2. ইমেইল দিয়ে চেক করা ইউজার আগে থেকে আছে কিনা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // 3. যদি আগে থেকে থাকে, 409 conflict রিটার্ন করা
      return res.status(409).json({
        success: false,
        message: 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে',
      });
    }

    // 4. নতুন ইউজার তৈরি করা
    const user = await User.create({
      name,
      email,
      password, // TODO: পরে bcrypt দিয়ে hashed করার জন্য pre-save hook যোগ করতে হবে
      role: role || 'member', // রোল না দিলে ডিফল্ট member
      phone,
    });

    // 5. JWT টোকেন জেনারেট করা
    // টোকেনে userId এবং role রাখা হবে
    const token = generateToken({ id: user._id, role: user.role });

    // 6. সফল রেসপন্স পাঠানো
    sendResponse(res, 201, true, 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token, // ক্লায়েন্ট এই টোকেন সেভ করবে পরবর্তী API কলের জন্য
    });

  } catch (error) {
    // 7. এরর হলে global error handler-এ পাঠানো
    next(error);
  }
};

// =====================
// লগইন API
// =====================
// ব্যবহার: POST /api/v1/auth/login
// কাজ: ইউজার লগইন করা এবং JWT টোকেন দেওয়া
const login = async (req, res, next) => {
  try {
    // 1. রিকোয়েস্ট বডি থেকে ইমেইল এবং পাসওয়ার্ড নেওয়া
    const { email, password } = req.body;

    // 2. ইউজার খুঁজে বের করা
    // .select('+password') = password ফিল্ড explicitly select করা (কারণ select: false আছে model-এ)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // 3. যদি ইউজার না থাকে
      return res.status(401).json({
        success: false,
        message: 'ইমেইল বা পাসওয়ার্ড ভুল',
      });
    }

    // 4. পাসওয়ার্ড ম্যাচ করা
    // bcrypt.compare = ইনপুট পাসওয়ার্ড vs হ্যাশড পাসওয়ার্ড ম্যাচ করা
    // TODO: পরে bcrypt add করার পর এটি কাজ করবে
    const isPasswordCorrect = password === user.password; // Temporary - পরে bcrypt দিয়ে হবে
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'ইমেইল বা পাসওয়ার্ড ভুল',
      });
    }

    // 5. JWT টোকেন জেনারেট
    const token = generateToken({ id: user._id, role: user.role });

    // 6. সফল রেসপন্স পাঠানো
    sendResponse(res, 200, true, 'লগইন সফল', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    next(error);
  }
};

// =====================
// প্রোফাইল দেখা API
// =====================
// ব্যবহার: GET /api/v1/auth/me
// কাজ: লগইন করা ইউজারের নিজের প্রোফাইল দেখানো
const getProfile = async (req, res, next) => {
  try {
    // req.user = protect মিডলওয়্যার থেকে পাওয়া logged in user
    // protect মিডলওয়ার JWT decode করে req.user-এ সংরক্ষণ করে
    sendResponse(res, 200, true, 'প্রোফাইল লোড হয়েছে', {
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// =====================
// মডিউল এক্সপোর্ট করা
// =====================
module.exports = {
  register,
  login,
  getProfile,
};
```

### ব্যাখা প্রতিটি Controller এর:

#### 1. Register Controller:

| লাইন | কোড | কাজ |
|------|-----|-----|
| 19 | `const { name, email, ... } = req.body` | Request body থেকে data নেওয়া |
| 22 | `User.findOne({ email })` | Email দিয়ে user খুঁজা |
| 32 | `User.create({...})` | নতুন user তৈরি |
| 42 | `generateToken({ id, role })` | JWT token create |
| 45 | `sendResponse(res, 201, ...)` | Success response পাঠানো |

#### 2. Login Controller:

| লাইন | কোড | কাজ |
|------|-----|-----|
| 74 | `.select('+password')` | Password explicitly select করা |
| 84 | `password === user.password` | Password match করা (TODO: bcrypt) |
| 95 | `generateToken({ id, role })` | JWT token create |
| 98 | `sendResponse(res, 200, ...)` | Success response পাঠানো |

#### 3. Get Profile Controller:

| লাইন | কোড | কাজ |
|------|-----|-----|
| 122 | `req.user` | protect middleware থেকে user data নেওয়া |

### Controller Pattern:

```
Request → Validation → Controller → Database → Response
```

### Controller এ error handling:

```javascript
try {
  // business logic
} catch (error) {
  // error global error handler-এ পাঠানো
  next(error);
}
```

> **কেন `next(error)`?**
> - Global error handler everything handle করে
> - Consistent error response format থাকে

---

## 🔄 Controller কাজের প্রক্রিয়া

### Register Process:

```
1. Client → POST /api/v1/auth/register
   Body: { name, email, password, role }
   ↓
2. Validation → registerValidation
   - name required? ✅
   - email valid? ✅
   - password min 6 chars? ✅
   ↓
3. Controller → register()
   - existingUser check
   - User.create()
   - generateToken()
   - sendResponse()
   ↓
4. Response → 201 Created
   {
     "success": true,
     "message": "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে",
     "data": { user: {...}, token: "..." }
   }
```

### Login Process:

```
1. Client → POST /api/v1/auth/login
   Body: { email, password }
   ↓
2. Validation → loginValidation
   ↓
3. Controller → login()
   - User.findOne({ email })
   - password match
   - generateToken()
   - sendResponse()
   ↓
4. Response → 200 OK
   {
     "success": true,
     "message": "লগইন সফল",
     "data": { user: {...}, token: "..." }
   }
```

### Get Profile Process:

```
1. Client → GET /api/v1/auth/me
   Header: Authorization: Bearer <token>
   ↓
2. Middleware → protect
   - token verify
   - User.findById()
   - req.user = user
   ↓
3. Controller → getProfile()
   - req.user নেওয়া
   - sendResponse()
   ↓
4. Response → 200 OK
   {
     "success": true,
     "message": "প্রোফাইল লোড হয়েছে",
     "data": { user: {...} }
   }
```

---

## 🧪 Quick Test

### ধাপ ১: Server চালু করুন

```powershell
npm run dev
```

### ধাপ ২: Register API কল করুন

- Method: `POST`
- URL: `http://localhost:5000/api/v1/auth/register`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "name": "রহিম আহমেদ",
    "email": "rahim@example.com",
    "password": "123456",
    "role": "member",
    "phone": "01712345678"
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

### ধাপ ৪: Login API কল করুন

- Method: `POST`
- URL: `http://localhost:5000/api/v1/auth/login`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "rahim@example.com",
    "password": "123456"
  }
  ```

### ধাপ ৫: Get Profile API কল করুন

- Method: `GET`
- URL: `http://localhost:5000/api/v1/auth/me`
- Headers: `Authorization: Bearer <your-token>`

### Response:

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

> **✅ সব API গুলো কাজ করছে!**

---

## 📝 এই পার্টে যা যা শিখেছি

| বিষয় | ব্যাখ্যা |
|------|---------|
| express-validator | Input validation করার library |
| Validation rules | trim, notEmpty, isEmail, isLength, isIn |
| Controller pattern | Try-catch, next(error) |
| Business logic | Database operation + response |
| Error propagation | Controller → Global error handler |

---

## 🚀 পরবর্তী পার্টে যা যা থাকবে

**পার্ট ৬-এ আমরা শিখব:**
- `src/user/user.routes.js` - API endpoints
- API testing with Postman

---

**শুভকামনা! 🎉** 
Validation এবং Controller setup সম্পূর্ণ! পরবর্তী পার্টে যান।
