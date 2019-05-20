import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import profilePicture from "../../../../img/profile.jpg";
import axios from "axios";

export default class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        const token = localStorage.getItem("token");

        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });

        var data = new FormData();
        data.append("image", files[0]);

        axios
            .post("/api/uploadImage/" + token, data)
            .then(response => {
                this.props.updatePhoto();
            })
            .catch(err => {});
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    updatePhoto() {}

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                    <img
                        src={this.props.srcImage}
                        style={{
                            borderRadius: 100,
                            width: "50%"
                        }}
                    />
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
