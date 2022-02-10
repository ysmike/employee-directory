import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function SearchStateProvider({ children }) {
  // this is our own custom provider. we'll store data (state) and functionality
  // (updates) in here and any component in the React tree can access via the
  // consumer

  const [search, setSearch] = useState('');

  function clearSearch() {
    setSearch('');
  }

  return (
    <LocalStateProvider value={{ search, setSearch, clearSearch }}>
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for easily accessing the Search local state
function useSearch() {
  // use a consumer to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { SearchStateProvider, LocalStateContext, useSearch };
