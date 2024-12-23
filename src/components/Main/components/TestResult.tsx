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
    <AccordionItem
      className="w-full border-none px-0 overflow-scroll"
      value={exercise}
    >
      <AccordionTrigger className={cn("py-3 text-left")}>
        <Drawer>
          <DrawerTrigger
            className={cn("text-left", getTestColor(fileTests.status))}
          >
            {exercise.split(".c")[0]}: {fileTests.status}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="w-full gap-4 text-left pb-0 overflow-scroll">
              <DrawerTitle className="font-semibold">
                {exercise.split(".c")[0]}: {fileTests.status}
              </DrawerTitle>
              <DrawerDescription>
                {fileTests.result.length != 0
                  ? fileTests.result.split("\n").map((x) => {
                      return (
                        <div
                          className={cn(
                            "py-2 text-[16px] font-semibold w-full",
                            getTestColor(fileTests.status),
                          )}
                          key={x}
                        >
                          {x}
                        </div>
                      );
                    })
                  : fileTests.status}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="mx-auto w-full max-w-sm">
              <DrawerClose>
                <Button className="w-full">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </AccordionTrigger>
    </AccordionItem>
  );
};
export default TestResult;
