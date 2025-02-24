import { Metadata } from "next";

interface ClassrommPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classrooms/${id}`
  );
  const classroom = await res.json();

  return {
    title: classroom.classroomName,
  };
}

const ClassroomPage = async ({ params }: ClassrommPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classrooms/${id}`
  );
  const classroom = await res.json();

  return (
    <div>
      Classroom page with id {id} and title {classroom.classroomName}
    </div>
  );
};

export default ClassroomPage;
