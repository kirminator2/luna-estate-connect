import { Search, UserPlus, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Clients() {
  const clients = [
    {
      id: 1,
      name: "Иванов Иван Иванович",
      email: "ivanov@example.com",
      phone: "+7 (999) 123-45-67",
      status: "active",
      budget: "10-15M ₽",
      type: "Покупатель"
    },
    {
      id: 2,
      name: "Петрова Мария Александровна",
      email: "petrova@example.com",
      phone: "+7 (999) 234-56-78",
      status: "active",
      budget: "8-12M ₽",
      type: "Покупатель"
    },
    {
      id: 3,
      name: "Сидоров Петр Петрович",
      email: "sidorov@example.com",
      phone: "+7 (999) 345-67-89",
      status: "inactive",
      budget: "15M ₽",
      type: "Продавец"
    },
    {
      id: 4,
      name: "Козлова Елена Сергеевна",
      email: "kozlova@example.com",
      phone: "+7 (999) 456-78-90",
      status: "active",
      budget: "20-25M ₽",
      type: "Покупатель"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">База клиентов</h1>
        <p className="text-muted-foreground mt-1">Управление клиентами и лидами</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени, email, телефону..."
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <UserPlus className="h-4 w-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                    <Badge 
                      variant={client.status === "active" ? "default" : "secondary"}
                      className={client.status === "active" ? "bg-success text-success-foreground" : ""}
                    >
                      {client.status === "active" ? "Активен" : "Неактивен"}
                    </Badge>
                    <Badge variant="outline" className="border-primary text-primary">
                      {client.type}
                    </Badge>
                  </div>
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
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <p className="text-sm text-muted-foreground">Бюджет</p>
                  <p className="text-lg font-bold text-primary">{client.budget}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
