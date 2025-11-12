import { useState } from "react";
import { Client, ClientStatus } from "@/pages/Clients";
import { Badge } from "@/components/ui/badge";
import ClientCard from "./ClientCard";

interface ClientKanbanProps {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  selectedClients: string[];
  setSelectedClients: (ids: string[]) => void;
}

const statusConfig: Record<ClientStatus, { label: string; color: string }> = {
  new: { label: "Новый", color: "bg-blue-500" },
  contacted: { label: "Связались", color: "bg-purple-500" },
  viewing: { label: "Просмотр", color: "bg-yellow-500" },
  negotiation: { label: "Переговоры", color: "bg-orange-500" },
  deal: { label: "Сделка", color: "bg-green-500" },
  closed: { label: "Закрыто", color: "bg-gray-500" },
};

export default function ClientKanban({
  clients,
  setClients,
  selectedClients,
  setSelectedClients,
}: ClientKanbanProps) {
  const [draggedClient, setDraggedClient] = useState<string | null>(null);

  const getClientsForStatus = (status: ClientStatus) => {
    return clients.filter((c) => c.status === status);
  };

  const getTotalAmountForStatus = (status: ClientStatus) => {
    return getClientsForStatus(status).reduce((sum, c) => sum + (c.dealAmount || 0), 0);
  };

  const handleDragStart = (clientId: string) => {
    setDraggedClient(clientId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: ClientStatus) => {
    if (!draggedClient) return;

    setClients(
      clients.map((c) =>
        c.id === draggedClient ? { ...c, status } : c
      )
    );
    setDraggedClient(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {(Object.keys(statusConfig) as ClientStatus[]).map((status) => {
        const statusClients = getClientsForStatus(status);
        const totalAmount = getTotalAmountForStatus(status);

        return (
          <div
            key={status}
            className="flex flex-col gap-2 bg-muted/30 rounded-lg p-3 min-h-[400px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${statusConfig[status].color}`}
                />
                <h3 className="font-medium text-sm text-foreground">
                  {statusConfig[status].label}
                </h3>
                <Badge variant="secondary" className="bg-background/50 text-muted-foreground text-xs h-5">
                  {statusClients.length}
                </Badge>
              </div>
            </div>
            
            {totalAmount > 0 && (
              <div className="text-xs font-medium text-primary mb-3 px-1">
                {(totalAmount / 1000000).toFixed(1)}M ₽
              </div>
            )}

            <div className="flex flex-col gap-2 overflow-y-auto">
              {statusClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  isSelected={selectedClients.includes(client.id)}
                  onSelect={(id) => {
                    if (selectedClients.includes(id)) {
                      setSelectedClients(selectedClients.filter((cid) => cid !== id));
                    } else {
                      setSelectedClients([...selectedClients, id]);
                    }
                  }}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
