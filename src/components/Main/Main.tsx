import Landing from "./components/Landing";
import { days } from "./data/days";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Main = () => {
  return (
    <div className="container mx-auto">
      {/* Landing */}
      <Landing />

      {/* main */}
      <main className="flex gap-4">
        <aside className="w-[22%] px-5 max-w-[340px]">
          {days.map((day: string[], index: number) => {
            return (
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="item-1"
                  key={index}
                  className="border-none px-2"
                >
                  <AccordionTrigger className="rounded-lg hover:bg-muted hover:text-violet-600 hover:no-underline hover:pl-2 mb-1 transition-all duration-150 font-semibold">{`C0${index}`}</AccordionTrigger>
                  {day.map((exercise: string) => (
                    <AccordionContent className="pl-3">
                      <div className="items-top flex space-x-2">
                        <Checkbox id={exercise} className="" />
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
          })}
        </aside>
        <div className="w-[45%] h-[542px] flex-1">
          <div className="h-full">
            <div className="h-full">
              <div className="h-full">
                <div className="flex flex-col h-full rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                      Files
                    </h3>
                  </div>
                  <div className="p-6 pt-0 flex-1">
                    <div className="h-full flex flex-col flex-wrap gap-2">
                      <div
                        role="presentation"
                        className="border rounded border-border p-16 flex justify-center items-center flex-1"
                      >
                        <input
                          accept="text/html,.pdf,.doc,.docx,.txt"
                          type="file"
                          name="file"
                          style={{ display: "none" }}
                        />
                        <div className="flex flex-col items-center justify-center gap-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-10 w-10 fill-current"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <div className="items-center justify-center text-center">
                            <p className="text-sm text-zinc-600">
                              Drag &amp; drop files here, or click to select
                              files
                            </p>
                            <span
                              className="text-xs text-zinc-500 dark:text-zinc-300"
                              id="file_type_help"
                            >
                              Supported File Types: .c .h
                            </span>
                          </div>
                        </div>
                      </div>
                      <p
                        className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-300"
                        id="file_input_help"
                      >
                        Don't be Dumb and upload other files. Such a moran.
                      </p>
                      <div className="">
                        <Button className="w-full">Start Blending</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
