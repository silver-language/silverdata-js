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


Need to figure out the correct place to do some of the intermediate conversion.

For instance converting simple things like strings and numbers might be considered an internal job, or possibly part of json rendering.
Still thinking.

I think there is another intermediate type needed where the value gets converted into something native to the host language.
This is probably going to be the interesting bit because conversion there could also depend on other custom types made available to the convertor particular contexts.

YAML looks to do something similar (wikipedia/YAML):
>Explicit data typing is seldom seen in the majority of YAML documents since YAML autodetects simple types. Data types can be divided into three categories: core, defined, and user-defined. Core are ones expected to exist in any parser (e.g. floats, ints, strings, lists, maps, ...). Many more advanced data types, such as binary data, are defined in the YAML specification but not supported in all implementations. Finally YAML defines a way to extend the data type definitions locally to accommodate user-defined classes, structures or primitives (e.g. quad-precision floats).


Parsing simple values
-------------------

The assignment breakup with regex just returns values as strings.

Sometime thereafter the strings will need to be converted to representations native to the parsing language.

I'll begin with explicit type indications and the 4 json simples: string, number, boolean, and null


### Array and object
Am adding a couple of placeholder tests for Object and Array - but they are not 'correct' silver-data.
Will update them a little later.



Test Directories
----------------

Need to start making this a bit dynamic.


