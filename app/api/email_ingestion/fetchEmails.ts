import { fetchEmails } from "@/lib/emailClient";
import prisma from "@/lib/prisma";

export async function fetchEmailsHandler() {
  const configs = await prisma.emailIngestionConfig.findMany();
  for (const config of configs) {
    await fetchEmails(config);
  }
}
