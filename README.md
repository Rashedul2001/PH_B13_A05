1️⃣ What is the difference between var, let, and const?

1. Ans: All of them are for declaring variable.But there are some differences. One is scope of the those keyword used variables. var and all other hoist the variable but let and const don't allow to access the variable till assigned position comes. But "var" let us use the variable but it will be assigned as undefined. so it is not recommend to use any where. We should use "let" and "const" as they are block scoped. Another difference is "var" and "let" let us reassign values but "const" doesn't. Although we can modify const object but not reassign.

2️⃣ What is the spread operator (...)?

2. Ans: spread operator is used to unpack an object or an array. It separate the values and make it available as individual "copies" of values of the original. 

        let ar = [1,3,3,7,9]; console.log(...ar); // 1 3 3 7 9

3️⃣ What is the difference between map(), filter(), and forEach()?

3. Ans: All are array methods. They iterate over an array does something based on the their own mechanism. all takes a callback function as an argument and give one value at a time from the array respectively to that function and evaluate based on the return value but there is no return on foreach.
map() => this iterate over an array and return a new array transforming the values on the basis of the values and provided operations.
filter() => it also returns a new array but with only those values that got true on provided condition or criteria 
foreach() => doesn't return new array but work as provided function for each values of that array.

4️⃣ What is an arrow function?

4. Ans: arrow function is shorter version of a full function with some impressive features. 

        function myFun(args){ expression and return} //the traditional function

        () => {return-expression} // arrow function

=> this is the symbol for an arrow function 
if there is only one parameter one can omit () and if only one expression as return one can omit {} also
making it more flexible as if there is only one expression it will be automatically return without a return keyword. 
also like a regular function that has its own "this" an arrow function take on "this" from the parent. making it super useable where we need a small cleaner code

5️⃣ What are template literals?

5. Ans: Template literals are like string with more power.It uses backticks `` instead of quotes "". It allows users to have multiline strings and embedded expression inside it. This makes the template literals on another level. 
example 
    
        let name = "Rashedul";
        let templateLiteral = `My name is ${name}
                                this is second line`;
name will have Rashedul value
