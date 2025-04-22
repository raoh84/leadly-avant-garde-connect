
import React from "react";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";
import { LeadAlertInApp } from "@/components/leads/LeadAlertInApp";

export default function Leads() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-10">
      <LeadAlertInApp />
      <h1 className="text-2xl font-bold mb-3">Add a New Lead</h1>
      <LeadCaptureForm />
    </div>
  );
}
