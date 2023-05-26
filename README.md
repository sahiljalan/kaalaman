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

You can prevent double-clicks on an element in JavaScript by adding an event listener to the element that listens for the `dblclick` event and cancels it using the `event.preventDefault()` method. Here's an example that shows how to prevent double-clicks on a button with the ID `myButton`:

```javascript
document.getElementById('myButton').addEventListener('dblclick', function(event) {
    event.preventDefault();
});
```

This code adds an event listener to the button that listens for the `dblclick` event. When the event is triggered, the event listener function is called and it cancels the default action of the event (i.e., the double-click) by calling the `event.preventDefault()` method.

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


web worker