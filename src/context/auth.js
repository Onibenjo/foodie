import React, {createContext, createRef, useContext} from 'react';

// const authContext = createContext<InitialStateType | null>(null)
const authContext = createContext({
  userToken: null,
  signIn: () => {},
  signOut: () => {},
});

const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthRef = createRef();

function ProvideAuth({value, children}) {
  React.useImperativeHandle(AuthRef, () => value);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export {ProvideAuth, useAuth};
