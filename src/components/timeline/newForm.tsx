"use client";
import { uploadEntry } from "@/app/timeline/actions";
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
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
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
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { EntryProps } from "@/lib/db";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRoles } from "@prisma/client";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ShinyButton } from "./submit-button";
export enum FormStatus {
  UNSUBMITTED,
  PENDING,
  SUCCESS,
  ERROR,
}

const formSchema = z.object({
  title: z.string().min(2).max(16),
  date: z.coerce.date(),
  tags: z.array(z.string()).nonempty("Válassz legalább egy elemet").optional(),
  access_level: z.enum(["USER", "CLASSMATE", "TEACHER", "STAFF"]),
  description: z.string(),
  attendants: z.array(z.string()).optional(),
});

export default function NewEntryForm({ users }: { users: User[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      attendants: [],
      date: new Date(),
    },
  });

  const [submitted, SetSubmitted] = useState<boolean>(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: EntryProps = {
      access_level: values.access_level as UserRoles,
      attendants: values.attendants || [],
      date: values.date,
      description: values.description,
      tags: values.tags || [],
      title: values.title,
    };
    SetSubmitted(true);
    uploadEntry(data).then(() => {
      setTimeout(() => {
        SetSubmitted(false);
        toast.success("Esemény létrehozva");
        form.reset();
      }, 3500);
    })
      .catch((e) => {
        toast.error("Hiba történt az esemény létrehozása során: " + e);
        SetSubmitted(false);
      })
      .finally(() => {
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cím</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Esemény"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-12 xl:col-span-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Időpont</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: hu })
                          ) : (
                            <span>Válassz időpontot</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || ""}
                        locale={hu}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Az esemény időpontja</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Címkék</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value as string[]}
                  onValueChange={field.onChange}
                  placeholder="Címkék hozzáadása"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="access_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Láthatóság</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Válassz láthatósági csoportot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">Nyilvános</SelectItem>
                  <SelectItem value="CLASSMATE">Osztály</SelectItem>
                  <SelectItem value="TEACHER">Tanárok</SelectItem>
                  <SelectItem value="STAFF">Szervezők</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Esemény célközönsége</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leírás</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Kezdj gépelni itt"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Az esemény leírása</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attendants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Résztvevők</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value as string[]}
                  onValuesChange={field.onChange}
                  loop
                  className=""
                >
                  <MultiSelectorTrigger
                    nameValueMapping={users.map((user) => {
                      return { value: user.id, name: user.name || "No Name" };
                    })}
                  >
                    <MultiSelectorInput placeholder="Válassz résztvevőket" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {users.map((user) => {
                        return (
                          <MultiSelectorItem key={user.id} value={user.id}>
                            {user.name}
                          </MultiSelectorItem>
                        );
                      })}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ShinyButton submitted={submitted}>Létrehozás</ShinyButton>
      </form>
    </Form>
  );
}
