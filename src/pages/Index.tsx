import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import CaseRoulette from '@/components/CaseRoulette';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showRoulette, setShowRoulette] = useState(false);
  const [inventory, setInventory] = useState<any[]>([]);

  const cases = [
    {
      id: 1,
      name: 'Starter Pack',
      price: 0.5,
      image: '🎁',
      rarity: 'Common',
      items: [
        { id: 1, name: 'Basic Avatar', icon: '👤', rarity: 'common', value: 0.2 },
        { id: 2, name: 'Sticker Pack', icon: '🎨', rarity: 'common', value: 0.3 },
        { id: 3, name: 'Telegram Stars', icon: '⭐', rarity: 'rare', value: 0.8 },
        { id: 4, name: 'Premium Badge', icon: '🏅', rarity: 'epic', value: 1.5 }
      ]
    },
    {
      id: 2,
      name: 'Premium Box',
      price: 2.5,
      image: '💎',
      rarity: 'Rare',
      items: [
        { id: 5, name: 'Rare NFT', icon: '🖼️', rarity: 'rare', value: 1.8 },
        { id: 6, name: 'VIP Status', icon: '👑', rarity: 'epic', value: 3.2 },
        { id: 7, name: 'Crypto Bonus', icon: '💰', rarity: 'epic', value: 4.1 },
        { id: 8, name: 'Diamond Card', icon: '💎', rarity: 'legendary', value: 8.5 }
      ]
    },
    {
      id: 3,
      name: 'Legend Case',
      price: 10.0,
      image: '🏆',
      rarity: 'Legendary',
      items: [
        { id: 9, name: 'Epic NFT', icon: '🎭', rarity: 'epic', value: 8.2 },
        { id: 10, name: 'TON Jackpot', icon: '💸', rarity: 'legendary', value: 25.0 },
        { id: 11, name: 'Exclusive Access', icon: '🚀', rarity: 'legendary', value: 15.5 },
        { id: 12, name: 'Golden Trophy', icon: '🏆', rarity: 'legendary', value: 30.0 }
      ]
    }
  ];

  const topPlayers = [
    { name: '@crypto_king', wins: 156, profit: '+45.2 TON' },
    { name: '@diamond_hands', wins: 143, profit: '+38.7 TON' },
    { name: '@ton_master', wins: 128, profit: '+32.1 TON' }
  ];

  const connectWallet = () => {
    setWalletConnected(true);
    setBalance(12.5);
  };

  const openCase = (caseData: any) => {
    if (!walletConnected || balance < caseData.price) return;
    
    setSelectedCase(caseData);
    setShowRoulette(true);
  };

  const handleRouletteResult = (item: any) => {
    setBalance(prev => prev - selectedCase.price + item.value);
    setInventory(prev => [...prev, { ...item, timestamp: Date.now() }]);
  };

  const closeRoulette = () => {
    setShowRoulette(false);
    setSelectedCase(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎁</div>
              <h1 className="text-2xl font-heading font-bold text-primary">
                CryptoCases
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Кейсы</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Рейтинг</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Инвентарь</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Профиль</a>
            </nav>

            <div className="flex items-center space-x-4">
              {walletConnected ? (
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    <Icon name="Wallet" size={14} className="mr-1" />
                    {balance} TON
                  </Badge>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary-foreground" />
                  </div>
                </div>
              ) : (
                <Button onClick={connectWallet} className="crypto-gradient glow-effect">
                  <Icon name="Wallet" size={16} className="mr-2" />
                  Подключить TON
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Открывай кейсы<br />Получай подарки
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Платформа для открытия криптокейсов с эксклюзивными Telegram подарками и NFT наградами
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="crypto-gradient text-lg px-8 py-6 glow-effect animate-float">
                <Icon name="Gift" size={20} className="mr-2" />
                Открыть первый кейс
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-heading font-semibold mb-1">Мгновенно</h3>
                <p className="text-sm text-muted-foreground">Результат сразу после оплаты</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <h3 className="font-heading font-semibold mb-1">Честно</h3>
                <p className="text-sm text-muted-foreground">Прозрачный алгоритм</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💎</div>
                <h3 className="font-heading font-semibold mb-1">Эксклюзивно</h3>
                <p className="text-sm text-muted-foreground">Уникальные награды</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Популярные кейсы</h2>
            <p className="text-muted-foreground">Выбери свой путь к победе</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cases.map((caseItem, index) => (
              <Card key={caseItem.id} className={`case-card animate-slide-up`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-float" style={{animationDelay: `${index * 0.5}s`}}>
                    {caseItem.image}
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{caseItem.name}</h3>
                  <Badge variant={caseItem.rarity === 'Legendary' ? 'default' : 'secondary'} className="mb-4">
                    {caseItem.rarity}
                  </Badge>
                  
                  <div className="space-y-2 mb-6">
                    {caseItem.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
                        {item.name}
                      </div>
                    ))}
                  </div>

                  <div className="text-2xl font-bold text-primary mb-4">
                    {caseItem.price} TON
                  </div>

                  <Button 
                    className="w-full crypto-gradient" 
                    disabled={!walletConnected || balance < caseItem.price}
                    onClick={() => openCase(caseItem)}
                  >
                    {!walletConnected ? 'Подключи кошелёк' : 
                     balance < caseItem.price ? 'Недостаточно средств' : 
                     'Открыть кейс'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Top Players */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Icon name="Trophy" size={24} className="text-primary mr-2" />
                <h3 className="text-xl font-heading font-semibold">Топ игроков</h3>
              </div>
              
              <div className="space-y-4">
                {topPlayers.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-muted-foreground">{player.wins} побед</div>
                      </div>
                    </div>
                    <div className="text-success font-semibold">{player.profit}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Live Stats */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Icon name="Activity" size={24} className="text-primary mr-2" />
                <h3 className="text-xl font-heading font-semibold">Статистика</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Открыто кейсов сегодня</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Общий призовой фонд</span>
                    <span className="font-semibold">45,832 TON</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Активных игроков</span>
                    <span className="font-semibold">3,456</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">99.2%</div>
                  <div className="text-sm text-muted-foreground">Средний RTP</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Wins */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Последние выигрыши</h2>
            <p className="text-muted-foreground">Кто-то сейчас выигрывает</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="space-y-4">
                {[
                  { user: '@lucky_7', item: 'Rare Dragon NFT', value: '15.5 TON', time: '2 мин назад' },
                  { user: '@crypto_ninja', item: 'Premium Sticker Pack', value: '3.2 TON', time: '5 мин назад' },
                  { user: '@ton_whale', item: 'Legendary Avatar', value: '28.7 TON', time: '8 мин назад' },
                  { user: '@diamond_player', item: 'VIP Status', value: '12.1 TON', time: '12 мин назад' }
                ].map((win, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-success/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                        <Icon name="Gift" size={20} className="text-success" />
                      </div>
                      <div>
                        <div className="font-medium">{win.user}</div>
                        <div className="text-sm text-muted-foreground">выиграл {win.item}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-success">{win.value}</div>
                      <div className="text-sm text-muted-foreground">{win.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🎁</div>
                <h3 className="text-xl font-heading font-bold">CryptoCases</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Лучшая платформа для открытия криптокейсов с Telegram подарками
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Игра</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary block">Кейсы</a>
                <a href="#" className="text-muted-foreground hover:text-primary block">Рейтинг</a>
                <a href="#" className="text-muted-foreground hover:text-primary block">Правила</a>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Поддержка</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary block">FAQ</a>
                <a href="#" className="text-muted-foreground hover:text-primary block">Контакты</a>
                <a href="#" className="text-muted-foreground hover:text-primary block">Telegram</a>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Twitter" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Github" size={16} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div>© 2024 CryptoCases. Все права защищены.</div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Roulette Modal */}
      {showRoulette && selectedCase && (
        <CaseRoulette
          caseData={selectedCase}
          onClose={closeRoulette}
          onResult={handleRouletteResult}
        />
      )}
    </div>
  );
};

export default Index;