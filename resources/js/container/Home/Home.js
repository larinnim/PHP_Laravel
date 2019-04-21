import React from "react";
import Autocomplete from "../../components/Autocomplete";
import { connect } from "react-redux";
import Cover from "./Cover/Cover";
import Aux from "../../hoc/Aux/Aux";
import "./Home.css";

class Home extends React.Component {
    render() {
        console.log("Home Props");
        console.log(this.props);
        return (
            <Aux>
                <div className="Cover_Home">
                    <Cover />
                </div>
                <div className="Autocomplete_Home">
                    <Autocomplete />
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};
export default connect(
    mapStateToProps,
    null
)(Home);
