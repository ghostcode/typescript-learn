import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

const defaultCode = `// TypeScript 代码练习场
// 在这里编写 TypeScript 代码并运行

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("TypeScript");
console.log(message);

// 尝试编写一些代码
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("原始数组:", numbers);
console.log("加倍后:", doubled);

// 接口示例
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com"
};
console.log("用户:", user);
`;

const codeTemplates = [
  {
    name: '基础类型',
    code: `// 基础类型示例
let username: string = "张三";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;

console.log("用户名:", username);
console.log("年龄:", age);
console.log("是否激活:", isActive);

// 数组类型
let numbers: number[] = [1, 2, 3, 4, 5];
console.log("数字数组:", numbers);

// 联合类型
let value: string | number = "hello";
console.log("值:", value);
value = 42;
console.log("新的值:", value);`
  },
  {
    name: '接口',
    code: `// 接口定义
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
}

const user: User = {
  id: 1,
  name: "李四",
  email: "lisi@example.com"
};

console.log("用户信息:", user);

// 接口扩展
interface AdminUser extends User {
  permissions: string[];
}

const admin: AdminUser = {
  id: 1,
  name: "管理员",
  email: "admin@example.com",
  permissions: ["read", "write", "delete"]
};

console.log("管理员:", admin);`
  },
  {
    name: '泛型',
    code: `// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");

console.log("数字:", num);
console.log("字符串:", str);

// 泛型接口
interface Box<T> {
  value: T;
}

const box: Box<string> = { value: "test" };
console.log("盒子内容:", box.value);

// 泛型约束
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log("长度:", arg.length);
}

logLength("hello");
logLength([1, 2, 3]);`
  },
  {
    name: '类',
    code: `// 类定义
class Animal {
  private name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public speak(): void {
    console.log(\`\${this.name} makes a sound\`);
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public speak(): void {
    console.log("汪汪叫!");
  }

  public fetch(): void {
    console.log("去捡球!");
  }
}

const dog = new Dog("旺财", 3, "金毛");
dog.speak();
dog.fetch();`
  }
];

export const Playground: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 模拟 console.log
  useEffect(() => {
    const customLog = (...args: unknown[]) => {
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setOutput(prev => [...prev, `> ${message}`]);
    };

    // @ts-ignore - 模拟浏览器环境
    window.customLog = customLog;
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput([]);

    // 将 console.log 重定向到我们的自定义输出
    const logs: string[] = [];
    const originalLog = console.log;

    console.log = (...args) => {
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(message);
      originalLog(...args);
    };

    try {
      // 创建一个安全的执行环境
      // 注意：这里只是模拟，实际生产环境中需要更安全的执行方式
      // const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

      // 包装代码，使用 eval 执行（仅用于演示）
      // 在生产环境中应该使用沙箱环境
      const wrappedCode = `
        ${code}
      `;

      // 简单的代码执行（不使用 eval/Function 用于真正的场景）
      // 这里只是为了演示
      const result = eval(wrappedCode);

      setOutput(logs);

      if (result !== undefined) {
        setOutput(prev => [...prev, `< ${typeof result === 'object' ? JSON.stringify(result) : result}`]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput([]);
    setError(null);
  };

  const loadTemplate = (templateCode: string) => {
    setCode(templateCode);
    setOutput([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">代码练习场</h1>
        <p className="text-gray-600">在这里练习编写 TypeScript 代码，实时查看运行结果</p>
      </div>

      {/* Templates */}
      <div className="flex flex-wrap gap-2">
        {codeTemplates.map((template) => (
          <Button
            key={template.name}
            size="sm"
            variant="outline"
            onClick={() => loadTemplate(template.code)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {template.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>代码编辑器</CardTitle>
              <Badge variant="info">TypeScript</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Editor
                height="500px"
                defaultLanguage="typescript"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <div className="space-y-4">
          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={runCode} disabled={isRunning} className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? '运行中...' : '运行代码'}
            </Button>
            <Button variant="outline" onClick={resetCode}>
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
          </div>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle>输出结果</CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-900">运行错误</p>
                    <p className="text-sm text-red-700 mt-1 font-mono">{error}</p>
                  </div>
                </div>
              ) : output.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  点击"运行代码"按钮查看输出结果
                </p>
              ) : (
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[400px]">
                  {output.map((line, idx) => (
                    <div key={idx} className="mb-1">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>提示</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 使用 console.log() 输出结果到控制台</li>
                <li>• 可以定义接口、类、函数等 TypeScript 特性</li>
                <li>• 点击上方的模板按钮快速加载示例代码</li>
                <li>• 代码会在浏览器环境中执行</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
