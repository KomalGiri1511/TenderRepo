import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQsSection = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: 'general',
      titleKey: 'general',
      icon: <HelpCircle className="h-5 w-5" />
    }
  ];

  const faqItems = {
    general: [
      {
        id: 'general-1',
        questionKey: 'resetPassword'
      },
      {
        id: 'general-2',
        questionKey: 'updateProfile'
      },
      {
        id: 'general-3',
        questionKey: 'systemRequirements'
      },
      {
        id: 'general-4',
        questionKey: 'contactSupport'
      },
      {
        id: 'general-5',
        questionKey: 'mobileApp'
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t('faqs.title')}</h2>
        <p className="text-muted-foreground mt-2">
          {t('faqs.subtitle')}
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        {faqCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader 
              className={`bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors ${
                activeCategory === category.id ? 'border-b' : ''
              }`}
              onClick={() => setActiveCategory(activeCategory === category.id ? '' : category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <CardTitle>{t(`faqs.categories.${category.titleKey}`)}</CardTitle>
                </div>
                {activeCategory === category.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            
            {activeCategory === category.id && (
              <CardContent className="p-0">
                <div className="divide-y">
                  {faqItems[category.id]?.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-muted/30 transition-colors">
                      <button
                        className="flex items-center justify-between w-full text-left"
                        onClick={() => toggleItem(item.id)}
                      >
                        <h3 className="font-medium">{t(`faqs.questions.${item.questionKey}.question`)}</h3>
                        {expandedItems[item.id] ? (
                          <ChevronUp className="h-5 w-5 ml-4 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 ml-4 flex-shrink-0" />
                        )}
                      </button>
                      {expandedItems[item.id] && (
                        <div className="mt-2 text-muted-foreground">
                          <p>{t(`faqs.questions.${item.questionKey}.answer`)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;