import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import printMe from './print.js';
import { cube } from './math.js';

if (process.env.NODE_ENV !== 'production') {
    console.log("process", process)
    console.log('Looks like we are in development mode!');
}else {
    console.log("process", process)
    console.log("生产环境");
}

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}
// 问题： printMe 执行的不是最新我们更新的log。 这是因为按钮的onclick 仍然绑定在旧的 printMe 函数上。
// 为了让他和 HRM 正常工作, 我们需要使用 module.hot.accept 更新绑定到新的 printMe 函数上：
// document.body.appendChild(component());

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
    // 热更, 当  print.js 内部发生变更的时候可以告诉 webpack 接受更新的模块
    module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     // printMe();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
    })
}
