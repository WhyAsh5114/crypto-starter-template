"use client";

import TypographyH2 from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lockAbi } from "@/lib/wagmi-generated";
import { useState } from "react";
import { useReadContracts, useWriteContract } from "wagmi";

export function InteractWithContract() {
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const contractBaseConfig = (() => {
    return {
      abi: lockAbi,
      address: contractAddress as `0x${string}`,
    } as const;
  })();

  const { data, isError, status } = useReadContracts({
    contracts: [{ ...contractBaseConfig, functionName: "unlockTime" }],
    query: { enabled: contractBaseConfig.address?.startsWith(`0x`) },
  });

  const { data: hash, writeContract } = useWriteContract();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = formData.get("contract-address") as string;

    if (!address?.startsWith("0x")) return;
    setContractAddress(address);
  }

  async function withdrawFromContract(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: lockAbi,
      functionName: "withdraw",
    });
  }

  return (
    <>
      <TypographyH2>Read data from contract</TypographyH2>
      {status}
      <form
        className="grid w-full max-w-sm items-center gap-1.5"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="contract-address">Contract address</Label>
        <Input name="contract-address" />
        <Button type="submit">Read contract data</Button>
      </form>

      {data?.at(0)?.result ? (
        <>
          <p className="mt-4">
            Unlock time:{" "}
            {new Date(Number(data[0]?.result) * 1000).toLocaleString()}
          </p>
          <p>
            {new Date(Number(data[0]?.result) * 1000) < new Date()
              ? "Can be unlocked now"
              : "Contract is still locked"}
          </p>
        </>
      ) : null}

      {isError && <p className="text-red-500 mt-2">Failed to read contract.</p>}

      <TypographyH2>Withdraw from contract</TypographyH2>
      <form
        className="grid w-full max-w-sm items-center gap-1.5"
        onSubmit={withdrawFromContract}
      >
        <Button type="submit">Withdraw</Button>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
    </>
  );
}
