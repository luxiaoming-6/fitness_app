module.exports = {
  // 基本配置
  printWidth: 120, // 单行代码最大长度
  tabWidth: 2, // 缩进大小
  useTabs: false, // 使用空格而非 tab 缩进
  semi: true, // 语句末尾添加分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 仅在需要时为对象属性添加引号
  trailingComma: 'es5', // 仅在 ES5 语法中添加尾随逗号
  bracketSpacing: true, // 对象字面量的括号间添加空格
  bracketSameLine: false, // 多行对象字面量的最后一个属性与闭括号不在同一行
  arrowParens: 'always', // 箭头函数参数始终使用括号
  endOfLine: 'lf', // 行末换行符使用 LF
  htmlWhitespaceSensitivity: 'ignore', // HTML 空白字符敏感度
  vueIndentScriptAndStyle: false // Vue 单文件组件中，不缩进 <script> 和 <style> 标签
};
