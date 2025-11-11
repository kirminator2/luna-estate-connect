import { useState } from "react";
import { Client } from "@/pages/Clients";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface TaskFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onSubmit: () => void;
}

export default function TaskFormSheet({
  open,
  onOpenChange,
  client,
  onSubmit,
}: TaskFormSheetProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "medium",
    reminderBefore: "30",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь будет логика сохранения задачи
    toast({
      title: "Задача создана",
      description: `Задача для клиента ${client?.name} успешно создана`,
    });

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      dueTime: "",
      priority: "medium",
      reminderBefore: "30",
    });
    
    onSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-foreground">Создать задачу</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {client ? `Задача для клиента: ${client.name}` : "Новая задача"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Название задачи *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Позвонить клиенту"
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Подробности задачи..."
              className="bg-background border-border min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Дата *</Label>
              <Input
                id="dueDate"
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueTime">Время *</Label>
              <Input
                id="dueTime"
                type="time"
                required
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Приоритет</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="low">Низкий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="high">Высокий</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder">Напомнить за</Label>
            <Select value={formData.reminderBefore} onValueChange={(value) => setFormData({ ...formData, reminderBefore: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="15">15 минут</SelectItem>
                <SelectItem value="30">30 минут</SelectItem>
                <SelectItem value="60">1 час</SelectItem>
                <SelectItem value="1440">1 день</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Создать задачу
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
