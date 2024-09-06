import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface TreeViewItemProps {
  day: string[];
  index: number;
}

const TreeViewItem: React.FC<TreeViewItemProps> = ({ day, index }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`${index}`}
        key={index}
        className="border-none px-2"
      >
        <AccordionTrigger
          className={`${isOpened ? "pl-3 bg-muted text-violet-600" : ""} pr-1 hover:pl-3 mb-1 rounded-lg hover:bg-muted hover:text-violet-600 hover:no-underline transition-[padding] duration-150 font-semibold`}
          onClick={() => {
            setIsOpened(isOpened ? false : true);
          }}
        >{`C0${index}`}</AccordionTrigger>
        {day.map((exercise: string) => (
          <AccordionContent className="pl-3" key={exercise}>
            <div className="items-top flex space-x-2">
              <Checkbox
                id={exercise}
                className=""
                checked={isOpened ? true : false}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={exercise}
                  className="text-md font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {exercise}
                </label>
              </div>
            </div>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};
export default TreeViewItem;
