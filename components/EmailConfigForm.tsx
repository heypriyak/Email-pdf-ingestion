"use client";
import { useState } from "react";

interface FormState {
  emailAddress: string;
  connectionType: string;
  host: string;
  username: string;
  password: string;
}

export default function EmailConfigForm() {
  const [form, setForm] = useState<FormState>({ emailAddress: "", connectionType: "", host: "", username: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/email-ingestion", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setMessage("Configuration saved successfully.");
      setForm({ emailAddress: "", connectionType: "", host: "", username: "", password: "" });
    } else {
      setMessage("Failed to save configuration.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email Address" value={form.emailAddress} onChange={(e) => setForm({ ...form, emailAddress: e.target.value })} required />
      <select value={form.connectionType} onChange={(e) => setForm({ ...form, connectionType: e.target.value })}>
        <option value="IMAP">IMAP</option>
        <option value="POP3">POP3</option>
      </select>
      <input type="text" placeholder="Host" value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })} required />
      <input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Save</button>
      {message && <p>{message}</p>}
    </form>
  );
}
