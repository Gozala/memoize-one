// @flow

/*::
type EqualityFn = (a: mixed, b: mixed) => boolean;
*/

const simpleIsEqual/*: EqualityFn*/ = (a/*: mixed*/, b/*: mixed*/)/*: boolean*/ => a === b;

// <ResultFn: (...Array<any>) => mixed>
// The purpose of this typing is to ensure that the returned memoized
// function has the same type as the provided function (`resultFn`).
// ResultFn:        Generic type (which is the same as the resultFn).
// (...Array<any>): Accepts any length of arguments - and they are not checked
// mixed:           The result can be anything but needs to be checked before usage
export default function /*::<ResultFn: (...Array<any>) => mixed>*/(resultFn/*: ResultFn*/, isEqual/*:EqualityFn*/ = simpleIsEqual)/*: ResultFn*/ {
  let lastThis/*: mixed*/;
  let lastArgs/*: Array<mixed>*/ = [];
  let lastResult/*: mixed*/;
  let calledOnce/*: boolean*/ = false;

  const isNewArgEqualToLast = (newArg/*: mixed*/, index/*: number*/)/*: boolean*/ => isEqual(newArg, lastArgs[index]);

  // breaking cache when context (this) or arguments change
  const result = function (...newArgs/*: Array<mixed>*/) {
    if (calledOnce &&
      lastThis === this &&
      newArgs.length === lastArgs.length &&
      newArgs.every(isNewArgEqualToLast)) {
      return lastResult;
    }

    // Throwing during an assignment aborts the assignment: https://codepen.io/alexreardon/pen/RYKoaz
    // Doing the lastResult assignment first so that if it throws
    // nothing will be overwritten
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  };

  // telling flow to ignore the type of `result` as we know it is `ResultFn`
  const $result/*:any*/ = result
  return $result;
}var simpleIsEqual = function simpleIsEqual(a, b) {
  return a === b;
};

function index (resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = simpleIsEqual;
  }

  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
    return isEqual(newArg, lastArgs[index]);
  };

  var result = function result() {
    for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      newArgs[_key] = arguments[_key];
    }

    if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  };

  return result;
}

export default index;
