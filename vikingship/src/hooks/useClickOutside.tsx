import { RefObject, useEffect } from 'react'
function useClickOutside(ref: RefObject<HTMLDivElement>, handler: Function): void {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    return (): void => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
