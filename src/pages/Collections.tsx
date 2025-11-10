import { Send, Plus, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Collections() {
  const collections = [
    {
      id: 1,
      name: "Подборка для Иванова И.И.",
      client: "Иванов Иван Иванович",
      properties: 5,
      status: "sent",
      date: "15.11.2025"
    },
    {
      id: 2,
      name: "Элитное жилье ЦАО",
      client: "Козлова Елена Сергеевна",
      properties: 8,
      status: "draft",
      date: "14.11.2025"
    },
    {
      id: 3,
      name: "Квартиры у метро",
      client: "Петрова Мария Александровна",
      properties: 12,
      status: "sent",
      date: "13.11.2025"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Подборки</h1>
        <p className="text-muted-foreground mt-1">Создавайте и отправляйте подборки клиентам</p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Создать подборку
        </Button>
      </div>

      <div className="grid gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="border-border bg-card hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{collection.name}</h3>
                    <Badge 
                      variant={collection.status === "sent" ? "default" : "secondary"}
                      className={collection.status === "sent" ? "bg-success text-success-foreground" : ""}
                    >
                      {collection.status === "sent" ? "Отправлена" : "Черновик"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Клиент: {collection.client}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{collection.properties} объектов</span>
                    <span>•</span>
                    <span>{collection.date}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="border-border hover:bg-secondary">
                    <Eye className="h-4 w-4 mr-2" />
                    Просмотр
                  </Button>
                  {collection.status === "draft" ? (
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Send className="h-4 w-4 mr-2" />
                      Отправить
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Send className="h-4 w-4 mr-2" />
                      Переслать
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
