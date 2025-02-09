"use client";

import TypographyH1 from "@/components/typography/h1";
import { DeployContract } from "./components/deploy-contract";
import { InteractWithContract } from "./components/interact-with-contract";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  return (
    <>
      <TypographyH1>Lock contract testing</TypographyH1>
      <Tabs defaultValue="deploy" className="w-full max-w-sm">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
          <TabsTrigger value="interact">Interact</TabsTrigger>
        </TabsList>
        <TabsContent value="deploy">
          <DeployContract />
        </TabsContent>
        <TabsContent value="interact">
          <InteractWithContract />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
