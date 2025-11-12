import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Home, Bath, Maximize, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Properties() {
  const navigate = useNavigate();
  const properties = [
    {
      id: 1,
      title: "3-к квартира, 85 м²",
      price: "15 500 000 ₽",
      location: "Москва, ЦАО",
      rooms: 3,
      bathrooms: 2,
      area: "85 м²",
      status: "В продаже",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "2-к квартира, 62 м²",
      price: "11 200 000 ₽",
      location: "Москва, САО",
      rooms: 2,
      bathrooms: 1,
      area: "62 м²",
      status: "В продаже",
      image: "https://images.unsplash.com/photo-1502672260066-6bc35f0a8e6c?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "4-к квартира, 120 м²",
      price: "22 800 000 ₽",
      location: "Москва, СЗАО",
      rooms: 4,
      bathrooms: 2,
      area: "120 м²",
      status: "В продаже",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "1-к квартира, 42 м²",
      price: "8 900 000 ₽",
      location: "Москва, ЮВАО",
      rooms: 1,
      bathrooms: 1,
      area: "42 м²",
      status: "Забронирована",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "3-к квартира, 95 м²",
      price: "18 300 000 ₽",
      location: "Москва, ЗАО",
      rooms: 3,
      bathrooms: 2,
      area: "95 м²",
      status: "В продаже",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "2-к квартира, 55 м²",
      price: "9 700 000 ₽",
      location: "Москва, СВАО",
      rooms: 2,
      bathrooms: 1,
      area: "55 м²",
      status: "В продаже",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Недвижимость</h1>
        <p className="text-muted-foreground mt-1">Поиск и управление объектами</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по адресу, району..."
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button variant="outline" className="border-border bg-card hover:bg-muted">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Добавить объект
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card 
            key={property.id} 
            className="border-0 overflow-hidden hover:bg-muted/50 transition-all cursor-pointer"
            onClick={() => navigate(`/properties/${property.id}`)}
          >
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img
                src={property.image}
                alt={property.title}
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                {property.status}
              </Badge>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-medium text-base text-foreground mb-1">{property.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>{property.rooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize className="h-4 w-4" />
                  <span>{property.area}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-xl font-bold text-primary">{property.price}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
