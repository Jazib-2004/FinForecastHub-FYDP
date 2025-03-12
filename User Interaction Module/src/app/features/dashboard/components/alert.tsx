"use client";
import { Alert } from "@/components/ui/alert";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface AddalertProps {
  showError: boolean;
  showSuccess: boolean;
  errorMessage: string;
}

const Addalert = ({ showError, showSuccess, errorMessage }: AddalertProps) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<"default" | "destructive">("default");

  useEffect(() => {
    if (showError || showSuccess) {
      setVisible(true);
      setType(showError ? "default" : "destructive");
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showError, showSuccess]);

  if (!visible) return null;

  return (
    <div className="animate-fade-in-up">
      <Alert
        variant={type}
        className={cn(
          "relative flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm",
          type === "default"
            ? "border-red-200/80 bg-red-50/90"
            : "border-emerald-200/80 bg-emerald-50/90"
        )}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        {type === "default" ? (
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
        ) : (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
        )}

        <div className="flex-1">
          <p
            className={cn(
              "text-sm font-medium",
              type === "default" ? "text-red-900" : "text-emerald-900"
            )}
          >
            {type === "default" ? "Something went wrong" : "Success!"}
          </p>
          <p
            className={cn(
              "text-sm",
              type === "default" ? "text-red-800/90" : "text-emerald-800/90"
            )}
          >
            {type === "default" ? errorMessage : "Dataset uploaded and validated"}
          </p>
        </div>
      </Alert>
    </div>
  );
};

export default Addalert;