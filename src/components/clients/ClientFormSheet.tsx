import { useState } from "react";
import { Client, ClientStatus } from "@/pages/Clients";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (client: Omit<Client, "id">) => void;
}

export default function ClientFormSheet({
  open,
  onOpenChange,
  onSubmit,
}: ClientFormSheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new" as ClientStatus,
    budget: "",
    type: "Покупатель",
    dealAmount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dealAmount: formData.dealAmount ? parseFloat(formData.dealAmount) : undefined,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "new",
      budget: "",
      type: "Покупатель",
      dealAmount: "",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-foreground">Добавить клиента</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Заполните информацию о новом клиенте
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">ФИО *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Тип клиента</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="Покупатель">Покупатель</SelectItem>
                <SelectItem value="Продавец">Продавец</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Статус</Label>
            <Select value={formData.status} onValueChange={(value: ClientStatus) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="new">Новый</SelectItem>
                <SelectItem value="contacted">Связались</SelectItem>
                <SelectItem value="viewing">Просмотр</SelectItem>
                <SelectItem value="negotiation">Переговоры</SelectItem>
                <SelectItem value="deal">Сделка</SelectItem>
                <SelectItem value="closed">Закрыто</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Бюджет</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="10-15M ₽"
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dealAmount">Сумма сделки (₽)</Label>
            <Input
              id="dealAmount"
              type="number"
              value={formData.dealAmount}
              onChange={(e) => setFormData({ ...formData, dealAmount: e.target.value })}
              placeholder="12000000"
              className="bg-background border-border"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Сохранить
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
