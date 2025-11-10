import { Building2, Users, TrendingUp, DollarSign } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const recentActivity = [
    { id: 1, action: "Новая заявка от клиента", client: "Иванов И.И.", time: "2 часа назад" },
    { id: 2, action: "Добавлена недвижимость", property: "3-к квартира, Москва", time: "5 часов назад" },
    { id: 3, action: "Обмен клиентом", colleague: "Петрова М.А.", time: "1 день назад" },
    { id: 4, action: "Отправлена подборка", client: "Сидоров П.П.", time: "2 дня назад" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Дашборд</h1>
        <p className="text-muted-foreground mt-1">Обзор вашей деятельности</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Всего объектов"
          value="248"
          icon={Building2}
          trend={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Активные клиенты"
          value="86"
          icon={Users}
          trend={{ value: "8%", positive: true }}
        />
        <StatCard
          title="Средняя цена"
          value="12.5M ₽"
          icon={DollarSign}
          trend={{ value: "3%", positive: false }}
        />
        <StatCard
          title="Конверсия"
          value="23%"
          icon={TrendingUp}
          trend={{ value: "5%", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Последняя активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.client || activity.property || activity.colleague}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <Building2 className="h-4 w-4" />
                Добавить недвижимость
              </button>
              <button className="flex items-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
                <Users className="h-4 w-4" />
                Добавить клиента
              </button>
              <button className="flex items-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
                <TrendingUp className="h-4 w-4" />
                Создать подборку
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
