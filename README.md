# 📚 লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - শূন্যের থেকে সম্পূর্ণ গাইড

> **এই গাইডটি নতুন ডেভেলপারদের জন্য।** প্রতিটি ফাইল কখন, কী, কেমন লিখবেন, সবকিছু ধাপে ধাপে আলোচনা করা হয়েছে। কপি-পেস্ট করলেও শুধু_powerful না, বরং প্রতিটি লাইনের অর্থ বুঝুন।

---

## 📑 সূচীপত্র

### 🎓 টিউটোরIAL (7 Parts)

| পার্ট | শিরোনাম | ফাইল |
|------|---------|------|
| **Part 1** | প্রজেক্ট ওভারভিউ ও সেটআপ | [README-PART-1.md](README-PART-1.md) |
| **Part 2** | এনভায়রনমেন্ট ও সার্ভার কনফিগারেশন | [README-PART-2.md](README-PART-2.md) |
| **Part 3** | ডাটাবেজ কানেক্ট এবং মডেল | [README-PART-3.md](README-PART-3.md) |
| **Part 4** | হেল্পার ফাইল এবং মিডলওয়্যার | [README-PART-4.md](README-PART-4.md) |
| **Part 5** | ভ্যালিডেশন এবং কন্ট্রোলার | [README-PART-5.md](README-PART-5.md) |
| **Part 6** | রাউট এবং টেস্টিং | [README-PART-6.md](README-PART-6.md) |
| **Part 7** | সম্পূর্ণ ফ্লো এবং সমস্যা সমাধান | [README-PART-7.md](README-PART-7.md) |

### 📄 অন্যান্য ডকুমেন্ট

| ফাইল | বিবরণ |
|------|--------|
| [PHASE-1.md](PHASE-1.md) | প্রজেক্ট planning document |
| [POSTMAN-TEST.md](POSTMAN-TEST.md) | API testing guide |
| [package.json](package.json) | প্রজেক্ট configuration |

---

## 🎯 এই গাইডটি কাকে জন্য?

✅ **নতুন ডেভেলপার** - programming শিখছেন  
✅ **Beginner** - Node.js/Express初学者  
✅ **Student** - project built করতে চান  
✅ **Developer** - portfolio তৈরি করতে চান  

---

## 🚀 দ্রুত শুরু

### ১. প্রজেক্ট ক্লোন করুন (যদি GitHub এ থাকে)

```bash
git clone <your-repo-url>
cd Live-Node
```

### ২. প্রজেক্ট সেটআপ করুন

```bash
# Dependencies ইনস্টল করুন
npm install

# .env ফাইল তৈরি করুন (Part 2 এ দেখুন)
# MongoDB চালু করুন
net start MongoDB

# সার্ভার চালু করুন
npm run dev
```

### ৩. টিউটোরিয়াল শুরু করুন

**Part 1 থেকে শুরু করুন:** [README-PART-1.md](README-PART-1.md)

---

## 📚 টিউটোরিয়াল স্ট্রাকচার

### Part 1: প্রজেক্ট ওভারভিউ ও সেটআপ
- প্রজেক্ট overview
- প্রয়োজনীয় সফটওয়্যার
- প্রথম দিন সেটআপ
- ফোল্ডার স্ট্রাকচার

### Part 2: এনভায়রনমেন্ট ও সার্ভার কনফিগারেশন
- `.env` ফাইল
- `server.js`
- `src/app.js`

### Part 3: ডাটাবেজ কানেক্ট এবং মডেল
- `src/config/db.js`
- `src/user/user.model.js`

### Part 4: হেল্পার ফাইল এবং মিডলওয়্যার
- `src/utils/apiResponse.js`
- `src/utils/generateToken.js`
- `src/middleware/auth.middleware.js`

### Part 5: ভ্যালিডেশন এবং কন্ট্রোলার
- `src/user/user.validation.js`
- `src/user/user.controller.js`

### Part 6: রাউট এবং টেস্টিং
- `src/user/user.routes.js`
- Postman দিয়ে API টেস্টিং

### Part 7: সম্পূর্ণ ফ্লো এবং সমস্যা সমাধান
- সম্পূর্ণ flow recap
- সাধারণ সমস্যা ও সমাধান
- পরবর্তী পদক্ষেপ

---

## 🛠️ প্রজেক্ট স্ট্যাক

| অংশ | টুল/টেকনোলজি |
|-----|----------------|
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **Password Hashing** | bcryptjs |
| **Validation** | express-validator |
| **Testing** | Postman |

---

## 📂 ফোল্ডার স্ট্রাকচার

```
Live-Node/
├── .env                      # গোপন তথ্য
├── .env.example             # Environment variables example
├── .gitignore               # Git ignore list
├── package.json             # প্রজেক্ট configuration
├── package-lock.json        # Exact version track
├── server.js                # 🚪 Main entry point
├── PHASE-1.md               # Planning document
├── POSTMAN-TEST.md          # API testing guide
├── README.md                # এই ফাইল
├── README-PART-1.md         # Tutorial Part 1
├── README-PART-2.md         # Tutorial Part 2
├── README-PART-3.md         # Tutorial Part 3
├── README-PART-4.md         # Tutorial Part 4
├── README-PART-5.md         # Tutorial Part 5
├── README-PART-6.md         # Tutorial Part 6
├── README-PART-7.md         # Tutorial Part 7
└── src/                     # সব সোর্স কোড
    ├── app.js               # ⚙️ Express configuration
    ├── config/              # কনফিগারেশন
    │   └── db.js            # MongoDB connection
    ├── middleware/           # মিডলওয়্যার
    │   └── auth.middleware.js # JWT verify
    ├── utils/               # হেল্পার ফাংশন
    │   ├── apiResponse.js   # Response helper
    │   └── generateToken.js # JWT generate
    └── user/                # User module
        ├── user.model.js    # Schema
        ├── user.controller.js # Business logic
        ├── user.routes.js   # API endpoints
        └── user.validation.js # Validation rules
```

---

## 🎯 API Endpoints (Phase 1 Complete)

### Auth API

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | নতুন অ্যাকাউন্ট তৈরি | Public |
| POST | `/api/v1/auth/login` | লগইন, JWT Token পাবে | Public |
| GET | `/api/v1/auth/me` | নিজের প্রোফাইল দেখ | Member+ |

---

## 🚀 দ্রুত শুরু করার কমান্ড

```bash
# 1. Dependencies ইনস্টল
npm install

# 2. MongoDB চালু করুন
net start MongoDB

# 3. .env ফাইল তৈরি করুন
# (Part 2 এ দেখুন কেমন তৈরি করবেন)

# 4. সার্ভার চালু করুন
npm run dev

# 5. Postman দিয়ে টেস্ট করুন
# (Part 6 এ দেখুন কেমন টেস্ট করবেন)
```

---

## 📝 নোট

> **এই গাইডটি লিখ Date:** ২০২৫-০৯-০৬
> 
> **টিউটোরিয়াল Pharmer:** 7 Parts
> 
> **ভার্সন:** 1.0
> 
> **Last Updated:** Phase 1 Complete

---

## 🤝 Contribution

যদি এই গাইডে কোনো ভুল পাবেন বা improvement করার idea থাকে, তাহলে feel free to:

1. Fork করুন
2. Changes করুন
3. Pull Request পাঠান

---

## 📞 সাহায্য

### সমস্যা হলে:

1. **Part 7** এ সমস্যা সমাধান section দেখুন
2. **POSTMAN-TEST.md** এ টেস্টিং গাইড দেখুন
3. Documentation পড়ুন (Express, Mongoose, JWT)
4. Google করুন error message
5. Mentor কে consult করুন

---

## 🎓 Learning Path

```
Part 1: Overview & Setup ✅
    ↓
Part 2: Environment & Server ✅
    ↓
Part 3: Database & Model ✅
    ↓
Part 4: Helpers & Middleware ✅
    ↓
Part 5: Validation & Controller ✅
    ↓
Part 6: Routes & Testing ✅
    ↓
Part 7: Complete Flow & Troubleshooting ✅
    ↓
Phase 1 Complete! 🎉
    ↓
Phase 2: Book Module (Next)
```

---

**শুভকামনা! 🎉** 

এই গাইডটি আপনার কোডিং journey এ সাহায্য করবে। Practice করুন, question ask করুন, and keep learning!

**Happy Coding! 💻🚀**

---

## 📚 Quick Links

- [Part 1: Overview & Setup](README-PART-1.md)
- [Part 2: Environment & Server](README-PART-2.md)
- [Part 3: Database & Model](README-PART-3.md)
- [Part 4: Helpers & Middleware](README-PART-4.md)
- [Part 5: Validation & Controller](README-PART-5.md)
- [Part 6: Routes & Testing](README-PART-6.md)
- [Part 7: Complete Flow](README-PART-7.md)
- [PHASE-1.md](PHASE-1.md)
- [POSTMAN-TEST.md](POSTMAN-TEST.md)

---

**Question থাকলে:** Documentation দেখুন, Google করুন, Mentor জিজ্ঞাসা করুন।
