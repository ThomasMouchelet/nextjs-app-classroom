import { Classroom } from "@prisma/client";
import Link from "next/link";

const ClassroomsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`);
  const classrooms = await res.json();

  console.log("classrooms", classrooms);

  return (
    <div>
      <h1>Classrooms page</h1>

      <div>
        {classrooms?.map((classroom: Classroom) => (
          <div key={classroom.id}>
            <Link href={`/classrooms/${classroom.id}`}>
              <h2>{classroom.name}</h2>
              <p>{classroom.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomsPage;
