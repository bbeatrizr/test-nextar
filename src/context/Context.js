import React from 'react';

export const AppContext = React.createContext();

export default function Provider({ children }){

  const activities = [
    { name: 'Mecanico', checked: false }, 
    { name: 'Pedreiro', checked: false }, 
    { name: 'Medico', checked: false }
  ]

  const filtersRegister = [
    'Acampamentos',
    'Atividades',
    'Pessoas'
  ];

  const contextValue = {
    filtersRegister, 
    activities
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => React.useContext(AppContext);
