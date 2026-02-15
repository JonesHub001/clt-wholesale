export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <div className="text-blue-800 mb-4">
              <h3 className="text-2xl font-bold">
                <span className="text-blue-800">CLT</span>
                <span className="text-blue-600 text-sm align-super">#</span>
                <span className="text-blue-800"> Wholesale</span>
              </h3>
              <p className="text-blue-700 text-sm">A Registix Company</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-600">© Copyright 2025, CLT Wholesale.</p>
            <p className="text-sm text-gray-600">All rights reserved.</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>deal.ctlwholesale@gmail</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+18704092836" className="hover:underline">
                  +1 (870) 409-2836
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <span>📍</span>
                <div>
                  <div>4091 Southmeadow Pkwy W</div>
                  <div>Atlanta, GA 30349</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
