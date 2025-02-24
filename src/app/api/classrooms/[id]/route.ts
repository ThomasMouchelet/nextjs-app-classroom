import { IParams } from "@/types/api.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: IParams) {
  console.log("GET ONE classroom");
  console.log("GET req", req);
  const { id } = await params;

  return NextResponse.json({ message: `GET ONE classrooms with id: ${id}` });
}
