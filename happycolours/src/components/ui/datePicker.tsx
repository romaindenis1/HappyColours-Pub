"use client";

import { DatePicker } from "rsuite";
import { useState } from "react";

type Props = {
  onDateChange: (value: Date | null) => void;
};
export default function DatePickerr({ onDateChange }: Props) {
  const [value, setValue] = useState<Date | null>(new Date());
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    onDateChange(newValue);
  };

  return (
    <div>
      <DatePicker
        onChange={handleChange}
        value={value}
        format="y-MM-dd HH:mm"
      />
    </div>
  );
}
