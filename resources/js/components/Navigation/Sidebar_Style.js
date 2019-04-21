const drawerWidth = 240;
export default theme => ({
    root: {
        display: "flex",
        // height: 0 //this is respnsible for letting cover
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: "100%"
            //width: `calc(100% - ${drawerWidth}px)`
        },
        background: "black"
    },
    appBar_home: {
        marginLeft: 0,
        [theme.breakpoints.up("sm")]: {
            // width: "100%"
            width: `calc(100% - 0px)`
        },
        background: "transparent"
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    main_Tarefazz: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: "white",
        lineHeight: 1.75,
        fontWeight: 500,
        textDecoration: "unset",
        textTransform: "uppercase"
    },
    flexGrow10: {
        flexGrow: 10,
        [theme.breakpoints.down("sm")]: {
            marginLeft: 60
        }
    }
});
