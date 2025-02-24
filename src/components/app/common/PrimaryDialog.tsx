import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PrimaryDialogProps {
  children: React.ReactNode;
  title?: string;
  textButton?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

const PrimaryDialog = ({
  children,
  title,
  textButton = "Ouvrir",
  variant = "default",
}: PrimaryDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{textButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PrimaryDialog;
