"use client";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { translateRSVPType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { RSVPType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Legalább egy karakter szükséges")
    .nonempty("Legalább egy karakter szükséges"),
  peopleNeeded: z
    .number()
    .min(1, "Legalább egy résztvevő szükséges")
    .max(33, "Maximum 33 résztvevőt választhatsz ki.")
    .nonnegative(),
  tags: z.array(z.string()).nonempty("Legalább egy címke szükséges"),
  description: z.string().nonempty("Legalább egy karakter szükséges"),
  rsvptype: z.string(),
});
const rsvptypes = Object.keys(RSVPType).map((key) => {
  return { key: translateRSVPType(key) };
});
export default function AddRSVPForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Esemény címe</FormLabel>
                  <FormControl>
                    <Input placeholder="Forgatás" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="peopleNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keresett résztvevők száma</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    A maximális jelentkezők/résztvevők száma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Címkék</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Címkék"
                    />
                  </FormControl>
                  <FormDescription>
                    Az esemény címkéi. ENTER lenyomásával tudsz címkét
                    véglegesíteni.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leírás</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Az esemény leírása</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rsvptype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eseménytípus</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Workshop" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rsvptypes.map((kv, index) => {
                    return (
                      <SelectItem value={kv.key || "?"} key={index}>
                        {translateRSVPType(kv.key || "?")}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>Az esemény típusa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
