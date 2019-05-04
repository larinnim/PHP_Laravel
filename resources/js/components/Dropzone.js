import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import profilePicture from "../../img/profile.jpg";
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
        console.log(files);
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files, 
            open: false
        });
        console.log('Calling AJAX...');
        console.log(files);
        var data = new FormData();
        data.append('image', files[0]);
        axios.post('/api/uploadImage', data);
        // $.ajax({
        //     type: 'POST',
        //     url: '/api/uploadImage',
        //     data: this.state.files,
        //     context: this,
        //     success: (data) => {
        //         console.log(data);
        //     },
        //     error: (xhr, status, error) => {
        //         console.error(this.props.url, status, error.toString());
        //     }
        // });
    
    }
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
        return (
            <div>
                {/* <Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button> */}
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
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}