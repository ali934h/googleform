import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTurnstileCallback = (token) => {
    setTurnstileToken(token);
  };

  useEffect(() => {
    // قرار دادن تابع در window برای دسترسی Turnstile
    window.handleTurnstileCallback = handleTurnstileCallback;
    return () => {
      delete window.handleTurnstileCallback;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert("Please complete the security check.");
      return;
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwDEzRzvz_LH3yHIgfAcZqAFQ9iR9a10n5cTmIi4qy3mXWNQbYRRhvimq9Ea1l9nGO-cQ/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, "cf-turnstile-response": turnstileToken }),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="App">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>

        <div className="cf-turnstile" data-sitekey="0x4AAAAAAAyalHge0Gz924BM" data-callback="handleTurnstileCallback"></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
