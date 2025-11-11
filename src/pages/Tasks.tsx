import { useState } from "react";
import { Calendar, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskFormSheet from "@/components/clients/TaskFormSheet";

interface Task {
  id: string;
  title: string;
  description: string;
  clientName: string;
  dueDate: string;
  dueTime: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Позвонить клиенту Иванову",
    description: "Обсудить детали сделки",
    clientName: "Иванов Иван Иванович",
    dueDate: "2025-01-15",
    dueTime: "10:00",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Отправить подборку Петровой",
    description: "Квартиры в центре до 12M",
    clientName: "Петрова Мария Александровна",
    dueDate: "2025-01-16",
    dueTime: "14:00",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Встреча с Сидоровым",
    description: "Просмотр объекта на Ленина 45",
    clientName: "Сидоров Петр Петрович",
    dueDate: "2025-01-17",
    dueTime: "16:00",
    priority: "high",
    completed: false,
  },
];

const priorityColors = {
  low: "bg-green-500/20 text-green-500 border-green-500/50",
  medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  high: "bg-red-500/20 text-red-500 border-red-500/50",
};

const priorityLabels = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const tasksForSelectedDate = tasks.filter(task => {
    if (!selectedDate) return false;
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getDate() === selectedDate.getDate()
    );
  });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    }).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Задачи</h1>
          <p className="text-muted-foreground mt-1">Управление задачами и напоминаниями</p>
        </div>
        <Button onClick={() => setTaskFormOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Создать задачу
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="bg-muted">
          Всего задач: {tasks.length}
        </Badge>
        <Badge variant="secondary" className="bg-success/20 text-success">
          Выполнено: {tasks.filter(t => t.completed).length}
        </Badge>
        <Badge variant="secondary" className="bg-destructive/20 text-destructive">
          Активных: {tasks.filter(t => !t.completed).length}
        </Badge>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <List className="h-4 w-4 mr-2" />
            Списком
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Календарь
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Задача</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Приоритет</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-border">
                    <TableCell>
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={task.completed ? "opacity-50" : ""}>
                        <div className="font-medium text-foreground">{task.title}</div>
                        <div className="text-sm text-muted-foreground">{task.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {task.clientName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(task.dueDate).toLocaleDateString('ru-RU')} в {task.dueTime}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={priorityColors[task.priority]}>
                        {priorityLabels[task.priority]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                  modifiers={{
                    hasTasks: (date) => getTasksForDate(date) > 0,
                  }}
                  modifiersClassNames={{
                    hasTasks: "bg-primary/20 font-bold",
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Задачи на {selectedDate?.toLocaleDateString('ru-RU')}
                </h3>
                
                {tasksForSelectedDate.length === 0 ? (
                  <p className="text-muted-foreground">Нет задач на этот день</p>
                ) : (
                  <div className="space-y-3">
                    {tasksForSelectedDate.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskComplete(task.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium ${task.completed ? "line-through opacity-50" : ""}`}>
                              {task.title}
                            </span>
                            <Badge variant="outline" className={priorityColors[task.priority]}>
                              {priorityLabels[task.priority]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{task.description}</p>
                          <p className="text-sm text-muted-foreground">
                            Клиент: {task.clientName} • Время: {task.dueTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <TaskFormSheet
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        client={null}
        onSubmit={() => setTaskFormOpen(false)}
      />
    </div>
  );
}
