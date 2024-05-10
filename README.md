# Kaalaman 
### It means Knowledge in flipino

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


------------------------------------------------------------------

## History of Javascript Name 


JavaScript was originally named Mocha, later it was renamed to LiveScript, and then to JavaScript.

The LiveScript to JavaScript name change came because Netscape and Sun did a license agreement.

The language was then submitted for standarization to the ECMA(European Computer Manufacturer’s Association) International Organization. By that time, Netscape didn't allow the use of the "JavaScript" name, so the standarized language is named ECMAScript.

JavaScript isn't actually an open name. It is currently a trademark of Oracle (formerly Sun).

There still a lot of confusion, some people still think that JavaScript, JScript, and ECMAScript are three different languages.

ECMAScript is the "standards" name for the language.

JavaScript is technically a "dialect" of ECMAScript, the Mozilla Foundation can use "JavaScript" as the name of their implementations (currently present on the Rhino and SpiderMonkey engines).

In the early days, Microsoft decided also to do what Netscape was doing on their own browser, and they developed JScript, which is also an ECMAScript dialect, but was named in this way to avoid trademark issues.

## Tasks vs Micro task Example

Here's an example that demonstrates the difference between the task queue and the microtask queue using `Promise` and `setTimeout`:

```javascript
console.log('script start');

setTimeout(() => { 
setTimeout(() => {console.log(' inner setTimeout before promise');  }, 0);
 Promise.resolve()
 .then(() => { console.log('promise1'); })
 .then(() => { console.log('promise2'); }); 

setTimeout(() => {console.log(' inner setTimeout after promise');  }, 0);
 console.log('setTimeout'); 

}, 0); 

console.log('script end');
```

The output of the given code will be:

```
script start
script end
setTimeout
promise1
promise2
inner setTimeout before promise
inner setTimeout after promise
```

Here's an explanation of how this code works:

1. The first line of code logs `script start` to the console.
2. The next line sets a timeout with a delay of 0 milliseconds. This means that the callback function passed to `setTimeout` will be added to the event queue(task queue) after the current execution stack is empty.
3. The last line logs `script end` to the console.
4. After the current execution stack is empty, the callback function passed to `setTimeout` is executed. This logs `setTimeout` to the console.
5. Inside this callback function, another `setTimeout` is called with a delay of 0 milliseconds. This means that its callback function will be added to the event queue(task queue) after the current execution stack is empty.
6. A promise is created and resolved immediately. This adds its `then` callback functions to the microtask queue.
7. The microtask queue is processed before the event queue(task queue), so the `then` callbacks are executed before the inner `setTimeout` callback. This logs `promise1` and `promise2` to the console.
8. After the microtask queue is empty, the inner `setTimeout` callback is executed. This logs `inner setTimeout before promise` and `inner setTimeout after promise` to the console.

I hope this helps! Let me know if you have any further questions.

In summary, this example demonstrates how `Promise` callbacks are added to the microtask queue and executed before callbacks in the task queue (such as those scheduled using `setTimeout()`). The microtask queue is processed after all synchronous code has finished executing and before any tasks in the task queue are processed.

## Priority of executing event by event loop.

If the event queue(task queue) is currently executing a callback function and there are microtasks waiting in the microtask queue, the event loop will finish executing the current callback function and then process all the microtasks in the microtask queue before moving on to the next callback function in the event queue(task queue).

The microtask queue has a higher priority than the event queue(task queue), so all microtasks are processed before the next callback function in the event queue(task queue) is executed. This means that if new microtasks are added to the microtask queue while it is being processed, these new microtasks will also be executed before the next callback function in the event queue(task queue).

In summary, if there are microtasks waiting in the microtask queue while the event queue(task queue) is executing a callback function, the event loop will finish executing the current callback function, process all the microtasks in the microtask queue, and then move on to the next callback function in the event queue(task queue).

## How to create custom microTask queue

In JavaScript, you can create microtasks by using promises or by using the `queueMicrotask` function. When a promise is resolved or rejected, its `then`, `catch`, or `finally` callbacks are added to the microtask queue. Similarly, when you call `queueMicrotask` with a callback function as an argument, that callback function is added to the microtask queue.

Here's an example of how you can create and execute microtasks using promises:

```javascript
Promise.resolve()
  .then(() => console.log('Microtask 1'))
  .then(() => console.log('Microtask 2'));

console.log('Script end');
```

In this example, we create a resolved promise and add two `then` callbacks to it. These callbacks are added to the microtask queue. After the current script finishes executing and logs `Script end` to the console, the event loop will process the microtask queue and execute the two callbacks in order.

Here's another example using the `queueMicrotask` function:

```javascript
queueMicrotask(() => console.log('Microtask 1'));
queueMicrotask(() => console.log('Microtask 2'));

console.log('Script end');
```

In this example, we add two callback functions to the microtask queue using `queueMicrotask`. After the current script finishes executing and logs `Script end` to the console, the event loop will process the microtask queue and execute the two callbacks in order.

## Event queue vs Task queue

the event queue and the task queue refer to the same thing. The terms are often used interchangeably to describe a queue of callback functions that are waiting to be executed by the event loop.

## execution stack vs execution context

The execution stack, also known as the call stack, is a stack data structure that keeps track of the current execution context and the order in which functions are called. When a function is called, a new execution context is created and pushed onto the top of the execution stack. When the function returns, its execution context is popped off the top of the stack and control is returned to the previous execution context.

An execution context is an abstract concept that represents the environment in which a piece of JavaScript code is executed. It contains all the necessary information for the code to execute, such as variable and function declarations, the value of `this`, and a reference to its outer environment. There are three types of execution contexts: global, function, and eval.

In summary, the execution stack is a data structure that keeps track of the current execution context and the order in which functions are called, while an execution context represents the environment in which a piece of JavaScript code is executed.

## what is application or global context vs execution context. is there any application stack as well?

The global context, also known as the application context, is the outermost execution context in a JavaScript program. It represents the environment in which the global code is executed and is created when the JavaScript engine starts running a script. The global context contains all the global variables and functions that are available to the entire script.

The global context is a type of execution context. As mentioned earlier, an execution context represents the environment in which a piece of JavaScript code is executed. There are three types of execution contexts: global, function, and eval. The global context is the outermost execution context and is created when the JavaScript engine starts running a script.

There is no such thing as an application stack in JavaScript. The execution stack, also known as the call stack, is the only stack data structure used by the JavaScript engine to keep track of the current execution context and the order in which functions are called.

I hope this helps clarify the difference between the global context and execution context, and that there is no application stack in JavaScript. Let me know if you have any further questions.

## is function context is execution context? and what about eval context, how it is different from function and global?

Yes, a function context is a type of execution context. When a function is called, a new execution context is created for that function and pushed onto the top of the execution stack. This function context contains all the necessary information for the function to execute, such as its local variables and the value of `this`.

The eval context is another type of execution context. It is created when the `eval` function is called and is used to execute code passed to `eval` as a string. The eval context is similar to a function context in that it contains its own local variables and has access to its outer environment. However, there are some differences in how variable declarations are handled in an eval context compared to a function context.

In summary, a function context is a type of execution context that is created when a function is called, while an eval context is a type of execution context that is created when the `eval` function is called. Both types of contexts contain their own local variables and have access to their outer environment, but there are some differences in how variable declarations are handled.

I hope this helps clarify the difference between function, eval, and global contexts. Let me know if you have any further questions.

## are there is no application conext or global context, are they all are a type of execution context only?

Yes, that is correct. The global context, also known as the application context, is a type of execution context. It represents the environment in which the global code is executed and is created when the JavaScript engine starts running a script. The global context contains all the global variables and functions that are available to the entire script.

As mentioned earlier, there are three types of execution contexts in JavaScript: global, function, and eval. The global context is the outermost execution context and is created when the JavaScript engine starts running a script. Function contexts are created when functions are called, and eval contexts are created when the `eval` function is called.

In summary, the global context (or application context) is a type of execution context that represents the environment in which the global code is executed. All three types of execution contexts (global, function, and eval) contain their own local variables and have access to their outer environment.

I hope this helps clarify that the global context (or application context) is a type of execution context. Let me know if you have any further questions.

## Explain event loop in terms of what We learn so far

The event loop is a mechanism that allows JavaScript to perform asynchronous operations by continuously checking if there are any tasks or microtasks that need to be executed. It works by processing the execution stack, the microtask queue, and the event queue in a specific order.

Here's how the event loop works in terms of what you've learned so far:

1. The event loop starts by checking if the execution stack is empty. If it is not empty, it means that there is still some JavaScript code that needs to be executed. The event loop will continue to process the execution stack until it is empty.
2. Once the execution stack is empty, the event loop checks if there are any microtasks waiting in the microtask queue. If there are, it will process all the microtasks in the queue before moving on to the next step. This means that all resolved promises and `queueMicrotask` callbacks will be executed before any other tasks or events are processed.
3. After all microtasks have been processed, the event loop checks if there are any tasks waiting in the event queue. If there are, it takes the first task from the front of the queue and executes it. This could be a callback function passed to `setTimeout` or `setInterval`, for example.
4. Once the task has finished executing, the event loop goes back to step 2 and checks if there are any more microtasks waiting in the microtask queue. If there are, it processes them before moving on to the next task in the event queue.
5. This process continues until both the microtask queue and the event queue are empty. At this point, the event loop will wait for new tasks or events to be added to the queues before starting the process again.

In summary, the event loop is a mechanism that allows JavaScript to perform asynchronous operations by continuously checking if there are any tasks or microtasks that need to be executed. It processes the execution stack, microtask queue, and event queue in a specific order to ensure that all tasks and events are handled in a timely manner.

I hope this helps explain how the event loop works in terms of what you've learned so far. Let me know if you have any further questions.

## Conclusion

Here's a summary of what we've discussed so far:

- The execution stack, also known as the call stack, is a stack data structure that keeps track of the current execution context and the order in which functions are called.
- An execution context represents the environment in which a piece of JavaScript code is executed. There are three types of execution contexts: global, function, and eval.
- The global context, also known as the application context, is the outermost execution context and represents the environment in which the global code is executed. Function contexts are created when functions are called, and eval contexts are created when the `eval` function is called.
- The event loop is a mechanism that allows JavaScript to perform asynchronous operations by continuously checking if there are any tasks or microtasks that need to be executed. It processes the execution stack, microtask queue, and event queue in a specific order to ensure that all tasks and events are handled in a timely manner.
- The microtask queue has a higher priority than the event queue, so all microtasks are processed before the next task in the event queue is executed. Microtasks can be created using promises or by calling `queueMicrotask`.

I hope this summary helps consolidate your understanding of these concepts. Let me know if you have any further questions.

## Custom `Object.freeze()` method using `Object.defineProperty()`;

Here's an example of how you can create a custom `Object.freeze()` method using `Object.defineProperty()`:

```javascript
function customFreeze(obj) {
    Object.getOwnPropertyNames(obj).forEach(function(name) {
        var prop = obj[name];
        if (typeof prop == 'object' && prop !== null) {
            customFreeze(prop);
        }
        Object.defineProperty(obj, name, {
            writable: false,
            configurable: false
        });
    });
    return obj;
}
```

This function takes an object as an argument and freezes it, along with all its properties that are objects. It does this by calling itself recursively on each property that is an object. For each property, it uses `Object.defineProperty()` to set the `writable` and `configurable` attributes to `false`, making the property read-only and non-configurable. Finally, it returns the frozen object.

Here's an example of how you can use this function:

```javascript
const myObject = {
    property1: 'value1',
    property2: {
        subProperty1: 'subValue1'
    }
};

customFreeze(myObject);

myObject.property1 = 'new value'; // This will not work
myObject.property2.subProperty1 = 'new subValue'; // This will also not work
```

In this example, we create an object called `myObject` with two properties. The second property is an object with its own property. We then use the `customFreeze()` function to freeze the object and all its properties. If we try to change the value of `property1` or `property2.subProperty1`, it will not work because the object and its properties are frozen.

## Ways to make things readonly in both typescript and javascript...

`Object.freeze()` and `as const` are two different ways to make an object or its properties read-only in JavaScript and TypeScript, respectively.

`Object.freeze()` is a method available in JavaScript that can be used to freeze an object, preventing new properties from being added to it and existing properties from being changed or deleted. Once an object is frozen, it cannot be unfrozen.

Here's an example of how `Object.freeze()` can be used:

```javascript
const myObject = {
    property1: 'value1',
    property2: 'value2'
};

Object.freeze(myObject);

myObject.property1 = 'new value'; // This will not work
```

In this example, we create an object called `myObject` with two properties. We then use `Object.freeze()` to freeze the object. Since the object is frozen, we cannot change its properties or values.

`as const`, on the other hand, is a feature available in TypeScript that can be used to make an object or its properties read-only. It's used by adding `as const` after the object literal when defining the object.

Here's an example of how `as const` can be used:

```typescript
const myObject = {
    property1: 'value1',
    property2: 'value2'
} as const;

myObject.property1 = 'new value'; // This will not work
```

In this example, we create an object called `myObject` with two properties and add `as const` after the object literal. This makes the object and its properties read-only. If we try to change the value of `property1`, it will not work because the object is read-only.

In summary, `Object.freeze()` and `as const` are two different ways to make an object or its properties read-only in JavaScript and TypeScript, respectively. `Object.freeze()` is a method available in JavaScript, while `as const` is a feature available in TypeScript.

In addition to using `Object.freeze()` or `as const`, there are several other ways to create a read-only object in JavaScript and TypeScript:

1. **Using `Object.defineProperty()` to define read-only properties:** You can use the `Object.defineProperty()` method to define properties on an object and specify that they are read-only by setting the `writable` attribute to `false`. Here's an example:

```javascript
const myObject = {};

Object.defineProperty(myObject, 'property1', {
    value: 'value1',
    writable: false
});

myObject.property1 = 'new value'; // This will not work
```

In this example, we create an empty object called `myObject`. We then use `Object.defineProperty()` to define a new property called `property1` on the object. We set its value to `'value1'` and specify that it's not writable by setting the `writable` attribute to `false`. This means that the property is read-only and cannot be changed.

2. **Using getters to create read-only properties:** You can use getters to create properties on an object that can be read but not written to. Here's an example:

```javascript
const myObject = {
    get property1() {
        return 'value1';
    }
};

myObject.property1 = 'new value'; // This will not work
```

In this example, we create an object called `myObject` with a getter for a property called `property1`. The getter returns the value `'value1'`. Since we only defined a getter for the property and not a setter, the property is read-only and cannot be changed.

These are just a few examples of how you can create a read-only object in JavaScript and TypeScript. The specific approach you choose will depend on your needs and the requirements of your code.

Here are a few more ways to create read-only objects or properties in JavaScript:

3. **Using `Object.create()` with a property descriptor:** You can use the `Object.create()` method to create a new object and specify its properties using a property descriptor. The property descriptor allows you to define the attributes of the properties, such as whether they are writable or enumerable. Here's an example:

```javascript
const myObject = Object.create({}, {
    property1: {
        value: 'value1',
        writable: false
    }
});

myObject.property1 = 'new value'; // This will not work
```

In this example, we use `Object.create()` to create a new object called `myObject`. We pass two arguments to the method: the first argument is `null`, which means that the new object will not inherit from any other object; the second argument is an object literal that defines the properties of the new object. We define a property called `property1` and set its value to `'value1'`. We also specify that it's not writable by setting the `writable` attribute to `false`. This means that the property is read-only and cannot be changed.

4. **Using a closure to create private properties:** You can use a closure to create private properties on an object that can only be accessed and modified by methods defined within the closure. Here's an example:

```javascript
function createMyObject() {
    let property1 = 'value1';

    return {
        getProperty1: function() {
            return property1;
        }
    };
}

const myObject = createMyObject();

myObject.getProperty1(); // Returns 'value1'
myObject.property1 = 'new value'; // This will not work
```

In this example, we define a function called `createMyObject()` that uses a closure to create an object with a private property called `property1`. The function returns an object with a method called `getProperty1()` that returns the value of the private property. Since the property is defined within the closure and is not accessible from outside the function, it's effectively read-only.

These are just a few more examples of how you can create read-only objects or properties in JavaScript. There are many other approaches you can use depending on your needs and requirements.

In addition to the methods I mentioned earlier, there are a few other techniques you can use to create read-only objects or properties in JavaScript:

5. **Using TypeScript's `readonly` modifier:** If you're using TypeScript, you can use the `readonly` modifier to create read-only properties on an object. Here's an example:

```typescript
interface MyObject {
    readonly property1: string;
}

const myObject: MyObject = {
    property1: 'value1'
};

myObject.property1 = 'new value'; // This will not work
```

In this example, we define an interface called `MyObject` with a `readonly` property called `property1`. We then create an object called `myObject` that implements the interface and assign a value to the `property1` property. Since the property is marked as `readonly`, we cannot change its value.

6. **Using an Immutable data structure library:** There are several libraries available that provide immutable data structures for JavaScript. These libraries allow you to create objects and collections that cannot be changed once they are created. Some popular libraries include Immutable.js and Mori.

These are just a few more ways to create read-only objects or properties in JavaScript and TypeScript. The specific approach you choose will depend on your needs and the requirements of your code.

## create a custom Math.floor and Math.round function without using pre-defined function like Math.floor and Math.round.

Sure! Here's an example of how you can create custom `Math.floor` and `Math.round` methods in JavaScript without using the pre-defined `Math.floor` and `Math.round` functions:

```javascript
function customFloor(x) {
    return x >= 0 ? ~~x : ~~(x - 1);
}

function customRound(x) {
    return x >= 0 ? ~~(x + 0.5) : ~~(x - 0.5);
}
```

The `customFloor` function takes a number `x` as an argument and returns the largest integer less than or equal to `x`. The function uses the bitwise NOT operator (`~~`) to truncate the decimal part of the number.

The `customRound` function takes a number `x` as an argument and returns the value of `x` rounded to the nearest integer. The function adds or subtracts 0.5 from `x`, depending on whether `x` is positive or negative, and then uses the bitwise NOT operator (`~~`) to truncate the decimal part of the resulting number.


## how to stop or prevent double click in javascript

### You can prevent default double-clicks behavior on an element in JavaScript by adding an event listener to the element that listens for the `dblclick` event and cancels it using the `event.preventDefault()` method. Here's an example that shows how to prevent double-clicks on a button with the ID `myButton`:

```javascript
document.getElementById('myButton').addEventListener('dblclick', function(event) {
    event.preventDefault();
});
```

This code adds an event listener to the button that listens for the `dblclick` event. When the event is triggered, the event listener function is called and it cancels the default action of the event (i.e., the double-click) by calling the `event.preventDefault()` method.

### When handling button clicks or other events, you can use the event.detail property to check if the event is triggered multiple times. For example:

```JavaScript
$('selector').click(function(event) {
    if (!event.detail || event.detail === 1) {
        // Execute your code here (only on the first click)
    }
});
```
This ensures that your code runs only once even if the button is clicked multiple times.

## but if i have defined both click and double click event on same element, how would i stop click event to not to accept double click

If you have both a `click` and a `dblclick` event defined on the same element and you want to prevent the `click` event from being triggered by a double-click, you can use a timer to delay the execution of the `click` event handler. Here's an example that shows how to do this:

```javascript
let clickTimer = null;

document.getElementById('myElement').addEventListener('click', function(event) {
    if (clickTimer === null) {
        clickTimer = setTimeout(function() {
            clickTimer = null;
            // Handle click event here
        }, 250);
    }
});

document.getElementById('myElement').addEventListener('dblclick', function(event) {
    clearTimeout(clickTimer);
    clickTimer = null;
    // Handle double-click event here
});
```

In this example, when the `click` event is triggered, a timer is started using the `setTimeout` function. The timer is set to expire after 250 milliseconds and when it expires, the `click` event handler is executed.

If a `dblclick` event is triggered before the timer expires (i.e., within 250 milliseconds of the first click), the timer is canceled using the `clearTimeout` function and the `click` event handler is not executed. Instead, the `dblclick` event handler is executed.

This approach allows you to handle both `click` and `dblclick` events on the same element while preventing the `click` event from being triggered by a double-click.

## Can I use this method on mobile devices?

The method I described in my previous message for preventing a `click` event from being triggered by a double-click should work on mobile devices as well. However, it's important to note that the `dblclick` event is not well-supported on mobile devices, as double-tapping is often used for other actions such as zooming.

Instead of using the `dblclick` event on mobile devices, you can use the `touchend` event and a timer to detect double-taps. Here's an example that shows how to do this:

```javascript
let tapTimer = null;

document.getElementById('myElement').addEventListener('touchend', function(event) {
    if (tapTimer === null) {
        tapTimer = setTimeout(function() {
            tapTimer = null;
            // Handle single tap here
        }, 300);
    } else {
        clearTimeout(tapTimer);
        tapTimer = null;
        // Handle double-tap here
    }
});
```

In this example, when the `touchend` event is triggered, a timer is started using the `setTimeout` function. The timer is set to expire after 300 milliseconds and when it expires, the single-tap handler is executed.

If another `touchend` event is triggered before the timer expires (i.e., within 300 milliseconds of the first tap), the timer is canceled using the `clearTimeout` function and the single-tap handler is not executed. Instead, the double-tap handler is executed.

This approach allows you to handle both single-taps and double-taps on mobile devices.


## Inheritance in Javascript

In JavaScript, you can use the `prototype` property of a function to implement inheritance between objects. Here's an example that demonstrates how to use the `prototype` property to implement inheritance:

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

function Student(firstName, lastName, grade) {
  Person.call(this, firstName, lastName);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.reportCard = function() {
  return this.fullName() + ' is in grade ' + this.grade;
}

var student1 = new Student('John', 'Doe', 'A');
var student2 = new Student('Jane', 'Doe', 'B');

console.log(student1.reportCard()); // John Doe is in grade A
console.log(student2.reportCard()); // Jane Doe is in grade B
```

In this example, we define a `Person` function that takes two arguments: `firstName` and `lastName`. We then use the `prototype` property of the `Person` function to add a `fullName` method to all objects created using the `Person` function as a constructor.

Next, we define a `Student` function that takes three arguments: `firstName`, `lastName`, and `grade`. We use the `call` method to call the `Person` function with the `this` value set to the new `Student` object and pass in the `firstName` and `lastName` arguments. This sets the `firstName` and `lastName` properties of the new `Student` object.

We then set the `prototype` property of the `Student` function to a new object created using the `Object.create` method with the `Person.prototype` as its prototype. This sets up the prototype chain so that objects created using the `Student` function as a constructor will inherit from objects created using the `Person` function as a constructor.

We also set the `constructor` property of the new prototype object to the `Student` function so that it correctly identifies objects created using the `Student` function as instances of the `Student` function.


## Do Arrow Function have prototype

No, arrow functions do not have a `prototype` property. Arrow functions are a special type of function that is designed to be used for non-method functions and therefore do not have a `prototype` property. Here's an example that demonstrates this:

```javascript
const myArrowFunction = () => {};

console.log(myArrowFunction.prototype); // undefined
```

In this example, we define an arrow function `myArrowFunction` using the `=>` syntax. When we log the `prototype` property of the `myArrowFunction`, it shows that it is `undefined`.

I hope this helps clarify that arrow functions do not have a `prototype` property. Is there anything else you would like to know?

## Difference between constructor,__proto__ and prototype

`constructor`, `__proto__`, and `prototype` are all related concepts in JavaScript, but they serve different purposes.

- `constructor`: The `constructor` property is a reference to the function that created an object's prototype. For example, if you create an object using the `new` keyword with a function as a constructor, the `constructor` property of the new object will be a reference to that function.

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var person1 = new Person('John', 'Doe');

console.log(person1.constructor); // [Function: Person]
```

- `__proto__`: The `__proto__` property is an internal property of an object that points to its prototype. It is used in the lookup chain to resolve methods and properties. The value of the `__proto__` property is the same as the value of the `prototype` property of the function that created the object.

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var person1 = new Person('John', 'Doe');

console.log(person1.__proto__); // Person {}
console.log(person1.__proto__ === Person.prototype); // true
```

- `prototype`: The `prototype` property is a property of a function object. It is the prototype of objects constructed by that function. You can use the `prototype` property to add properties and methods to objects created using a function as a constructor.

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

var person1 = new Person('John', 'Doe');
var person2 = new Person('Jane', 'Doe');

console.log(person1.fullName()); // John Doe
console.log(person2.fullName()); // Jane Doe
```

I hope this helps clarify the differences between `constructor`, `__proto__`, and `prototype`. Is there anything else you would like to know?

## difference betwwen creating object using function constructor vs class constructor

In JavaScript, you can create objects using either a function constructor or a class constructor. Both approaches allow you to define a template for creating objects with specific properties and methods. Here's an example that demonstrates how to create objects using both a function constructor and a class constructor:

```javascript
// Using a function constructor
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

var person1 = new Person('John', 'Doe');

// Using a class constructor
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

var person2 = new Person('Jane', 'Doe');
```

In this example, we define a `Person` function constructor and a `Person` class constructor. Both constructors take two arguments: `firstName` and `lastName`. We use the `prototype` property of the `Person` function constructor to add a `fullName` method to all objects created using the `Person` function as a constructor. In the `Person` class constructor, we define the `fullName` method in the body of the class.

When we create new `Person` objects using the `new` keyword with either the `Person` function constructor or the `Person` class constructor, they both have access to the `fullName` method.

The main difference between using a function constructor and a class constructor is the syntax. The class syntax provides a more concise and readable way to define constructors and methods. However, under the hood, both approaches work in essentially the same way.

I hope this helps clarify the difference between creating objects using a function constructor vs. a class constructor. Is there anything else you would like to know?

## do function prototype has by default constructor

Yes, the `prototype` property of a function object has a `constructor` property by default. The `constructor` property of the `prototype` object is a reference to the function that created the prototype. Here's an example that demonstrates this:

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

console.log(Person.prototype.constructor); // [Function: Person]
```

In this example, we define a `Person` function. When we log the `constructor` property of the `Person.prototype` object, it shows that it is a reference to the `Person` function.

The `constructor` property of the `prototype` object is used to identify the function that created an object's prototype. When you create an object using the `new` keyword with a function as a constructor, the `constructor` property of the new object's prototype will be set to the function that created it.

I hope this helps clarify that the `prototype` property of a function object has a `constructor` property by default. Is there anything else you would like to know?

## Abort previous hit API call in javascript

One way to prevent the scenario you described is to cancel the previous API call when the user navigates back to the list page. This can be done using an API that supports request cancellation, such as the `AbortController` API in modern browsers.

Here's an example that demonstrates how to use the `AbortController` API to cancel an API call:

```javascript
let controller = new AbortController();
let signal = controller.signal;

fetch('/api/details', { signal })
  .then(response => response.json())
  .then(data => {
    // handle data
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      // request was cancelled
    } else {
      // handle other errors
    }
  });

// cancel the request
controller.abort();
```

In this example, we create a new `AbortController` object and use its `signal` property to pass a signal to the `fetch` function. This allows us to cancel the request by calling the `abort` method on the `AbortController` object.

When the user navigates back to the list page, you can call the `abort` method on the `AbortController` object to cancel the previous API call. This will prevent the previous API call from updating your list item.

## There is a page with n number of images and you are scrolling on that page and it keeps loading the data with images. How you will handle the performance issue over here.

There are several techniques you can use to improve the performance of a page with a large number of images that are loaded as the user scrolls:

1. **Lazy loading**: Instead of loading all the images at once, you can use lazy loading to only load the images that are currently visible in the user's viewport. As the user scrolls down the page, more images are loaded on demand. This can significantly reduce the initial load time of the page and improve its overall performance.

2. **Image optimization**: You can optimize the images on your page to reduce their file size without sacrificing quality. This can be done using image compression techniques or by choosing the right image format for each image. Smaller image files will load faster and consume less bandwidth.

3. **Virtualization**: If you have a very large number of images on your page, you can use virtualization techniques to only render the images that are currently visible in the user's viewport. This can significantly reduce the amount of memory and processing power required to display the page.

4. **Debounce scroll events**: If you are loading more images as the user scrolls down the page, you can use a technique called debouncing to limit the number of times your scroll event handler is called. This can prevent your page from making too many API calls or performing too many calculations while the user is scrolling.

I hope these suggestions help improve the performance of your page with a large number of images. Is there anything else you would like to know?

## Load Images/data on scroll

Implementing virtualization using plain JavaScript can be quite complex and requires a good understanding of the DOM and how to manipulate it efficiently. Here's an example that demonstrates a simple implementation of virtualization using plain JavaScript:

```html
<div id="container" style="height: 300px; overflow: auto;">
  <div id="list" style="height: 2000px;"></div>
</div>

<script>
  const images = [
    // array of image URLs
  ];

  const container = document.querySelector('#container');
  const list = document.querySelector('#list');

  function renderImages() {
    const scrollTop = container.scrollTop;
    const visibleStartIndex = Math.floor(scrollTop / 20);
    const visibleEndIndex = Math.min(visibleStartIndex + 15, images.length - 1);

    list.innerHTML = '';

    for (let i = visibleStartIndex; i <= visibleEndIndex; i++) {
      const img = document.createElement('img');
      img.src = images[i];
      list.appendChild(img);
    }
  }

  container.addEventListener('scroll', renderImages);
</script>
```

In this example, we have a `container` element with a fixed height and an `overflow` property set to `auto`. This creates a scrollable container for our virtualized list of images. Inside the `container` element, we have a `list` element with a fixed height that is large enough to accommodate all the images in our `images` array.

We define a `renderImages` function that calculates the range of visible images based on the current scroll position of the `container` element. The function then clears the contents of the `list` element and appends new `img` elements for each visible image.

We add a `scroll` event listener to the `container` element that calls the `renderImages` function whenever the user scrolls the container. This causes the visible images to be updated as the user scrolls down the list.

I hope this example helps demonstrate how to implement virtualization using plain JavaScript. Is there anything else you would like to know?

## Custom Debounce Function

Debouncing and throttling are two techniques that can be used in JavaScript to limit the rate at which a function is called. They are often used to improve the performance of event handlers that are called frequently, such as scroll or resize handlers.

- **Debouncing**: Debouncing is a technique that allows you to delay the execution of a function until a certain amount of time has passed since the last time the function was called. This can be useful for events that are triggered frequently, such as a user typing in an input field. By debouncing the event handler, you can wait until the user has finished typing before performing an expensive operation, such as making an API call.

Here's an example that demonstrates how to implement debouncing using plain JavaScript:

```javascript
function debounce(func, wait) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

const input = document.createElement('input');
document.body.append(input);
const debouncedHandler = debounce(function(event) {
  // handle input event
}, 250);

input.addEventListener('input', debouncedHandler);

//If you want to bind this then you can do this as well below

const debouncedHandler = debounce(function(event) {
  console.log(this.name, 'Custom this object binding')
}, 250);
const debounceThis = debouncedHandler.bind({name: 'Sahil Jalan'});
input.addEventListener('input', debounceThis);
```

In this example, we define a `debounce` function that takes two arguments: `func` and `wait`. The `func` argument is the function to be debounced and the `wait` argument is the amount of time to wait before calling the function. The `debounce` function returns a new function that wraps the original function and delays its execution until the specified amount of time has passed since the last time it was called.

We use the `debounce` function to create a debounced version of our input event handler. When we add the debounced handler as an event listener for the `input` event on our `input` element, it will only be called once every 250 milliseconds, even if the user is typing quickly.

- **Throttling**: Throttling is a technique that allows you to limit the rate at which a function is called by only allowing it to be called once every specified interval. This can be useful for events that are triggered frequently and continuously, such as scrolling or resizing. By throttling the event handler, you can ensure that it is only called once every specified interval, even if the event is being triggered more frequently.

Here's an example that demonstrates how to implement throttling using plain JavaScript:

```javascript
function throttle(func, limit) {
  let inThrottle;

  return function() {
    const context = this;
    const args = arguments;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;

      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
}

const container = document.createElement('div');
document.body.append(container);
const throttledHandler = throttle(function(event) {
  // handle scroll event
}, 250);

container.addEventListener('scroll', throttledHandler);
```

In this example, we define a `throttle` function that takes two arguments: `func` and `limit`. The `func` argument is the function to be throttled and the `limit` argument is the minimum amount of time that must pass between calls to the function. The `throttle` function returns a new function that wraps the original function and only allows it to be called once every specified interval.

We use the `throttle` function to create a throttled version of our scroll event handler. When we add the throttled handler as an event listener for the `scroll` event on our `container` element, it will only be called once every 250 milliseconds, even if the user is scrolling quickly.

I hope this helps clarify the difference between debouncing and throttling in JavaScript.

---------------------------------------------------------------------------------------------------------------------------------------------

# Service Worker
## difference between web worker and servcie worker in javascript

The key difference between a **Service Worker** and a **Web Worker** is that a Service Worker is intended to intercept network requests that would typically be sent directly to a remote service and handle the event such that the front-end client code can continue working even when the network is unavailable. Service workers allow you to intercept network requests (via the fetch event) and to listen for Push API events in the background (via the push event).

## use cases for service worker with example

Service workers are intended to be used for things such as background data synchronization, responding to resource requests from other origins, and receiving centralized updates to expensive-to-calculate data such as geolocation or gyroscope, so multiple pages can make use of one set of data. Service workers can also be used to manage network requests by intercepting them and returning a response from the cache instead.

One example of a use case for service workers is to provide an offline experience for users. By caching resources locally using the Cache API, service workers can make your web app faster and more reliable by making it network-independent. The first time a user accesses your web app, its service worker is installed. The service worker then runs in parallel to your app and can continue doing work even when your app is not running.

## provide an example how to write and manage it

Sure! Here's an example of how to register a service worker in your main JavaScript file:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(err) {
      console.log('Service Worker registration failed:', err);
    });
}
```

This code checks if the `serviceWorker` object is available in the `navigator` object. If it is, it registers a service worker located at `/service-worker.js`. The `register` function returns a promise that resolves with a `registration` object if the service worker is successfully registered.

In your `service-worker.js` file, you can add event listeners for the `install`, `activate`, and `fetch` events to manage the service worker's behavior. Here's an example:

```javascript
self.addEventListener('install', function(event) {
  // Perform install steps
});

self.addEventListener('activate', function(event) {
  // Perform activate steps
});

self.addEventListener('fetch', function(event) {
  // Respond to fetch events
});
```

The `install` event is fired when the service worker is first installed. You can use this event to cache resources that your web app needs to work offline.

The `activate` event is fired when the service worker is activated. You can use this event to clean up old caches and perform other tasks that need to happen when the service worker takes control of the page.

The `fetch` event is fired whenever a network request is made. You can use this event to intercept network requests and return cached responses if they are available.

## How do I cache resources using a service worker?

You can cache resources using the Cache API within the `install` event of your service worker. Here's an example:

```javascript
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```

In this example, we define a cache name and an array of URLs to cache. In the `install` event, we use the `caches.open` function to open a cache with the specified name. The `open` function returns a promise that resolves with a `cache` object. We can then use the `addAll` function on the `cache` object to add all the URLs in our `urlsToCache` array to the cache.

Once the resources are cached, you can use the `fetch` event to intercept network requests and return cached responses if they are available. Here's an example:

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

In this example, we use the `caches.match` function to check if a cached response is available for the request. The `match` function returns a promise that resolves with the cached response if it is available, or `undefined` if it is not. If a cached response is available, we return it. Otherwise, we use the `fetch` function to make a network request for the resource.

## How do I delete old caches?

You can delete old caches in the `activate` event of your service worker. Here's an example:

```javascript
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

In this example, we define a `cacheWhitelist` array that contains the names of the caches that we want to keep. In the `activate` event, we use the `caches.keys` function to get an array of all the cache names. We then use the `map` function to create an array of promises that delete all the caches that are not in our `cacheWhitelist`. We use the `Promise.all` function to wait for all the promises to complete before continuing.

This code will delete all caches that are not in the `cacheWhitelist`. You can update the `cacheWhitelist` array to include the names of the caches that you want to keep.

## How do I update a service worker?

Updating a service worker involves making changes to the service worker file and then triggering an update check. Here's how it works:

1. Make changes to your service worker file (e.g., `service-worker.js`).
2. Trigger an update check by navigating to a page within the service worker's scope or by calling the `update` function on the `registration` object. For example:

```javascript
navigator.serviceWorker.getRegistration().then(function(registration) {
  registration.update();
});
```

This code gets the current service worker registration using the `getRegistration` function and then calls the `update` function on the `registration` object to trigger an update check.

3. The browser checks if there is a new version of the service worker file available. If there is, it downloads the new version and installs it.
4. The new version of the service worker is installed but not yet activated. It enters a waiting state until all pages controlled by the old version of the service worker are closed.
5. Once all pages controlled by the old version of the service worker are closed, the new version is activated and takes control of the pages.

You can listen for the `updatefound` event on the `registration` object to detect when a new version of the service worker is found and installed. Here's an example:

```javascript
navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    registration.addEventListener('updatefound', function() {
      var newWorker = registration.installing;
      console.log('New service worker found:', newWorker);
    });
  });
```

This code registers a service worker and adds an event listener for the `updatefound` event. When a new version of the service worker is found and installed, the event listener logs a message to the console.

## Ho do i use it with angular

To set up the Angular service worker in your project, you can use the Angular CLI `add` command:

```sh
ng add @angular/pwa
```

This command configures your app to use service workers by adding the `@angular/service-worker` package and generating the necessary support files.

Once you have set up the Angular service worker, you can use it to cache resources and manage network requests. The Angular service worker is designed to optimize the end-user experience of using an application over a slow or unreliable network connection while also minimizing the risks of serving outdated content.

----------------------------------------------------------------------------------------------------------------------------------------------------------

## explain the concept of currying in JavaScript?

`Currying is a technique in functional programming where a function is transformed into a sequence of functions, each taking a single argument. This allows you to partially apply arguments to a function, creating a new function that takes fewer arguments.`

Here's an example of currying in JavaScript:

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
        // instead of below function , we can also use curried.bind(this, ...args) directly to return new function with existing params
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
```

In this example, we define a `curry` function that takes a function `fn` as an argument and returns a new `curried` function. The `curried` function checks the number of arguments it receives and compares it to the number of arguments expected by the original function `fn`. If the number of arguments is greater than or equal to the number of arguments expected by `fn`, it calls `fn` with the provided arguments. Otherwise, it returns a new function that takes additional arguments and calls `curried` again with the concatenated arguments.

We then define a `sum` function that takes three arguments and returns their sum. We can use the `curry` function to create a new `curriedSum` function that is a curried version of the `sum` function. This allows us to partially apply arguments to the `sum` function and create new functions that take fewer arguments.


**Another way where function will have infinite arguments**

```javascript
function sum(...args) {
	return args.reduce((total,value) => total+value);
}

function curry(fn) {
  function curried(...arg) {
 	 this.args = this.args ? [...this.args, ...arg] : arg;
   return curried;
 }
 curried.done = () => {
 	return fn(...this.args);
 }
 return curried;
}
const currySum = curry(sum);
currySum(1, 2)()()(4,5,6)(3);
console.log(currySum.done());
```

The `sum` function takes any number of arguments and returns their sum using the `reduce` method. The `curry` function takes a function as an argument and returns a new function `curried`. The `curried` function takes any number of arguments and stores them in the `args` property of the `this` object. The `done` property of the `curried` function is another function that calls the original function passed to the `curry` function with the stored arguments.

In the example, the `currySum` variable is assigned the result of calling the `curry` function with the `sum` function as an argument. Then, the `currySum` function is called multiple times with different arguments. Finally, the `done` property of the `currySum` function is called and logs the result to the console.

## Function Methods Vs Prototype methods

Using function methods instead of prototype methods is a matter of personal preference and coding style. Both approaches have their advantages and disadvantages.

Function methods, like the one used in the example above provided, are easy to understand and use. They can be defined and called directly on the function object. However, they can increase memory usage because each instance of the function has its own copy of the method.

Prototype methods, on the other hand, are defined on the function's prototype object and are shared between all instances of the function. This can reduce memory usage but can make the code more complex and harder to understand.

Ultimately, it's up to you to decide which approach is best for your specific use case.

## function vs methods

In JavaScript, the terms "function" and "method" are often used interchangeably. However, there is a subtle difference between the two:

- A **function** is a block of code that can be defined and called by its name. It can take arguments as input and return a value. Functions can be defined as standalone entities or as part of an object.

- A **method** is a function that is associated with an object. It is defined as a property of the object and can be called using the dot notation (e.g., `object.method()`). Methods have access to the properties and other methods of the object they are associated with, and can use the `this` keyword to refer to the object.

In summary, a method is a function that is associated with an object and has access to the object's properties and other methods. All methods are functions, but not all functions are methods.

Is there anything else you'd like to know?
