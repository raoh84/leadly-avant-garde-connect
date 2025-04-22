
import React, { useState } from "react";
import { TemplateList } from "@/components/templates/TemplateList";
import { TemplateForm } from "@/components/templates/TemplateForm";

export default function Templates() {
  const [reload, setReload] = useState(false);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-3">Templates</h1>
      <TemplateForm onCreate={() => setReload(x => !x)} />
      <TemplateList key={reload ? "a" : "b"} />
    </div>
  );
}
