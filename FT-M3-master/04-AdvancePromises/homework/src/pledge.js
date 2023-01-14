'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
// const p1 = new Promise(function(resolve, reject){
//     setTimeout(()=>{
//         resolve("chocotorta");
//     })
// })

// p1.then(value => console.log(value));



function $Promise(executor){
    if(typeof executor !== "function") 
    throw new TypeError("executor must be a function");

    this._state = "pending";
    this._handlerGroups = [];
    
    executor(
        value =>this._internalResolve(value),
        reason =>this._internalReject(reason)
        );
    }

$Promise.prototype._internalResolve = function (value) {
    if(this._state === "pending"){
        this._state = "fulfilled";
        this._value = value;
        
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function (reason) {
    if(this._state === "pending"){
        this._state = "rejected";
        this._value = reason;

        this._callHandlers();
    }
};

$Promise.prototype._callHandlers = function(){
    while (this._handlerGroups.length) {
        const handlerGroup = this._handlerGroups.shift();

        if(this._state === "fulfilled"){
            if(handlerGroup.successCb){
                
                try {
                    const handlerReturnValue = handlerGroup.successCb(this._value);
                        
                    if(handlerReturnValue instanceof $Promise){
                        return handlerReturnValue.then(
                            value => handlerGroup.downstreamPromise._internalResolve(value)),
                            reason => handlerGroup.downstreamPromise._internalReject(reason)
                    }else{
                        handlerGroup.downstreamPromise._internalResolve(handlerReturnValue)
                    }
                } catch (error) {
                    handlerGroup.downstreamPromise._internalReject(error);
                }
            }else{
                handlerGroup.downstreamPromise._internalResolve(this._value);
            }
        }else if(this._state === "rejected"){
            if(handlerGroup.errorCb){
                try {
                    const handlerReturnValue = handlerGroup.errorCb(this._value);


                    if(handlerReturnValue instanceof $Promise){
                        return handlerReturnValue.then(
                            value => handlerGroup.downstreamPromise._internalResolve(value),
                            reason => handlerGroup.downstreamPromise._internalReject(reason)
                        );
                    }else{
                        handlerGroup.downstreamPromise._internalResolve(handlerReturnValue);
                    }
                } catch (error) {
                    handlerGroup.downstreamPromise._internalReject(error);
                }
            } else {
                handlerGroup.downstreamPromise._internalReject(this._value);
            }
        }
    }
}; 

$Promise.prototype.then = function(succesHandler, errorHandler){
    const downstreamPromise = new $Promise(()=>{})
    
    this._handlerGroups.push({
        successCb: typeof succesHandler === "function" && succesHandler, 
        errorCb: typeof errorHandler === "function" && errorHandler,
        downstreamPromise,
    });

    if(this._state !== "pending") this._callHandlers();
    return downstreamPromise;
};

$Promise.prototype.catch = function (errorHandler){
    return this.then(null, errorHandler);
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
