import { Button } from "@/components/ui/button";
import { UseMutationResult } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

interface ButtonCrudActionProps {
  mutation: UseMutationResult<unknown>;
  type: "submit" | "button";
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  textAction?: string;
  textLoading?: string;
}

const ButtonCrudAction = ({
  mutation,
  className,
  type,
  textLoading,
  textAction,
  variant = "default",
}: ButtonCrudActionProps) => {
  return (
    <Button type={type} variant={variant} className={`${className}`}>
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
