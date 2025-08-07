"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Dropdown = ({
  children,
  //   categories,
  top = null,
  content,
}: {
  children: ReactNode;
  top: string | null;
  content: Record<string, string>;
}) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <AccordionItem value={top || "item"} className="border-b-0">
      <AccordionTrigger className="justify-between flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:bg-muted">
        <div className="flex gap-3 justify-between items-center">
          {children}
          {top && <p>{top}</p>}
        </div>
      </AccordionTrigger>
      <AccordionContent className="ml-3 pb-1">
        {Object.keys(content)?.map((key, index) => (
          <Link
            href={content[key]}
            key={index}
            className="flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:text-primary"
          >
            <p>{key}</p>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Dropdown;
