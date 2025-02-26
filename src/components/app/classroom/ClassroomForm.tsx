"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Classroom } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorMessage from "../common/FormErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { create } from "@/services/classroom.service";
import { LoaderCircle } from "lucide-react";

interface ClassroomFormProps {
  className?: string;
}

const ClassroomForm = ({ className }: ClassroomFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Classroom>();

  const mutation = useMutation({
    mutationFn: async (formData: Classroom) => {
      const classroom = await create(formData);

      return classroom;
    },
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (data) => {
      console.log("error", data);
    },
  });

  const onSubmit: SubmitHandler<Classroom> = (data) => mutation.mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-2 ${className}`}
    >
      <Input
        type="text"
        placeholder="Entrez votre nom de classe"
        {...register("classroomName", { required: "Le titre est obligatoire" })}
      />
      {errors.classroomName && (
        <FormErrorMessage message={errors.classroomName.message as string} />
      )}

      <Input
        placeholder="Entrez votre description de classe"
        type="text"
        {...register("description")}
      />

      <Button type="submit" variant="default">
        {mutation.isPending ? (
          <span className="flex items-center gap-2">
            <LoaderCircle className="animate-spin" />
            <span>Enregistrement...</span>
          </span>
        ) : (
          "Enregistrer"
        )}
      </Button>
    </form>
  );
};

export default ClassroomForm;
