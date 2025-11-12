import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Bath, Maximize, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  // Mock data - replace with actual data fetching
  const property = {
    id,
    title: "Современная квартира в центре",
    price: "25,000,000 ₽",
    location: "Москва, ЦАО, Тверская",
    rooms: 3,
    bathrooms: 2,
    area: "120 м²",
    description: "Просторная квартира с современным ремонтом, высокими потолками и панорамными окнами. Развитая инфраструктура, близость к метро.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    owner: {
      name: "Иван Петров",
      phone: "+7 (999) 123-45-67",
      email: "ivan@example.com",
    },
    features: ["Паркинг", "Консьерж", "Безопасность 24/7", "Детская площадка"],
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к списку
        </Button>

        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
            <img
              src={property.images[currentImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`aspect-video rounded overflow-hidden ${
                  currentImage === idx ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${property.title} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {property.price}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{property.rooms} комнаты</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{property.bathrooms} ванные</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{property.area}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Особенности</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-card rounded-lg p-6 space-y-4 h-fit">
            <h3 className="font-semibold text-lg">Контакты владельца</h3>
            
            <div className="space-y-3">
              <div>
                <div className="font-medium text-foreground mb-1">
                  {property.owner.name}
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${property.owner.phone}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {property.owner.phone}
                </a>
                <a
                  href={`mailto:${property.owner.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {property.owner.email}
                </a>
              </div>

              <Button className="w-full">
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
