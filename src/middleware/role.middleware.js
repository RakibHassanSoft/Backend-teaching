// ============================================
// লাইব্রেরি ম্যানেজমেন্ট সিস্টেম - Role Based Access Control (RBAC)
// ============================================
// এই ফাইলটি রোল চেক করার মিডলওয়্যার রয়েছে।
// যেমন: শুধুমাত্র admin এই রুট অ্যাক্সেস করতে পারবে, member পারবে না।

// authorize = নির্দিষ্ট রোলের ইউজারদেরই অ্যাক্সেস দেবে
// ব্যবহার: router.post('/books', protect, authorize('admin', 'librarian'), controller.addBook)
const authorize = (...allowedRoles) => {
  // allowedRoles = ['admin', 'librarian'] = এই রোলগুলো만 access পাবে
  return (req, res, next) => {
    // 1. req.user-ে protect মিডলওয়ার হতে পাওয়া userId থাকবে
    // protect মিডলওয়্যার আগে চেক করে, তারপর এই authorize চলবে
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'প্রথমে লগইন করুন',
      });
    }

    // 2. ইউজারের রোল allowedRoles-এর মধ্যে আছে কিনা চেক করা
    // যেমন: allowedRoles = ['admin'], req.user.role = 'member'
    // তাহলে member কে access দেবে না
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `এই কাজের জন্য আপনার অনুমতি নেই। শুধুমাত্র ${allowedRoles.join(', ')} এই কাজ করতে পারে`,
      });
    }

    // 3. সব ঠিক আছে, পরবর্তী মিডলওয়্যার/controller-কে চালিয়ে যাওয়া
    next();
  };
};

// 4. মডিউল এক্সপোর্ট করা
module.exports = { authorize };
