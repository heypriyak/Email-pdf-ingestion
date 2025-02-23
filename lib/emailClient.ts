import Imap from "imap";
import { simpleParser } from "mailparser";
import fs from "fs";
import path from "path";

interface EmailConfig {
  username: string;
  password: string;
  host: string;
}

export async function fetchEmails(config: EmailConfig) {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: config.username,
      password: config.password,
      host: config.host,
      port: 993,
      tls: true,
    });

    imap.once("ready", () => {
      imap.openBox("INBOX", false, () => {
        imap.search(["UNSEEN"], (err, results) => {
          if (err || !results.length) {
            imap.end();
            return resolve([]);
          }

          const f = imap.fetch(results, { bodies: "", struct: true });
          f.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream as any as Stream).then(parsed => {
                if (parsed.attachments && parsed.attachments.length > 0) {
                  parsed.attachments.forEach((attachment) => {
                    if (attachment.filename) {
                      const filePath = path.join("public/pdfs", attachment.filename);
                      fs.writeFileSync(filePath, attachment.content);
                    } else {
                      console.error("Attachment filename is undefined");
                    }
                  });
                }
              }).catch(err => {
                console.error("Error parsing email:", err);
              });
            });
          });

          f.once("end", () => {
            imap.end();
            resolve("Emails fetched.");
          });
        });
      });
    });

    imap.once("error", (err) => {
      console.error("IMAP error:", err);
      reject(err);
    });
    imap.connect();
  });
}
