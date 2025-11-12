import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const client = {
    id,
    name: "Алексей Иванов",
    email: "aleksey@example.com",
    phone: "+7 (999) 123-45-67",
    status: "negotiation",
    type: "Покупатель",
    budget: "10-15M ₽",
    dealAmount: 12500000,
    location: "Москва",
    registeredDate: "15.01.2024",
    lastContact: "20.01.2024",
    notes: "Клиент ищет квартиру в центре, предпочитает современный ремонт. Готов к быстрой сделке.",
    requirements: [
      "3 комнаты",
      "Центр города",
      "Современный ремонт",
      "Паркинг",
    ],
    history: [
      { date: "20.01.2024", action: "Звонок", description: "Обсудили варианты квартир" },
      { date: "18.01.2024", action: "Встреча", description: "Показ 2 объектов" },
      { date: "15.01.2024", action: "Контакт", description: "Первое обращение" },
    ],
  };

  const statusLabels: Record<string, string> = {
    new: "Новый",
    contacted: "Связались",
    viewing: "Просмотр",
    negotiation: "Переговоры",
    deal: "Сделка",
    closed: "Закрыто",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/clients")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к клиентам
        </Button>

        {/* Profile Header */}
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {client.name}
                </h1>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {statusLabels[client.status]}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${client.email}`} className="hover:text-foreground">
                    {client.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${client.phone}`} className="hover:text-foreground">
                    {client.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{client.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Регистрация: {client.registeredDate}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button>
                  Создать задачу
                </Button>
                <Button variant="outline">
                  Отправить подборку
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Информация о сделке</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Тип клиента</div>
                  <Badge variant="outline">{client.type}</Badge>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Бюджет</div>
                  <div className="text-foreground">{client.budget}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Сумма сделки</div>
                  <div className="text-xl font-semibold text-primary">
                    {(client.dealAmount / 1000000).toFixed(1)}M ₽
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Последний контакт</div>
                  <div className="text-foreground">{client.lastContact}</div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Требования</h3>
              <div className="flex flex-wrap gap-2">
                {client.requirements.map((req, idx) => (
                  <Badge key={idx} variant="secondary">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Заметки</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {client.notes}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">История взаимодействий</h3>
              
              <div className="space-y-4">
                {client.history.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{item.action}</span>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {idx < client.history.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
