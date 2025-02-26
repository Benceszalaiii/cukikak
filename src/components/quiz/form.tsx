"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { useState } from "react";
import { ShinyButton } from "../timeline/submit-button";
import { submitQuestion } from "@/app/upload/actions";

const formSchema = z.object({
  title: z.string().min(1).min(0),
  answers: z.array(z.string()).nonempty("Legalább egy helyes válaszod legyen"),
  difficulty: z.enum(["EASY", "NORMAL", "HARD"]),
});
export default function QuestionsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: [],
    },
  });

  const [submitted, setSubmitted] = useState(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    submitQuestion({
        answers: values.answers,
        difficulty: values.difficulty,
        questionTitle: values.title
    })
    .then(() => {
        form.reset();
        toast.success("Kérdés sikeresen beküldve");
        setTimeout(() => {
            setSubmitted(false);
        }, 2500);
    })
    .catch((err) => {
        console.error(err);
        toast.error("Valami hiba történt, próbáld újra később vagy vedd fel a kapcsolatot Bencével");
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kérdés</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mennyi az annyi?"
                  type="text"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Megoldások</FormLabel>
              <FormControl>
                <TagsInput
                  className="bg-black"
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Add meg a helyes válaszokat"
                />
              </FormControl>
              <FormDescription>
                A kvízfeladat megoldásai. Nyomj ENTER-t a megoldás
                hozzáadásához. A megoldások nem különböztetnek meg kis- és nagybetűket, továbbá a szóközök nélküli válaszokat is elfogadjuk, mivel az értékelés során .trim() és .toLowerCase() metódusokat használok.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nehézség</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Válassz nehézséget" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EASY">
                    Könnyű (Ha valaha voltál a Jedlikben, tudod)
                  </SelectItem>
                  <SelectItem value="NORMAL">
                    Közepes (Gondolkodást igényel)
                  </SelectItem>
                  <SelectItem value="HARD">
                    Nehéz (Akár körbe kell járni az épületet hozzá)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                A kérdés nehézsége. Minden nap 1 kérdés lesz nehézségenként
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ShinyButton submitted={submitted} type="submit">
          Küldés
        </ShinyButton>
      </form>
    </Form>
  );
}
