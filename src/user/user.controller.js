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
