import { type FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  options: any[];
  group: any[];
  handleChange: (e: any) => void;
  placeholder: string;
}

const SelectRe: FC<Option> = ({
  options,
  group,
  handleChange,
  placeholder,
}) => {
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {group.map((groups: any) => (
          <SelectGroup key={groups.key}>
            <SelectLabel>{groups.label}</SelectLabel>
            {options
              .filter((option) => option.key === groups.key)
              .map((option: any) => (
                <>
                  <SelectItem key={option.key} value={option.value}>
                    {option.value}
                  </SelectItem>
                </>
              ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectRe;
