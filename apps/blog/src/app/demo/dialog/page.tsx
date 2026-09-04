import { Button } from '@repo/ui/components/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';

export default function BlogDialogDemoPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="font-bold text-3xl">Blog: Dialog Demo</h1>
        <p className="mt-2 text-muted-foreground">
          The same shared compound component works in the blog app.
        </p>
      </div>

      <section className="rounded-lg border bg-muted/50 p-6">
        <h2 className="font-semibold text-lg">Newsletter Signup</h2>
        <p className="mb-4 text-muted-foreground text-sm">
          Compose the dialog structure around the action that needs it.
        </p>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button type="button">Subscribe to Newsletter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Our Newsletter</DialogTitle>
              <DialogDescription>
                Get the latest articles delivered to your inbox.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4">
              <label
                className="flex flex-col gap-2 font-medium text-sm"
                htmlFor="email"
              >
                Email address
                <input
                  className="rounded-md border bg-background px-3 py-2 font-normal"
                  id="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </label>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Subscribe</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogRoot>
      </section>
    </main>
  );
}
