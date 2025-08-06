import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, MessageSquare, Phone } from "lucide-react";

export default function BSPPerformance() {
  const whatsappBSPs = [
    {
      name: "Cloud API",
      label: "RECOMMENDED",
      cost: "₹0.08",
      delivery: "97.8%",
      engagement: "82.1%",
      rating: 4.7,
      labelColor: "bg-green-600"
    },
    {
      name: "MM Lite",
      label: "COST EFFICIENT", 
      cost: "₹0.05",
      delivery: "94.2%",
      engagement: "78.5%",
      rating: 4.2,
      labelColor: "bg-blue-600"
    }
  ];

  const rcsBSPs = [
    {
      name: "Karix",
      label: "RECOMMENDED",
      cost: "₹0.15", 
      delivery: "92.1%",
      engagement: "75.4%",
      rating: 4.1,
      labelColor: "bg-green-600"
    },
    {
      name: "TCL",
      label: "BUDGET OPTION",
      cost: "₹0.12",
      delivery: "89.3%", 
      engagement: "71.8%",
      rating: 3.8,
      labelColor: "bg-blue-600"
    }
  ];

  const currentProviders = [
    {
      name: "MM Lite (Plivo)",
      label: "Current",
      type: "WhatsApp Business API",
      cost: "₹0.25/msg",
      delivery: "99.2% delivery",
      status: "preferred",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      name: "Cloud API", 
      label: "Alternative",
      type: "WhatsApp Business API",
      cost: "₹0.18/msg",
      delivery: "97.8% delivery",
      status: "direct",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      name: "TCL",
      label: "Current", 
      type: "RCS Messaging",
      cost: "₹0.35/msg",
      delivery: "94.5% delivery",
      status: "preferred",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      name: "Karix",
      label: "Alternative",
      type: "RCS Messaging", 
      cost: "₹0.42/msg",
      delivery: "92.1% delivery",
      status: "alternative",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* BSP Performance Comparison Cards */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-gray-600 mr-2" />
              <CardTitle className="text-xl font-semibold text-gray-900">BSP Performance Comparison</CardTitle>
            </div>
            <p className="text-sm text-gray-600">Choose the most cost-effective providers for each channel</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp BSPs */}
            <div>
              <div className="flex items-center mb-4">
                <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium text-gray-900">WhatsApp BSPs</h3>
              </div>
              <div className="space-y-4">
                {whatsappBSPs.map((bsp, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                    data-testid={`whatsapp-bsp-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{bsp.name}</h4>
                      <Badge className={`${bsp.labelColor} text-white text-xs`}>{bsp.label}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center text-sm mb-3">
                      <div>
                        <p className="text-gray-600 text-xs">COST</p>
                        <p className="font-semibold text-blue-600">{bsp.cost}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">DELIVERY</p>
                        <p className="font-semibold text-blue-600">{bsp.delivery}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">ENGAGEMENT</p>
                        <p className="font-semibold text-blue-600">{bsp.engagement}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      {renderStars(bsp.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RCS BSPs */}
            <div>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-cyan-600 mr-2" />
                <h3 className="font-medium text-gray-900">RCS BSPs</h3>
              </div>
              <div className="space-y-4">
                {rcsBSPs.map((bsp, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                    data-testid={`rcs-bsp-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{bsp.name}</h4>
                      <Badge className={`${bsp.labelColor} text-white text-xs`}>{bsp.label}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center text-sm mb-3">
                      <div>
                        <p className="text-gray-600 text-xs">COST</p>
                        <p className="font-semibold text-blue-600">{bsp.cost}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">DELIVERY</p>
                        <p className="font-semibold text-blue-600">{bsp.delivery}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">ENGAGEMENT</p>
                        <p className="font-semibold text-blue-600">{bsp.engagement}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      {renderStars(bsp.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current BSP Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">BSP Performance Comparison</CardTitle>
            <Button variant="outline" size="sm" data-testid="button-configure">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* WhatsApp Section */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">WhatsApp Business API</h3>
              <div className="space-y-2">
                {currentProviders.slice(0, 2).map((provider, index) => (
                  <div 
                    key={index}
                    className={`${provider.bgColor} ${provider.borderColor} border rounded-lg p-4`}
                    data-testid={`current-provider-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900">{provider.name}</h4>
                          <span className="ml-2 text-sm text-gray-600">({provider.status})</span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.delivery}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{provider.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RCS Section */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">RCS Messaging</h3>
              <div className="space-y-2">
                {currentProviders.slice(2, 4).map((provider, index) => (
                  <div 
                    key={index}
                    className={`${provider.bgColor} ${provider.borderColor} border rounded-lg p-4`}
                    data-testid={`current-rcs-provider-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900">{provider.name}</h4>
                          <span className="ml-2 text-sm text-gray-600">({provider.status})</span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.delivery}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{provider.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Opportunity */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Settings className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Optimization Opportunity</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Switching to WhatsApp Cloud API could save ₹28,000/month (₹0.07 per message).
                  </p>
                  <Button 
                    variant="link" 
                    className="text-blue-700 hover:underline p-0"
                    data-testid="button-analyze-impact"
                  >
                    Analyze Impact →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
