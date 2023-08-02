import {keysIn} from "lodash-es"
import Person from "./Person.mjs";

const p1 = new Person('me')
// Object.getPrototypeOf() 静态方法返回指定对象的原型（即内部 [[Prototype]] 属性的值）
console.log(Object.getPrototypeOf(p1) === p1.__proto__)  // true

console.log(Object.getPrototypeOf(p1) === Person.prototype)  // true

console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype) // true

Object.prototype.a = 10
Function.prototype.b = 20
console.log(p1.a); // 10
console.log(p1.b); // undefined

// p1.__proto__ === Person.prototype
// Person.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ === null
// 所以p1可以访问到Object.prototype上的属性，但是访问不到Function.prototype上的属性
// 那如何才能访问到Function.prototype上的属性呢？
// ------
const f1 = function () {}
f1.c = 30
console.log(f1.b); // 20
console.log(f1.a)
console.log(Object.getPrototypeOf(f1))
// f1.__proto__ === Function.prototype
// Function.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ === null
// 现在情况就是f1可以访问到Function.prototype上的属性，又可以访问到Object.prototype上的属性
console.log(Object.hasOwn(f1 , 'a')) // false
console.log(Object.hasOwn(f1 , 'b')) // false
console.log(Object.hasOwn(f1 , 'c')) // true
// Object.hasOwn()
// 如果指定的对象自身有指定的属性，则静态方法 Object.hasOwn() 返回 true。如果属性是继承的或者不存在，该方法返回 false。
// Object.hasOwn() 旨在取代 Object.prototype.hasOwnProperty()。

// 检测f1上继承的属性, 自身的就算了
const res = []
for(const key in f1) {
  if(!Object.hasOwn(f1, key)) {
    res.push(key)
  }
}
// lodash 中的keysIn()方法 , 可以获取对象上的所有属性，包括继承的
console.log(res , keysIn(f1))
