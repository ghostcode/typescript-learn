export interface Topic {
  id: string
  title: string
  description: string
  content: string
  codeExample: string
  keyPoints: string[]
}

export const advancedData: Topic[] = [
  {
    id: 'type-inference',
    title: '类型推断',
    description: 'TypeScript 如何自动推断类型',
    content: `TypeScript 能够在许多情况下自动推断变量的类型，使代码更简洁。

1. **基本推断**：
   - 变量初始化时的推断
   - 函数返回值的推断

2. **最佳通用类型**：
   - 数组元素的类型推断
   - 联合类型的推断

3. **上下文推断**：
   - 基于位置的推断`,
    codeExample: `// 基本类型推断
let x = 3; // 推断为 number
let y = "hello"; // 推断为 string
let z = [1, 2, 3]; // 推断为 number[]

// 函数返回类型推断
function add(a: number, b: number) {
  return a + b; // 推断返回类型为 number
}

// 最佳通用类型
let mixed = [1, "two", 3]; // 推断为 (string | number)[]
let numbers = [1, 2, 3]; // 推断为 number[]

// 上下文推断
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.clientX); // mouseEvent 被推断为 MouseEvent
};

// 类型断言 vs 类型推断
let value = "hello";
let strLength: number = (value as string).length;

// 明确类型 vs 推断
let explicitNum: number = 42;
let inferredNum = 42; // 推荐

// 函数参数的默认推断
function greet(name = "World") {
  // name 被推断为 string
  return \`Hello, \${name}!\`;
}

// 对象属性的推断
const user = {
  name: "张三",
  age: 25,
  email: "zhangsan@example.com"
};
// user 被推断为 { name: string; age: number; email: string; }

// 返回对象的推断
function createUser(name: string) {
  return { name, id: Math.random() };
  // 返回类型被推断为 { name: string; id: number; }
}`,
    keyPoints: [
      'TypeScript 在初始化时自动推断变量类型',
      '函数返回类型可以省略，让 TS 推断',
      '上下文类型根据位置推断变量类型',
      '明确类型注解有助于可读性和文档化'
    ]
  },
  {
    id: 'type-aliases',
    title: '类型别名',
    description: '为类型创建自定义名称',
    content: `类型别名使用 type 关键字，为类型定义一个新名称。它类似于接口，但更灵活。

1. **基本类型别名**：
   - 为原始类型创建别名
   - 为联合类型创建别名

2. **对象类型别名**：
   - 类似于接口
   - 可以使用字面量类型

3. **泛型类型别名**：
   - 带类型参数的别名

4. **工具类型**：
   - Utility Types`,
    codeExample: `// 基本类型别名
type ID = number | string;
type Name = string;

let userId: ID = 123;
let userName: Name = "张三";

// 联合类型别名
type Status = "success" | "error" | "pending";
type Result<T> = { status: Status; data: T | null };

const result: Result<string> = {
  status: "success",
  data: "操作成功"
};

// 对象类型别名
type User = {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
};

const user: User = {
  id: 1,
  name: "李四",
  email: "lisi@example.com"
};

// 交叉类型
type Employee = User & {
  employeeId: number;
  department: string;
};

const employee: Employee = {
  id: 1,
  name: "王五",
  email: "wangwu@example.com",
  employeeId: 1001,
  department: "技术部"
};

// 函数类型别名
type EventHandler = (event: Event) => void;
type AsyncCallback<T> = (data: T) => Promise<void>;

const handleClick: EventHandler = (event) => {
  console.log(event.type);
};

// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

type Mapped = {
  [K in "a" | "b" | "c"]: number;
};
// Mapped 等价于 { a: number; b: number; c: number; }

// 模板字面量类型
type CssProperty = \`margin\${"top" | "right" | "bottom" | "left"}\`;
// CssProperty 等价于 "marginTop" | "marginRight" | "marginBottom" | "marginLeft"

// keyof 操作符
type UserKeys = keyof User;
// UserKeys 等价于 "id" | "name" | "email" | "age"`,
    keyPoints: [
      'type 关键字用于创建类型别名',
      '类型别名可以表示任何类型，包括联合类型',
      '& 操作符用于交叉类型（合并类型）',
      '类型别名比接口更灵活，接口可以扩展和实现'
    ]
  },
  {
    id: 'utility-types',
    title: '工具类型 (Utility Types)',
    description: 'TypeScript 内置的实用类型',
    content: `TypeScript 提供了许多内置的工具类型，帮助转换和操作类型。

1. **Partial**：将所有属性变为可选
2. **Required**：将所有属性变为必需
3. **Readonly**：将所有属性变为只读
4. **Pick**：选择特定属性
5. **Omit**：排除特定属性
6. **Record**：创建对象类型
7. **Exclude**：从联合类型中排除
8. **Extract**：从联合类型中提取`,
    codeExample: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> - 所有属性变为可选
type PartialUser = Partial<User>;
const partialUser: PartialUser = {
  name: "张三"
};

// Required<T> - 所有属性变为必需
type UserWithRequiredAge = Required<Pick<User, "name" | "age">>;

// Readonly<T> - 所有属性变为只读
type ReadonlyUser = Readonly<User>;
const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "李四",
  email: "lisi@example.com",
  age: 25
};
// readonlyUser.name = "王五"; // 错误：只读属性

// Pick<T, K> - 选择特定属性
type UserBasicInfo = Pick<User, "id" | "name">;
const basicInfo: UserBasicInfo = {
  id: 1,
  name: "王五"
};

// Omit<T, K> - 排除特定属性
type UserWithoutId = Omit<User, "id">;
const userWithoutId: UserWithoutId = {
  name: "赵六",
  email: "zhaoliu@example.com",
  age: 30
};

// Record<K, T> - 创建对象类型
type PageInfo = {
  title: string;
};

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  home: { title: "首页" },
  about: { title: "关于" },
  contact: { title: "联系" }
};

// Exclude<T, U> - 从联合类型中排除
type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract<T, U> - 从联合类型中提取
type T2 = Extract<"a" | "b" | "c", "a" | "d">; // "a"

// NonNullable<T> - 排除 null 和 undefined
type T3 = NonNullable<string | null | undefined>; // string

// ReturnType<T> - 获取函数返回类型
function createUser() {
  return { id: 1, name: "test" };
}
type CreateUserReturn = ReturnType<typeof createUser>;
// { id: number; name: string; }

// Parameters<T> - 获取函数参数类型
type CreateUserParams = Parameters<typeof createUser>;
// []

// 实际应用示例
interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

type UpdateUserInput = Partial<Omit<CreateUserInput, "password">>;
// { name?: string; email?: string; }`,
    keyPoints: [
      'Partial 将所有属性变为可选',
      'Required 将所有属性变为必需',
      'Pick 和 Omit 用于选择/排除属性',
      'Record 用于创建键值对类型',
      '工具类型可以组合使用'
    ]
  },
  {
    id: 'type-guards',
    title: '类型守卫 (Type Guards)',
    description: '在运行时检查类型',
    content: `类型守卫是 TypeScript 中用于在运行时检查类型的表达式。

1. **typeof 类型守卫**：
   - 检查原始类型

2. **instanceof 类型守卫**：
   - 检查类实例

3. **in 类型守卫**：
   - 检查属性是否存在

4. **自定义类型守卫**：
   - is 关键字

5. **可辨识联合**：
   - 使用字面量属性区分类型`,
    codeExample: `// typeof 类型守卫
function processValue(value: string | number) {
  if (typeof value === "string") {
    // 这里 value 被推断为 string
    console.log(value.toUpperCase());
  } else {
    // 这里 value 被推断为 number
    console.log(value * 2);
  }
}

// instanceof 类型守卫
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// in 类型守卫
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// 自定义类型守卫
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.width * shape.height;
  }
}

// 可辨识联合（使用 switch 语句）
function getAreaSwitch(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// 类型谓词与数组过滤
const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 10, height: 20 }
];

function isRectangle(shape: Shape): shape is Rectangle {
  return shape.kind === "rectangle";
}

const rectangles = shapes.filter(isRectangle);
// rectangles 的类型是 Rectangle[]

// null 检查类型守卫
function processString(str: string | null) {
  if (str !== null) {
    // 这里 str 的类型是 string
    console.log(str.toUpperCase());
  }
}

// 断言函数
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("value is not a string");
  }
}

function processUnknown(value: unknown) {
  assertIsString(value);
  // 现在 value 的类型是 string
  console.log(value.toUpperCase());
}`,
    keyPoints: [
      'typeof 用于检查原始类型',
      'instanceof 用于检查类实例',
      'in 操作符检查对象属性',
      'is 谓词创建自定义类型守卫',
      '可辨识联合使用字面量类型区分'
    ]
  },
  {
    id: 'decorators',
    title: '装饰器 (Decorators)',
    description: '为类和方法添加元数据',
    content: `装饰器是一种特殊的声明，可以附加到类、方法、属性或参数上。

1. **类装饰器**：
   - 修改类构造函数

2. **方法装饰器**：
   - 修改方法行为

3. **属性装饰器**：
   - 修改属性

4. **参数装饰器**：
   - 修改参数

注意：需要在 tsconfig.json 中启用 experimentalDecorators`,
    codeExample: `// 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class MyClass {
  constructor() {
    // 类被密封，不能添加新属性
  }
}

// 方法装饰器
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(\`调用 \${propertyKey}，参数:\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`返回值:\`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5, 3);
// 输出:
// 调用 add，参数: [5, 3]
// 返回值: 8

// 属性装饰器
function readonly(
  target: any,
  propertyKey: string,
  descriptor?: PropertyDescriptor
) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class Person {
  @readonly
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// 装饰器工厂
function logPrefix(prefix: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(\`[\${prefix}] 调用 \${propertyKey}\`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class Logger {
  @logPrefix("INFO")
  info(message: string) {
    console.log(message);
  }

  @logPrefix("ERROR")
  error(message: string) {
    console.error(message);
  }
}

const logger = new Logger();
logger.info("这是信息日志");
logger.error("这是错误日志");`,
    keyPoints: [
      '装饰器使用 @ 符号应用',
      '装饰器在编译时执行',
      '装饰器可以组合使用',
      '装饰器工厂返回装饰器函数',
      '需要启用 experimentalDecorators 编译选项'
    ]
  },
  {
    id: 'modules',
    title: '模块系统',
    description: '组织和管理代码',
    content: `TypeScript 支持 ES6 模块语法，并提供额外的模块解析功能。

1. **导出 (Export)**：
   - 命名导出
   - 默认导出

2. **导入 (Import)**：
   - 命名导入
   - 默认导入
   - 动态导入

3. **模块解析**：
   - 相对路径
   - 非相对路径
   - node_modules 解析

4. **类型导出/导入**：
   - export type
   - import type`,
    codeExample: `// utils.ts
// 命名导出
export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// 类型导出
export type User = {
  id: number;
  name: string;
};

// 默认导出
export default function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// main.ts
// 导入方式
import greet from "./utils"; // 默认导入
import { add, Calculator, PI } from "./utils"; // 命名导入
import { add as sum } from "./utils"; // 别名导入
import * as utils from "./utils"; // 命名空间导入
import greet2, { add, PI } from "./utils"; // 混合导入
import type { User } from "./utils"; // 仅类型导入

// 使用
console.log(PI);
console.log(add(1, 2));
const calc = new Calculator();

// 重新导出
// re-exports.ts
export { add, multiply } from "./math";
export { default as greet } from "./greeting";
export * from "./constants";

// 动态导入
async function loadModule() {
  const { default: module } = await import("./heavyModule");
  module.doSomething();
}

// 条件导入
type Config = typeof import("./config").default;

// 类型声明文件
// declarations.d.ts
declare module "my-library" {
  export function myFunction(): void;
  export const myValue: number;
}

// 使用第三方库
import lodash from "lodash";
import express from "express";

// 模块声明
// global.d.ts
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// 现在可以在任何地方使用
window.myCustomProperty = "value";

// CommonJS 互操作（启用 esModuleInterop）
const fs = require("fs");
import fs2 = require("fs");`,
    keyPoints: [
      '使用 export/export default 导出',
      '使用 import 导入模块',
      'import type 用于仅导入类型',
      'export * 重新导出所有导出',
      '动态导入使用 import() 函数'
    ]
  }
];
