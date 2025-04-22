
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

export function TemplateList() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function fetchTemplates() {
    setLoading(true);
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const org = await supabase.from("organizations").select("id").eq("owner_id", user.id).maybeSingle();
    const { data, error } = await supabase.from("templates").select("*").or(`user_id.eq.${user.id},organization_id.eq.${org.data?.id}`);
    if (!error) setTemplates(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function removeTemplate(id: string) {
    await supabase.from("templates").delete().eq("id", id);
    fetchTemplates();
    toast({ title: "Template deleted." });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Templates</h2>
      {loading && <div>Loading...</div>}
      <div className="space-y-2">
        {templates.map((t) => (
          <div className="p-3 border shadow-sm rounded flex items-center justify-between" key={t.id}>
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-gray-500">{t.type}</div>
              <div className="text-xs mt-1 text-ellipsis overflow-hidden">{t.content.slice(0, 52)}</div>
            </div>
            <Button variant="destructive" className="ml-2" size="sm" onClick={() => removeTemplate(t.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
