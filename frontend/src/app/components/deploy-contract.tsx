"use client";

import LockAbi from "@/../../../blockchain/artifacts/contracts/Lock.sol/Lock.json";
import TypographyH2 from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lockAbi } from "@/lib/wagmi-generated";
import { parseEther } from "viem";
import { useDeployContract } from "wagmi";

export function DeployContract() {
  const { deployContract, isPending, data: hash } = useDeployContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const unlockTimeString = formData.get("unlockTime") as string;
    const unlockTime = new Date(unlockTimeString).getTime() / 1000;
    const amount = parseEther(formData.get("amount") as string);

    deployContract({
      abi: lockAbi,
      bytecode: LockAbi.bytecode as `0x${string}`,
      args: [BigInt(unlockTime)],
      value: amount,
    });
  }

  return (
    <form onSubmit={submit} className="max-w-sm space-y-2">
      <TypographyH2>Deploy contract</TypographyH2>
      <Input name="unlockTime" type="datetime-local" required />
      <Input name="amount" type="number" step={0.00001} required />
      <Button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Deploy"}
      </Button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}
