
import React, { useState } from "react";
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

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
        title: "Please fill all fields correctly",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      const { error } = await supabase.from("leads").insert({
        ...values,
        created_by: userId,
        status: 'new'
      });

      if (error) throw error;

      toast({
        title: "Lead captured successfully!",
        description: "The team will be notified.",
      });
      
      setValues({ name: "", email: "", phone: "" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error capturing lead",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow-sm p-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          className="mt-1"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-leadly-purple hover:bg-leadly-purple/90" 
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Lead"}
      </Button>
    </form>
  );
};
