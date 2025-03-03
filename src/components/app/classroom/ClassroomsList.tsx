"use client";

import { Classroom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import ClassroomItem from "./ClassroomItem";
import ClassroomService from "@/services/classroom.service";
import { useSession } from "next-auth/react";

const ClassroomsList = () => {
  const { data: session } = useSession();

  console.log("ClassroomsList session", session);

  const query = useQuery({
    queryKey: ["classrooms"],
    queryFn: () => ClassroomService.getAll(),
  });

  const classrooms = query.data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {classrooms?.map((classroom: Classroom) => (
        <ClassroomItem key={classroom.id} classroom={classroom} />
      ))}
    </div>
  );
};

export default ClassroomsList;
