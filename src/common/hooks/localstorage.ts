import {useState, useEffect, useRef, useCallback} from 'react'

const useLocalStorageState = <T>(
  key: string, 
  defaultValue?: T,
  )
  : [T, (value: T) => void] => {

  const readStoredValue = useCallback(() => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return defaultValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue ? defaultValue : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return defaultValue
    }
  }, [defaultValue, key]);

  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readStoredValue());

  // for any key used in local storage and got changed
  // lets take note and perform some cleanups
  const prevKeyRef = useRef(key);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;
      
      // key clean up
      const prevKey = prevKeyRef.current;
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey);
      }
      prevKeyRef.current = key;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));
      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      // other modules using localStorage hook needs to be notified of changes
      //  to any key they are subscribed to
      window.dispatchEvent(new Event('monique-store'));

    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }

  /**
   * Effect to respond to updates to localstorage hooks and notifiy all compoenents or modules
   * to effect updates to key values
   */
  useEffect(() => {
    setStoredValue(readStoredValue())
  }, [readStoredValue]);

  /**
   * Effect to respond to updates to localstorage hooks and notifiy all compoenents or modules
   * to effect updates to key values
   * using a window eventlister
   * N.B: This is a never event type when window is undefined as event will not be dispatched
   */
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readStoredValue());
    }
    // this is a custom event, triggered in writeValueToLocalStorage
    window.addEventListener('monique-store', handleStorageChange);
    return () => {
      window.removeEventListener('monique-store', handleStorageChange);
    }
  }, [readStoredValue]);

  return [storedValue, setValue];

}

export {useLocalStorageState}