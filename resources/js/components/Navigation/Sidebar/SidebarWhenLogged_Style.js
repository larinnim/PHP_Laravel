const drawerWidth = 240;
export default theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        top: 60,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        backgroundColor: "orange",
        height: 30
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        margin: "auto",
        marginTop: 5
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        top: 60,
        width: drawerWidth
    },
    drawerHeader: {
        display: "contents",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    margin_left_sidebar: {
        marginLeft: 20
    },
    multilineColor: {
        color: "white",
        fontSize: "large"
    },
    number_circle: {
        background: "orange",
        borderRadius: "0.8em",
        MozBorderRadius: "0.8em",
        WebkitBorderRadius: "0.8em",
        color: "#ffffff",
        display: "inline-block",
        fontWeight: "bold",
        lineHeight: "1.6em",
        marginRight: "5px",
        textAlign: "center",
        width: "1.6em"
    },
    upgradePlan: {
        float: "right",
        display: "inline-block",
        height: "auto",
        width: "auto",
        margin: "20px 40px 0 16px",
        boxSizing: "border-box",
        border: "transparent",
        borderRadius: "60px",
        fontFamily: "'Raleway', sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "#ffffff",
        backgroundColor: "orange",
        cursor: "pointer",
        outline: "none",
        textAlign: "center"
    },
    make_uppercase: {
        textTransform: "capitalize"
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});
