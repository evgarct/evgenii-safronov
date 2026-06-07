import { ExternalLink, LogOut } from "lucide-react";
import { changeStatus, signOut } from "@/app/admin/actions";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireOwner } from "@/lib/auth";
import { listAllContent } from "@/lib/content";

export const metadata = { title: "Editor" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [user, items] = await Promise.all([requireOwner(), listAllContent()]);

  return (
    <div className="page-shell py-12 sm:py-16">
      <div className="flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Private editor</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Content queue</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" size="sm">
            <LogOut /> Sign out
          </Button>
        </form>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Kind</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-medium">{item.title}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    /{item.slug}
                  </div>
                </TableCell>
                <TableCell className="capitalize">{item.kind}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                    new Date(item.updated_at),
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {item.status === "published" && (
                      <Button size="icon-sm" variant="ghost" asChild>
                        <a
                          href={`/${item.kind === "article" ? "blog" : "projects"}/${item.slug}`}
                          aria-label={`Open ${item.title}`}
                        >
                          <ExternalLink />
                        </a>
                      </Button>
                    )}
                    <form action={changeStatus}>
                      <input type="hidden" name="id" value={item.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={item.status === "published" ? "draft" : "published"}
                      />
                      <Button size="sm" variant="outline">
                        {item.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                    </form>
                    {item.status !== "archived" && (
                      <form action={changeStatus}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="status" value="archived" />
                        <Button size="sm" variant="ghost">
                          Archive
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
