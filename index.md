title: how to make a donut
author:
  name: dino-dna
  url: https://github.com/dino-dna
output: index.html
controls: true

--
# how to make a donut

<style>
.brain {
  max-height: 60vh;
  animation: spin infinite 20s linear;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.reg-1 {
  height: 70vh;
}
#open-donuts {
  font-size: 2em;
}
</style>
---
## who... _are you?_

- 👋🏻 cory, general guy
- 👋🏻 chris, genreal guy

---
### what?

- were here to show you... how to make a donut, _and_
- share some tinkering with DonutLearning™

---
### why?

- science!

![](./img/science.gif)

---
### go on...

<img src="./img/brain.svg" class="brain" />

- brains
- research
- can't share data easily
  - heavy
  - slow
  - against irb orders
  - evil doers, reverse engineering

---

### so what did we do?

- built a distributed Machine Learning system

---
### why donuts

- we wanted to show it off!
- they researched "what factors contribute to Schizophrenia?"
- we researched "what factors make donuts most delicious?"

---
### but we left

- so we won't show you the real deal
- we will show you a simpler demo!

--

### so _how do you make a donut?_

- <code>CODE!</code>

---
### what makes a donut delicious?

<img src="./img/regression-1.gif" class='reg-1' />

---
### lets make donuts!

<a id="open-donuts" href="https://donuts.cdaringe.com">donuts.cdaringe.com</a>

---

### what's happening here?

- you send us donuts
- we compute a mathmatical model/equation
  - regression _learns_ an equation that explains deliciousness
  - _f(donut) = delicious-ness-score_
- we some ML goodness to maximize that equation
- we send back down our best guess to the UI

---
### plugs

- **math**.
- [cleaver](https://www.npmjs.com/package/cleaver)
  - it's like a real simple stupid revealjs
- [scikit learn](http://scikit-learn.org/stable/index.html)
- [docker](http://docker.com), obviously.  such great.

---
### questions?
