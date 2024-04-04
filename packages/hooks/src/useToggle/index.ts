// import { useState, useMemo } from 'react';

// /**
//  * 切换功能
//  * true false
//  * 1.只有一个值
//  * 2.两个值进行切换
//  * 3.
//  */

// export interface Actions<T> {
//   setLeft: () => void;
//   setRight: () => void;
//   set: (value: T) => void;
//   toggle: () => void;
// }

// function useToggle<T = boolean>(): [boolean, Actions<T>];

// function useToggle<T>(defaultValue: T): [boolean, Actions<T>];

// function useToggle<D, R>(defaultValue: D, reverseValue: R): [D | R, Actions<D | R>];

// function useToggle<D, R>(defaultValue: D = false as D, reverseValue?: R) {
//   const [state, setState] = useState<D, R>(defaultValue);

//   const actions = useMemo(() => {
//     const reverseValueOrigin = (reverseValue === 'undefined' ? !defaultValue : reverseValue) as
//       | D
//       | R;
//     const toggle = setState((s) => (s === defaultValue ? reverseValueOrigin : reverseValue));
//     const setLeft = setState(defaultValue);
//     const setRight = setState(reverseValue);
//     const set = setState((value: D | R) => value);

//     return {
//       toggle,
//       setLeft,
//       setRight,
//       set,
//     };
//   });

//   return [state, actions];
// }

// export default useToggle;
import { useMemo, useState } from 'react';

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
}

export default useToggle;
