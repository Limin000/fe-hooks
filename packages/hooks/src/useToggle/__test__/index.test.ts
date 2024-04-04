import { renderHook, act } from '@testing-library/react';
import useToggle from '../index';

const callUseToggle = (hooks) => {
  act(() => {
    hooks.result.current[1].toggle();
  });
};
describe('test useToggle', () => {
  it('测试没有初值时是否是false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBeFalsy();
  });

  it('测试两个值，hello world', () => {
    const hook = renderHook(() => useToggle('hello', 'world'));
    console.log('result', hook);
    act(() => {
      hook.result.current[1].toggle();
    })
    expect(hook.result.current[0]).toBe('world');
  });
});
