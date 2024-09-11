import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Day } from "@/app/features/days/daysSlice";

interface TreeViewItemProps {
  day: Day;
  index: number;
}

const DayItem: React.FC<TreeViewItemProps> = ({ day, index }) => {
  return (
    <Accordion type="multiple">
      <AccordionItem
        value={`${index}`}
        key={index}
        className="w-full border-none px-2"
      >
        <AccordionTrigger
          className={`${day.isOpened ? "lg:pl-3 bg-muted text-violet-600" : ""} lg:hover:pl-3 block mb-1 lg:text-left text-center rounded-lg hover:bg-muted hover:text-violet-600 hover:no-underline transition-[padding] duration-150 font-semibold`}
        >
          {day.name}
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};
export default DayItem;
