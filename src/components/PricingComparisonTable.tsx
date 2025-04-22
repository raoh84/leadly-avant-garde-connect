
import React from "react";
import { Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureComparison {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  ultimate: string | boolean;
}

interface PricingComparisonTableProps {
  comparisonFeatures: FeatureComparison[];
  t: (key: string) => string;
}

const PricingComparisonTable: React.FC<PricingComparisonTableProps> = ({
  comparisonFeatures,
  t,
}) => (
  <div className="mt-16">
    <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm">
      <AccordionItem value="features">
        <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-900">
          {t("pricing.compare")}
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left font-semibold text-gray-900">
                    {t("compare.feature")}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-900">
                    {t("compare.free")}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-900">
                    {t("compare.pro")}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-900">
                    {t("compare.ultimate")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }
                  >
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {feature.name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="h-5 w-5 text-leadly-purple mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{feature.free}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="h-5 w-5 text-leadly-purple mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{feature.pro}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.ultimate === "boolean" ? (
                        feature.ultimate ? (
                          <Check className="h-5 w-5 text-leadly-purple mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">
                          {feature.ultimate}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default PricingComparisonTable;
