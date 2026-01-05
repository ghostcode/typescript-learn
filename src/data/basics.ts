export interface Topic {
  id: string
  title: string
  description: string
  content: string
  codeExample: string
  keyPoints: string[]
}

export const basicsData: Topic[] = [
  {
    id: 'types',
    title: '基础类型',
    description: '学习 TypeScript 的基本类型系统',
    content: `TypeScript 是 JavaScript 的超集，添加了静态类型。基本类型包括：

1. **原始类型**：
   - \`string\`: 字符串类型
   - \`number\`: 数字类型（整数和浮点数）
   - \`boolean\`: 布尔类型
   - \`bigint\`: 大整数
   - \`symbol\`: 符号类型

2. **特殊类型**：
   - \`any\`: 任意类型
   - \`unknown\`: 未知类型（比 any 更安全）
   - \`never\`: 永不存在的类型
   - \`void\`: 无返回值
   - \`null\` 和 \`undefined\`: 空值类型`,
    codeExample: `// 基础类型声明
let username: string = "张三";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// 数组类型
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// 对象类型
let user: { name: string; age: number } = {
  name: "李四",
  age: 30
};

// any 类型（尽量避免使用）
let anything: any = 42;
anything = "可以是任何类型";
anything = { key: "value" };

// 联合类型
let value: string | number = "hello";
value = 42; // 也可以是数字`,
    keyPoints: [
      'Type 类型注解使用 : 语法',
      '数组可以使用 Type[] 或 Array<Type>',
      'any 类型会关闭类型检查，应谨慎使用',
      '联合类型允许变量是多种类型之一'
    ]
  },
  {
    id: 'interfaces',
    title: '接口 (Interfaces)',
    description: '定义对象的结构和类型',
    content: `接口是 TypeScript 中定义对象结构的重要方式。它描述了对象应该具有的属性和方法。

1. **基本接口定义**：
   - 定义对象必须具有的属性
   - 可选属性使用 ? 标记
   - 只读属性使用 readonly 标记

2. **接口扩展**：
   - 可以扩展其他接口
   - 支持多重继承

3. **函数类型接口**：
   - 描述函数的签名`,
    codeExample: `// 基本接口定义
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
  readonly createdAt: Date; // 只读属性
}

const user: User = {
  id: 1,
  name: "王五",
  email: "wangwu@example.com",
  createdAt: new Date()
};

// 接口扩展
interface AdminUser extends User {
  permissions: string[];
  role: "admin" | "superadmin";
}

const admin: AdminUser = {
  id: 1,
  name: "管理员",
  email: "admin@example.com",
  createdAt: new Date(),
  permissions: ["read", "write", "delete"],
  role: "admin"
};

// 函数类型接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const search: SearchFunc = (source, subString) => {
  return source.includes(subString);
};`,
    keyPoints: [
      '接口使用 interface 关键字定义',
      '可选属性使用 ? 修饰符',
      'readonly 属性只能在初始化时赋值',
      'extends 关键字用于接口继承'
    ]
  },
  {
    id: 'functions',
    title: '函数类型',
    description: '为函数添加类型注解',
    content: `TypeScript 允许你为函数的参数和返回值指定类型。

1. **函数类型注解**：
   - 参数类型注解
   - 返回值类型注解
   - 可选参数

2. **箭头函数**：
   - 简洁的函数语法
   - 类型推断

3. **函数重载**：
   - 同一个函数名的多种签名`,
    codeExample: `// 函数类型注解
function add(a: number, b: number): number {
  return a + b;
}

// 箭头函数
const multiply = (x: number, y: number): number => {
  return x * y;
};

// 可选参数
function greet(name: string, greeting?: string): string {
  return greeting ? \`\${greeting}, \${name}!\` : \`Hello, \${name}!\`;
}

console.log(greet("小明")); // "Hello, 小明!"
console.log(greet("小明", "你好")); // "你好, 小明!"

// 默认参数
function createName(firstName: string, lastName: string = "Smith"): string {
  return \`\${firstName} \${lastName}\`;
}

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 函数重载
function processInput(input: string): string;
function processInput(input: number): number;
function processInput(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}`,
    keyPoints: [
      '返回类型使用 : Type 语法注解',
      '可选参数必须在必需参数之后',
      '默认参数可以替代可选参数',
      '剩余参数使用 ... 语法'
    ]
  },
  {
    id: 'classes',
    title: '类 (Classes)',
    description: '使用面向对象编程',
    content: `TypeScript 完全支持 ES6 的类语法，并添加了类型注解和其他特性。

1. **基本类定义**：
   - 属性类型注解
   - 访问修饰符（public, private, protected）
   - 构造函数

2. **继承**：
   - extends 关键字
   - super 调用

3. **抽象类**：
   - abstract 关键字
   - 抽象方法`,
    codeExample: `// 基本类定义
class Animal {
  // 属性声明
  private name: string;
  protected age: number;
  public species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // 方法
  public speak(): void {
    console.log(\`\${this.name} makes a sound\`);
  }

  public getInfo(): string {
    return \`\${this.name} is a \${this.species}\`;
  }
}

// 继承
class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age, "Dog");
    this.breed = breed;
  }

  public speak(): void {
    console.log(\`\${this.name} barks: Woof! Woof!\`);
  }

  public fetch(): void {
    console.log(\`\${this.name} fetches the ball!\`);
  }
}

const dog = new Dog("旺财", 3, "金毛");
dog.speak(); // "旺财 barks: Woof! Woof!"
dog.fetch(); // "旺财 fetches the ball!"

// 抽象类
abstract class Shape {
  abstract calculateArea(): number;

  public displayArea(): void {
    console.log(\`Area: \${this.calculateArea()}\`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
circle.displayArea(); // "Area: 78.5398..."`,
    keyPoints: [
      '访问修饰符：public（默认）、private、protected',
      'readonly 修饰符创建只读属性',
      '抽象类不能实例化，只能被继承',
      'super 用于调用父类的构造函数和方法'
    ]
  },
  {
    id: 'enums',
    title: '枚举 (Enums)',
    description: '定义命名常量集合',
    content: `枚举是一种特殊的类型，用于定义一组命名常量。

1. **数字枚举**：
   - 自动递增的数值
   - 可以指定起始值

2. **字符串枚举**：
   - 每个成员都有具体的字符串值

3. **常量枚举**：
   - 编译时内联
   - 提高性能`,
    codeExample: `// 数字枚举
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let move: Direction = Direction.Up;
console.log(move); // 0

// 指定起始值
enum StatusCode {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}

console.log(StatusCode.Success); // 200

// 字符串枚举
enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}

const role: UserRole = UserRole.Admin;
console.log(role); // "admin"

// 常量枚举
const enum Colors {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

let color = Colors.Red;

// 使用枚举的实际场景
enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled"
}

interface Order {
  id: number;
  status: OrderStatus;
}

const order: Order = {
  id: 12345,
  status: OrderStatus.Processing
};

if (order.status === OrderStatus.Processing) {
  console.log("订单正在处理中");
}`,
    keyPoints: [
      '枚举使用 enum 关键字定义',
      '数字枚举默认从 0 开始递增',
      '字符串枚举更易读和调试',
      'const enum 在编译时内联，提高性能'
    ]
  },
  {
    id: 'generics',
    title: '泛型 (Generics)',
    description: '创建可重用的组件',
    content: `泛型是 TypeScript 的强大特性，允许你编写可以处理多种类型的代码。

1. **泛型函数**：
   - 类型参数
   - 类型推断

2. **泛型接口**：
   - 接口中的类型参数

3. **泛型约束**：
   - 限制类型参数的范围

4. **泛型类**：
   - 类级别的类型参数`,
    codeExample: `// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

let num = identity<number>(42);
let str = identity("hello"); // 类型推断

// 泛型数组
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(getFirstElement([1, 2, 3])); // 1
console.log(getFirstElement(["a", "b"])); // "a"

// 泛型接口
interface Box<T> {
  value: T;
  getValue(): T;
}

class NumberBox implements Box<number> {
  constructor(public value: number) {}

  getValue(): number {
    return this.value;
  }
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(\`Length: \${arg.length}\`);
}

logLength("hello"); // "Length: 5"
logLength([1, 2, 3]); // "Length: 3"
logLength({ length: 10, value: "hi" }); // "Length: 10"

// 多个类型参数
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair(1, "hello"); // [number, string]

// 泛型类
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2`,
    keyPoints: [
      '泛型使用 <T> 语法声明类型参数',
      '类型参数通常命名为 T、U、V 等',
      '泛型约束使用 extends 关键字',
      '泛型提高代码复用性和类型安全'
    ]
  }
];
