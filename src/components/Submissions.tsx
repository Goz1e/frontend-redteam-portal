import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Play, 
  Upload, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  Code,
  TestTube,
  Clock,
  Target
} from 'lucide-react';

export function Submissions() {
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const challenges = [
    { id: 'abs_v2', name: 'Auto Browser Sniffer v2', difficulty: 'Hard', weight: 0.35 },
    { id: 'neural_net', name: 'Neural Network Models', difficulty: 'Medium', weight: 0.25 },
    { id: 'data_analysis', name: 'Advanced Data Analysis', difficulty: 'Easy', weight: 0.20 },
  ];

  const handleTest = async () => {
    if (!selectedChallenge || !code.trim()) return;
    
    setIsTesting(true);
    setSubmissionStatus('testing');
    
    // Simulate testing process
    setTimeout(() => {
      const mockResults = {
        eslint: { passed: true, issues: 0 },
        syntax: { passed: true, errors: [] },
        logic: { passed: true, score: 0.85 },
        comparison: { score: 0.65, threshold: 0.7, passed: true },
        performance: { executionTime: 120, memoryUsage: '45MB' }
      };
      
      setTestResults(mockResults);
      setIsTesting(false);
      setSubmissionStatus('success');
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!testResults || !testResults.eslint.passed) return;
    
    // Handle actual submission
    console.log('Submitting code for challenge:', selectedChallenge);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Submit Solution</h1>
        <p className="text-muted-foreground">Test your code and submit to challenges</p>
      </div>

      {/* Submission Rules */}
      <Card className="bg-card border-border border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Important Submission Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-muted-foreground">ESLint check must pass (no malformed code)</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Minimum score threshold: &gt;0.5 (varies by challenge)</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-muted-foreground">Comparison score must be &lt;0.7</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-muted-foreground">Submissions decay from day 10, fully by day 15</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Higher comparison scores negatively affect final score</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-muted-foreground">Resubmissions: (old_score &lt; new_score) && comparison &lt; 0.9</span>
              </div>
            </div>
          </div>
          
          <Alert className="bg-blue-900/20 border-blue-400/20">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              <strong>Testing First Recommended:</strong> Use the test button below to validate your submission before submitting. 
              This reduces the gap between submission and receiving incentives, as final scoring depends mostly on comparison scores.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Challenge</label>
                <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Choose a challenge" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {challenges.map((challenge) => (
                      <SelectItem key={challenge.id} value={challenge.id} className="text-foreground hover:bg-accent">
                        <div className="flex items-center justify-between w-full">
                          <span>{challenge.name}</span>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline" className="text-xs">
                              {challenge.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {(challenge.weight * 100).toFixed(0)}%
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Your Solution</label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your JavaScript code here..."
                  className="min-h-[300px] bg-input border-border text-foreground font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleTest}
                  disabled={!selectedChallenge || !code.trim() || isTesting}
                  className="bg-primary hover:bg-primary/90"
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTesting ? 'Testing...' : 'Test Code'}
                </Button>
                
                <Button 
                  onClick={handleSubmit}
                  disabled={!testResults || !testResults.eslint.passed}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Solution
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {(isTesting || testResults) && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isTesting ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-muted-foreground">Running tests...</span>
                    </div>
                    <Progress value={33} className="h-2" />
                    <p className="text-sm text-muted-foreground">This may take a few moments</p>
                  </div>
                ) : testResults && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center gap-2">
                            {testResults.eslint.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                            <span className="text-sm text-muted-foreground">ESLint Check</span>
                          </div>
                          <Badge className={testResults.eslint.passed ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}>
                            {testResults.eslint.passed ? 'Passed' : 'Failed'}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center gap-2">
                            {testResults.syntax.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                            <span className="text-sm text-muted-foreground">Syntax Check</span>
                          </div>
                          <Badge className={testResults.syntax.passed ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}>
                            {testResults.syntax.passed ? 'Passed' : 'Failed'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-muted-foreground">Logic Score</span>
                          </div>
                          <span className="text-sm font-medium text-foreground">{testResults.logic.score.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-muted-foreground">Comparison Score</span>
                          </div>
                          <span className="text-sm font-medium text-foreground">{testResults.comparison.score.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                      <h4 className="text-sm font-medium text-foreground mb-2">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Execution Time:</span>
                          <span className="text-foreground ml-2">{testResults.performance.executionTime}ms</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Memory Usage:</span>
                          <span className="text-foreground ml-2">{testResults.performance.memoryUsage}</span>
                        </div>
                      </div>
                    </div>

                    {testResults.comparison.score >= 0.7 && (
                      <Alert className="bg-yellow-900/20 border-yellow-400/20">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <AlertDescription className="text-yellow-300">
                          Warning: Comparison score is {testResults.comparison.score.toFixed(2)}, which is above the 0.7 threshold. 
                          This may negatively impact your final score.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Comparison Process Info */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">How Scoring Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="text-sm">
                  <h4 className="text-foreground font-medium mb-1">1. Initial Validation</h4>
                  <p className="text-muted-foreground">ESLint check ensures code quality and security</p>
                </div>
                
                <div className="text-sm">
                  <h4 className="text-foreground font-medium mb-1">2. Performance Scoring</h4>
                  <p className="text-muted-foreground">Your solution is evaluated against test cases</p>
                </div>
                
                <div className="text-sm">
                  <h4 className="text-foreground font-medium mb-1">3. Comparison Analysis</h4>
                  <p className="text-muted-foreground">Compared with other submissions for uniqueness</p>
                </div>
                
                <div className="text-sm">
                  <h4 className="text-foreground font-medium mb-1">4. Final Weight Calculation</h4>
                  <p className="text-muted-foreground">Score-driven weights determine your rewards</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { challenge: 'Neural Networks', score: 0.91, time: '2h ago', status: 'Processing' },
                { challenge: 'Data Analysis', score: 0.87, time: '1d ago', status: 'Completed' },
                { challenge: 'Browser Sniffer', score: 0.76, time: '2d ago', status: 'Completed' },
              ].map((submission, index) => (
                <div key={index} className="p-3 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-foreground">{submission.challenge}</p>
                    <Badge 
                      variant={submission.status === 'Completed' ? 'secondary' : 'outline'}
                      className={submission.status === 'Completed' ? 'bg-green-900/20 text-green-400' : 'border-yellow-400/20 text-yellow-400'}
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{submission.time}</span>
                    <span className="text-xs text-foreground">Score: {submission.score}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}