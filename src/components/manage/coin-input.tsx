"use client";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
export default function CoinInput({ defaultValue }: { defaultValue: number }) {
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<"withdraw" | "deposit">("withdraw");
  const [amountLeft, setAmountLeft] = useState<number>(defaultValue);
  useEffect(() => {
    if (method === "deposit") {
      setAmountLeft(defaultValue + amount);
    } else {
      setAmountLeft(defaultValue - amount);
    }
  }, [amount, defaultValue, method]);
  return (
    <>
      <Input
        hidden
        readOnly
        className="invisible hidden"
        value={method}
        name="method"
      ></Input>
      <motion.div
        className={
          "flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2"
        }
      >
        <button
          type="button"
          onClick={() => {
            setMethod("withdraw");
          }}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`button-withdraw`}
        >
          {method === "withdraw" && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">Készpénzfelvétel</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMethod("deposit");
          }}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`button-deposit`}
        >
          {method === "deposit" && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">Befizetés</span>
        </button>
      </motion.div>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-center w-full">
        <Button
          onClick={() => {
            setAmount(0);
          }}
          type="button"
          variant={"outline"}
        >
          0
        </Button>{" "}
        <Button
          disabled={amount - 20000 < 0}
          type="button"
          variant={"outline"}
          onClick={() => {
            setAmount((prev) => prev - 20000);
          }}
        >
          -20000
        </Button>{" "}
        <Button
          onClick={() => {
            setAmount((prev) => prev - 10000);
          }}
          disabled={amount - 10000 < 0}
          type="button"
          variant={"outline"}
        >
          -10000
        </Button>{" "}
        <Button
          onClick={() => {
            setAmount((prev) => prev - 5000);
          }}
          disabled={amount - 5000 < 0}
          type="button"
          variant={"outline"}
        >
          -5000
        </Button>{" "}
        <Button
          onClick={() => {
            setAmount((prev) => prev - 1000);
          }}
          disabled={amount - 1000 < 0}
          type="button"
          variant={"outline"}
        >
          -1000
        </Button>{" "}
        <Button
          disabled={amount + 1000 > defaultValue && method === "withdraw"}
          type="button"
          onClick={() => {
            setAmount((prev) => prev + 1000);
          }}
          variant={"outline"}
        >
          +1000
        </Button>{" "}
        <Button
          onClick={() => {
            setAmount((prev) => prev + 5000);
          }}
          disabled={amount + 5000 > defaultValue && method === "withdraw"}
          type="button"
          variant={"outline"}
        >
          +5000
        </Button>{" "}
        <Button
          onClick={() => {
            setAmount((prev) => prev + 10000);
          }}
          disabled={amount + 10000 > defaultValue && method === "withdraw"}
          type="button"
          variant={"outline"}
        >
          +10000
        </Button>{" "}
        <Button
          onClick={() => {
            setAmount((prev) => prev + 20000);
          }}
          disabled={amount + 20000 > defaultValue && method === "withdraw"}
          type="button"
          variant={"outline"}
        >
          +20000
        </Button>{" "}
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            setAmount(defaultValue);
          }}
        >
          +{defaultValue}
        </Button>{" "}
      </div>
      <Label htmlFor="amount">Ki- vagy befizetendő összeg</Label>
      <Input
        max={method === "withdraw" ? defaultValue : undefined}
        min={0}
        type="number"
        id="amount"
        onChange={(e) => {
          setAmount(parseInt(e.target.value) || defaultValue);
        }}
        name="amount"
        value={amount}
      ></Input>
      <Label htmlFor="amountLeft">Fentmaradó összeg</Label>
      <Input
        readOnly
        disabled
        type="number"
        id="amountLeft"
        value={amountLeft}
        name="amountLeft"
      ></Input>
    </>
  );
}
