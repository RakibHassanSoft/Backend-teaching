# 📮 Postman দিয়ে API টেস্ট করার পূর্ণাঙ্গ গাইড - Step by Step

> **এই গাইডটি absoluter beginner-এর জন্য।** আপনি যদি প্রথমবার Postman ব্যবহার করেন, তাহলে এই গাইড Follow করলে ১০০% বুঝতে পারবেন। প্রতিটি ক্লিক, প্রতিটি ট্যাব, প্রতিটি JSON bracket পর্যন্ত ব্যাখ্যা করা হয়েছে।

---

## 📑 সূচিপত্র

1. [প্রয়োজনীয় সফটওয়্যার](#প্রয়োজনীয়-সফটওয়্যার)
2. [Postman ইনস্টলেশন](#postman-ইনস্টলেশন)
3. [প্রথমবার Postman ওপেন করলে যা যা দেখবেন](#প্রথমবার-postman-ওপেন-কালে-যা-যা-দেখবেন)
4. [Postman Interface ইতিহাস - সব রকমের ডিফল্ট র保存十佳位置](#postman-interface-ইতিহাস---সব-রকমের-ডিফল্ট-Recent-十佳位置)
5. [প্রথম API Request তৈরি করা](#প্রথম-অapi-request-তৈরি-করা)
6. [Body যোগ করার সম্পূর্ণ গাইড](#body-যোগ-করের-সম্পূর্ণ-গাইড)
7. [Headers যোগ করার গাইড](#headers-যোগ-করের-গাইড)
8. [Send বাটন ও Response পড়ার গাইড](#send-বাটন-ও-response-পড়ার-গাইড)
9. [API 1: Welcome Route](#অapi-1-স্বাগতম-রুট)
10. [API 2: 404 টেস্ট](#অapi-2-404-টেস্ট)
11. [API 3: Registration](#অapi-3-রেজিস্ট্রেশন)
12. [API 4: Login](#অapi-4-লগইন)
13. [API 5: Get Profile](#অapi-5-প্রোফাইল-দেখা)
14. [API 6: Unauthorized Test](#অapi-6-অনঅনুমিত-টেস্ট)
15. [API 7: Validation Test](#অapi-7-ভ্যালিডেশন-টেস্ট)
16. [API 8: Duplicate Email Test](#অapi-8-ডুপ্লিকেট-ইমেইল-টেস্ট)
17. [API 9: Librarian Account](#অapi-9-লাইব্রেরিয়ান-অ্যাকাউন্ট)
18. [API 10: Admin Account](#অapi-10-অ্যাডমিন-অ্যাকাউন্ট)
19. [টেস্ট চেকলিস্ট](#টেস্ট-চেকলিস্ট)
20. [Environment Variables সেটআপ](#environment-variables-সেটআপ)
21. [সমস্যা সমাধান](#সমস্যা-সমাধান)

---

## 🛠️ প্রয়োজনীয় সফটওয়্যার

| সফটওয়্যার | ডাউনলোড লিংক | বর্তমান অবস্থা |
|------------|---------------|---------------|
| **Postman** | https://www.postman.com/downloads/ | আপনার কম্পিউটারে ইন্সটল করা থাকা চাই |
| **MongoDB** | https://www.mongodb.com/try/download/community | চলমান হতে চাই |
| **Node.js** | https://nodejs.org/ | ১৮+ ভার্সন ইন্সটল থাকা চাই |
| **Git** | https://git-scm.com/ | code manage করার জন্য |

> **চেক করুন:**
> - PowerShell ওপেন করুন: `node -v` → ১৮.x দেখাবে
> - `npm -v` → ৯.x দেখাবে
> - `mongod --version` → MongoDB ভার্সন দেখাবে

---

## 📥 Postman ইনস্টলেশন

### Windows-এ Postman ইনস্টল করার নিয়ম:

1. **https://www.postman.com/downloads/** ওপেন করুন
2. **Download for Windows** বাটন ক্লিক করুন
3. ডাউনলোড সম্পূর্ণ হলে `Postman-win64-Setup.exe` ফাইলดับเบল-ক্লিক করুন
4. **Yes** ক্লিক করুন (Admin permission চাইলে)
5. **Next** ক্লিক করুন
6. Install location সেট করুন (ডিফল্ট `C:\Users\HP\AppData\Local\Postman` ঠিক আছে)
7. **Next** → **Next** → **Install** ক্লিক করুন
8. ইনস্টল শেষ হলে **Finish** ক্লিক করুন
9. Postman অটোমেটিক ওপেন হবে

> **✅ প্রথমবার ওপেন হলে Sign Up পেজ দেখাবে। আপনি Skip এবং directly Use করুন।** শুধুমাত্র Google অ্যাকাউন্ট দিয়ে লগইন করতে চাইলে করতে পারেন, কিন্তু প্রয়োজন নেই।

---

## 🖥️ প্রথমবার Postman ওপেন করলে যা যা দেখবেন

Postman ওপেন হলে নিচের মতো একটি UI দেখাবে:

```
┌─────────────────────────────────────────────────────────────┐
│  Postman                                    [Search] [≡]     │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ Workspaces│                                                  │
│          │                                                  │
│ APIs     │                                                  │
│          │                                                  │
│ Collections│                                                 │
│          │                                                  │
│          │                                                  │
│          │                                                  │
│          │                                                  │
│          │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### বাম পাশের Menu:

| আইটেম | এর ব্যবহার |
|--------|-----------|
| **Workspaces** | ওয়ার্কস্পেস切换 |
| **APIs** | API Documentation |
| **Collections** | API রিকোয়েস্ট গুলো সংগ্রহ করা |
| **Mock servers** | Mock API তৈরি |
| **Monitors** | API মনিটরিং |

> **প্রথমে Collections ট্যাব ক্লিক করুন।**

---

## 📁 নতুন Collection তৈরি করা

API গুলো organised রাখার জন্য Collection তৈরি করব:

1. বাম পাশে **Collections** ক্লিক করুন
2. Collections পেজে উপরে **New** বাটন ক্লিক করুন (বা `+` আইকন)
3. নিচের পপআপ দেখাবে:

   ```
   ┌─────────────────────┐
   │ Create new          │
   │ [ ] Collection      │
   │ [ ] API             │
   │ [ ] Mock Server     │
   │ [ ] Documentation   │
   │ [ ] Environment     │
   │                     │
   │          [Cancel]   │
   └─────────────────────┘
   ```

4. **Collection** সিলেক্ট করুন
5. Collection নাম দিন: `Library Management API`
6. **Create** ক্লিক করুন

> **✅ একটি নতুন Collection তৈরি হবে।** বাম পাশে `Library Management API` নামে নতুন আইটেম দেখাবে।

---

## ➕ প্রথম API Request তৈরি করা

এখন আমাদের প্রথম API Request তৈরি করব:

### ধাপ ১: New Request ওপেন করা

1. Collection `Library Management API` এর উপরে **...** (তিনটি ডট) ক্লিক করুন
2. **Add request** ক্লিক করুন
3. Request নাম দিন: `Welcome Route`
4. **Save to Library Management API** সিলেক্ট করুন
5. **Save** ক্লিক করুন

**অথবা:**

1. বাম পাশের উপরের **New** বাটন ক্লিক করুন
2. **HTTP Request** সিলেক্ট করুন
3. নিচের গাইড Follow করুন

---

## 🎛️ Request Builder পূর্ণাঙ্গ গাইড

নতুন Request ওপেন হলে নিচের মতো UI দেখাবে:

```
┌─────────────────────────────────────────────────────────────┐
│  GET  [https://www.google.com]                    [Send]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Params] [Headers] [Body] [Auth] [Pre-request Script]     │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Request Builder-এর সব অংশ ব্যাখ্যা:

| অংশ | অবস্থান | ব্যবহার |
|-----|---------|---------|
| **Method Dropdown** | URL-এর বাম পাশে | GET, POST, PUT, DELETE সিলেক্ট করার জন্য |
| **URL Field** | মাঝের বড় অংশ | API এর URL দিন |
| **Send Button** | URL-এর ডান পাশে | Request পাঠানোর জন্য |
| **Tabs** | URL-এর নিচে | Params, Headers, Body, Auth, Settings |

---

## 🔧 Method সিলেক্ট করার গাইড

Method Dropdown ক্লিক করলে নিচের অপশন দেখাবে:

```
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS
```

**কোন Method কখন ব্যবহার করব:**

| Method | কখন ব্যবহার করব | উদাহরণ |
|--------|----------------|--------|
| **GET** | কোনো ডাটা পড়ার জন্য | সব বই দেখা, প্রোফাইল দেখা |
| **POST** | নতুন ডাটা তৈরি করার জন্য | নতুন user.register, নতুন loan |
| **PUT** | পুরাতন ডাটা সম্পূর্ণ update করার জন্য | Book এডিট |
| **PATCH** | আংশিক update করার জন্য | শুধুমাত্র password change |
| **DELETE** | কোনো ডাটা মুছে ফেলার জন্য | Book delete |

---

## 🔗 URL য_position করার গাইদ

URL Field-এ লিখুন:

```
http://localhost:5000/api/v1/auth/register
```

**URL এর গঠন:**

```
http://localhost:5000           ← base URL (our server)
         /api/v1                ← API version
               /auth            ← resource group
                  /register     ← specific endpoint
```

> **⚠️ গুরুত্বপূর্ণ:** `http://` বা `https://` ভুলে যাবেন না। `localhost:5000` এর Mumbai `5000` পোর্টটি ব্যবহার করছি।

---

## 📤 Send Button ক্লিক করার গাইড

Request Build করার পরে:

1. সব তথ্য ঠিক কিনা চেক করুন
2. URL Field-এর ডান পাশে থাকা **Send** বাটন ক্লিক করুন
3. নিচের অংশে Response দেখাবে

---

## 📥 Response দেখার গাইড

Send ক্লিক করলে নিচে নতুন একটি প্যান ওপেন হবে:

```
┌─────────────────────────────────────────────────────────────┐
│  Body   Cookies   Headers   Test Results   Pretty   Raw     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    "success": true,                                         │
│    "message": "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে",             │
│    "data": {                                                │
│      "user": {                                               │
│        "id": "65b1234567890abcdef12345",                     │
│        "name": "রহিম আহমেদ",                                 │
│        ...                                                   │
│      }                                                       │
│    }                                                         │
│  }                                                           │
│                                                             │
│  Status: 201 Created  Time: 45ms  Size: 245 B               │
└─────────────────────────────────────────────────────────────┘
```

### Response স._

| অংশ | মানের অর্থ |
|-----|-----------|
| **Status** | 200 OK = সফল, 201 = Created, 400 = Bad Request, 401 = Unauthorized, 404 = Not Found, 500 = Server Error |
| **Time** | কত মিলিসেকেন্ডে Response এলো |
| **Size** | Response এর আকার |
| **Body** | আসল Response এর ডাটা |
| **Headers** | Response এর Headers |
| **Cookies** | Response থেকে পাওয়া Cookies |

---

## 🧩 Body Tab-এ JSON পাঠানোর সম্পূর্ণ গাইড

### ধাপ ১: Body Tab খুঁজে বের করা

Request Builder-এ নিচের tabs দেখবেন:

```
[Params] [Headers] [Body] [Auth] [Pre-request Script]
```

**Body** ট্যাব ক্লিক করুন।

### ধাপ ২: Body Type সিলেক্ট করা

Body Tab ওপেন হলে ডান পাশে কিছু অপশন দেখাবে:

```
○ none
○ form-data
○ x-www-form-urlencoded
○ raw
○ binary
○ GraphQL
```

**raw** সিলেক্ট করুন।

### ধাপ ৩: Format সিলেক্ট করা

raw সিলেক্ট করলে ডান পাশে আরেকটি dropdown দেখাবে:

```
Text   JSON   JavaScript   HTML   XML   JSONP
```

**JSON** সিলেক্ট করুন।

> **⚠️ গুরুত্বপূর্ণ:** `JSON` সিলেক্ট না করলে API ডাটা বুঝতে পারবে না।

### ধাপ ৪: JSON টাইপ করা

নিচের text area-এ আপনার JSON কন্টেন্ট পেস্ট করুন:

```json
{
  "name": "রহিম আহমেদ",
  "email": "rahim@example.com",
  "password": "123456",
  "role": "member",
  "phone": "01712345678"
}
```

### JSON গঠনправир form:

```json
{
  "fieldName": "value",
  "anotherField": "anotherValue"
}
```

**নিয়ম:**

| নিয়ম | ব্যাখ্যা |
|-------|---------|
| `{` দিয়ে শুরু, `}` দিয়ে শেষ | সব JSON object bracket দিয়ে ঘেরে থাকবে |
| `"fieldName"` | সব field name ডবল কোয়োটেশন("-") এ থাকবে |
| `:` | field name এবং value এর মধ্যে colon(:) থাকবে |
| `,` | প্রতিটি line এর শেষে comma(,) থাকবে (শেষ line ছাড়া) |
| `"value"` | string value ডবল কোয়োট션 এ থাকবে |
| `true/false` | boolean value কোয়োটেশন ছাড়া |
| `123` | number value কোয়োটেশন ছাড়া |

### ভুল/common mistakes এড়াতে:

| ভুল | সঠিক |
|-----|------|
| `{name: "রহিম"}` | `{"name": "রহিম"}` |
| `{ "name": "রহিম", }` | `{ "name": "রহিম" }` (শেষ comma থাকবে না) |
| `{ name: রহিম }` | `{ "name": "রহিম" }` (value কোয়োট션 এ) |

### প্রমাণিত করার জন্য Screenshot-like guide:

```
Postman Request Builder এ:

1. প্রথমে Method dropdown-এ POST সিলেক্ট করুন
   ↓
2. URL field-এ http://localhost:5000/api/v1/auth/register লিখুন
   ↓
3. Headers tab ক্লিক করুন
   ↓
4. Key field-এ Content-Type লিখুন
   ↓
5. Value field-এ application/json লিখুন
   ↓
6. Body tab ক্লিক করুন
   ↓
7. ডান পাশে raw সিলেক্ট করুন
   ↓
8. raw এর পাশে dropdown থেকে JSON সিলেক্ট করুন
   ↓
9. নিচের text area-এ JSON পেস্ট করুন:
   {
     "name": "রহিম আহমেদ",
     "email": "rahim@example.com",
     "password": "123456"
   }
   ↓
10. Send button ক্লিক করুন
```

---

## 📝 Headers যোগ করার গাইড

### Headers Tab খুঁজে বের করা:

Request Builder-এর tabs এর মধ্যে **Headers** ক্লিক করুন।

### Headers Table:

Headers Tab-এ একটি table দেখাবে:

```
Key                Value
─────────────────────────────────────
Content-Type       application/json
```

### নতুন Header যোগ করার নিয়ম:

1. **Headers** ট্যাব ক্লিক করুন
2. নিচের table-এ **Key** column-এ header এর নাম লিখুন
3. **Value** column-এ header এর মান দিন
4. Enter ক্লিক করুন অথবা অন্য কোথাও ক্লিক করুন

### আমাদের API-এ য/testing Headers লাগবে:

| Key | Value | কখন লাগবে |
|-----|-------|-----------|
| `Content-Type` | `application/json` | POST/PUT request এ সবসময় লাগবে |
| `Authorization` | `Bearer eyJhbG...` | প্রটেক্টেড API কল করার সময় |

### Authorization Header যোগ করার গাইড:

**পূর্ণাঙ্গ Steps:**

1. **Headers** tab ক্লিক করুন
2. নিচের Key field-এ `Authorization` লিখুন (স্পেলিং সঠিক কিনা চেক করুন, বড় হাতের A)
3. Value field-এ `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` লিখুন
   - **গুরুত্বপূর্ণ:** `Bearer` এর পর একটি স্পেস(` `) থাকবে
   - এরপর JWT টোকেন বসবে
   - Format: `Bearer <your-token>`
4. Send ক্লিক করুন

**ভুল/common mistakes:**

| ভুল | সঠিক |
|-----|------|
| `Bearer:eyJhbG...` | `Bearer eyJhbG...` (colon নেই, space আছে) |
| `bearer eyJhbG...` | `Bearer eyJhbG...` (বড় হাতের B) |
| `eyJhbG...` | `Bearer eyJhbG...` (Bearer শব্দটি আসবে) |

---

## 🚀 Send Button ও Response পড়ার গাইড

### Send Buttonের অবস্থান:

```
┌──────────────────────────────────────────────────────────┐
│  POST  [http://localhost:5000/api/v1/auth/register]  [Send]│
│                                              ↑           │
│                                           এই বাটন         │
└──────────────────────────────────────────────────────────┘
```

Send button URL field-এর ডান পাশে থাকবে।

### Send ক্লিক করার পরে যা দেখবেন:

#### Status Bar (নিচের ডান কোণে):

```
Status: 201 Created  |  Time: 120ms  |  Size: 1.2 KB
```

| তথ্য | মান | অর্থ |
|------|-----|------|
| **Status** | 201 Created | সফলভাবে তৈরি হয়েছে |
| **Time** | 120ms | ০.১ সেকেন্ডে Response এলো |
| **Size** | 1.2 KB | Response এর আকার |

#### Response Body:

```
┌──────────────────────────────────────────────────────────┐
│ Pretty │ Raw │ Preview │ HTML │ XML │ JSON │ JavaScript   │
│   ↑                                                       │
│   এই Tab সিলেক্ট করুন JSON সুন্দরভাবে দেখাতে              │
└──────────────────────────────────────────────────────────┘

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

> **✅ সফল হলে `success: true` দেখাবে।**

#### Error Response:

```json
{
  "success": false,
  "message": "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে"
}
```

> **❌ ব্যর্থ হলে `success: false` দেখাবে।**

---

## 🔵 API 1: Welcome Route (API চলছে কিনা চেক)

###完全Steps:

1. **New Request** তৈরি করুন
2. Method = `GET` সিলেক্ট করুন
3. URL = `http://localhost:5000/`
4. Send ক্লিক করুন

### Expected Response:

```
লাইব্রেরি ম্যানেজমেন্ট API চালু হয়েছে!
```

### Status Code: `200 OK`

> **✅ API চলছে!**

---

## 🔵 API 2: 404 Test (রুট মিলবে না)

###完全Steps:

1. Method = `GET`
2. URL = `http://localhost:5000/api/v1/test-route`
3. Send ক্লিক করুন

### Expected Response:

```json
{
  "success": false,
  "message": "❌ /api/v1/test-route এই রুটটি পাওয়া যায়নি"
}
```

### Status Code: `404 Not Found`

> **✅ এরর handling কাজ করছে!**

---

## 🔵 API 3: নতুন User রেজিস্ট্রেশন (Member)

###完全Steps:

1. Method = `POST` সিলেক্ট করুন
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers Tab** ক্লিক করুন
4. Key = `Content-Type` লিখুন
5. Value = `application/json` লিখুন
6. **Body Tab** ক্লিক করুন
7. ডান পাশে **raw** সিলেক্ট করুন
8. dropdown থেকে **JSON** সিলেক্ট করুন
9. নিচের text area-এ JSON পেস্ট করুন:

```json
{
  "name": "রহিম আহমেদ",
  "email": "rahim@example.com",
  "password": "123456",
  "role": "member",
  "phone": "01712345678"
}
```

10. **Send** ক্লিক করুন

### Expected Response (Status: 201 Created):

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjEyMzQ1Njc4OTBhY2RlZjEyMzQ1Iiwicm9sZSI6Im1lbWJlciJ9.signature"
  }
}
```

### গুরুত্বপূর্ণ কাজ:

1. ✅ **token** কপি করুন (পুরোটা কপি করুন)
2. ✅ **user.id** কপি করুন
3. ✅ কোনো নোটপ্যাডে সেভ রাখুন

### JSON Field গঠন:

```json
{
  "name": "রহিম আহমেদ",     ← User এর নাম
  "email": "rahim@example.com", ← ইমেইল (ইউনিক হতে হবে)
  "password": "123456",         ← পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
  "role": "member",             ← member/librarian/admin
  "phone": "01712345678"        ← ফোন নম্বর (optional)
}
```

> **✅ Member অ্যাকাউন্ট তৈরি হয়েছে!**

---

## 🔵 API 4: লগইন (Member)

###完全Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/login`
3. **Headers Tab** ক্লিক করুন
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body Tab** ক্লিক করুন
   - raw → JSON সিলেক্ট করুন
5. JSON পেস্ট করুন:

```json
{
  "email": "rahim@example.com",
  "password": "123456"
}
```

6. **Send** ক্লিক করুন

### Expected Response (Status: 200 OK):

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjEyMzQ1Njc4OTBhY2RlZjEyMzQ1Iiwicm9sZSI6Im1lbWJlciJ9.signature"
  }
}
```

### গুরুত্বপূর্ণ কাজ:

✅ নতুন **token** কপি করুন (পুরোটা)

> **Token expires in 7 days**

---

## 🔵 API 5: নিজের প্রোফাইল দেখা (Member)

###完全Steps:

1. Method = `GET`
2. URL = `http://localhost:5000/api/v1/auth/me`
3. **Headers Tab** ক্লিক করুন
4. Key = `Authorization` লিখুন
5. Value = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` লিখুন
   - **গুরুত্বপূর্ণ:** `Bearer` এর পর একটি স্পেস থাকবে
   - পুরো টোকেন পেস্ট করুন
6. **Send** ক্লিক করুন

### Expected Response (Status: 200 OK):

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
      "membershipId": null,
      "phone": "01712345678",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Authorization Header-এর Structure:

```
Authorization: Bearer <token>
```

| অংশ | ব্যাখ্যা |
|-----|---------|
| `Authorization` | Header এর নাম |
| `:` | separator |
| `Bearer` | Token type |
| ` ` (space) | mandatory space |
| `<token>` | আপনার actual JWT token |

> **✅ প্রটেক্টেড API কাজ করছে!**

---

## 🔵 API 6: Authorization ছাড়া প্রোফাইল (401 Test)

###完全Steps:

1. Method = `GET`
2. URL = `http://localhost:5000/api/v1/auth/me`
3. **Headers Tab** ক্লিক করুন
4. কোনো Header যোগ **করবেন না**
5. **Send** ক্লিক করুন

### Expected Response (Status: 401 Unauthorized):

```json
{
  "success": false,
  "message": "লগইন করার জন্য অনুমতি নেই, টোকেন নেই"
}
```

> **✅ Security properly কাজ করছে!**

---

## 🔵 API 7: Validation Test (ইমেইল ছাড়া Register)

###完全Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers**:
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body** → raw → JSON:
5. JSON পেস্ট করুন:

```json
{
  "name": "করিম",
  "password": "123456"
}
```

> **⚠️ email field deliberately remove করা হয়েছে**

6. **Send** ক্লিক করুন

### Expected Response (Status: 400 Bad Request):

```json
{
  "success": false,
  "message": "A valid email is required"
}
```

> **✅ Validation কাজ করছে!**

---

## 🔵 API 8: Duplicate Email Test (409 Conflict)

###完全Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers**:
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body** → raw → JSON:
5. JSON পেস্ট করুন:

```json
{
  "name": "আরো কেউ",
  "email": "rahim@example.com",
  "password": "123456",
  "role": "member"
}
```

> **⚠️ email = rahim@example.com (পুরানো email ব্যবহার করা হয়েছে)**

6. **Send** ক্লিক করুন

### Expected Response (Status: 409 Conflict):

```json
{
  "success": false,
  "message": "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে"
}
```

> **✅ Duplicate check কাজ করছে!**

---

## 🔵 API 9: Librarian Account তৈরি

###完全Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers**:
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body** → raw → JSON:
5. JSON পেস্ট করুন:

```json
{
  "name": "কামরুল হকের",
  "email": "kamrul@library.com",
  "password": "admin123",
  "role": "librarian",
  "phone": "01812345678"
}
```

6. **Send** ক্লিক করুন

### Expected Response (Status: 201 Created):

```json
{
  "success": true,
  "message": "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে",
  "data": {
    "user": {
      "id": "65b9876543210fedcba98765",
      "name": "কামরুল হকের",
      "email": "kamrul@library.com",
      "role": "librarian"
    },
    "token": "..."
  }
}
```

> **✅ Librarian account তৈরি হয়েছে!**

---

## 🔵 API 10: Admin Account তৈরি

###完全Steps:

1. Method = `POST`
2. URL = `http://localhost:5000/api/v1/auth/register`
3. **Headers**:
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body** → raw → JSON:
5. JSON পেস্ট করুন:

```json
{
  "name": "সাবিনা ইসলাম",
  "email": "admin@library.com",
  "password": "admin123",
  "role": "admin",
  "phone": "01912345678"
}
```

6. **Send** ক্লিক করুন

### Expected Response (Status: 201 Created):

```json
{
  "success": true,
  "message": "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে",
  "data": {
    "user": {
      "id": "65c9876543210fedcba98766",
      "name": "সাবিনা ইসলাম",
      "email": "admin@library.com",
      "role": "admin"
    },
    "token": "..."
  }
}
```

> **✅ Admin account তৈরি হয়েছে!**

---

## 📊 সম্পূর্ণ টেস্ট চেকলিস্ট

| # | API | Method | Endpoint | Expected Status | টেস্ট করার জন্য Body/Headers |
|---|-----|--------|----------|----------------|--------------------------|
| 1 | Welcome | GET | `/` | 200 | কোনো Body/Header লাগবে না |
| 2 | 404 Test | GET | `/api/v1/test` | 404 | কোনো Body/Header লাগবে না |
| 3 | Register Member | POST | `/api/v1/auth/register` | 201 | Header: Content-Type, Body: JSON |
| 4 | Login Member | POST | `/api/v1/auth/login` | 200 | Header: Content-Type, Body: JSON |
| 5 | Get Profile | GET | `/api/v1/auth/me` | 200 | Header: Authorization: Bearer <token> |
| 6 | Unauthorized | GET | `/api/v1/auth/me` | 401 | কোনো Header লাগবে না |
| 7 | Validation | POST | `/api/v1/auth/register` | 400 | Header: Content-Type, Body: JSON (ব@endsection validation এরর দেখাতে) |
| 8 | Duplicate | POST | `/api/v1/auth/register` | 409 | Header: Content-Type, Body: JSON (পুরানো email দিয়ে) |
| 9 | Librarian | POST | `/api/v1/auth/register` | 201 | Header: Content-Type, Body: JSON (role: librarian) |
| 10 | Admin | POST | `/api/v1/auth/register` | 201 | Header: Content-Type, Body: JSON (role: admin) |

### প্রতিটি API টেস্ট করার Checklist:

- [ ] Status Code সঠিক কিনা চেক করুন
- [ ] Response message সঠিক কিনা চেক করুন
- [ ] Response data accurate কিনা চেক করুন
- [ ] Token পাওয়া গেছে কিনা চেক করুন (Register/Login এ)
- [ ] পুরো flow কাজ করছে কিনা চেক করুন

---

## 🎯 Postman Collection-এ সব Request সংরক্ষণ করুন

সব Request কে একটি Collection-এ রাখা ভাল:

1. **Collections** ট্যাব ক্লিক করুন
2. `Library Management API` এন্ড করুন
3. নিচে সব requests দেখাবে:

```
Library Management API
├── Welcome Route (GET /)
├── 404 Test (GET /api/v1/test)
├── Register Member (POST /api/v1/auth/register)
├── Login Member (POST /api/v1/auth/login)
├── Get Profile (GET /api/v1/auth/me)
├── Unauthorized Test (GET /api/v1/auth/me)
├── Validation Test (POST /api/v1/auth/register)
├── Duplicate Test (POST /api/v1/auth/register)
├── Librarian Account (POST /api/v1/auth/register)
└── Admin Account (POST /api/v1/auth/register)
```

> **✅ সব requests একটি Collection-এ রাখলে পরবর্তীতে বারবার URL টাইপ করতে হবে না।**

---

## 🌐 Environment Variables সেটআপ (Advanced)

যদি বারবার টোকেন কপি-পেস্ট করতে না চান:

### Environment তৈরি:

1.右上角 **Environment** dropdown ক্লিক করুন
2. **Edit** ক্লিক করুন
3. **Add** ক্লিক করুন
4. Environment নাম দিন: `Library Dev`
5. Variable যোগ করুন:

| Key | Value | Type |
|-----|-------|------|
| `base_url` | `http://localhost:5000` | Default |
| `token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Default |
| `user_id` | `65b1234567890abcdef12345` | Default |

6. **Save** ক্লিক করুন

### ব্যবহার:

- URL: `{{base_url}}/api/v1/auth/me`
  - Replace হবে: `http://localhost:5000/api/v1/auth/me`
- Headers: `Authorization: Bearer {{token}}`
  - Replace হবে: `Authorization: Bearer eyJhbG...`

> **✅ Variable পরিবর্তন হলে সব requests automatically আপডেট হবে!**

---

## 🐛 সাধারণ সমস্যা ও সমাধান

### সমস্যা 1: সার্ভার কানেক্ট হয় না (ECONNREFUSED)

**อาการ:** `Error: connect ECONNREFUSED 127.0.0.1:5000`

**কারণ:** 
- সার্ভার চলছে না
- Port 5000 ব্লক করা আছে

**সমাধান:**
1. PowerShell ওপেন করুন
2. `cd G:\Live-Node`
3. `npm run dev` চালান
4. `সার্ভার চালু হয়েছে পোর্ট 5000` দেখুন

### সমস্যা 2: MongoDB কানেক্ট হয় না

**อาการ:** `MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`

**সমাধান:**
```bash
# MongoDB start করুন
net start MongoDB

# চেক করুন
mongod --version
```

### সমস্যা 3: JWT_SECRET নেই

**อาการ:** `ReferenceError: JWT_SECRET is not defined`

**সমাধান:**
1. `G:\Live-Node\.env` ফাইল ওপেন করুন
2. নিচের লাইন যোগ করুন:
   ```
   JWT_SECRET=my_super_secret_key_12345_change_this_in_production
   ```
3. সংরক্ষণ করুন
4. সার্ভার রিস্টার্ট করুন

### সমস্যা 4: 401 Unauthorized (Token Problem)

**কারণসমূহ:**
1. Token Expired (7 দিন পরে expires)
2. Token ভুল format এ দিয়েছেন
3. Token কপিওয়ার সময় স-header印度綫

**সমাধান:**
1. আবার Login API কল করুন
2. নতুন token কপি করুন
3. Header-এ সঠিক format এ দিন:
   ```
   Authorization: Bearer <token>
   ```
4. `Bearer` এর পর স্পেস আছে কিনা চেক করুন

### সমস্যা 5: 404 Not Found

**কারণ:** URL ভুল

**সমাধান:**
- URL: `http://localhost:5000/api/v1/auth/register`
- `http://` সুত্রী যোন?
- `/api/v1/` অংশ আছে কিনা চেক করুন
- `auth/register` স্পেলিং সঠিক কিনা চেক করুন

### সমস্যা 6: 400 Bad Request (Validation Error)

**কারণ:** required field missing

**সমাধান:**
- JSON body-এ সব required field আছে কিনা চেক করুন
- name, email, password Required
- spelling এ ভুল আছে কিনা চেক করুন

### সমস্যা 7: 409 Conflict (Duplicate)

**কারণ:** ইতিমধ্যে email ব্যবহার করা হয়েছে

**সমাধান:**
- নতুন email ব্যবহার করুন
- অথবা সেই user দিয়ে লগইন করুন

### সমস্যা 8: 500 Internal Server Error

**কারণ:** Server error

**সমাধান:**
1. Server console-এর error দেখুন
2. MongoDB চলছে কিনা চেক করুন
3. `.env` ফাইল সঠিক কিনা চেক করুন

---

## 🎓 পরবর্তী Level এ যাওয়ার জন্য

### Phase 1 সফলভাবে সম্পূর্ণ করার পর:

✅ Auth API গুলো কাজ করছে
✅ JWT টোকেন properly কাজ করছে
✅ RBAC middleware প্রস্তুত
✅ Validation কাজ করছে
✅ এরর handling কাজ করছে

### পরবর্তী পদক্ষেপ:

**Phase 2:** Basic Project Setup
- Database Migration
- Folder Structure সাজানো
- Role-based access বাস্তবায়ন
- Logging & Error handling উন্নত

---

## 📞 সাহায্য এবং রিসোর্স

### Sheikhহumeric documentation:
- Postman Learning: https://learning.postman.com/docs/
- Express.js Guide: https://expressjs.com/
- MongoDB Guide: https://www.mongodb.com/docs/
- Mongoose Guide: https://mongoosejs.com/

### Community:
- Stack Overflow: https://stackoverflow.com/
- GitHub Issues: আপনার repository-এ issue করুন

### Mentor:
- কোনো সমস্যা হলে senior developer কে consult করুন
- documentation পড়ুন
- google করে error message খুঁজুন

---

## ✅ টিপস এবং ট্রিকস

1. **Collection Save করুন:** সব requests একটি Collection-এ রাখুন
2. **Environment Variables ব্যবহার করুন:** বারবার টোকেন কপি করতে হবে না
3. **Request Names স্পষ্ট দিন:** পরে বুঝতে সুবিধা হবে
4. **Folder ব্যবহার করুন:** Related requests গুলো folder-এ রাখুন
5. **Tests Script লিখুন:** Automatic verification করার জন্য

---

**শুভকামনা! 🎉** 
Postman API টেস্টিং এখন আপনার জন্যchild's play হবে!

---

## 📝 নোট

> **এই গাইডটি লিখ Date:** ২০২৫-০৯-০৬
> 
> **লেখক:** Kilo
> 
> **ভার্সন:** 1.0
> 
> **Last Updated:** Phase 1 Complete

---

**Question থাকলে:** Documentation দেখুন, Google করুন, Mentor জিজ্ঞাসা করুন।
