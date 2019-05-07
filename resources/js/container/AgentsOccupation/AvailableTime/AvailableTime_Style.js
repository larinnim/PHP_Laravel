export default theme => ({
    paper: {
        position: "absolute",
        width: "80%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: "none",
        textAlign: "center"
    },
    centerScheduler: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    button: {
        color: "white",
        backgroundColor: "orange"
    }
});
