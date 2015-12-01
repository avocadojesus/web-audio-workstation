## Overview

A Controller is the core component of a request. It is the gateway for both handling a request, as well as returning a response. In this sense it is unique - every other service within our application will be accepting parameters and returning responses in a traditional fashion, but controllers will be bound to request and response objects. In other words, it accepts arguments through a request object, and it returns values through the response object.

```javascript
// traditional function example
function add(int1, int2) {
  return int1 + int2;
}

// controller example
function add(req, res) {
  return res.end(req.body.int1 + req.body.int2);
}
```

Because of it's strict reliance on request and response objects, it is not a modular component. It cannot be called from anywhere else in the application stack, as you cannot simply pass arguments into it and get results. The only way to do this is by making an actual request to our application. It is because of this, primarily, that controllers should not contain the knowledge of HOW to perform any specific tasks. Anything apart from lambda functions should be exported to separate services, so as to be reusable throughout the rest of our application.

## Responsibilities
* capturing input data from request object
* filtering/validating (through a service) input data to guarantee sane input
* performing a task (usually, interacting with a database to fetch objects)
* formatting response to fit API speck
* returning a response

## Examples
```javascript

```
