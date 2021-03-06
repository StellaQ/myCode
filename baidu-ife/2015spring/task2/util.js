// 2. JavaScript数据类型及语言基础
// 2.1 任务描述
// 实践判断各种数据类型的方法，并在util.js中实现以下方法：

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
    //参考javascript高级程序设计22.1p597
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) == '[object Function]';
    //参考javascript高级程序设计22.1p597
}

// console.log(isArray([1, 2, 3]));
// console.log(isArray([]));
// console.log(isArray('[]'));

// console.log(isFunction(function abc(){}));

// *************************************

// 了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

// var a22 = new Date();
// console.log(Object.prototype.toString.call(a22));   //[object Date]

// function aaa(a1, a2) {
//     console.log(Object.prototype.toString.call(arguments));
// }
// aaa(2,3);  //[object Arguments]

// console.log(Object.prototype.toString.call({a:1,b:[1,2]}));  //[object Object]

function cloneObject(src) {
    var result;
    if (typeof(src) == 'object') {
        switch (Object.prototype.toString.call(src)) {
            case '[object Date]':   //日期
                result = src;
                break;
            case '[object Array]':  //数组
                result = [];
                for (var i = 0; i < src.length; i++) {
                    result.push(cloneObject(src[i]));
                };
                break;
            case '[object Object]':  //Object对象
                result = {};
                for (i in src) {
                    result[i] = cloneObject(src[i]);
                };
                break;
            default:
                result = null;
        }
    } else {//数字、字符串、布尔
        result = src ? src : null;
    }
    return result;
}
// 测试用例
// var srcObj = {
//     a:1,
//     b: {
//         b1: ['hello', 'hi'],
//         b2: 'javascript'
//     }
// };
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);

// srcObj.a = 2;
// srcObj.b.b1[0] = 'hello';

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);  //1
// console.log(tarObj.b.b1[0]); //hello

// *************************************

// 学习数组、字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组

// function uniqArray(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         for (var j = 0; j < arr.length; j++) {
//             if (arr[i] === arr[j] && i !== j) {
//                 arr.splice(i, 1);
//                 uniqArray(arr);
//             };
//         };
//     };
//     return arr;
// }

function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if(result.indexOf(arr[i]) == -1) {
            result.push(arr[i]);
        };
    };
    return result;
}
// var a = [1, 5, 7, 8, 1, 8, 1, 7];
// var b = uniqArray(a);
// console.log(b); //[1, 3, 5, 7]

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，
// 并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
// var str = '        hi!    ';
// str = trim(str);
// console.log(str);  //'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i)
    }
}
// 其中fn函数可以接受两个参数：item和index

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index+ ': ' + item)
// }
// each(arr, output); // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    if(Object.prototype.toString.call(obj) == '[object Object]') {
        var num = 0;
        for (key in obj) {
            num++;
        };
        return num;
        // or
        // return Object.keys(obj).length;
    } else {
        return null;
    }
}

// 使用示例
// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     }
// };
// console.log(getObjectLength(obj)); //3

// 学习正则表达式，在util.js完成以下代码
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^([a-zA-A0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(emailStr);
}
// 判断是否为手机号
function isMobilePhone(phone){
    var reg = /^1[3-8]\d{9}/;
    return reg.test(phone);
}
// console.log(isEmail('dkddl@163.com'));
// console.log(isMobilePhone('15990019030'));
// console.log(isMobilePhone('1920203'));
















