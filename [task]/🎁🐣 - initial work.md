Initial work
============

I've made a couple of attempts at this previously, time for another go.


```
2026-08-08		🎁🐣		Start work
```


* intermediate representation - there will be a few kinds of different intermediates, need to sketch them and their types out
* start work on *simple* parsing
* work on generic printers/convertors for the intermediates
* initial custom convertor for Html type




Various representations
-----------------------

Starting with a basic assignment, where the value is string-like:
```
name: Type `value`
```
There are few different representations you could generate from it
* document structure / lines
* tokens
* some sort of idealised 'silver' representation
* simplified js objects that just include a string 'type' field
* converted to json with conversion to the 6 types


