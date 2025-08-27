import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  ExternalLink
} from 'lucide-react';

export function MinerProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const miners = [
    {
      id: '0x5f8b...4c1d',
      fullAddress: '0x5f8b2c8f9a3d5e7f1b8c2d4e6f8a1b3c5d7e9f4c1d',
      name: 'CryptoMiner_Alpha',
      avatar: null,
      totalScore: 0.89,
      rank: 1,
      submissions: 47,
      successRate: 94,
      totalEarned: '12.45 TAO',
      joinDate: '2024-09-15',
      lastActive: '2 hours ago',
      specializations: ['Neural Networks', 'Computer Vision'],
      recentChallenges: [
        { name: 'Auto Browser Sniffer v2', score: 0.92, date: '2025-01-20' },
        { name: 'Neural Network Models', score: 0.87, date: '2025-01-19' },
        { name: 'Data Analysis', score: 0.88, date: '2025-01-18' }
      ],
      trustTier: 'Verified',
      publicProfile: true
    },
    {
      id: '0x9c4d...2e8a',
      fullAddress: '0x9c4d1a7b2e5f8c3a6d9b4e7c0f3a6d9b2e5f8c1a2e8a',
      name: 'DataScience_Pro',
      avatar: null,
      totalScore: 0.84,
      rank: 2,
      submissions: 52,
      successRate: 88,
      totalEarned: '10.23 TAO',
      joinDate: '2024-08-22',
      lastActive: '1 day ago',
      specializations: ['Data Analysis', 'Machine Learning'],
      recentChallenges: [
        { name: 'Data Analysis', score: 0.95, date: '2025-01-20' },
        { name: 'Neural Network Models', score: 0.78, date: '2025-01-17' },
        { name: 'Auto Browser Sniffer v2', score: 0.82, date: '2025-01-16' }
      ],
      trustTier: 'Standard',
      publicProfile: true
    },
    {
      id: '0xa3e1...7b9f',
      fullAddress: '0xa3e1b8c5f2d9a6e3b7c0f4d8a1e5b9c2f6d0a3e7b9f',
      name: 'Anonymous Miner',
      avatar: null,
      totalScore: 0.79,
      rank: 3,
      submissions: 31,
      successRate: 82,
      totalEarned: '7.89 TAO',
      joinDate: '2024-10-05',
      lastActive: '4 hours ago',
      specializations: ['Security', 'Blockchain Dev'],
      recentChallenges: [
        { name: 'Auto Browser Sniffer v2', score: 0.85, date: '2025-01-19' },
        { name: 'Data Analysis', score: 0.76, date: '2025-01-17' },
        { name: 'Neural Network Models', score: 0.73, date: '2025-01-15' }
      ],
      trustTier: 'Standard',
      publicProfile: true
    },
    {
      id: '0xb7f2...9a3c',
      fullAddress: '0xb7f2d5a8c1e4b7f0c3d6a9e2b5f8c1d4a7e0b3f6a3c',
      name: 'ML_Specialist',
      avatar: null,
      totalScore: 0.76,
      rank: 4,
      submissions: 28,
      successRate: 86,
      totalEarned: '6.12 TAO',
      joinDate: '2024-11-12',
      lastActive: '12 hours ago',
      specializations: ['Machine Learning', 'Data Science'],
      recentChallenges: [
        { name: 'Neural Network Models', score: 0.81, date: '2025-01-18' },
        { name: 'Data Analysis', score: 0.79, date: '2025-01-16' },
        { name: 'Auto Browser Sniffer v2', score: 0.68, date: '2025-01-14' }
      ],
      trustTier: 'Verified',
      publicProfile: true
    }
  ];

  const filteredMiners = miners.filter(miner => {
    const matchesSearch = miner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         miner.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'verified') return matchesSearch && miner.trustTier === 'Verified';
    if (selectedFilter === 'active') return matchesSearch && miner.lastActive.includes('hour');
    
    return matchesSearch;
  });

  const getTierColor = (tier: string) => {
    return tier === 'Verified' ? 'bg-blue-900/20 text-blue-400' : 'bg-muted text-muted-foreground';
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Miner Profiles</h1>
        <p className="text-muted-foreground">Public leaderboard and miner performance statistics</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
                className={selectedFilter === 'all' ? 'bg-primary' : 'border-border text-muted-foreground'}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === 'verified' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('verified')}
                className={selectedFilter === 'verified' ? 'bg-primary' : 'border-border text-muted-foreground'}
              >
                Verified
              </Button>
              <Button
                variant={selectedFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('active')}
                className={selectedFilter === 'active' ? 'bg-primary' : 'border-border text-muted-foreground'}
              >
                Active
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Miners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{miners.length}</div>
            <p className="text-xs text-muted-foreground">Public profiles</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87.5%</div>
            <p className="text-xs text-muted-foreground">All miners</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156.3 TAO</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">Miners online</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger value="leaderboard" className="text-muted-foreground data-[state=active]:text-foreground">Leaderboard</TabsTrigger>
          <TabsTrigger value="analytics" className="text-muted-foreground data-[state=active]:text-foreground">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-4 mt-6">
          {filteredMiners.map((miner) => (
            <Card key={miner.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Basic Info */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-bold ${getRankColor(miner.rank)}`}>
                        #{miner.rank}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={miner.avatar || undefined} />
                        <AvatarFallback className="bg-secondary text-foreground">
                          {miner.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{miner.name}</h3>
                      <p className="text-sm text-muted-foreground">{miner.id}</p>
                      <Badge className={getTierColor(miner.trustTier)} size="sm">
                        {miner.trustTier}
                      </Badge>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Score:</span>
                      <span className="text-sm font-medium text-foreground">{miner.totalScore.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Success Rate:</span>
                      <span className="text-sm font-medium text-foreground">{miner.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Submissions:</span>
                      <span className="text-sm font-medium text-foreground">{miner.submissions}</span>
                    </div>
                  </div>

                  {/* Earnings & Activity */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Earned:</span>
                      <span className="text-sm font-medium text-foreground">{miner.totalEarned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Active:</span>
                      <span className="text-sm font-medium text-foreground">{miner.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Member Since:</span>
                      <span className="text-sm font-medium text-foreground">{new Date(miner.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Recent Performance */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground mb-2">Recent Challenges</h4>
                    {miner.recentChallenges.slice(0, 3).map((challenge, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground truncate">{challenge.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-foreground">{challenge.score.toFixed(2)}</span>
                          <span className="text-xs text-muted-foreground">{new Date(challenge.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    <Button size="sm" variant="outline" className="w-full mt-2 border-border text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          {/* Performance Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-green-400">75%</div>
                    <p className="text-sm text-muted-foreground">High Performers (&gt;0.7)</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">20%</div>
                    <p className="text-sm text-muted-foreground">Medium Performers (0.5-0.7)</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-red-400">5%</div>
                    <p className="text-sm text-muted-foreground">Improving (&lt;0.5)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Specializations */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Popular Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Machine Learning', count: 12, percentage: 60 },
                  { name: 'Data Analysis', count: 10, percentage: 50 },
                  { name: 'Neural Networks', count: 8, percentage: 40 },
                  { name: 'Computer Vision', count: 6, percentage: 30 },
                  { name: 'Security', count: 4, percentage: 20 },
                ].map((spec, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{spec.name}</span>
                      <span className="text-sm text-foreground">{spec.count} miners</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${spec.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}