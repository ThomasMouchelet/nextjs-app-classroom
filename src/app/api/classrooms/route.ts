import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export function GET(req: NextRequest) {
  console.log("GET classrooms");
  console.log("GET req", req);

  return NextResponse.json({ message: "Get all calssrooms" });
}

export async function POST(req: NextRequest) {
  console.log("POST classrooms");
  console.log("POST req", req);

  // Récupérer le body de la requête
  const body = await req.json();
  console.log("POST classroom body", body);

  // create a new classroom with Prisma
  const classroom = await prisma.classroom.create({
    data: {
      name: body.name,
      description: body.description,
    },
  });

  console.log("POST classroom response create prisma", classroom);

  // return response
  return NextResponse.json(classroom, { status: 201 });
}
