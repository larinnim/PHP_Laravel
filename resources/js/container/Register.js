
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 20,
      [theme.breakpoints.up('sm')]: {
        width: '40%',
        marginRight: 2,
      },
    },
  });
  
class Register extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
      };
        
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.card}>

            <form noValidate autoComplete="off">
                    <TextField
                    id="outlined-name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    />
                    <TextField
                    id="outlined-name"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    /> <TextField
                    id="outlined-name"
                    label="Postal Code"
                    margin="normal"
                    variant="outlined"
                    /> <TextField
                    id="outlined-name"
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    /> <TextField
                    id="outlined-name"
                    label="Confirm Password"
                    margin="normal"
                    variant="outlined"
                    />
                    <FormControlLabel
                control={
                <Checkbox
                checked={this.state.checkedA}
                value="checkedA"
                />
            }
            label="Secondary"
            />
            </form>
        </div>
        );
    }
}


export default withStyles( styles ) (Register);
