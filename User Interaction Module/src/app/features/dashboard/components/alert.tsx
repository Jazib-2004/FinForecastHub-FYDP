import { Alert } from "@/components/ui/alert"; // Assuming you have an Alert component for showing messages

interface AddalertProps {
  showError: boolean;
  showSuccess: boolean;
  errorMessage: string;
}

const Addalert = ({ showError, showSuccess, errorMessage }: AddalertProps) => {
  return (
    <div>
      {showError && (
        <Alert variant="destructive">
          <p>{errorMessage}</p> 
        </Alert>
      )}
      {showSuccess && (
        <Alert variant="default">
          <p>Dataset successfully uploaded and validated!</p>
        </Alert>
      )}
    </div>
  );
};

export default Addalert;
