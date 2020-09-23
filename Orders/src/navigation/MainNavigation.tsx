import React  from 'react';

export const MainNavigation = () => {

    return(
        {authPassed ? <AuthStack /> : <MainStack />}
    )
}
