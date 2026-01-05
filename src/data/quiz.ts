export interface QuizItem {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const quizzes: QuizItem[] = [
  // 基础类型题目
  {
    id: 'q1',
    question: '以下哪个不是 TypeScript 的基本类型？',
    options: ['string', 'number', 'array', 'boolean'],
    correctAnswer: 2,
    explanation: 'array 不是基本类型，它是一种复合类型。基本类型包括 string、number、boolean、null、undefined、symbol、bigint。',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: '如何声明一个可选的接口属性？',
    options: ['使用 ? 符号', '使用 * 符号', '使用 ! 符号', '使用 @ 符号'],
    correctAnswer: 0,
    explanation: '在属性名后面添加 ? 符号可以声明该属性为可选属性，例如：name?: string;',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'any 类型和 unknown 类型的主要区别是什么？',
    options: [
      '没有区别',
      'unknown 更安全，需要类型检查后才能使用',
      'any 更安全，unknown 不安全',
      'unknown 可以赋值给任何类型'
    ],
    correctAnswer: 1,
    explanation: 'unknown 类型更安全，在使用之前必须进行类型检查。any 类型允许任何操作，会关闭类型检查。',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: '以下代码中，变量 result 的类型是什么？\n\nconst value: string | number = "hello";\nconst result = value.length;',
    options: ['number', 'string', 'number | undefined', '编译错误'],
    correctAnswer: 3,
    explanation: '这会导致编译错误，因为 string | number 类型没有 length 属性。需要先进行类型检查或类型断言。',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    question: 'readonly 修饰符的作用是什么？',
    options: [
      '使属性只能在构造函数中赋值',
      '使属性完全不能赋值',
      '使属性只能在类内部访问',
      '使属性变成静态属性'
    ],
    correctAnswer: 0,
    explanation: 'readonly 修饰符使属性只能在声明时或构造函数中赋值，之后不能修改。',
    difficulty: 'easy'
  },
  // 接口和类型题目
  {
    id: 'q6',
    question: '接口和类型别名的区别是什么？',
    options: [
      '接口可以扩展，类型别名不能',
      '类型别名可以扩展，接口不能',
      '它们完全相同',
      '接口只能用于对象，类型别名只能用于原始类型'
    ],
    correctAnswer: 0,
    explanation: '接口可以使用 extends 扩展，也可以被类实现。类型别名更灵活，但不能被扩展或实现（虽然可以使用交叉类型）。',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    question: '以下代码的输出是什么？\n\ntype A = { x: number };\ntype B = { y: number };\ntype C = A & B;\nconst c: C = { x: 1, y: 2 };',
    options: [
      '编译错误',
      '{ x: 1 }',
      '{ x: 1, y: 2 }',
      'undefined'
    ],
    correctAnswer: 2,
    explanation: '& 操作符创建交叉类型，C 包含 A 和 B 的所有属性。所以 c 必须同时有 x 和 y 属性。',
    difficulty: 'easy'
  },
  {
    id: 'q8',
    question: 'Pick<User, "name" | "email"> 的作用是什么？',
    options: [
      '从 User 中选择 name 和 email 属性',
      '从 User 中排除 name 和 email 属性',
      '将 User 的所有属性变为可选',
      '将 User 的所有属性变为必需'
    ],
    correctAnswer: 0,
    explanation: 'Pick 工具类型从类型中选择指定的属性，创建一个新类型。',
    difficulty: 'medium'
  },
  // 泛型题目
  {
    id: 'q9',
    question: '以下泛型函数的定义正确吗？\n\nfunction identity<T>(arg: T): T {\n  return arg;\n}',
    options: [
      '不正确，泛型不能这样使用',
      '正确，这是一个标准的泛型函数',
      '不正确，应该使用 interface',
      '不正确，需要指定 T 的具体类型'
    ],
    correctAnswer: 1,
    explanation: '这是一个正确的泛型函数定义。T 是类型参数，arg 是 T 类型的参数，返回值也是 T 类型。',
    difficulty: 'easy'
  },
  {
    id: 'q10',
    question: '泛型约束使用什么关键字？',
    options: ['extends', 'implements', 'where', 'constraint'],
    correctAnswer: 0,
    explanation: '泛型约束使用 extends 关键字，例如：T extends SomeType 限制 T 必须是 SomeType 或其子类型。',
    difficulty: 'medium'
  },
  {
    id: 'q11',
    question: '以下代码中，T 的类型是什么？\n\nfunction process<T extends { length: number }>(arg: T) {\n  console.log(arg.length);\n}\nprocess("hello");',
    options: [
      'string',
      '任意具有 length 属性的类型',
      '编译错误',
      'never'
    ],
    correctAnswer: 1,
    explanation: 'T 被推断为 string，因为 string 有 length 属性。但 T 可以是任何具有 length number 属性的类型。',
    difficulty: 'hard'
  },
  // 联合类型和交叉类型
  {
    id: 'q12',
    question: '联合类型使用什么符号？',
    options: ['&', '|', '||', '&&'],
    correctAnswer: 1,
    explanation: '联合类型使用 | 符号，表示值可以是多种类型之一，如 string | number。',
    difficulty: 'easy'
  },
  {
    id: 'q13',
    question: '类型守卫的作用是什么？',
    options: [
      '保护类型不被修改',
      '在运行时检查类型，缩小类型范围',
      '创建新的类型',
      '导出类型'
    ],
    correctAnswer: 1,
    explanation: '类型守卫是在运行时检查类型的表达式，可以缩小变量的类型范围，使 TypeScript 编译器能够更精确地推断类型。',
    difficulty: 'medium'
  },
  {
    id: 'q14',
    question: '以下类型守卫中，哪个是正确的？\n\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}',
    options: [
      '不正确，应该使用 ===',
      '正确，这是一个标准的类型守卫',
      '不正确，类型守卫不能返回 boolean',
      '不正确，应该使用 instanceof'
    ],
    correctAnswer: 1,
    explanation: '这是一个正确的类型守卫函数。value is string 是类型谓词，告诉 TypeScript 如果函数返回 true，value 就是 string 类型。',
    difficulty: 'medium'
  },
  // 实用类型
  {
    id: 'q15',
    question: 'Partial<T> 的作用是什么？',
    options: [
      '将 T 的所有属性变为可选',
      '将 T 的所有属性变为必需',
      '从 T 中选择部分属性',
      '从 T 中排除部分属性'
    ],
    correctAnswer: 0,
    explanation: 'Partial<T> 将类型 T 的所有属性变为可选属性，创建一个新类型，每个属性都添加了 ? 修饰符。',
    difficulty: 'easy'
  },
  {
    id: 'q16',
    question: 'Required<T> 的作用是什么？',
    options: [
      '将 T 的所有属性变为可选',
      '将 T 的所有属性变为必需',
      '从 T 中选择部分属性',
      '使 T 的所有属性变为只读'
    ],
    correctAnswer: 1,
    explanation: 'Required<T> 将类型 T 的所有属性变为必需属性，移除所有可选修饰符 ?。',
    difficulty: 'easy'
  },
  {
    id: 'q17',
    question: 'Exclude<T, U> 的作用是什么？',
    options: [
      '从 T 中选择 U 类型的属性',
      '从 T 中排除 U 类型的属性',
      '使 T 的属性变为只读',
      '合并 T 和 U 类型'
    ],
    correctAnswer: 1,
    explanation: 'Exclude<T, U> 从联合类型 T 中排除可以赋值给 U 的类型。例如：Exclude<string | number, string> 等于 number。',
    difficulty: 'medium'
  },
  {
    id: 'q18',
    question: 'ReturnType<typeof function> 的作用是什么？',
    options: [
      '获取函数的参数类型',
      '获取函数的返回值类型',
      '创建一个新的函数类型',
      '执行该函数'
    ],
    correctAnswer: 1,
    explanation: 'ReturnType<T> 获取函数类型 T 的返回值类型，常用于提取函数的返回类型。',
    difficulty: 'medium'
  },
  // 枚举
  {
    id: 'q19',
    question: '以下枚举的值是什么？\n\nenum Color {\n  Red,\n  Green = 5,\n  Blue\n}\nconsole.log(Color.Blue);',
    options: ['0', '5', '6', 'undefined'],
    correctAnswer: 2,
    explanation: '数字枚举从 0 开始自动递增，但如果某个成员指定了值，后面的成员会从该值继续递增。所以 Red=0, Green=5, Blue=6。',
    difficulty: 'medium'
  },
  {
    id: 'q20',
    question: 'const enum 和普通 enum 的区别是什么？',
    options: [
      '没有区别',
      'const enum 在编译时内联，普通 enum 会生成运行时代码',
      'const enum 只能包含字符串值',
      '普通 enum 不能有计算值'
    ],
    correctAnswer: 1,
    explanation: 'const enum 在编译时会被内联，不会生成额外的运行时代码，性能更好。普通 enum 会生成一个对象，在运行时存在。',
    difficulty: 'hard'
  },
  // 类和继承
  {
    id: 'q21',
    question: 'protected 访问修饰符的作用是什么？',
    options: [
      '属性可以在任何地方访问',
      '属性只能在类内部访问',
      '属性可以在类和子类中访问',
      '属性只能在模块内部访问'
    ],
    correctAnswer: 2,
    explanation: 'protected 修饰符使属性在声明它的类和其子类中可以访问，但在类外部不能访问。',
    difficulty: 'medium'
  },
  {
    id: 'q22',
    question: '抽象类使用什么关键字声明？',
    options: ['interface', 'abstract', 'virtual', 'static'],
    correctAnswer: 1,
    explanation: '抽象类使用 abstract 关键字声明。抽象类可以包含抽象方法，抽象方法必须在子类中实现。',
    difficulty: 'easy'
  },
  {
    id: 'q23',
    question: '以下代码有什么问题？\n\nclass Animal {\n  private name: string;\n}\n\nclass Dog extends Animal {\n  bark() {\n    console.log(this.name);\n  }\n}',
    options: [
      '没有问题',
      'Dog 类不能访问父类的 private 属性',
      'bark 方法应该是 private',
      '应该使用 protected 而不是 private'
    ],
    correctAnswer: 1,
    explanation: 'private 属性只能在声明它的类中访问，子类不能访问。应该使用 protected 修饰符，这样子类也可以访问。',
    difficulty: 'medium'
  },
  // 高级主题
  {
    id: 'q24',
    question: '装饰器的执行顺序是什么？\n\n@classDec\nclass MyClass {\n  @methodDec\n  method() {}\n}',
    options: [
      '先执行 methodDec，再执行 classDec',
      '先执行 classDec，再执行 methodDec',
      '同时执行',
      '不确定'
    ],
    correctAnswer: 0,
    explanation: '装饰器从下往上、从内向外执行。先执行方法装饰器，再执行类装饰器。在同一个声明中的多个装饰器也是从下往上执行。',
    difficulty: 'hard'
  },
  {
    id: 'q25',
    question: '以下是什么类型的 TypeScript 特性？\n\ntype EventName<T extends string> = \`on\${Capitalize<T>}\`;',
    options: [
      '泛型',
      '条件类型',
      '模板字面量类型',
      '映射类型'
    ],
    correctAnswer: 2,
    explanation: '这是模板字面量类型，使用反引号语法创建类型级别的字符串模板，可以拼接和转换字符串类型。',
    difficulty: 'hard'
  },
  {
    id: 'q26',
    question: 'keyof 操作符的作用是什么？',
    options: [
      '获取对象的值',
      '获取类型的所有键的联合类型',
      '创建新对象',
      '删除属性'
    ],
    correctAnswer: 1,
    explanation: 'keyof 操作符获取某个类型的所有键，返回一个联合类型。keyof { name: string; age: number } 等于 "name" | "age"。',
    difficulty: 'medium'
  },
  {
    id: 'q27',
    question: 'infer 关键字通常用在什么地方？',
    options: [
      '类型推断',
      '条件类型中推断类型变量',
      '创建泛型',
      '定义接口'
    ],
    correctAnswer: 1,
    explanation: 'infer 关键字用于在条件类型中推断类型变量，通常用于提取类型的某部分，如 ReturnType 使用 infer 推断函数的返回类型。',
    difficulty: 'hard'
  },
  {
    id: 'q28',
    question: '以下类型的定义是什么？\n\ntype MyType<T> = T extends infer U ? U : never;',
    options: [
      '联合类型',
      '条件类型',
      '映射类型',
      '等同于 T 本身'
    ],
    correctAnswer: 3,
    explanation: '这个类型等同于 T 本身。T extends infer U ? U : never 会推断 T 为 U，然后返回 U。这是一种高级的类型操作模式。',
    difficulty: 'hard'
  }
];

export function getQuizById(id: string): QuizItem | undefined {
  return quizzes.find(quiz => quiz.id === id);
}

export function getQuizzesByDifficulty(difficulty: QuizItem['difficulty']): QuizItem[] {
  return quizzes.filter(quiz => quiz.difficulty === difficulty);
}

export function getRandomQuizzes(count: number): QuizItem[] {
  const shuffled = [...quizzes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuizzesByCategory(category: 'basics' | 'advanced'): QuizItem[] {
  const basicsIds = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23'];
  const advancedIds = ['q9', 'q10', 'q11', 'q24', 'q25', 'q26', 'q27', 'q28'];

  if (category === 'basics') {
    return quizzes.filter(quiz => basicsIds.includes(quiz.id));
  }
  return quizzes.filter(quiz => advancedIds.includes(quiz.id));
}
