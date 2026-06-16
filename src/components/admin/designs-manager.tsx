"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  addTattooDesign,
  deleteTattooDesign,
  uploadAdminImage,
} from "@/lib/actions/orders";
import { tattooCategories } from "@/lib/constants/site";
import type { TattooDesign } from "@/lib/types/database";
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

export function DesignsManager({ designs }: { designs: TattooDesign[] }) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("minimal");
  const [imageUrl, setImageUrl] = useState("");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
      const res = await uploadAdminImage(formData, "designs");
      if (res.success) setImageUrl(res.url);
    });
  }

  function handleAdd() {
    if (!title || !imageUrl) return;
    startTransition(async () => {
      await addTattooDesign({ title, category, image_url: imageUrl });
      setTitle("");
      setImageUrl("");
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteTattooDesign(id);
    });
  }

  return (
    <div>
      <Card className="border-border mb-8">
        <CardContent className="space-y-4 p-6">
          <h2 className="font-semibold">Add Tattoo Design</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => v && setCategory(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tattooCategories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <Input type="file" accept="image/*" onChange={handleUpload} />
          </div>
          <Button onClick={handleAdd} disabled={isPending || !imageUrl}>
            Add Design
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {designs.map((design) => (
          <Card key={design.id} className="border-border overflow-hidden">
            <div className="relative aspect-square">
              <Image src={design.image_url} alt={design.title} fill className="object-cover" />
            </div>
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <p className="text-sm font-medium">{design.title}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {design.category}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(design.id)}
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
