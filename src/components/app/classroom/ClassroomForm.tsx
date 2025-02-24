"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Classroom } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

interface ClassroomFormProps {
  className?: string;
}

const ClassroomForm = ({ className }: ClassroomFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Classroom>();
  const onSubmit: SubmitHandler<Classroom> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-2 ${className}`}
    >
      <Input
        defaultValue="test"
        {...(register("name"), { require: "Le titre est obligatoire" })}
      />
      {errors.name && <span>{errors.name.message}</span>}

      <Input defaultValue="description" {...register("description")} />

      <Button type="submit" variant="default">
        Ajouter
      </Button>
    </form>
  );
};

export default ClassroomForm;
