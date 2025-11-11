import { useState } from "react";
import { Client } from "@/pages/Clients";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskFormSheet from "./TaskFormSheet";

interface ClientCardProps {
  client: Client;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragStart: (id: string) => void;
}

export default function ClientCard({
  client,
  isSelected,
  onSelect,
  onDragStart,
}: ClientCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  return (
    <>
      <Card
        draggable
        onDragStart={() => onDragStart(client.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`border-border bg-card hover:bg-card/80 transition-all cursor-move relative ${
          isSelected ? "ring-2 ring-primary" : ""
        }`}
      >
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(client.id)}
              onClick={(e) => e.stopPropagation()}
            />
            {isHovered && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setTaskFormOpen(true);
                }}
                className="h-6 w-6 p-0 hover:bg-primary/20"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          <h4 className="font-semibold text-sm text-foreground line-clamp-2">
            {client.name}
          </h4>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span className="truncate">{client.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{client.phone}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t border-border">
            {client.budget}
          </div>

          {client.dealAmount && (
            <div className="text-sm font-semibold text-primary">
              {(client.dealAmount / 1000000).toFixed(1)}M ₽
            </div>
          )}
        </CardContent>
      </Card>

      <TaskFormSheet
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        client={client}
        onSubmit={() => setTaskFormOpen(false)}
      />
    </>
  );
}
