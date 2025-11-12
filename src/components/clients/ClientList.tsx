import { Client, ClientStatus } from "@/pages/Clients";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskFormSheet from "./TaskFormSheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClientListProps {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  selectedClients: string[];
  setSelectedClients: (ids: string[]) => void;
}

const statusLabels: Record<ClientStatus, string> = {
  new: "Новый",
  contacted: "Связались",
  viewing: "Просмотр",
  negotiation: "Переговоры",
  deal: "Сделка",
  closed: "Закрыто",
};

export default function ClientList({
  clients,
  setClients,
  selectedClients,
  setSelectedClients,
}: ClientListProps) {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [selectedClientForTask, setSelectedClientForTask] = useState<Client | null>(null);
  const navigate = useNavigate();

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map((c) => c.id));
    }
  };

  const handleCreateTask = (client: Client) => {
    setSelectedClientForTask(client);
    setTaskFormOpen(true);
  };

  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedClients.length === clients.length && clients.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Контакты</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Бюджет</TableHead>
              <TableHead>Сумма сделки</TableHead>
              <TableHead className="w-24">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                className="border-border cursor-pointer hover:bg-muted/50"
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                onClick={() => navigate(`/clients/${client.id}`)}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={() => {
                      if (selectedClients.includes(client.id)) {
                        setSelectedClients(selectedClients.filter((id) => id !== client.id));
                      } else {
                        setSelectedClients([...selectedClients, client.id]);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {client.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {statusLabels[client.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-border">
                    {client.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {client.budget}
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  {client.dealAmount
                    ? `${(client.dealAmount / 1000000).toFixed(1)}M ₽`
                    : "—"}
                </TableCell>
                <TableCell>
                  {hoveredClient === client.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateTask(client);
                      }}
                      className="hover:bg-primary/20"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TaskFormSheet
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        client={selectedClientForTask}
        onSubmit={() => {
          setTaskFormOpen(false);
          setSelectedClientForTask(null);
        }}
      />
    </>
  );
}
