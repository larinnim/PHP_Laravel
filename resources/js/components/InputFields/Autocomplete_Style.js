import { emphasize } from "@material-ui/core/styles/colorManipulator";

export default theme => ({
    root: {
        flexGrow: 1,
        width: "60%",
        position: "absolute",
        textAlign: "center",
        display: "inline-block",
        top: "30%",
        left: "20%"
    },
    input: {
        display: "flex",
        padding: 0
    },
    valueContainer: {
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: "absolute",
        left: 2,
        fontSize: 16
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    },
    button: {
        color: "white",
        backgroundColor: "orange",
        marginTop: "5%"
    }
});
