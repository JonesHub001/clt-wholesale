import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupForm = ({ isOpen, onClose }: SignupFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    language: "",
    purchaseIntent: "",
    interests: [] as string[],
    other: "",
    agreeToPromotions: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('signup_submissions')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferred_language: formData.language,
          purchase_intent: formData.purchaseIntent,
          interests: formData.interests,
          other_interests: formData.other,
          agree_to_promotions: formData.agreeToPromotions
        });

      if (error) {
        throw error;
      }

      // Send emails via Netlify Function
      await fetch('/.netlify/functions/send-signup-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      toast({
        title: "Success!",
        description: "Thank you for joining our VIP list. We'll be in touch soon!",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        language: "",
        purchaseIntent: "",
        interests: [],
        other: "",
        agreeToPromotions: false
      });

      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold mb-2">Don't Miss Our Best Deals!</DialogTitle>
          <p className="text-lg font-semibold text-blue-600">Get Exclusive Text Alerts From CLT Wholesale</p>
          <div className="space-y-2 mt-4">
            <p className="text-sm">YBe the first to know when new loads drop, flash sales hit, and hot inventory gets priced to move.</p>
            <div className="flex items-center gap-2 text-sm">
              <span>📱</span>
              <span>Direct updates from our staff</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🚚</span>
              <span>Early access to truckloads, pallets, and more</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>💥</span>
              <span>Limited-time offers straight to your phone</span>
            </div>
            <p className="text-sm font-medium">No spam. Just serious deals.</p>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-6">
            <span>📱</span>
            <span className="font-semibold">Enter your info below to join our VIP list:</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone for early access texts"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <Label>What is your preferred language?</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Are you interested in purchasing for your own personal use or to resell?</Label>
              <RadioGroup 
                value={formData.purchaseIntent} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, purchaseIntent: value }))}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal">Personal Use</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="resale" id="resale" />
                  <Label htmlFor="resale">Resale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neither" id="neither" />
                  <Label htmlFor="neither">Neither</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">What are you interested in buying? (Check all that apply.)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Appliances", "Equipment", "Flooring", "Furniture", "General Merchandise", "Home Decor", "Tools"].map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                    />
                    <Label htmlFor={interest} className="text-sm">{interest}</Label>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Input
                  placeholder="Other"
                  value={formData.other}
                  onChange={(e) => setFormData(prev => ({ ...prev, other: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="promotions"
                checked={formData.agreeToPromotions}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToPromotions: checked as boolean }))}
              />
              <Label htmlFor="promotions" className="text-sm leading-relaxed">
                Sure, send me deals, sneak peeks, and product drops too. <em>By checking this box, you agree to receive promotional messages from Consumer Brands Direct. Msg & Data rates may apply. Reply HELP for help or STOP to opt-out.</em>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              Send Me Deals
            </Button>

            <div className="text-center">
              <a href="#" className="text-blue-600 text-sm hover:underline">Privacy Policy</a>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};