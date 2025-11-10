import { UserPlus, Mail, Phone, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Team() {
  const team = [
    {
      id: 1,
      name: "Анна Смирнова",
      email: "smirnova@example.com",
      phone: "+7 (999) 111-22-33",
      role: "Старший агент",
      deals: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: "Дмитрий Волков",
      email: "volkov@example.com",
      phone: "+7 (999) 222-33-44",
      role: "Агент",
      deals: 32,
      rating: 4.6
    },
    {
      id: 3,
      name: "Ольга Новикова",
      email: "novikova@example.com",
      phone: "+7 (999) 333-44-55",
      role: "Агент",
      deals: 28,
      rating: 4.5
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Команда</h1>
        <p className="text-muted-foreground mt-1">Управление коллегами и партнерами</p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <UserPlus className="h-4 w-4 mr-2" />
          Пригласить коллегу
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.id} className="border-border bg-card hover:bg-card/80 transition-colors">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {member.phone}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Сделок</p>
                  <p className="text-lg font-bold text-foreground">{member.deals}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-semibold">{member.rating}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-border hover:bg-secondary">
                Обменяться клиентом
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
