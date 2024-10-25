import React, { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ارسال داده به بک‌اند
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwDEzRzvz_LH3yHIgfAcZqAFQ9iR9a10n5cTmIi4qy3mXWNQbYRRhvimq9Ea1l9nGO-cQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        ایمیل
      </label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
        ارسال
      </button>
    </form>
  );
}

export default EmailForm;
