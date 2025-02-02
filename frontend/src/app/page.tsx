"use client";

import TypographyH2 from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { DeployContract } from "./components/deploy-contract";
import { InteractWithContract } from "./components/interact-with-contract";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        <TypographyH2>Account</TypographyH2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <Button type="button" onClick={() => disconnect()}>
            Disconnect
          </Button>
        )}
      </div>

      <div>
        <TypographyH2>Connect</TypographyH2>
        <div className="grid grid-flow-col w-32 gap-2">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </Button>
          ))}
        </div>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <DeployContract />
      <InteractWithContract />
    </>
  );
}

export default App;
