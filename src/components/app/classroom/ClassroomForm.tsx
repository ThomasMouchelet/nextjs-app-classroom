"use client";

import { Input } from "@/components/ui/input";
import { Classroom } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorMessage from "../common/FormErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { create } from "@/services/classroom.service";
import ButtonCrudAction from "../common/ButtonCrudAction";

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

      <ButtonCrudAction
        mutation={mutation}
        type="submit"
        textAction="Ajouter"
        textLoading="Ajout en cours..."
        variant="default"
      />
    </form>
  );
};

export default ClassroomForm;
