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
  const [dragOverColumn, setDragOverColumn] = useState<ClientStatus | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const getClientsForStatus = (status: ClientStatus) => {
    return clients.filter((c) => c.status === status);
  };

  const getTotalAmountForStatus = (status: ClientStatus) => {
    return getClientsForStatus(status).reduce((sum, c) => sum + (c.dealAmount || 0), 0);
  };

  const handleDragStart = (clientId: string) => {
    setDraggedClient(clientId);
  };

  const handleDragEnd = () => {
    setDraggedClient(null);
    setDragOverColumn(null);
    setDragOverIndex(null);
  };

  const handleDragOverColumn = (e: React.DragEvent, status: ClientStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeaveColumn = () => {
    setDragOverColumn(null);
    setDragOverIndex(null);
  };

  const handleDragOverCard = (e: React.DragEvent, index: number, status: ClientStatus) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverColumn(status);
    setDragOverIndex(index);
  };

  const handleDrop = (status: ClientStatus, dropIndex?: number) => {
    if (!draggedClient) return;

    const draggedClientData = clients.find(c => c.id === draggedClient);
    if (!draggedClientData) return;

    // Remove dragged client from list
    const withoutDragged = clients.filter(c => c.id !== draggedClient);
    
    // Update status
    const updatedClient = { ...draggedClientData, status };
    
    // Get clients in target column
    const columnClients = withoutDragged.filter(c => c.status === status);
    const otherClients = withoutDragged.filter(c => c.status !== status);
    
    // Insert at specific position if dropIndex provided
    if (dropIndex !== undefined && dropIndex !== null) {
      columnClients.splice(dropIndex, 0, updatedClient);
    } else {
      columnClients.push(updatedClient);
    }
    
    setClients([...otherClients, ...columnClients]);
    handleDragEnd();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {(Object.keys(statusConfig) as ClientStatus[]).map((status) => {
        const statusClients = getClientsForStatus(status);
        const totalAmount = getTotalAmountForStatus(status);

        return (
          <div
            key={status}
            className={`flex flex-col gap-2 rounded-lg p-3 min-h-[600px] transition-all duration-200 ${
              dragOverColumn === status 
                ? "bg-primary/10 ring-2 ring-primary/30" 
                : "bg-muted/20"
            }`}
            onDragOver={(e) => handleDragOverColumn(e, status)}
            onDragLeave={handleDragLeaveColumn}
            onDrop={() => handleDrop(status)}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-foreground">
                  {statusConfig[status].label}
                </h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {statusClients.length}
                </span>
              </div>
            </div>
            
            {totalAmount > 0 && (
              <div className="text-xs font-semibold text-foreground mb-3 px-1">
                {(totalAmount / 1000000).toFixed(1)}M ₽
              </div>
            )}

            <div className="flex flex-col gap-2 overflow-y-auto">
              {statusClients.map((client, index) => (
                <div key={client.id}>
                  {dragOverColumn === status && dragOverIndex === index && draggedClient !== client.id && (
                    <div className="h-[200px] bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg mb-2 animate-fade-in" />
                  )}
                  <div
                    onDragOver={(e) => handleDragOverCard(e, index, status)}
                    onDrop={() => handleDrop(status, index)}
                  >
                    <ClientCard
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
                      onDragEnd={handleDragEnd}
                      isDragging={draggedClient === client.id}
                    />
                  </div>
                </div>
              ))}
              {dragOverColumn === status && dragOverIndex === statusClients.length && (
                <div className="h-[200px] bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg animate-fade-in" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
