'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUrlModal } from '@/hooks/use-url-modal';
import { Button } from '@/components/ui/button';

export function DemoModal() {
  // 1. Bind this modal to the URL query param "?show-demo=true"
  const { isOpen, setIsOpen } = useUrlModal('show-demo');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Back Button Compatible</DialogTitle>
          <DialogDescription>
            This modal's state lives in the URL. 
            <br />
            1. Look at your address bar.
            <br />
            2. Press your browser's <strong>Back Button</strong> to close me.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            This is extremely useful for mobile users who expect the back gesture
            to dismiss overlays rather than navigating to the previous page.
          </p>
        </div>

        <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
            <Button onClick={() => alert('Action!')}>
                Save Changes
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
