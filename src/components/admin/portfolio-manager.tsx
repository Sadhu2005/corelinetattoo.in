"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  addPortfolioItem,
  deletePortfolioItem,
  uploadAdminImage,
} from "@/lib/actions/orders";
import type { PortfolioItem } from "@/lib/types/database";
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

export function PortfolioManager({ items }: { items: PortfolioItem[] }) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("tattoo");
  const [imageUrl, setImageUrl] = useState("");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
      const res = await uploadAdminImage(formData, "portfolio");
      if (res.success) setImageUrl(res.url);
    });
  }

  function handleAdd() {
    if (!title || !imageUrl) return;
    startTransition(async () => {
      await addPortfolioItem({ title, type, image_url: imageUrl, featured: false });
      setTitle("");
      setImageUrl("");
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deletePortfolioItem(id);
    });
  }

  return (
    <div>
      <Card className="border-border mb-8">
        <CardContent className="space-y-4 p-6">
          <h2 className="font-semibold">Add Portfolio Item</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => v && setType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["tattoo", "portrait", "blood_art", "before_after"].map((t) => (
                    <SelectItem key={t} value={t} className="capitalize">
                      {t.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <Input type="file" accept="image/*" onChange={handleUpload} />
            {imageUrl && (
              <p className="text-xs text-green-400">Uploaded successfully</p>
            )}
          </div>
          <Button onClick={handleAdd} disabled={isPending || !imageUrl}>
            Add to Gallery
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="border-border overflow-hidden">
            <div className="relative aspect-square">
              <Image src={item.image_url} alt={item.title} fill className="object-cover" />
            </div>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {item.type.replace("_", " ")}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(item.id)}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
