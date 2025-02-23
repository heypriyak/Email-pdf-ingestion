import { useEffect, useState } from "react";

interface Email {
  id: string;
  emailAddress: string;
  connectionType: string;
}

export default function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    fetch("/api/email-ingestion")
      .then((res) => res.json())
      .then((data) => setEmails(data));
  }, []);

  return (
    <ul>
      {emails.map((email) => (
        <li key={email.id}>{email.emailAddress} ({email.connectionType})</li>
      ))}
    </ul>
  );
}
