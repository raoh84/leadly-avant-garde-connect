
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onCreate?: () => void;
}
export function TemplateForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"message" | "file" | "page">("message");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");
      const orgRes = await supabase.from("organizations").select("id").eq("owner_id", user.id).maybeSingle();
      const orgId = orgRes.data?.id;
      const { error } = await supabase.from("templates").insert({
        name,
        type,
        content,
        user_id: user.id,
        organization_id: orgId,
      });
      if (error) throw error;
      setName(""); setContent("");
      toast({ title: "Template saved." });
      onCreate?.();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Template error",
        description: e.message || "Error creating template",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border rounded mb-3 space-y-2">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name" required />
      <select className="border px-2 py-1 rounded" value={type} onChange={e => setType(e.target.value as any)}>
        <option value="message">Message</option>
        <option value="file">File</option>
        <option value="page">Page</option>
      </select>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Template content" className="border rounded px-2 py-1 w-full" rows={2} required />
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Template"}</Button>
    </form>
  );
}
