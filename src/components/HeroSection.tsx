import { Button } from "@/components/ui/button";
import warehouseBg from "@/assets/warehouse-hero-bg.jpg";

interface HeroSectionProps {
  onSignupClick: () => void;
}

export const HeroSection = ({ onSignupClick }: HeroSectionProps) => {
  return (
    <section 
      className="relative py-12 px-4 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${warehouseBg})` 
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - What We Offer */}
          <div>
            <h2 className="text-blue-300 text-xl mb-2">What We Offer</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">OUR SERVICES</h1>
            <Button 
              onClick={onSignupClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              STOCK UP NOW
            </Button>
          </div>

          {/* Right side - Description */}
          <div className="bg-white/95 backdrop-blur-sm p-6 border-2 border-gray-300 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Turbo Loads, Outdoor Power Equipment, Heavy Equipment, Appliances & More.</h3>
            <p className="text-gray-700 leading-relaxed">
              At CLT Wholesale, we offer a variety of flexible buying programs to match every type of customer
              —from everyday shoppers to high-volume resellers. Our inventory includes everything from home
              improvement, furniture, appliances, tools, hardware, pallet programs for wholesalers and more.
              Whether you're looking to pick up a few items, buy by the pallet, or build out full custom or
              recurring truckloads, we've got the inventory and the service to keep your business moving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};