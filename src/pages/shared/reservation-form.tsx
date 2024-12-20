import {
  addDays,
  addHours,
  format,
  isBefore,
  isEqual,
  parse,
  startOfDay,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reservationEndpoints } from "@/environments/api-endpoints";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const FormSchema = z.object({
  date: z.date({ required_error: "Please select date" }),
  timeSlot: z.string({
    required_error: "Please select time slot.",
  }),
  guests: z.string({ required_error: "Please select number of guests" }),
});

type MakeReservationFormProps = {
  userId: number;
  restaurantId: number;
  workTime: string;
};

export function MakeReservationForm({
  userId,
  restaurantId,
  workTime,
}: MakeReservationFormProps) {
  const { t } = useTranslation();
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 6);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined,
      timeSlot: "",
      guests: "",
    },
  });

  const generateTimeSlots = (workTime: string) => {
    if (!workTime) return [];

    const normalizedWorkTime = workTime.replace(/\s*-\s*/g, "-");
    const [startTimeString, endTimeString] = normalizedWorkTime.split("-");

    const startTime = parse(startTimeString, "HH:mm", new Date());
    const endTime = parse(endTimeString, "HH:mm", new Date());

    const adjustedEndTime = addHours(endTime, -2);

    const timeSlots = [];
    let currentTime = startTime;

    while (
      isBefore(currentTime, adjustedEndTime) ||
      isEqual(currentTime, adjustedEndTime)
    ) {
      timeSlots.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      currentTime = addHours(currentTime, 1);
    }

    return timeSlots;
  };

  const availableTimeSlots = generateTimeSlots(workTime);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.timeSlot = `${data.timeSlot}:00`;
    const formattedDate = data.date.toLocaleDateString("en-CA").split("T")[0];
    let obj = {
      date: formattedDate,
      description: `Number of guests ${data.guests}`,
      time: data.timeSlot,
      userAccountId: userId,
      restaurantId: restaurantId,
    };

    axios
      .post(reservationEndpoints.makeReservation(), obj)
      .then(() => {
        toast({
          variant: "success",
          title: t("Making reservation"),
          description: t("Successfuly created reservation"),
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: t("Making reservation"),
          description: t("Reservation could not be created!"),
        });
        console.log(error);
      });

    form.reset();
  }

  return (
    <div className="w-full border border-gray-300 dark:border-gray-700 p-6 rounded-md">
      <div className="mb-4 text-slate-900 font-medium text-2xl dark:text-white">
        {t("Make reservation")}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>{t("Date")}</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{t("Pick a date")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      initialFocus
                      disabled={(day) => day < today || day > maxDate}
                      showOutsideDays={true}
                    />
                  </PopoverContent>
                </Popover>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("Time")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("Select time")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {availableTimeSlots.map((slot, index) => (
                      <SelectItem key={index} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("Number of guests")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("Select number of guests")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {[1, 2, 3, 4].map((slot, index) => (
                      <SelectItem key={index} value={slot.toString()}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {t("Create")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

// export { DatePickerDemo };
