# Week03

## Bound Function Exotic Objects

- properties:

  - \[[BoundTargetFunction]]
  - \[[BoundThis]]
  - \[[BoundArguments]]

- methods:

  - \[[Call]] ( thisArgument, argumentsList )
  - \[[Construct]] ( argumentsList, newTarget )
  - BoundFunctionCreate ( targetFunction, boundThis, boundArgs )

## Array Exotic Objects

- methods:

  - \[[DefineOwnProperty]] ( P, Desc )
  - ArrayCreate ( length [ , proto ] )
  - ArraySpeciesCreate ( originalArray, length )
  - ArraySetLength ( A, Desc )

## String Exotic Objects

- methods:

  - \[[GetOwnProperty]] ( P )
  - \[[DefineOwnProperty]] ( P, Desc )
  - \[[OwnPropertyKeys]] ( )
  - StringCreate ( value, prototype )
  - StringGetOwnProperty ( S, P )

## Arguments Exotic Objects

- methods:

  - \[[GetOwnProperty]] ( P )
  - \[[DefineOwnProperty]] ( P, Desc )
  - \[[Get]] ( P, Receiver )
  - \[[Set]] ( P, V, Receiver )
  - \[[Delete]] ( P )
  - CreateUnmappedArgumentsObject ( argumentsList )
  - CreateMappedArgumentsObject ( func, formals, argumentsList, env )
  - MakeArgGetter ( name, env )
  - MakeArgSetter ( name, env )

## Integer-Indexed Exotic Objects

- methods:

  - \[[GetOwnProperty]] ( P )
  - \[[HasProperty]] ( P )
  - \[[DefineOwnProperty]] ( P, Desc )
  - \[[Get]] ( P, Receiver )
  - \[[Set]] ( P, V, Receiver )
  - \[[OwnPropertyKeys]] ( )
  - IntegerIndexedObjectCreate ( prototype, internalSlotsList )
  - IntegerIndexedElementGet ( O, index )
  - IntegerIndexedElementSet ( O, index, value )

## Module Namespace Exotic Objects

- properties:

  - \[[Module]]
  - \[[Exports]]
  - \[[Prototype]]

- methods:

  - \[[SetPrototypeOf]] ( V )
  - \[[IsExtensible]] ( )
  - \[[PreventExtensions]] ( )
  - \[[GetOwnProperty]] ( P )
  - \[[DefineOwnProperty]] ( P, Desc )
  - \[[HasProperty]] ( P )
  - \[[Get]] ( P, Receiver )
  - \[[Set]] ( P, V, Receiver )
  - \[[Delete]] ( P )
  - \[[OwnPropertyKeys]] ( )
  - ModuleNamespaceCreate ( module, exports )

## Immutable Prototype Exotic Objects

- methods:

  - \[[SetPrototypeOf]] ( V )
  - SetImmutablePrototype ( O, V )
