import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, BookOpen, Code2, Lightbulb, CheckCircle2, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { basicsData } from '../data/basics';
import { cn } from '../lib/utils';

export const Basics: React.FC = () => {
  const { topicId } = useParams<{ topicId?: string }>();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentTopic = topicId ? basicsData.find(t => t.id === topicId) : null;

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (currentTopic) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Link to="/basics">
          <Button variant="ghost">← 返回基础知识</Button>
        </Link>

        {/* Topic Header */}
        <div>
          <Badge variant="info" className="mb-3">基础知识</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentTopic.title}</h1>
          <p className="text-gray-600">{currentTopic.description}</p>
        </div>

        {/* Content Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <CardTitle>概念说明</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              {currentTopic.content.split('\n\n').map((paragraph, idx) => {
                // Handle markdown-like headers
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1. **') || paragraph.startsWith('2. **') || paragraph.startsWith('3. **')) {
                  const parts = paragraph.split('**');
                  return (
                    <div key={idx} className="mb-3">
                      <span className="font-semibold text-gray-900">{parts[1]}:</span>
                      <span className="text-gray-600 ml-2">{parts[2]?.replace(':', '')}</span>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-green-600" />
                <CardTitle>代码示例</CardTitle>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(currentTopic.codeExample, currentTopic.id)}
              >
                {copiedId === currentTopic.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    复制代码
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">{currentTopic.codeExample}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <CardTitle>关键要点</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentTopic.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          {(() => {
            const currentIndex = basicsData.findIndex(t => t.id === currentTopic.id);
            const prevTopic = basicsData[currentIndex - 1];
            const nextTopic = basicsData[currentIndex + 1];

            return (
              <>
                {prevTopic ? (
                  <Link to={`/basics/${prevTopic.id}`}>
                    <Button variant="outline">
                      ← {prevTopic.title}
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                {nextTopic ? (
                  <Link to={`/basics/${nextTopic.id}`}>
                    <Button>
                      {nextTopic.title}
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/advanced">
                    <Button>
                      前往进阶知识
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </>
            );
          })()}
        </div>
      </div>
    );
  }

  // Topics List
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">基础知识</h1>
        <p className="text-gray-600">从零开始学习 TypeScript 的核心概念</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {basicsData.map((topic, idx) => (
          <Link key={topic.id} to={`/basics/${topic.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
                      "bg-blue-100 text-blue-700"
                    )}>
                      {idx + 1}
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
