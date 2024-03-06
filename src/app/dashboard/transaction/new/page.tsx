import NewEditForm from "@/components/NewEditForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsAccountPage() {
  return (
    <Card className="md:mx-[30vw] md:my-[15vh] mx-[10vw] my-[10vh]">
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium">Add a new Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <NewEditForm />
      </CardContent>
    </Card>
  );
}
