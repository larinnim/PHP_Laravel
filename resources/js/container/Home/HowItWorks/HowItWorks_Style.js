export default theme => ({
    root: {
        flexGrow: 1,
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center"
    },
    grids: {
        marginTop: 10
    },
    gridBlue: {
        backgroundColor: "blue",
        color: "blue"
    },
    gridRed: {
        backgroundColor: "red"
    },
    gridYellow: {
        backgroundColor: "yellow"
    },
    gridGreen: {
        backgroundColor: "green"
    },
    photos: {
        // marginLeft: "10px"
        textAlign: "right"
    },
    titles: {
        textAlign: "left",
        paddingLeft: "2%"
    },
    card: {
        maxWidth: 345
    },
    media: {
        height: 200
    }
});
