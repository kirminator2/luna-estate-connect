import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <>
      <Card
        draggable
        onDragStart={() => onDragStart(client.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/clients/${client.id}`)}
        className={`border-0 bg-card hover:bg-muted/50 transition-all cursor-pointer relative group ${
          isSelected ? "ring-1 ring-primary" : ""
        }`}
      >
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            {isHovered && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(client.id)}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 left-2 z-10"
              />
            )}
            {isHovered && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setTaskFormOpen(true);
                }}
                className="h-7 w-7 p-0 hover:bg-primary/20 ml-auto"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <h4 className="font-medium text-sm text-foreground line-clamp-2 pt-1">
            {client.name}
          </h4>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{client.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span>{client.phone}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-1.5">
            {client.budget}
          </div>

          {client.dealAmount && (
            <div className="text-sm font-semibold text-primary pt-1">
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
