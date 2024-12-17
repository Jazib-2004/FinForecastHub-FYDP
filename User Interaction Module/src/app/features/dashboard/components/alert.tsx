import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function Addalert({ showSuccess }: any, showError: any) {
  return (
    <>
      {showSuccess && (
        <Alert variant="default" className="mt-2 mx-2  justify-center">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Dataset uploaded successfully! 
            actions.
          </AlertDescription>
        </Alert>
      )}

      {showError && (
        <Alert variant="destructive" className="mt-2 mx-2 justify-center">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No file selected.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
