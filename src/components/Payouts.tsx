import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Wallet,
  Download,
  Filter
} from 'lucide-react';

export function Payouts() {
  const payoutHistory = [
    { id: 'batch_1234', date: 'Jan 20, 2025', shard: 'A', amount: '0.45 TAO', usd: '$22.73', method: 'TAO Direct', status: 'Completed' },
    { id: 'batch_1235', date: 'Jan 18, 2025', shard: 'B', amount: '0.32 TAO', usd: '$16.15', method: 'USDC Pool', status: 'Completed' },
    { id: 'batch_1236', date: 'Jan 15, 2025', shard: 'A', amount: '0.67 TAO', usd: '$33.82', method: 'TAO Direct', status: 'Processing' },
    { id: 'batch_1237', date: 'Jan 12, 2025', shard: 'C', amount: '0.89 TAO', usd: '$44.93', method: 'USDT Pool', status: 'Completed' },
  ];

  const shardEarnings = [
    { shard: 'A', category: 'ML & AI', amount: '1.87 TAO', percentage: 45 },
    { shard: 'B', category: 'Data Analysis', amount: '1.34 TAO', percentage: 32.5 },
    { shard: 'C', category: 'Blockchain Dev', amount: '0.91 TAO', percentage: 22.5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Payouts</h1>
        <p className="text-muted-foreground">Track your earnings and manage withdrawals across all shards</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.12 TAO</div>
            <p className="text-xs text-muted-foreground">≈$204.83 USD</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0.87 TAO</div>
            <p className="text-xs text-muted-foreground">Next: Jan 25, 2025</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.23 TAO</div>
            <p className="text-xs text-muted-foreground">Ready to withdraw</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Exp-Mass Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.34%</div>
            <p className="text-xs text-muted-foreground">Current epoch</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payout History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Payout History</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-border text-muted-foreground">
                    <Filter className="h-4 w-4 mr-1" />
                    All Shards
                  </Button>
                  <Button size="sm" variant="outline" className="border-border text-muted-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border pb-2">
                  <span>Date</span>
                  <span>Batch ID</span>
                  <span>Shard</span>
                  <span>Amount</span>
                  <span>Method</span>
                  <span>Status</span>
                </div>

                {/* Table Rows */}
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="grid grid-cols-6 gap-4 text-sm items-center py-2 border-b border-border last:border-b-0">
                    <span className="text-muted-foreground">{payout.date}</span>
                    <span className="text-muted-foreground font-mono">{payout.id}</span>
                    <Badge variant="outline" className="border-border text-muted-foreground w-fit">
                      Shard {payout.shard}
                    </Badge>
                    <div>
                      <div className="text-foreground font-medium">{payout.amount}</div>
                      <div className="text-xs text-muted-foreground">{payout.usd}</div>
                    </div>
                    <span className="text-muted-foreground">{payout.method}</span>
                    <Badge 
                      className={payout.status === 'Completed' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'}
                    >
                      {payout.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Earnings by Shard */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Earnings by Shard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shardEarnings.map((earning) => (
                  <div key={earning.shard} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-border text-muted-foreground">
                          Shard {earning.shard}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{earning.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{earning.amount}</div>
                        <div className="text-xs text-muted-foreground">{earning.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={earning.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Withdraw Funds */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Withdraw Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Available Balance</label>
                <div className="bg-secondary p-3 rounded">
                  <div className="text-lg font-semibold text-foreground">1.23 TAO</div>
                  <div className="text-sm text-muted-foreground">≈$62.15 USD</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Withdrawal Method</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="method" id="tao-direct" defaultChecked className="text-primary" />
                    <label htmlFor="tao-direct" className="text-sm text-muted-foreground">TAO Direct to Wallet</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="method" id="usdc-pool" className="text-primary" />
                    <label htmlFor="usdc-pool" className="text-sm text-muted-foreground">USDC via Pool</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="method" id="usdt-pool" className="text-primary" />
                    <label htmlFor="usdt-pool" className="text-sm text-muted-foreground">USDT via Pool</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Amount</label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="bg-input border-border text-foreground"
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                Request Withdrawal
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Pool Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">USDC Pool</span>
                  <Badge className="bg-green-900/20 text-green-400">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">USDT Pool</span>
                  <Badge className="bg-green-900/20 text-green-400">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Liquidity</span>
                  <span className="text-sm text-foreground">High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}