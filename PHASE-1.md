# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - ফেজ ১: প্ল্যানিং ও ডিজাইন

> **শুরুতে সবাইকে স্বাগতম!** এই নটসটি শুরু থেকে শেষ পর্যন্ত Phase 1 এর সব কিছু ভাগ করে। আমরা সহজভাবে ধাপে ধাপে এগোBO যাতে কেউ প্রোগ্রামিং এ নতুন হলেও বুঝতে পারে।

---

## 🎯 Phase 1 এ আমরা কী করব?

**Phase 1 = আমাদের পুরো প্রোজেক্টের মানচিত্র তৈরি**

যেমন Kerala যাওয়ার আগে রুট ম্যাপ দেখেন, ঠিক তেমনি সফটওয়্যার বানানোর আগে আমরা সব কিছু প্ল্যান করব। এতে পরে কাজ করতে সময় ঘাবড়াতে হবে না।

---

## 📋 বর্তমান অবস্থা (কী কী ইতিমধ্যে বানিয়েছি?)

আপনার `G:\Live-Node` ফোল্ডারে কিছু কোড ইতিমধ্যে তৈরি আছে:

| ফাইল/ফোল্ডার | স্ট্যাটাস | বিবরণ |
|--------------|----------|--------|
| `package.json` | ✅ তৈরি | আমাদের প্রোজেক্টের নাম, ভার্সন, এবং প্রয়োজনীয় লাইব্রেরি গুলো। যেমন: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken` |
| `server.js` | ✅ তৈরি | আমাদের সিস্টেমের গেটওয়ে (মূল দরজা) -一切 কেবল এখান থেকে শুরু হয় |
| `src/app.js` | ✅ তৈরি | Express অ্যাপ কনফিগারেশন - CORS, JSON পার্স করার ব্যবস্থা |
| `src/config/db.js` | ✅ তৈরি | MongoDB ডাটাবেজ কানেক্ট করার কোড |
| `src/user/user.model.js` | ✅ তৈরি | User টেবিলের ডিজাইন - member, librarian, admin সব ধরনের ইউজার |
| `src/middleware/` | ⏳ শূন্য | পরে এখানে Auth, Role, Error হ্যান্ডলিং কোড লিখব |
| `src/user/` | ⏳ শূন্য | Controller, Route, Validation পরে লিখব |

**অর্থাৎ:** আমরা মৌলিক ভিত্তি তৈরি করে ফেলেছি! এখন Phase 1 এ প্ল্যান করে পরে সব কিছুত/systematically করতে পারব।

---

## 🧩 আমরা কী ধরনের সিস্টেম বানাচ্ছি?

**লাইব্রেরি ম্যানেজমেন্ট সিস্টেম (Library Management System)**

একটি লাইব্রেরির সব কাজকে অটোমেট করা হবে:

| কাজ | উদাহরণ |
|-----|--------|
| বই ক্যাটালগ ম্যানেজ | নতুন বই যোগ, পুরাতন মুছা, খুঁজে বের করা |
| লোন দেওয়া/নেওয়া | বই ধরে নেওয়া, ফেরত দেওয়া, রিনিউ করা |
| রিজার্ভেশন | কোনো বই currently unavailable হলে前排直Waiting লিস্টে নামানো |
| জরিমানা ক্যালকুলেশন |逾期 বইের জরিমানা কত, কYC計算 |
| নোটিফিকেশন | Email/SMS দিয়ে জানানো |

---

## 👥 সিস্টেমে কারা ব্যবহার করবে? (Role Based Access)

| রোল | শক্তি | কে ব্যবহার করবে? |
|-----|-------|-----------------|
| **Member** | বইRequest, Return, রিজার্ভেশন, নিজের প্রোফাইল | সাধারণ library গোল/users |
| **Librarian** | সব Member পাওয়ার + ক্যাটালগ ম্যানেজ, লোন approve | Library worker |
| **Admin** | সব ক্ষমতা | Library owner/manager |

> **রোল বেজড অ্যাক্সেস কন্ট্রোল (RBAC)** = বিভিন্ন রোলের ইউজারদের বিভিন্ন ধরনের কাজ করার অনুমতি দেওয়া। যেমন: Member কেবল свои কাজ করবে, Librarian সব Member + কিছু admin কাজ করবে, Admin সব।

---

## 📊 ডাটাবেজ ডিজাইন (MongoDB Mongoose Schema)

আমরা ৫টি মূল টেবিল/Collection বানাব:

### 1️⃣ User (ম Zambiaজারínformation)
```
-field-                -type-      -notes-
name                   String      ইউজারের নাম
email                  String      ইউনিক, লগইনে ব্যবহৃত
password               String      hassed, select: false
role                   String      member / librarian / admin
phone                  String      যোগাযোগ নম্বর
membershipId           String      ইউনিক, লাইব্রেরি মেম্বারশিপ আইডি
status                 String      active / suspended
fineBalance            Number      0 থেকে শুরু, জরিমাণের মোট বকেয়া
createdAt              Date        অটো টাইমস্ট্যাম্প
updatedAt              Date        আপডেটের সময় অটো যোগ হবে
```

### 2️⃣ Book (ক্যাটালগের বই)
```
-field-                -type-      -notes-
title                  String      বইয়ের নাম
author                 String      লেখকের নাম
isbn                    String      ইন্টারন্যাশনাল স্ট্যান্ডার্ড বুক নম্বর, ইউনিক
category               String      ক্যাটাগরি (Novel, Science, History etc.)
publisher              String      প্রকাশক
publishedYear          Number      প্রকাশের বছর
totalCopies            Number      মোট কপির সংখ্যা
availableCopies        Number      বর্তমানে lend করা যায় এমন কপি
keywords               [String]    অনুসন্ধানের জন্য keyword গুলো
status                 String      available / out_of_print / damaged
createdAt              Date        অটো
updatedAt              Date        অটো
```

### 3️⃣ Loan (Lending/借出 রেকর্ড)
```
-field-                -type-      -notes-
member                 ObjectId    User-এর reference
book                   ObjectId    Book-এর reference
copyId                 String      কপির আইডি (যদি একাধিক কপি থাকে)
loanDate               Date        Books দেওয়ার তারিখ
dueDate                Date        ফেরত দিতে হবে এর আগে
returnDate             Date     実際 ফেরত এসেছে (null হলে এখনও借中)
status                 String      active / returned / overdue / lost
renewalCount           Number      কতবার রিনিউ করা হয়েছে
fineAmount             Number     如果有延迟，几多 জরিমানা
createdAt              Date        অটো
updatedAt              Date        অটো
```

### 4️⃣ Reservation (Hold/予約 রেকর্ড)
```
-field-                -type-      -notes-
member                 ObjectId    User-এর reference
book                   ObjectId    Book-এর reference
reservationDate        Date        রিজার্ভ করার তারিখ
expiryDate             Date        কত তারিখ পর্যন্ত বইรলAmber available হলে রাখা হবে
status                 String      pending / fulfilled / cancelled / expired
notificationSent       Boolean     নোটিফিকেশন পাঠানো হয়েছে কিনা
createdAt              Date        অটো
updatedAt              Date        অটো
```

### 5️⃣ Fine (জরিমানা রেকর্ড)
```
-field-                -type-      -notes-
member                 ObjectId    User-এর reference
loan                   ObjectId    Loan-এর reference
amount                 Number      জরিমানার পরিমাণ
reason                 String      overdue / lost / damaged
paymentStatus          String      unpaid / paid / waived
paymentDate            Date        পরিশোধের তারিখ
paymentMethod          String      cash / card / online
createdAt              Date        অটো
updatedAt              Date        অটো
```

### 🔗 রিলেশনশিপ (কোন ডাটা কোন ডাটার সাথে যুক্ত)

| Parent | Child | সম্পর্ক |
|--------|-------|---------|
| User | Loan | একটি Member একাধিক Loan নিতে পারে |
| User | Reservation | একটি Member একাধিক Reservation করতে পারে |
| User | Fine | একটি Member একাধিক Fine থাকতে পারে |
| Book | Loan | একটি Book একাধিক Loan-তে থাকতে পারে |
| Book | Reservation | একটি Book একাধিক Reservation-তে থাকতে পারে |
| Loan | Fine | একটি Loan থেকে একটি Fine তৈরি হতে পারে |

> **বৈচিত্র্য:** Book → Loan (1-to-Many) অর্থাৎ ১টি বই প্র phenomenology不同বার lend করা যায়। User → Loan (1-to-Many) অর্থাৎ ১টি Member একাধিক Books lend নিতে পারে।

---

## 🛠️ টেক স্ট্যাক (আমরা কী কী টুল ব্যবহার করব?)

| অংশ | টুল/টেকনোলজি | কেন ব্যবহার করছি? |
|-----|----------------|-------------------|
| **Backend** | Node.js + Express.js | সারাIndy popular, শেখা সহজ, দ্রুত |
| **Database** | MongoDB + Mongoose | NoSQL, schema flexible, JSON এর মতো, স্কেল করার সহজ |
| **Authentication** | JWT (JSON Web Token) | Stateless, secure, API protection-এর জন্য সবচেয়ে ভাল |
| **Password Hashing** | bcryptjs | Password কে hash করে রাখে, ডাটাবেজ লিক হলেও আসল পাসওয়ার্ড বের করা যায় না |
| **Validation** | express-validator | ইনপুট চেক করার জন্য |
| **Hosting (Future)** | Railway / Vercel / Render | দেখ depois, এখন Cloudinary না Vercel Railway বা Render |
| **Version Control** | Git + GitHub | কোড সংরক্ষণ, collaboration |

---

## 🔌 মূল API কনট্রাক্ট (ক্লায়েন্ট ↔ সার্ভার যোগাযোগ)

API গুলো遵循 RESTful style হবে। সব রিকোয়েস্ট Header-তে JWT token থাকবে।

### Base URL
```
http://localhost:5000/api/v1
```

### Auth API (লগইন/রেজিস্ট্রেশন)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/auth/register` | নতুন অ্যাকাউন্ট তৈরি | Public |
| POST | `/auth/login` | লগইন, JWT Token পাবে | Public |
| GET | `/auth/me` | নিজের প্রোফাইল দেখ | Member+ |

### Book API (ক্যাটালগ)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/books` | সব Books খুঁজুন/লিস্ট | Public |
| GET | `/books/:id` | একটি Book এর বিস্তারিত | Public |
| POST | `/books` | নতুন Book যোগ | Librarian+ |
| PUT | `/books/:id` | Book এডিট | Librarian+ |
| DELETE | `/books/:id` | Book মুছে ফেলা | Admin |

### Loan API (借出Return)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/loans` | নতুন Loan তৈরি (Book borrow) | Member+ |
| GET | `/loans/my-loans` | নিজের সব Loan দেখ | Member+ |
| POST | `/loans/:id/return` | Book রিটার্ন | Librarian+ |
| POST | `/loans/:id/renew` | Loan রিনিউ | Member+ |

### Reservation API
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/reservations` | নতুন রিজার্ভেশন | Member+ |
| GET | `/reservations/my` | নিজের রিজার্ভেশন | Member+ |
| DELETE | `/reservations/:id` | রিজার্ভেশন বাতিল | Member+ |

### Fine API
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/fines/my-fines` | নিজের জরিমানা দেখ | Member+ |
| POST | `/fines/:id/pay` | জরিমানা পরিশোধ | Member+ |
| GET | `/admin/fines` | সব জরিমানা লিস্ট | Admin |

---

## 🎨 UI Wireframe (কেমন দেখাবে?)

> আমরা **Staff Dashboard** এবং **Member Portal** ২টি মূল ইন্টারফেস বানাব। এখন শুধু হাই-লেভেল আ Gla/d শেষে করে নেব।

### 🖥️ Staff Dashboard (লাইব্রেরিয়ান/এডমিনের জন্য)

```
+--------------------------------------------------+
|  📚 LMS Admin Panel                    [Logout]   |
+--------------------------------------------------+
|  [Dashboard] [Books] [Members] [Loans] [Fines]   |
+--------------------------------------------------+
|                                                  |
|  📊 Quick Stats:                                 |
|  ┌──────────┐ ┌──────────┐ ┌──────────┐         |
|  │ Total    │ │ Active   │ │ Pending  │         |
|  │ Books    │ │ Loans    │ │ Fines    │         |
|  │ 1,250    │ │ 45       │ │ 12       │         |
|  └──────────┘ └──────────┘ └──────────┘         |
|                                                  |
|  📋 Recent Loans:                                |
|  ┌────┬────────────┬────────────┬──────────┐    |
|  │ ID │ Member     │ Book       │ Due Date │    |
|  ├────┼────────────┼────────────┼──────────┤    |
|  │ 01 │ Rahim      │ Python 101 │ 10 Aug   │    |
|  │ 02 │ Karim      │ JS Guide   │ 12 Aug   │    |
|  └────┴────────────┴────────────┴──────────┘    |
+--------------------------------------------------+
```

### 👤 Member Portal (সাধারণ সদস্যের জন্য)

```
+--------------------------------------------------+
|  📚 My Library                      [Profile] 👤  |
+--------------------------------------------------+
|  [Browse Books] [My Loans] [Fines] [Reserve]     |
+--------------------------------------------------+
|                                                  |
|  🔍 Search Books:                                |
|  [________________________] [Search]             |
|                                                  |
|  📚 Recommended for You:                         |
|  ┌────────────────┐ ┌────────────────┐          |
|  │   Book Cover   │ │   Book Cover   │          |
|  │   Python 101   │ │   Data Science │          |
|  │   Available    │ │   3 copies     │          |
|  └────────────────┘ └────────────────┘          |
|                                                  |
|  📋 My Current Loans:                            |
|  ┌────────────────┬────────────┬────────┐       |
|  │ Book           │ Due Date   │ Status │       |
|  ├────────────────┼────────────┼────────┤       |
|  │ Clean Code     │ 15 Aug     │ Active │       |
|  │ Design Patterns│ 20 Aug     │ Active │       |
|  └────────────────┴────────────┴────────┘       |
+--------------------------------------------------+
```

---

## 📁 Phase 1-এর ফলাফল (Output)

Phase 1 শেষের পর আমাদের হাতে থাকবে:

1. ✅ **Requirement Document** - আমরা কী কী ফিচার বানাব, ময়লায় prioritize
2. ✅ **Database Schema** - MongoDB-এ কোন কোন Collection, কোন কোন Field
3. ✅ **Tech Stack finalized** - আমরা কোনো technology পরিবর্তন করব না
4. ✅ **API Plan** - কোন কোন Endpoint, কোন Method, কাকে কিসি দেব
5. ✅ **UI Wireframes** - কেমন দেখাবে, top-level design

---

## 🚀 Phase 2 তে আমরা কী করব?

Phase 1 দিয়ে Foundation তৈরি হয়ে গেলে Phase 2 এ:

1. folder structure সাজাব
2. Database connect করব + Migration
3. Authentication & Role-based access বানাব
4. Basic Logging & Error handling

---

## 📝 নোট

> **এই Phase 1 ডকুমেন্টটি `PHASE-1.md` নামে সেভ করা হয়েছে।** পরে আপডেট করতে চাইলে এই ফাইলটি এডিট করুন।
> 
> **কোডিং শেখার টিপস:** 
> - প্রতিটি API টেস্ট করবেন Postman বা Thunder Client দিয়ে
> - Console.log এর madhomে ডাটা দেখে বুঝুন
> - Git করে progression ট্র্যাক করুন
> - Questions থাকলে Google বা Documentation দেখুন

---

**শুভকামনা! 🎉** Phase 1 সম্পূর্ণ! এখন Phase 2 এ যাওয়ার সময়!
