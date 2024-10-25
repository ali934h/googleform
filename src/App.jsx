import React, { useState } from "react";

function MyForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    turnstileToken: "",
  });

  const handleTurnstileCallback = (token) => {
    setFormData({ ...formData, turnstileToken: token });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwDEzRzvz_LH3yHIgfAcZqAFQ9iR9a10n5cTmIi4qy3mXWNQbYRRhvimq9Ea1l9nGO-cQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <textarea name="message" placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

      <div className="cf-turnstile" data-sitekey="0x4AAAAAAAyalHge0Gz924BM" data-callback="handleTurnstileCallback"></div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
