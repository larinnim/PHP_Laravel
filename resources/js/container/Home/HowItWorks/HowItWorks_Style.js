export default theme => ({
    root: {
        flexGrow: 1,
        // marginTop: 40,
        marginLeft: 40,
        marginRight: 40
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center"
        // backgroundColor: "grey"
    },
    photos: {
        // marginLeft: "10px"
        textAlign: "right"
    },
    titles: {
        textAlign: "left",
        paddingLeft: "0 !important"
    },
    principalTitles: {
        fontSize: 30,
        color: "orange"
    },
    principalTitlesTextBox: {
        marginTop: "3%",
        marginBottom: 0
    },
    card: {
        maxWidth: 345
    },
    media: {
        height: 200
    },
    button: {
        color: "white",
        backgroundColor: "orange"
    },
    alignButton: {
        justifyContent: "center"
    },
    alignItems: {
        textAlign: "center"
    }
});
