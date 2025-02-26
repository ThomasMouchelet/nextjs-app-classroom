"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import ClassroomService from "@/services/classroom.service";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ButtonCrudActionProps {
  type: "submit" | "button";
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  textAction?: string;
  textLoading?: string;
  model: "classroom";
  action: "create" | "update" | "remove";
  id?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelService = {
  classroom: ClassroomService,
};

const ButtonCrudAction = ({
  className,
  type,
  textLoading,
  textAction,
  variant = "default",
  model,
  action,
  id,
  setOpen,
}: ButtonCrudActionProps) => {
  const queryClient = useQueryClient();
  const formContext = useFormContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data?) => {
      console.log("mutationFn", data);
      const payload = action === "remove" ? { id } : data;
      console.log("payload", payload);
      const result = await ModelService[model][action](payload);

      return result;
    },
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.invalidateQueries({ queryKey: [`${model}s`] });
      const message =
        action === "create" ? "Classroom created" : "Classroom deleted";
      toast(message);

      if (action !== "remove") {
        setOpen && setOpen(false);
      }

      if (action === "remove") {
        router.push("/");
      }
      // setOpen && setOpen(false);
    },
    onError: (data) => {
      console.log("error", data);
      // toast("Classroom created error");
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleClick", action);
    if (action === "create" || action === "update") {
      console.log("create update");
      event.preventDefault();
      formContext.handleSubmit((data) => {
        mutation.mutate(data);
      })();
    } else {
      console.log("remove");
      // Pour remove, on lance directement la mutation sans données supplémentaires
      mutation.mutate();
    }
  };

  return (
    <Button
      type={type}
      variant={variant}
      className={`${className}`}
      onClick={handleClick}
    >
      {mutation.isPending ? (
        <span className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" />
          <span>{textLoading}</span>
        </span>
      ) : (
        textAction
      )}
    </Button>
  );
};

export default ButtonCrudAction;
