import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

class Navbar extends Component {
    state = {
        anchorEl: null
    };
    handleClickNav = href => {
        window.location = href;
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const open = Boolean(this.state.anchorEl);

        return (
            <div>
                <div>
                    <IconButton
                        aria-owns={open ? "menu-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={open}
                        onClose={this.handleClose}
                    >
                        <MenuItem
                            onClick={() =>
                                this.handleClickNav("/postjob_profile")
                            }
                        >
                            Profile
                        </MenuItem>
                        <MenuItem>My account</MenuItem>
                    </Menu>
                </div>
            </div>
        );
    }
}
export default Navbar;
