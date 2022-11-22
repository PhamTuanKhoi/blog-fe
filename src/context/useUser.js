import React, { useEffect, useState } from "react";
const defaultState = {
   user: undefined,
};
const Web3Context = React.createContext(defaultState);

function Web3Provider(props) {
   const [user, setUser] = useState({});

   useEffect(() => {
      let token = localStorage.getItem("persist:root");
      if (JSON.parse(token)?.auth) {
         getUser();
      }
   }, []);

   async function getUser() {
      try {
         let token = localStorage.getItem("persist:root");
         let parse = JSON.parse(token).auth;
         let resUser = JSON.parse(parse).user;
         setUser(resUser);
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <Web3Context.Provider
         value={{
            user,
            setUser,
         }}
      >
         {props.children}
      </Web3Context.Provider>
   );
}
function useWeb3() {
   const context = React.useContext(Web3Context);
   if (context === undefined) {
      throw new Error("Error in useWeb3");
   }
   return context;
}

export { Web3Provider, useWeb3 };
