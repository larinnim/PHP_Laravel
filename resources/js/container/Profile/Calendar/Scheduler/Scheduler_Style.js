export default theme => ({
    root: {
        flexGrow: 1,
        // marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 0,
        paddingBottom: 0,
        boxShadow: "none !important"
    },
    grids: {
        paddingTop: "0 !important",
        paddingBottom: "0 !important"
    },
    gridsTitle: {
        paddingBottom: "0 !important"
    },
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: "none",
        textAlign: "center",
        height: "650px",
        backgroundColor: "white"
    },
    paperContent: {
        padding: 8 * 3,
        height: "500px",
        overflow: "auto",
        marginTop: 20,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: "white",
        paddingRight: 0,
        paddingLeft: 0
    },
    paperIndividual: {
        marginTop: 50,
        position: "relative",
        backgroundColor: "#eee",
        width: "100%"
    },
    centerScheduler: {
        // position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    iOSSwitchBase: {
        "&$iOSChecked": {
            color: theme.palette.common.white,
            "& + $iOSBar": {
                backgroundColor: "#52d869"
            }
        },
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp
        })
    },
    iOSChecked: {
        transform: "translateX(15px)",
        "& + $iOSBar": {
            opacity: 1,
            border: "none"
        }
    },
    iOSBar: {
        borderRadius: 13,
        width: 42,
        height: 26,
        marginTop: -13,
        marginLeft: -21,
        border: "solid 1px",
        borderColor: theme.palette.grey[400],
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"])
    },
    iOSIcon: {
        width: 24,
        height: 24
    },
    iOSIconChecked: {
        boxShadow: theme.shadows[1]
    },
    buttonStyle: {
      marginTop: 50,
    }
});
