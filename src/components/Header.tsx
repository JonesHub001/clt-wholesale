import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-blue-800">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-blue-800">CLT</span>
              <span className="text-blue-600 text-sm align-super">#</span>
              <span className="text-blue-800"> Wholesale</span>
            </h1>
            <p className="text-blue-700 text-sm md:text-base">A Registix Company</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-blue-600">
            <span className="text-blue-500">🕘</span>
            <span className="text-sm">9:00 a.m. - 5:00 p.m.</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
          
          </div>
          <Button 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            CALL US
          </Button>
        </div>

        {/* Mobile Contact */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            CALL US
          </Button>
        </div>
      </div>
    </header>
  );
};
