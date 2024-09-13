import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface TestResultProps {
  exercise: string;
  fileTests: {
    result: string;
    status: string;
  };
}

const getTestColor = (status: string): string => {
  if (status == "OK") return "text-green-400";
  if (status == "KO") return "text-red-400";
  return "";
};

const TestResult = ({ exercise, fileTests }: TestResultProps) => {
  return (
    <AccordionItem className="w-full border-none px-0" value={exercise}>
      <AccordionTrigger
        className={cn("py-3 text-left", getTestColor(fileTests.status))}
      >
        <Drawer>
          <DrawerTrigger className="text-left">
            {exercise.split(".c")[0]}: {fileTests.status}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="mx-auto w-full max-w-sm gap-4 text-left pb-0">
              <DrawerTitle>{exercise.split(".c")[0]} tests</DrawerTitle>
              <DrawerDescription>
                {fileTests.result.length != 0
                  ? fileTests.result.split("\n").map((x) => {
                      return <div key={x}>{x}</div>;
                    })
                  : "Nothing turned in"}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="mx-auto w-full max-w-sm">
              <Button>Cancel</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </AccordionTrigger>
    </AccordionItem>
  );
};
export default TestResult;
