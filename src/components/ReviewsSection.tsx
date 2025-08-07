import { Button } from "@/components/ui/button";

export const ReviewsSection = () => {
  const reviews = [
    {
      rating: 5,
      date: "Aug 06, 2025",
      text: "Just want to take the time to THANK CLT WHOLESALE, if it wasn't for these guys my business wouldn't be what it is today. They have been with me since...",
      author: "Jeffrey Merritt",
      initials: "JM"
    },
    {
      rating: 5,
      date: "Aug 05, 2025", 
      text: "Austin E and Austin S was a great help! Bought a refrigerator. Prices are great! Will come again",
      author: "Tanya Cortez",
      initials: "TC"
    },
    {
      rating: 5,
      date: "Aug 04, 2025",
      text: "Great place lots of stuff nice people",
      author: "David Formichelli", 
      initials: "DF"
    },
    {
      rating: 5,
      date: "Aug 02, 2025",
      text: "Great prices, people and location. I've bought a fridge at a fraction of retail and now I'm buying some Milwaukee tools",
      author: "Angely Orozco",
      initials: "AO"
    },
    {
      rating: 5,
      date: "Aug 02, 2025",
      text: "Great place to buy appliances!",
      author: "Tiffany Choice",
      initials: "TC"
    },
    {
      rating: 5,
      date: "Aug 01, 2025",
      text: "Great place to buy appliances!",
      author: "Sarah Godnyuk",
      initials: "SG"
    },
    {
      rating: 5,
      date: "Jul 30, 2025",
      text: "Awesome selection. Place is huuuge!",
      author: "Todd Mory",
      initials: "TM"
    },
    {
      rating: 5,
      date: "Jul 29, 2025",
      text: "Great prices, people and location. I've bought a fridge at a fraction of retail and now I'm buying some Milwaukee tools",
      author: "Danny",
      initials: "D"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-400">⭐</span>
    ));
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What our clients say about us</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-bold">4.90</div>
              <div className="flex">{renderStars(5)}</div>
              <div className="text-sm text-gray-600">183 reviews</div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Write a review
            </Button>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-purple-600">✨</span>
            <span className="font-semibold text-purple-700">AI Summary</span>
          </div>
          <p className="text-gray-700">
            Overall, customers laud the excellent service, great selection, and unbeatable prices at CLT Wholesale. 
            While most experiences are positive, a few customers have reported issues with item availability and 
            customer service inconsistency.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {review.text}
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                  {review.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{review.author}</div>
                </div>
                <div className="w-4 h-4 text-blue-600">G</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};