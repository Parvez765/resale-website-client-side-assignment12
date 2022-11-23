import React from 'react';

const Blog = () => {
    return (
        <div className='mt-10'>
            <h2 className='text-3xl font-bold'>What are the different ways to manage <br /> a state in a React application?</h2>
            <p className='text-2xl font-bold mt-5'>There are four different ways to manage a state in React application. They are: <br /> 1. Local state. 2. Global state. 3. Server state. 4. URL state.</p>
            <div className="divider">Q</div>

            <h2 className='text-3xl font-bold'>How does prototypical inheritance work?</h2>
            <p className='text-2xl font-bold mt-5'> Prototypal Inheritance is a method by which an object can inherit the properties and methods of another object. <br/>Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object.</p>
            <div className="divider">Q</div>

            <h2 className='text-3xl font-bold'>What is a unit test? Why should we write unit tests?</h2>
            <p className='text-2xl font-bold mt-5'> The main objective of unit testing is to isolate written code to test and determine if it works as intended. <br/>Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code<br/> which may be more difficult to find in later testing stages</p>
            <div className="divider">Q</div>

            <h2 className='text-3xl font-bold'>React vs. Angular vs. Vue?</h2>
            <p className='text-2xl font-bold mt-5'> Vue provides higher customizability and hence is easier to learn than Angular or React. Further, <br/>Vue has an overlap with Angular and React with respect to their functionality like the use of components.<br/> Hence, the transition to Vue from either of the two is an easy option.</p>
            <div className="divider">Q</div>
        </div>
    );
};

export default Blog;