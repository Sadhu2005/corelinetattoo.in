"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { addInstagramEmbed, deleteInstagramEmbed } from "@/lib/actions/orders";
import { instagramAccounts } from "@/lib/constants/site";
import type { InstagramEmbed } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { InstagramEmbed as InstagramEmbedCard } from "@/components/instagram/instagram-embed";

export function InstagramManager({ embeds }: { embeds: InstagramEmbed[] }) {
  const [isPending, startTransition] = useTransition();
  const [postUrl, setPostUrl] = useState("");
  const [handle, setHandle] = useState(instagramAccounts[0].handle);

  function handleAdd() {
    if (!postUrl) return;
    startTransition(async () => {
      await addInstagramEmbed(postUrl, handle);
      setPostUrl("");
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteInstagramEmbed(id);
    });
  }

  return (
    <div>
      <Card className="border-border mb-8">
        <CardContent className="space-y-4 p-6">
          <h2 className="font-semibold">Add Instagram Post</h2>
          <p className="text-sm text-muted-foreground">
            Paste a post URL from Instagram to feature on the homepage
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Post URL</Label>
              <Input
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Account</Label>
              <Select value={handle} onValueChange={(v) => v && setHandle(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {instagramAccounts.map((a) => (
                    <SelectItem key={a.handle} value={a.handle}>
                      @{a.handle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAdd} disabled={isPending}>
            Add Embed
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {embeds.map((embed) => (
          <div key={embed.id} className="relative">
            <InstagramEmbedCard
              postUrl={embed.post_url}
              accountHandle={embed.account_handle}
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute right-2 top-2"
              onClick={() => handleDelete(embed.id)}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
