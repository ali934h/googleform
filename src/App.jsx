import React, { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sheetId = "1K0hVmrYsf7Pw3ZRT58Te9KS46NWOTfXdNvX4U_yP2bI";
    const apiKey = "AIzaSyAo4piZWmbcIn33fczNWBau81gs-zoyBNk";

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/FormResponses:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    const body = {
      values: [[new Date().toISOString(), email]],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data added successfully:", data);
      } else {
        console.error("Error:", response.statusText);
      }
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
