"use client";

import { useParams } from "next/navigation";

const ClassroomPage = () => {
  const params = useParams();
  const { id } = params;

  console.log(params);

  return <div>Classroom page with id {id}</div>;
};

export default ClassroomPage;
