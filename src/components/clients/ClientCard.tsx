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
        className={`border-0 bg-card hover:bg-accent/30 transition-all cursor-pointer relative group shadow-sm ${
          isSelected ? "ring-2 ring-primary/20" : ""
        }`}
      >
        <CardContent className="p-3 space-y-3">
          {/* Actions bar - fixed height to prevent jumps */}
          <div className="h-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(client.id)}
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4"
              />
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setTaskFormOpen(true);
              }}
              className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Title */}
          <h4 className="font-medium text-sm text-foreground line-clamp-2 min-h-[40px]">
            {client.name}
          </h4>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {client.type && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent text-accent-foreground">
                {client.type}
              </span>
            )}
            {client.budget && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/5 text-primary">
                {client.budget}
              </span>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{client.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span>{client.phone}</span>
            </div>
          </div>

          {/* Deal amount */}
          {client.dealAmount && (
            <div className="text-sm font-semibold text-foreground pt-1">
              {(client.dealAmount / 1000000).toFixed(1)}M ₽
            </div>
          )}

          {/* User info */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/40">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {client.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {client.name.split(' ')[0]}
            </span>
          </div>
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
