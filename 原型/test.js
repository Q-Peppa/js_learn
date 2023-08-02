// 查看是否真的掌握了原型
// 2618. 检查是否是类的对象实例
// 1.  输入：func = () => checkIfInstance(new Date(), Date)
// 输出：true
// 解释：根据定义，Date 构造函数返回的对象是 Date 的一个实例。
// 2. 输入：func = () => checkIfInstance(5, Number)
// 输出：true
// 解释：5 是一个 Number。
/**
 * https://leetcode.cn/problems/check-if-object-instance-of-class/description/
 * 请你编写一个函数，检查给定的值是否是给定类或超类的实例。
 * 可以传递给函数的数据类型没有限制。例如，值或类可能是  undefined 。
 * @param obj {any}
 * @param classFunction {any}
 * @return boolean
 */
function checkIfInstanceOf(obj, classFunction) {
  if (obj === null || obj === undefined) return false // 如果obj是null或者undefined，那么肯定不是classFunction的实例 , 因为null和undefined没有原型 , 也不能由任何对象new出来
  let proto = Object.getPrototypeOf(obj) // 获取obj的原型
  while (proto) {
    if (proto === classFunction.prototype) return true // 如果obj的原型等于classFunction的原型，那么就是classFunction的实例
    proto = Object.getPrototypeOf(proto) // 如果不是，那么就继续向上查找
  }
  return  false // 如果一直查找到null都没有匹配到, 那么就返回false
}
