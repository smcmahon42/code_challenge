# Requirements
 - Node v12.16.1
 - Yarn v1.22.0
 - npm  v6.13.4
 - Jest v25.1.0


# Setup

 1. Make sure that Node is installed (v12.16.1 or greater)
 2. Run `yarn install`
 3. Run `npm i event-stream`

# Testing

### Running Jest 
 
 Make sure Yarn v1.22.0 (or higher) and Node v12.0 (or higher) are installed.

 In the root directory of the code base run the following command to invoke tests.  
 
 ```
 yarn test
 ```
 
 Test files can be found adjacent to working files in `./utilities` with the appended name of `.test.js`
 
 `Ex: {file name}.test.js`

### Coverage
Test coverage is in the utilities folder for all modular functions:

- calculations.js
- helpers.js

# Running Incremental Interquartile Mean

```
node incremental_interquartile_mean.js
```

# History & Rational

### Refactor 1.0

```
Change Date: 2/22/2020
Author: Sean McMahon
```

The original Incremental Interquartile Mean calculations create inside the conditional block were inefficient from a few points.

1. Not readable. The calculations are confusing and flat with no understanding what is going on at any given step for an engineer.
2. Not scalable. This process creates technical debt that does allow for the reuse of any of the calculations in future areas of a program, including transference of the code to a new program.
3. Not testable. Since the calculations are not broken out into small parts, it makes testing difficult and error-prone.

The improvements were based on creating a modular approach that could be extended throughout the program as it grew. 

The first step was to examine each line of code that made a calculation and returned a variable. If the calculation was small enough, it broke out into an export function that could be called with required(). Any calculation that needed to be broken out further was until it passed specific criteria; is it testable, readable and scalable. A case in point, the `quartile_mean` function (in calculation.js) was too complex to have it be one function and a single test. Each section of the quartile_mean was then broken into smaller calculation functions that were placed in a `helpers.js` file that allowed them to be modular and tested. 

Since each calculation had the potential to be used for other parts of the program, they were broken out into a `calculations.js` and `helper.js` file under the utilities directory. This gives clearer definition to an engineer, what purpose the functions holds explicitly. 

Other considerations were given to each namespaces function name, such as `quartile_{calculation name}` and parameter names matching what functions they would have come from.  

Annotations are important for inline documentation, especially if the utilities folder could be used for other sections of the program or reading through the code base to debug a feature. 

The calculate function (in `incremental_interquartile_mean.js`) was created to break out the line read loop from the calculation. This was done to further optimize the calculations for speed performance and separate concerns for clarity.  The calculate function is also more explicit in what it is doing now with the refactor. A developer now knows that it takes specific steps in order to come to a conclusion and can read through each step and test each process in order to have clearer competency.


### Optimization 1.0

```
Change Date: 2/23/2020
Author: Sean McMahon
```

The refactor above slowed down the process by ~70% due to the readability changes.

I tried a new process by creating a multi thread in Node using the stable release of Work Threads. This was very difficult and high learning curve. Due to time constraints I had to stop that implementation and find other ways to fix processes.
 
During my research for the multithread processing I found some information on how Node JS can only hold ~1.5GB in memory at any given time when reading data. This lead me to the event-stream reader when discovering that the stream read can still be held in memory. This would not be sustainable over time if this project were in production and reading data files much greater than 1.5GB.

Event-stream package did not impact performance, but I wanted to put some thoughts down about scale optimization. 

`https://github.com/dominictarr/event-stream`

I eventually looked at the `[].sort((a, b) => a - b)` function that is native to JavaScript. This iterates over each position in the array in order to sort a value(s). My assumptions were correct regarding how the script will take a performance hit concidering how it iterates over each position.

`https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers`

I was able to find a sort function example that made more sense. In the function it creates a where loop that evaluates a low and high (array.length) number. In the while loop the object is to find a midpoint of an array and travers up or down in batches until the while loop breaks, because it found a number position in the array that is greater than the value given.

In order to prove out the changes to sort, I added `console.time("timsort");` and `console.timeEnd("timsort");` on both the updated `incremental_interquartile_mean.js` file and the original `incremental_interquartile_mean_original.js`

Time tests showed the new file at ~`33943.286ms` and the original file at ~`167971.359ms`, a 79.79% performance increase.







