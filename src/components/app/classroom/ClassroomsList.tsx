"use client";

import { getAll } from "@/services/classroom.service";
import { Classroom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ClassroomsList = () => {
  const query = useQuery({
    queryKey: ["classrooms"],
    queryFn: () => getAll(),
  });

  const classrooms = query.data;

  return (
    <div>
      {classrooms?.map((classroom: Classroom) => (
        <div key={classroom.id}>
          <Link href={`/classrooms/${classroom.id}`}>
            <h2>{classroom.classroomName}</h2>
            <p>{classroom.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ClassroomsList;
