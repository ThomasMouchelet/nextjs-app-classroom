import ClassroomForm from "@/components/app/classroom/ClassroomForm";
import PrimaryDialog from "@/components/app/common/PrimaryDialog";
import { Classroom } from "@prisma/client";
import Link from "next/link";

const ClassroomsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`);
  const classrooms = await res.json();

  console.log("classrooms", classrooms);

  return (
    <div className="container mx-auto py-10">
      <h1>Classrooms page</h1>

      <div className="my-10">
        <PrimaryDialog
          title="Ajouter une classe"
          textButton="Ajouter une annonce"
        >
          <ClassroomForm className="mt-10" />
        </PrimaryDialog>
      </div>

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
    </div>
  );
};

export default ClassroomsPage;
