import individualItems from "@/assets/individual-items.jpg";
import palletSales from "@/assets/pallet-sales.jpg";
import customTruckloads from "@/assets/custom-truckloads.jpg";
import fullDelivery from "@/assets/full-delivery.jpg";

export const ServicesGrid = () => {
  const services = [
    {
      title: "INDIVIDUAL ITEMS",
      image: individualItems
    },
    {
      title: "PALLET SALES", 
      image: palletSales
    },
    {
      title: "CUSTOM TRUCKLOADS",
      image: customTruckloads
    },
    {
      title: "FULL TRUCKLOADS DELIVERED TO YOUR DOOR",
      image: fullDelivery
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center font-bold text-gray-800 text-sm">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};