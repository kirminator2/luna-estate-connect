import { useState } from "react";
import { LayoutGrid, List, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClientKanban from "@/components/clients/ClientKanban";
import ClientList from "@/components/clients/ClientList";
import ClientFormSheet from "@/components/clients/ClientFormSheet";
import { Badge } from "@/components/ui/badge";

export type ClientStatus = "new" | "contacted" | "viewing" | "negotiation" | "deal" | "closed";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  budget: string;
  type: string;
  assignee?: string;
  dealAmount?: number;
  createdAt: string;
}

const initialClients: Client[] = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    email: "ivanov@example.com",
    phone: "+7 (999) 123-45-67",
    status: "new",
    budget: "10-15M ₽",
    type: "Покупатель",
    dealAmount: 12000000,
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "Петрова Мария Александровна",
    email: "petrova@example.com",
    phone: "+7 (999) 234-56-78",
    status: "contacted",
    budget: "8-12M ₽",
    type: "Покупатель",
    dealAmount: 10000000,
    createdAt: "2025-01-09",
  },
  {
    id: "3",
    name: "Сидоров Петр Петрович",
    email: "sidorov@example.com",
    phone: "+7 (999) 345-67-89",
    status: "viewing",
    budget: "15M ₽",
    type: "Продавец",
    dealAmount: 15000000,
    createdAt: "2025-01-08",
  },
  {
    id: "4",
    name: "Козлова Елена Сергеевна",
    email: "kozlova@example.com",
    phone: "+7 (999) 456-78-90",
    status: "negotiation",
    budget: "20-25M ₽",
    type: "Покупатель",
    dealAmount: 22000000,
    createdAt: "2025-01-07",
  },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || client.status === filterStatus;
    const matchesType = filterType === "all" || client.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExport = () => {
    const dataStr = JSON.stringify(selectedClients.length > 0 
      ? clients.filter(c => selectedClients.includes(c.id))
      : filteredClients, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'clients.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleBulkDelete = () => {
    if (selectedClients.length > 0) {
      setClients(clients.filter(c => !selectedClients.includes(c.id)));
      setSelectedClients([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">База клиентов</h1>
          <p className="text-muted-foreground mt-1">Управление клиентами и лидами</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Поиск по имени, email, телефону..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-card border-border"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px] bg-card border-border">
              <SelectValue placeholder="Все статусы" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новый</SelectItem>
              <SelectItem value="contacted">Связались</SelectItem>
              <SelectItem value="viewing">Просмотр</SelectItem>
              <SelectItem value="negotiation">Переговоры</SelectItem>
              <SelectItem value="deal">Сделка</SelectItem>
              <SelectItem value="closed">Закрыто</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px] bg-card border-border">
              <SelectValue placeholder="Все типы" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="Покупатель">Покупатель</SelectItem>
              <SelectItem value="Продавец">Продавец</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedClients.length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {selectedClients.length} выбрано
            </Badge>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Удалить
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="kanban" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Канбан
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <List className="h-4 w-4 mr-2" />
            Списком
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-6">
          <ClientKanban
            clients={filteredClients}
            setClients={setClients}
            selectedClients={selectedClients}
            setSelectedClients={setSelectedClients}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <ClientList
            clients={filteredClients}
            setClients={setClients}
            selectedClients={selectedClients}
            setSelectedClients={setSelectedClients}
          />
        </TabsContent>
      </Tabs>

      <ClientFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={(newClient) => {
          setClients([...clients, { ...newClient, id: Date.now().toString() }]);
          setIsFormOpen(false);
        }}
      />
    </div>
  );
}
