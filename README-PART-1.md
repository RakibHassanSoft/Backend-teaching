# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - পার্ট ১: প্রজেক্ট ওভারভিউ ও সেটআপ

> **এই পার্টটি নতুন ডেভেলপারদের জন্য।** প্রজেক্ট কী, কেন আমরা এটি বানাচ্ছি, এবং প্রথম দিন কী করব—সবকিছু আলোচনা করা হয়েছে।

---

## 🎯 আমরা কী বানাচ্ছি?

আমরা **লাইব্রেরি ম্যানেজমেন্ট সিস্টেম (LMS)** বানাচ্ছি। এটি একটি ওয়েব অ্যাপ্লিকেশন যার মাধ্যমে লাইব্রেরির সব কাজ অটোমেট হবে।

### LMS কী করে?

| কাজ | ব্যাখ্যা |
|-----|---------|
| 📖 **বই ক্যাটালগ** | নতুন বই যোগ, পুরাতন মুছা, খুঁজে বের করা |
| 🔄 **লোন দেওয়া/নেওয়া** | বই ধরে নেওয়া, ফেরত দেওয়া, রিনিউ করা |
| ⏳ **রিজার্ভেশন** | বই unavailable হলে ওয়েটিং লিস্টে নামানো |
| 💰 **জরিমানা ক্যালকুলেশন** |逾期 বইের জরিমানা কত, ক্যাম্পিউট করা |
| 📧 **নোটিফিকেশন** | Email/SMS দিয়ে জানানো |

### কারা ব্যবহার করবে?

| রোল | শক্তি | কে? |
|-----|-------|-----|
| **Member** | বই বাছুন, Return, Renew, নিজের প্রোফাইল | সাধারণ library ব্যবহারকারী |
| **Librarian** | সব Member + ক্যাটালগ ম্যানেজ, লোন Approve | Library worker |
| **Admin** | সব ক্ষমতা | Library owner/manager |

> **রোল বেজড অ্যাক্সেস কন্ট্রোল (RBAC)** = বিভিন্ন রোলের ইউজারদের বিভিন্ন ধরনের কাজ করার অনুমতি দেওয়া।

---

## 🛠️ আমরা কী টুল ব্যবহার করব?

| অংশ | টুল/টেকনোলজি | কেন? |
|-----|----------------|------|
| **Backend** | Node.js + Express.js | জনপ্রিয়, শেখা সহজ, দ্রুত |
| **Database** | MongoDB + Mongoose | NoSQL, schema flexible, JSON এর মতো |
| **Authentication** | JWT (JSON Web Token) | Stateless, secure, API protection-এর জন্য |
| **Password Hashing** | bcryptjs | Password কে hash করে রাখে, ডাটাবেজ লিক হলেও আসল পাসওয়ার্ড বের করা যায় না |
| **Validation** | express-validator | ইনপুট চেক করার জন্য |
| **Version Control** | Git + GitHub | কোড সংরক্ষণ, collaboration |

---

## 📋 প্রয়োজনীয় সফটওয়্যার

আপনার কম্পিউটারে নিচের সফটওয়্যার গুলো ইন্সটল এবং কনফিগার হতে হবে:

| সফটওয়্যার | minimum ভার্সন | চেক করার কমান্ড |
|-------------|---------------|-----------------|
| **Node.js** | 18+ | `node -v` |
| **npm** | 9+ | `npm -v` |
| **MongoDB** | 6+ | `mongod --version` |
| **Git** | any | `git --version` |

> **চেক করুন:** PowerShell ওপেন করে উপরের কমান্ড গুলো চালান। সঠিক ভার্সন দেখাবে।

### Node.js ইন্সটল (যদি না থাকে)

1. https://nodejs.org/ ওপেন করুন
2. **LTS** ভার্সন ডাউনলোড করুন (18.x বা 20.x)
3. ইনস্টল করুন
4. PowerShell ওপেন করে `node -v` চেক করুন

### MongoDB ইন্সটল (যদি না থাকে)

1. https://www.mongodb.com/try/download/community ওপেন করুন
2. Windows MSI installer ডাউনলোড করুন
3. ইনস্টল করুন
4. PowerShell ওপেন করে `mongod --version` চেক করুন
5. MongoDB service start করুন:
   ```powershell
   net start MongoDB
   ```

---

## 🚀 প্রথম দিন: প্রজেক্ট সেটআপ

### ধাপ ১: নতুন ফোল্ডার তৈরি

PowerShell ওপেন করে নিচের কমান্ড চালান:

```powershell
mkdir G:\Live-Node
cd G:\Live-Node
```

> **কেন `G:\Live-Node`?** 
> - `G:` drive আপনার có thể drive
> - `Live-Node` হলো প্রজেক্টের নাম
> - আপনার পছন্দমতো নাম দিন, কিন্তু পরে সব পাথ আপডেট করতে হবে

### ধাপ ২: Git Initialized

```powershell
git init
```

> **কেন Git?** 
> - কোডের version track করার জন্য
> - পরে GitHub এ push করার জন্য
> - collaboration করার জন্য

### ধাপ ৩: package.json তৈরি

```powershell
npm init -y
```

এটি Creates একটি `package.json` ফাইল। এর মধ্যে কিছু গুলো auto-generated হবে।

> **কেন `package.json` দরকার?** 
> - নতুন ডেভেলপার আপনার প্রজেক্ট clone করলে `npm install` চালিয়ে সব লাইব্রেরি auto install হবে
> - `npm run dev` চালিয়ে সার্ভার চালু হবে
> - এটি নিশ্চিত করে যে সবাই একই version-এর লাইব্রেরি ব্যবহার করছে

### ধাপ ৪: required লাইব্রেরি ইনস্টল

```powershell
npm install express mongoose cors dotenv jsonwebtoken bcryptjs express-validator
npm install --save-dev nodemon
```

> **কেন প্রতিটি লাইব্রেরি দরকার?**
> - `express` = ওয়েব সার্ভার framework
> - `mongoose` = MongoDB JavaScript driver
> - `cors` = Cross-origin request allow করার জন্য
> - `dotenv` = .env ফাইল থেকে variables load করার জন্য
> - `jsonwebtoken` = JWT টোকেন তৈরি এবং verify করার জন্য
> - `bcryptjs` = পাসওয়ার্ড hash করার জন্য
> - `express-validator` = ইনপুট ভ্যালিডেশনের জন্য
> - `nodemon` = Development এ auto-reload করার জন্য

---

## 📁 ফোল্ডার স্ট্রাকচার

আমাদের প্রজেক্টের ফোল্ডার স্ট্রাকচার নিচের মতো হবে:

```
Live-Node/
├── .env                      # গোপন তথ্য (JWT secret, MongoDB URL)
├── .env.example             # Environment variables এর উদাহরণ
├── .gitignore               # Git এ ignore করার ফাইল গুলো
├── package.json             # প্রজেক্ট configuration
├── package-lock.json        # Exact version track করে
├── server.js                # 🚪 সার্ভারের main entrance
├── PHASE-1.md               # প্রজেক্ট planning document
├── POSTMAN-TEST.md          # API testing guide
└── src/                     # সব সোর্স কোড এই ফোল্ডারে
    ├── app.js               # ⚙️ Express অ্যাপ কনফিগারেশন
    ├── config/              # কনফিগারেশন ফাইল গুলো
    │   └── db.js            # MongoDB connection
    ├── middleware/           # মিডলওয়্যার গুলো (Auth, Role, Error)
    │   └── auth.middleware.js # JWT verify করার মিডলওয়্যার
    ├── utils/               # রebiz usefulness ফাংশন গুলো
    │   ├── apiResponse.js   # API response helper
    │   └── generateToken.js # JWT token generate
    └── user/                # User related সব ফাইল
        ├── user.model.js    # User schema (MongoDB table design)
        ├── user.controller.js # API business logic
        ├── user.routes.js   # API endpoints (URL patterns)
        └── user.validation.js # Input validation rules
```

### ফোল্ডার স্ট্রাকচার ক套这样 vaWhy?

| ফোল্ডার/ফাইল | কেন আলাদা? |
|--------------|-----------|
| **src/** | সব সোর্স কোড এক জায়গায় রাখা |
| **config/** | কনফিগারেশন ফাইল গুলো আলাদা ফোল্ডারে |
| **middleware/** | রিকোয়েস্ট প্রসেস করার আগের/পরে চলanyi ছব |
| **utils/** | বারবার ব্যবহার করা হেল্পার ফাংশন গুলো |
| **user/** | User related সব ফাইল একসাথে রাখা (Model, Controller, Route, Validation) |
| **server.js** | main entry point, সব কিছু এখান থেকে শুরু হয় |
| **.env** | গোপন তথ্য, Git এ push করা হয় না |

### ফোল্ডার তৈরি করার কমান্ড:

```powershell
# src ফোল্ডার তৈরি
mkdir src

# src/এর ভেতরে ফোল্ডার গুলো তৈরি
mkdir src\config
mkdir src\middleware
mkdir src\utils
mkdir src\user
```

---

## 📝 পরবর্তী পার্টে যা যা থাকবে

**পার্ট ২-এ আমরা শিখব:**
- `.env` ফাইল তৈরি
- `server.js` লিখা
- `src/app.js` কনফিগার করা

---

**শুভকামনা! 🎉** 
প্রজেক্ট সেটআপ সম্পূর্ণ! পরবর্তী পার্টে যান।
