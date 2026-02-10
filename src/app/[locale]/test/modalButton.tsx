"use client";

import { useUrlModal } from "@/hooks/use-url-modal";

import { DemoModal } from "@/components/modals/demo-modal";
import { Button } from "@/components/ui/button";

export default function ModalExample() {
  // You can use the hook here just to get the setter
  const { setIsOpen } = useUrlModal("show-demo");

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-24">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Enterprise Modal Pattern</h1>

        {/* The Trigger */}
        <Button size="lg" onClick={() => setIsOpen(true)}>
          Open Magic Modal
        </Button>
      </div>

      {/* 
         The Modal Component. 
         Ideally, place this at the bottom of the page or in a layout 
         to avoid z-index stacking issues, though Shadcn handles this well.
      */}
      <DemoModal />
    </div>
  );
}
