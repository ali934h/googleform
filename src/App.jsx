import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://googleworker.kenconsidine90.workers.dev/"; // آدرس Worker شما

    const body = {
      values: [[new Date().toISOString(), email]], // تاریخ و ایمیل
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json(); // خواندن پاسخ به JSON
      console.log("Response from worker:", responseData); // لاگ کردن پاسخ

      if (response.ok) {
        setMessage("ایمیل با موفقیت ارسال شد!");
        setEmail(""); // پاک کردن ایمیل بعد از ارسال
      } else {
        console.error("Error:", responseData);
        setMessage("خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("خطا در اتصال به سرور.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">فرم ارسال ایمیل</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          ایمیل
        </label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
          ارسال
        </button>
        {message && <p className="text-sm text-red-500">{message}</p>} {/* نمایش پیام */}
      </form>
    </div>
  );
}

export default App;
