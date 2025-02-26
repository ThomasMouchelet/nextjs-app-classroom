import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface ButtonCrudActionProps {
  mutation: { isPending: boolean };
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
