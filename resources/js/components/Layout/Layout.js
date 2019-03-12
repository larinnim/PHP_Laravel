import React from 'react';
import Aux from '../../hoc/Aux';
import ResponsiveDrawer from '../Sidebar'
const Layout = (props) => (  
    <Aux>
    <ResponsiveDrawer origin='home' />
        {/* <div>Toolbar, Sidebar</div> */}
        <main>
            {props.children}
        </main>
    </Aux>
);

export default Layout;