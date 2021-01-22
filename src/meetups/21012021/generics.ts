import { pipe, last, head, sortBy, identity } from "ramda";

const numberArray = [1, 2, 3];
const stringArray = ["one", "two", "three"];
const mixedArray = ["one", 2, 3];

/*
  Head and number Array
*/

const numberHead = (array: number[]) => array[0];

const firstNumber = numberHead(numberArray);

firstNumber;

/*
  Can we use head with strings??
*/

const firstString = numberHead(stringArray);

firstString;

/* 
  Enter Generics
*/

const genericHead = <T>(array: T[]) => array[0];

const firstInArray = genericHead(stringArray);

firstInArray;

/*
  What happends if we mix?
*/

const firstInMixedArray = genericHead(mixedArray);

firstInMixedArray;

/* 
 What if we pipe two functions??
*/

const arrayToSort = [3, 2, 1];

const lastInSortedArray = <T>(array: T[]): T =>
  pipe(sortBy(identity), last)(array);

const test = lastInSortedArray(arrayToSort);

test;

/*
  Type assertion
*/

const castedNumber0 = head(numberArray);
const castedNumber1 = <number>head(numberArray);
const castedNumber2 = head(numberArray) as number;

const revistitedGenericHead = <T>(array: T[]) => head(array);

const revisitedFirstNumber = revistitedGenericHead(stringArray);
revisitedFirstNumber;

/*
  Generics in interface
*/

interface ReduxData<T> {
  id: string;
  position: number;
  data: T;
}

type DataString = ReduxData<string>;
type DataNumber = ReduxData<number>;

const someData: DataNumber = { id: "1", position: 2, data: 2 };

someData;

/*
 Type parameters in generic contstraints
*/

const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

let x = { a: 1, b: 2, c: 3, d: 4 };

const propA = getProperty(x, "b");

propA;

/*
 Conditional types based on generic
*/

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T0 = TypeName<string>;
//   ^ = type T0 = "string"
type T1 = TypeName<"a">;
//   ^ = type T1 = "string"
type T2 = TypeName<true>;
//   ^ = type T2 = "boolean"
type T3 = TypeName<() => void>;
//   ^ = type T3 = "function"
type T4 = TypeName<string[]>;
//   ^ = type T4 = "object"
