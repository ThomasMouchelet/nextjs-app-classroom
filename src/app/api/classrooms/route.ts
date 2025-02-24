import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log("GET classrooms");
  console.log("GET req", req);

  return NextResponse.json({ message: "Get all calssrooms" });
}
