
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Validate email and phone simply
function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
function validatePhone(phone: string) {
  return /^\+?\d{9,}$/.test(phone);
}

export function LeadCaptureForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !validateEmail(values.email) || !validatePhone(values.phone)) {
      toast({
        variant: "destructive",
        title: t("lead.form.invalid") || "Please fill all fields correctly.",
      });
      return;
    }

    setLoading(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");
      // For demo: Assign to the org/owner themselves, production logic may differ
      const orgRes = await supabase.from("organizations").select("id").eq("owner_id", user.id).maybeSingle();
      const orgId = orgRes.data?.id;
      const { error } = await supabase.from("leads").insert({
        ...values,
        created_by: user.id,
        organization_id: orgId,
      });
      if (error) throw error;
      toast({
        title: t("lead.form.success") || "Lead captured!",
        description: t("lead.form.saved") || "A new lead was saved and notifies the team.",
      });
      setValues({ name: "", email: "", phone: "" });
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: t("lead.form.errtitle") || "Error capturing lead",
        description: e.message || "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <div>
        <Label htmlFor="name">{t("lead.form.name") || "Name"}</Label>
        <Input name="name" id="name" value={values.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">{t("lead.form.email") || "Email"}</Label>
        <Input name="email" id="email" type="email" value={values.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phone">{t("lead.form.phone") || "Phone"}</Label>
        <Input name="phone" id="phone" type="tel" value={values.phone} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full bg-leadly-purple" disabled={loading}>
        {loading ? t("lead.form.saving") || "Saving..." : t("lead.form.submit") || "Submit Lead"}
      </Button>
    </form>
  );
}
