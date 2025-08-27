import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Wallet, 
  Bell, 
  Shield, 
  Save,
  Key
} from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card">
          <TabsTrigger value="profile" className="text-muted-foreground data-[state=active]:text-foreground">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="wallet" className="text-muted-foreground data-[state=active]:text-foreground">
            <Wallet className="h-4 w-4 mr-2" />
            Wallet & Payouts
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-muted-foreground data-[state=active]:text-foreground">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-muted-foreground data-[state=active]:text-foreground">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api" className="text-muted-foreground data-[state=active]:text-foreground">
            <Key className="h-4 w-4 mr-2" />
            API & Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Profile Information</CardTitle>
              <p className="text-sm text-muted-foreground">Update your profile details and public information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={undefined} />
                  <AvatarFallback className="bg-secondary text-foreground text-xl">AM</AvatarFallback>
                </Avatar>
                <div className="space-x-2">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Change Avatar
                  </Button>
                  <Button size="sm" variant="outline" className="border-border text-muted-foreground">
                    Remove
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Display Name</label>
                  <Input 
                    defaultValue="Anonymous Miner" 
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Email (Optional)</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com" 
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Bio</label>
                <Textarea 
                  placeholder="Tell the community about yourself..."
                  className="bg-input border-border text-foreground min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Wallet Address</label>
                <div className="bg-secondary p-3 rounded text-sm text-muted-foreground font-mono">
                  0x71e4b2c8f9a3d5e7f1b8c2d4e6f8a1b3c5d7e9f2
                </div>
                <p className="text-xs text-muted-foreground mt-1">This is your connected wallet address and cannot be changed</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Payout Preferences</CardTitle>
              <p className="text-sm text-muted-foreground">Configure how you want to receive your rewards</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">Preferred Payout Method</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payout" id="tao-direct" defaultChecked className="text-primary" />
                    <label htmlFor="tao-direct" className="text-sm text-muted-foreground">TAO Direct</label>
                    <span className="text-xs text-muted-foreground">Receive payments directly in TAO to your connected wallet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payout" id="usdc-pool" className="text-primary" />
                    <label htmlFor="usdc-pool" className="text-sm text-muted-foreground">USDC Pool</label>
                    <span className="text-xs text-muted-foreground">Convert to USDC via managed liquidity pool</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payout" id="usdt-pool" className="text-primary" />
                    <label htmlFor="usdt-pool" className="text-sm text-muted-foreground">USDT Pool</label>
                    <span className="text-xs text-muted-foreground">Convert to USDT via managed liquidity pool</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Minimum Payout Threshold</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    defaultValue="0.1" 
                    step="0.01"
                    className="bg-input border-border text-foreground w-24"
                  />
                  <span className="text-sm text-muted-foreground">TAO</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Minimum amount before automatic payout is triggered</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Auto-compound rewards</h4>
                  <p className="text-xs text-muted-foreground">Automatically reinvest rewards to increase future payouts</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Wallet Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Wallet Connection</span>
                  <Badge className="bg-green-900/20 text-green-400">Connected</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Last connected: Jan 20, 2025</p>
              </div>
              <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                Reconnect
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notification Settings</CardTitle>
              <p className="text-sm text-muted-foreground">Choose what updates you want to receive</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Submission Status Updates</h4>
                    <p className="text-xs text-muted-foreground">Get notified when your submissions are processed</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Payout Notifications</h4>
                    <p className="text-xs text-muted-foreground">Receive alerts when payouts are processed</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Challenge Announcements</h4>
                    <p className="text-xs text-muted-foreground">Get notified about new challenges and updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Leaderboard Updates</h4>
                    <p className="text-xs text-muted-foreground">Notifications about ranking changes</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Security & Privacy</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your account security and data privacy</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Rate Limiting Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Daily Submission Limit</span>
                    <span className="text-sm text-foreground">1 per challenge</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Trust Tier</span>
                    <Badge className="bg-muted text-muted-foreground">Standard</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account Status</span>
                    <Badge className="bg-green-900/20 text-green-400">Verified</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Data Privacy</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm text-muted-foreground">Profile Visibility</h5>
                      <p className="text-xs text-muted-foreground">Allow your profile to be visible on leaderboards</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm text-muted-foreground">Public Score History</h5>
                      <p className="text-xs text-muted-foreground">Make your submission scores publicly viewable</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">API & Integrations</CardTitle>
              <p className="text-sm text-muted-foreground">Manage API access and webhook integrations</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">API Keys</h4>
                <div className="space-y-3">
                  <div className="bg-secondary p-3 rounded border border-border">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-foreground font-mono">api_key_***************3f2</p>
                        <p className="text-xs text-muted-foreground">Created: Jan 15, 2025</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-border text-muted-foreground">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Generate New API Key
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Webhook Endpoints</h4>
                <Input 
                  placeholder="https://your-domain.com/webhook" 
                  className="bg-input border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">Receive real-time notifications about submission status changes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}