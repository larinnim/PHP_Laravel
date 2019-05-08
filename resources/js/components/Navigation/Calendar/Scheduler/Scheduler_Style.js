export default theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    iOSSwitchBase: {
      '&$iOSChecked': {
        color: theme.palette.common.white,
        '& + $iOSBar': {
          backgroundColor: '#52d869',
        },
      },
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.sharp,
      }),
    },
    iOSChecked: {
      transform: 'translateX(15px)',
      '& + $iOSBar': {
        opacity: 1,
        border: 'none',
      },
    },
    iOSBar: {
      borderRadius: 13,
      width: 42,
      height: 26,
      marginTop: -13,
      marginLeft: -21,
      border: 'solid 1px',
      borderColor: theme.palette.grey[400],
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    iOSIcon: {
      width: 24,
      height: 24,
    },
    iOSIconChecked: {
      boxShadow: theme.shadows[1],
    },
    centerScheduler:{
       
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        
    }
  });