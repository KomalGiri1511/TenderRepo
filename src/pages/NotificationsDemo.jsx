import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import NotificationModal from '../components/notifications/NotificationModal';

const NotificationsDemo = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadCount] = useState(3);

  const handleNotificationAction = (notification) => {
    // Navigate to the notification link
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Notification System Demo</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gray-900 text-white">
              <CardTitle className="text-2xl">Multilingual Notification Modal</CardTitle>
              <p className="text-gray-300 text-sm mt-2">
                Click the notification icon to view the demo
              </p>
            </CardHeader>
            <CardContent className="p-12">
              <div className="text-center">
                {/* Notification Bell Button */}
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="relative bg-gray-900 hover:bg-gray-800 px-8 py-6"
                >
                  <Bell className="h-6 w-6 mr-3" />
                  Open Notifications
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>

                {/* Features List */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-bold text-blue-900 mb-2">🌍 Multilingual Support</h3>
                    <p className="text-sm text-blue-800">
                      Supports English, Hindi, German, Spanish, and French with instant language switching.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-2">🔊 Audio Playback</h3>
                    <p className="text-sm text-green-800">
                      Text-to-speech support for accessibility. Click the speaker icon on any notification.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="font-bold text-purple-900 mb-2">🎯 Smart Filtering</h3>
                    <p className="text-sm text-purple-800">
                      Filter by All, Updates, Events, or Messages to quickly find what you need.
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h3 className="font-bold text-orange-900 mb-2">📱 Responsive Design</h3>
                    <p className="text-sm text-orange-800">
                      Works seamlessly on desktop, tablet, and mobile devices.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">♿ Accessible</h3>
                    <p className="text-sm text-gray-800">
                      Screen reader support, keyboard navigation, and resizable text.
                    </p>
                  </div>

                  <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <h3 className="font-bold text-pink-900 mb-2">⏰ Timestamp Display</h3>
                    <p className="text-sm text-pink-800">
                      Smart time formatting showing "just now", "2 hours ago", etc.
                    </p>
                  </div>
                </div>

                {/* Feature Description */}
                <div className="mt-8 p-6 bg-gray-50 border-2 border-gray-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Key Features:</h3>
                  <ul className="text-sm text-gray-700 space-y-2 text-left">
                    <li>✓ <strong>Multilingual Support:</strong> 5 languages with instant switching</li>
                    <li>✓ <strong>Notification Types:</strong> Updates, Events, Messages, Warnings with color-coded icons</li>
                    <li>✓ <strong>Interactive Actions:</strong> View Details, Dismiss, and Audio playback</li>
                    <li>✓ <strong>Mark as Read:</strong> Individual or bulk marking with visual indicators</li>
                    <li>✓ <strong>Scrollable Content:</strong> Handles long descriptions gracefully</li>
                    <li>✓ <strong>Rich Media:</strong> Support for images and icons</li>
                    <li>✓ <strong>Time Display:</strong> Relative timestamps in selected language</li>
                    <li>✓ <strong>Filtering:</strong> Quick access to specific notification types</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNotificationAction={handleNotificationAction}
      />
    </div>
  );
};

export default NotificationsDemo;

