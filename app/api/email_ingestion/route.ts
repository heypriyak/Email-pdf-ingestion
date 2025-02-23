import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fetchEmailsHandler } from "./fetchEmails";

export async function GET(): Promise<NextResponse> {
  await fetchEmailsHandler();
  return NextResponse.json({ message: "Emails checked." });
}

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.json();
  const newConfig = await prisma.emailIngestionConfig.create({
    data,
  });
  return NextResponse.json(newConfig);
}
