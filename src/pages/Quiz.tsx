import React, { useState, } from 'react';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Home, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Progress } from '../components/Progress';
import { quizzes, getQuizzesByCategory, type QuizItem } from '../data/quiz';

type QuizState = 'menu' | 'quiz' | 'result';

export const Quiz: React.FC = () => {
  const [state, setState] = useState<QuizState>('menu');
  const [category, setCategory] = useState<'all' | 'basics' | 'advanced'>('all');
  const [currentQuizzes, setCurrentQuizzes] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  const startQuiz = (cat: typeof category) => {
    setCategory(cat);
    const quizList = cat === 'all' ? quizzes : getQuizzesByCategory(cat);
    setCurrentQuizzes(quizList);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setScore(0);
    setState('quiz');
  };

  const handleAnswer = (quizId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [quizId]: answerIndex }));
    setShowExplanation(prev => ({ ...prev, [quizId]: true }));

    const quiz = currentQuizzes.find(q => q.id === quizId);
    if (quiz && answerIndex === quiz.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < currentQuizzes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setState('result');
    }
  };

  const resetQuiz = () => {
    setState('menu');
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setScore(0);
  };

  const currentQuiz = currentQuizzes[currentIndex];
  const progress = currentQuizzes.length > 0 ? ((currentIndex + 1) / currentQuizzes.length) * 100 : 0;
  const isAnswered = currentQuiz && selectedAnswers[currentQuiz.id] !== undefined;

  // Menu View
  if (state === 'menu') {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">题目测试</h1>
            <p className="text-gray-600 mt-2">检验你的 TypeScript 知识水平</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => startQuiz('basics')}>
            <CardHeader>
              <CardTitle className="text-lg">基础知识</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">题目数量</span>
                  <Badge variant="info">{getQuizzesByCategory('basics').length} 题</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">难度</span>
                  <Badge variant="success">简单-中等</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => startQuiz('advanced')}>
            <CardHeader>
              <CardTitle className="text-lg">进阶知识</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">题目数量</span>
                  <Badge variant="warning">{getQuizzesByCategory('advanced').length} 题</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">难度</span>
                  <Badge variant="default">中等-困难</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => startQuiz('all')}>
            <CardHeader>
              <CardTitle className="text-lg">全部题目</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">题目数量</span>
                  <Badge>{quizzes.length} 题</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">难度</span>
                  <Badge variant="default">全范围</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>测试说明</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 每道题目有四个选项，只有一个正确答案</li>
              <li>• 选择答案后会显示正确答案和详细解释</li>
              <li>• 完成所有题目后查看最终得分和评价</li>
              <li>• 可以选择特定类别或全部题目进行测试</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Result View
  if (state === 'result') {
    const percentage = Math.round((score / currentQuizzes.length) * 100);
    let grade = '继续努力';
    let gradeColor = 'text-gray-600';

    if (percentage >= 90) {
      grade = '优秀!';
      gradeColor = 'text-green-600';
    } else if (percentage >= 70) {
      grade = '良好!';
      gradeColor = 'text-blue-600';
    } else if (percentage >= 60) {
      grade = '及格';
      gradeColor = 'text-yellow-600';
    }

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                percentage >= 70 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-gray-100'
              }`}>
                <Trophy className={`w-10 h-10 ${percentage >= 70 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">测试完成!</h2>
                <p className={`text-3xl font-bold mt-2 ${gradeColor}`}>{grade}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {score} / {currentQuizzes.length}
              </div>
              <p className="text-gray-600">答对题目</p>
            </div>

            <Progress value={percentage} showLabel />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Object.entries(selectedAnswers).filter(([id, answer]) => {
                    const quiz = currentQuizzes.find(q => q.id === id);
                    return quiz && answer === quiz.correctAnswer;
                  }).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">正确</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {Object.entries(selectedAnswers).filter(([id, answer]) => {
                    const quiz = currentQuizzes.find(q => q.id === id);
                    return quiz && answer !== quiz.correctAnswer;
                  }).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">错误</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {currentQuizzes.length - Object.keys(selectedAnswers).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">未答</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetQuiz} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                重新测试
              </Button>
              <Button variant="outline" onClick={() => setState('menu')} className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">题目 {currentIndex + 1} / {currentQuizzes.length}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={currentQuiz?.difficulty === 'easy' ? 'success' : currentQuiz?.difficulty === 'medium' ? 'warning' : 'default'}>
              {currentQuiz?.difficulty === 'easy' ? '简单' : currentQuiz?.difficulty === 'medium' ? '中等' : '困难'}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">当前得分</div>
          <div className="text-2xl font-bold text-blue-600">{score}</div>
        </div>
      </div>

      {/* Progress */}
      <Progress value={progress} />

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQuiz?.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuiz?.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuiz.id] === idx;
              const isCorrect = currentQuiz.correctAnswer === idx;
              const showResult = showExplanation[currentQuiz.id];

              return (
                <button
                  key={idx}
                  onClick={() => !isAnswered && handleAnswer(currentQuiz.id, idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    !showResult
                      ? isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      : isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isSelected && !isCorrect
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                  } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        !showResult
                          ? isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                          : isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation[currentQuiz.id] && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 mb-1">解析</p>
                  <p className="text-sm text-blue-800">{currentQuiz?.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button onClick={nextQuestion} disabled={!isAnswered}>
          {currentIndex < currentQuizzes.length - 1 ? '下一题' : '查看结果'}
        </Button>
      </div>
    </div>
  );
};
