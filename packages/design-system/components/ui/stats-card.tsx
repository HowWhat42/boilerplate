import React from "react";
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";

export const StatsCard = ({
  className,
  title,
  value,
  type,
  icon,
  percentage,
}: {
  className?: string;
  title: string;
  value: number | undefined | React.ReactNode;
  type?: undefined | "percent" | "currency";
  icon: React.ReactNode;
  percentage?: number;
}) => {
  return (
    <Card className={cn("w-full rounded-md", className)}>
      <CardContent className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">{title}</p>
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {typeof value === "number"
              ? new Intl.NumberFormat("fr", {
                  style: type,
                  currency: "EUR",
                  minimumFractionDigits: 0,
                }).format(value)
              : value}
          </p>
          {percentage ? (
            <p className="text-sm text-muted-foreground">
              +{percentage}% sur le mois
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
