import React from 'react';
import Aux from '../../hoc/Aux';
const Layout = (props) => (  
    <Aux>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default Layout;