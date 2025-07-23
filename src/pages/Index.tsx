import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

const Index = () => {
  const [balance, setBalance] = useState(0.00);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Live feed icons scrolling at top
  const liveIcons = ['🎁', '🏆', '💎', '🎯', '🎂', '🔍', '🍰', '⚙️', '💸', '📱', '🛡️', '🔒', '🎮', '💝', '⚡', '🔧', '🎸', '👑', '💰', '🎭'];

  // Cases data based on the screenshot
  const cases = [
    {
      id: 'free',
      name: 'FREE CASE',
      price: 0,
      image: '🎁',
      type: 'free',
      gradient: 'from-blue-500 to-cyan-400',
      isNew: true
    },
    {
      id: 'golden',
      name: 'Golden Box',
      price: 5.55,
      image: '🏆',
      type: 'high',
      gradient: 'from-yellow-500 to-orange-400'
    },
    {
      id: 'privacy',
      name: 'Privacy Case',
      price: 3,
      image: '🔒',
      type: 'medium',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      id: 'crypto',
      name: 'Crypto Turtle',
      price: 0.1,
      image: '🐢',
      type: 'low',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'heart',
      name: 'Love Case',
      price: 0.5,
      image: '💝',
      type: 'low',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 'liberty',
      name: 'Liberty',
      price: 0.8,
      image: '🗽',
      type: 'medium',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'balance',
      name: 'TON Balance',
      price: 1,
      image: '💳',
      type: 'medium',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'ruby',
      name: 'Ruby Case',
      price: 1.5,
      image: '💎',
      type: 'high',
      gradient: 'from-red-600 to-red-800'
    },
    {
      id: 'telegram',
      name: 'Telegram Premium',
      price: 2.5,
      image: '💙',
      type: 'high',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'game',
      name: 'Game Case',
      price: 6,
      image: '🎮',
      type: 'high',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      id: 'watch',
      name: 'Luxury Watch',
      price: 6,
      image: '⌚',
      type: 'high',
      gradient: 'from-gray-600 to-gray-800'
    }
  ];

  // Sample prizes for case modal
  const samplePrizes = [
    { id: 1, name: 'Crypto Dragon', value: 3390, image: '🐉', rarity: 'legendary' },
    { id: 2, name: 'Golden Ring', value: 126.5, image: '💍', rarity: 'epic' },
    { id: 3, name: 'Trophy', value: 77, image: '🏆', rarity: 'rare' },
    { id: 4, name: 'Mystery Box', value: 75.57, image: '📦', rarity: 'rare' },
    { id: 5, name: 'Lucky Wheel', value: 36.14, image: '🎰', rarity: 'uncommon' },
    { id: 6, name: 'Coffee Cup', value: 24.85, image: '☕', rarity: 'common' },
    { id: 7, name: 'Pink Bear', value: 18.36, image: '🧸', rarity: 'common' },
    { id: 8, name: 'Tech Gadget', value: 15.38, image: '📱', rarity: 'common' },
    { id: 9, name: 'Love Potion', value: 12.63, image: '💕', rarity: 'common' },
    { id: 10, name: 'Biceps', value: 2.09, image: '💪', rarity: 'common' },
    { id: 11, name: 'Gift Box', value: 2.02, image: '🎁', rarity: 'common' },
    { id: 12, name: 'Happy Birthday', value: 1.31, image: '🎂', rarity: 'common' }
  ];

  const filters = [
    { key: 'All', label: 'All', icon: '🎯' },
    { key: 'Free', label: 'Free', icon: '🆓' },
    { key: 'New', label: 'New', icon: '⭐' },
    { key: 'Low', label: 'Low', icon: '🔸' },
    { key: 'High', label: 'High', icon: '🔥' }
  ];

  const filteredCases = cases.filter(caseItem => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Free') return caseItem.price === 0;
    if (activeFilter === 'New') return caseItem.isNew;
    if (activeFilter === 'Low') return caseItem.type === 'low';
    if (activeFilter === 'High') return caseItem.type === 'high';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">ЯШ</span>
            </div>
            <span className="text-sm text-gray-300">я на ш...</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Connect Wallet
            </Button>
            <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded">
              <span className="text-sm">{balance.toFixed(2)}</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">V</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live scrolling icons */}
      <div className="bg-gray-800 border-b border-gray-700 py-2 overflow-hidden">
        <div className="flex animate-scroll space-x-4">
          {[...liveIcons, ...liveIcons].map((icon, index) => (
            <div key={index} className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl">
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Promotional banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 mx-4 mt-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🔓</div>
          <div>
            <h3 className="font-semibold text-lg">Guess the code from the safe and get bonus</h3>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 mt-6">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg max-w-2xl">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cases grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {filteredCases.map((caseItem) => (
            <Card 
              key={caseItem.id}
              className="bg-gray-800 border-gray-700 p-4 cursor-pointer hover:bg-gray-750 transition-all group relative overflow-hidden"
              onClick={() => setSelectedCase(caseItem)}
            >
              {caseItem.isNew && (
                <Badge className="absolute top-2 right-2 bg-blue-600 text-xs px-2 py-1">
                  NEW
                </Badge>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${caseItem.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-3 text-center">
                  {caseItem.image}
                </div>
                
                {caseItem.price === 0 ? (
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400 mb-1">FREE</div>
                    <div className="text-lg font-bold text-blue-400">CASE</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-lg font-bold text-white flex items-center justify-center">
                      {caseItem.price}
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                        <span className="text-xs text-white">V</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around py-2">
          {[
            { icon: '🎯', label: 'Main' },
            { icon: '📅', label: 'Weekly' },
            { icon: '🎰', label: 'JackPot' },
            { icon: '⬆️', label: 'Upgrade' },
            { icon: '👤', label: 'Profile' }
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center space-y-1 px-4 py-2 text-gray-400 hover:text-white">
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Case modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              {selectedCase?.name || "Durov's biceps"}
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <Icon name="X" size={20} />
            </DialogClose>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Case preview */}
            <div className="flex justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center text-2xl mb-2">
                  💪
                </div>
                <div className="text-sm font-semibold flex items-center justify-center">
                  2.09
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                    <span className="text-xs">V</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-2xl mb-2">
                  🎂
                </div>
                <div className="text-sm font-semibold flex items-center justify-center">
                  1.31
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                    <span className="text-xs">V</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
            </div>

            {/* Not enough funds */}
            <div className="flex items-center justify-center space-x-2 text-gray-300 mb-4">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm">Not enough funds</span>
            </div>

            {/* Deposit button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
              Deposit
            </Button>

            {/* Possible prizes */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Possible prizes:</h4>
              <div className="grid grid-cols-3 gap-3">
                {samplePrizes.map((prize) => (
                  <div key={prize.id} className="text-center">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-lg mb-2">
                      {prize.image}
                    </div>
                    <div className="text-xs font-semibold flex items-center justify-center">
                      {prize.value}
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                        <span className="text-xs">V</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;