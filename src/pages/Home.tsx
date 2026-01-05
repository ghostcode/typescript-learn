import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Code, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const Home: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: '基础知识',
      description: '从零开始学习 TypeScript 的基本概念，包括类型、接口、函数等',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/basics',
    },
    {
      icon: GraduationCap,
      title: '进阶知识',
      description: '深入学习泛型、类型守卫、装饰器等高级特性',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/advanced',
    },
    {
      icon: Code,
      title: '代码练习',
      description: '通过实际编写代码来巩固所学知识，实时查看运行结果',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/playground',
    },
    {
      icon: Trophy,
      title: '题目测试',
      description: '通过测试题检验学习成果，涵盖基础到高级的各种知识点',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/quiz',
    },
  ];

  const topics = [
    '基础类型系统',
    '接口和类型别名',
    '函数类型注解',
    '类和继承',
    '泛型编程',
    '类型守卫',
    '工具类型',
    '装饰器',
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <Badge variant="info">TypeScript 学习平台</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          掌握 TypeScript
          <span className="text-blue-600">从入门到精通</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          通过互动式学习、实时代码练习和测验，快速掌握 TypeScript 核心概念和最佳实践
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/basics">
            <Button size="lg">
              开始学习
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/quiz">
            <Button size="lg" variant="outline">
              测试水平
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Topics List */}
      <Card>
        <CardHeader>
          <CardTitle>学习内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
            <div className="text-gray-600">基础章节</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">6+</div>
            <div className="text-gray-600">进阶章节</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">28+</div>
            <div className="text-gray-600">测试题目</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
