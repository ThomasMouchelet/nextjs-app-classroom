import { Classroom } from "@prisma/client";
import axios from "axios";

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/classrooms`;

export async function create(credentials: Classroom): Promise<Classroom> {
  const res = await axios.post(END_POINT, credentials);
  return res.data;
}

export async function getAll(): Promise<Classroom[]> {
  const res = await axios.get(END_POINT);
  return res.data;
}
