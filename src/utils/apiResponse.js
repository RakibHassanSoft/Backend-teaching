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
