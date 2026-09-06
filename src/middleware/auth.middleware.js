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
