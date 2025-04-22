
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function LeadAlertInApp() {
  const [alerts, setAlerts] = useState<any[]>([]);
  useEffect(() => {
    // Listen for new alerts in real time
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lead_alerts" },
        (payload) => {
          setAlerts((a) => [
            {
              id: payload.new.id,
              title: "New Lead Assigned",
              description: `Check your dashboard for details.`,
            },
            ...a,
          ]);
          toast("You have a new lead assignment!", {
            description: "Check the dashboard for more information.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (alerts.length === 0) return null;
  return (
    <div className="fixed top-20 right-2 z-50 space-y-2 w-72">
      {alerts.slice(0, 3).map((a) => (
        <div key={a.id} className="bg-leadly-purple/90 text-white shadow-md rounded-lg px-4 py-3">
          <div className="font-semibold">{a.title}</div>
          <div className="text-sm">{a.description}</div>
        </div>
      ))}
    </div>
  );
}
