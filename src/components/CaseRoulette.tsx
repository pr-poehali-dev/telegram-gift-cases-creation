import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface RouletteItem {
  id: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
}

interface CaseRouletteProps {
  caseData: {
    name: string;
    price: number;
    items: RouletteItem[];
  };
  onClose: () => void;
  onResult: (item: RouletteItem) => void;
}

const CaseRoulette = ({ caseData, onClose, onResult }: CaseRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RouletteItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [offset, setOffset] = useState(0);

  // Создаем список предметов для рулетки (повторяем их для бесконечной прокрутки)
  const rouletteItems = Array(50).fill(caseData.items).flat();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 border-gray-500/40';
      case 'rare': return 'bg-blue-500/20 border-blue-500/40';
      case 'epic': return 'bg-purple-500/20 border-purple-500/40';
      case 'legendary': return 'bg-yellow-500/20 border-yellow-500/40';
      default: return 'bg-gray-500/20 border-gray-500/40';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    // Выбираем случайный предмет с учетом редкости
    const weights = caseData.items.map(item => {
      switch (item.rarity) {
        case 'legendary': return 1;
        case 'epic': return 5;
        case 'rare': return 20;
        case 'common': return 74;
        default: return 10;
      }
    });

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;

    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }

    const winningItem = caseData.items[selectedIndex];
    
    // Анимация прокрутки
    const spinDuration = 3000;
    const finalOffset = -(100 * 25 + (selectedIndex * 100)) + Math.random() * 50 - 25;
    
    setOffset(finalOffset);

    setTimeout(() => {
      setSelectedItem(winningItem);
      setIsSpinning(false);
      setShowResult(true);
      onResult(winningItem);
    }, spinDuration);
  };

  useEffect(() => {
    // Сброс позиции при открытии
    setOffset(0);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl p-8 bg-background border-2">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold mb-2">Открытие кейса</h2>
          <p className="text-muted-foreground">{caseData.name} • {caseData.price} TON</p>
        </div>

        {/* Рулетка */}
        <div className="relative mb-8">
          {/* Указатель */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-primary drop-shadow-lg"></div>
          </div>

          {/* Контейнер рулетки */}
          <div className="bg-muted/30 rounded-xl p-4 overflow-hidden border-2 border-primary/20">
            <div 
              className="flex transition-transform duration-[3000ms] ease-out"
              style={{ 
                transform: `translateX(${offset}px)`,
                transitionTimingFunction: isSpinning ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'ease'
              }}
            >
              {rouletteItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className={`min-w-[100px] h-24 mx-1 rounded-lg border-2 flex flex-col items-center justify-center ${getRarityColor(item.rarity)} transition-all`}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className={`text-xs font-medium ${getRarityTextColor(item.rarity)}`}>
                    {item.value} TON
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Результат */}
        {showResult && selectedItem && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-6">
              <div className="text-6xl mb-4 animate-float">{selectedItem.icon}</div>
              <h3 className="text-2xl font-heading font-bold mb-2">{selectedItem.name}</h3>
              <Badge 
                variant="secondary" 
                className={`mb-2 ${getRarityColor(selectedItem.rarity)}`}
              >
                {selectedItem.rarity.toUpperCase()}
              </Badge>
              <div className="text-xl font-bold text-primary">+{selectedItem.value} TON</div>
            </div>
          </div>
        )}

        {/* Возможные предметы */}
        <div className="mb-8">
          <h4 className="text-lg font-heading font-semibold mb-4 text-center">Возможные предметы</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {caseData.items.map((item) => (
              <div 
                key={item.id}
                className={`p-3 rounded-lg border flex flex-col items-center text-center ${getRarityColor(item.rarity)}`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium mb-1">{item.name}</div>
                <div className={`text-xs ${getRarityTextColor(item.rarity)}`}>
                  {item.value} TON
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex gap-4 justify-center">
          {!showResult ? (
            <Button 
              onClick={spinRoulette}
              disabled={isSpinning}
              className="crypto-gradient px-8 py-3 text-lg glow-effect"
            >
              {isSpinning ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Открываем...
                </>
              ) : (
                <>
                  <Icon name="Play" size={20} className="mr-2" />
                  Открыть за {caseData.price} TON
                </>
              )}
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button onClick={onClose} variant="outline" className="px-8 py-3">
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
              <Button 
                onClick={() => {
                  setShowResult(false);
                  setSelectedItem(null);
                  setOffset(0);
                }}
                className="crypto-gradient px-8 py-3"
              >
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Открыть ещё
              </Button>
            </div>
          )}
          
          {!isSpinning && (
            <Button variant="outline" onClick={onClose} className="px-8 py-3">
              <Icon name="X" size={20} className="mr-2" />
              Закрыть
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CaseRoulette;