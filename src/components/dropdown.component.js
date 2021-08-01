import React,  { Component } from 'react';
import { fetchHshdNums } from "../actions/hshdnums";
import { connect } from "react-redux";


class DropDown extends Component {



    componentDidMount(){
        this.props.dispatch(fetchHshdNums());
    }

    onTrigger = (event) => {
        console.log(event);
        this.props.onSelectHousehold(event.target.value);
        event.preventDefault();
    }

    render(){
        let hshdserror = this.props.hshdserror;
        let hshdsloading = this.props.hshdsloading;
        let hshds = this.props.hshds;
        let arr = [];

        if (hshdsloading) {
            return [
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                </div>
            ]
        }
        if (hshdserror) {
            return [
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div>Error! {hshdserror.message}</div>
                </div>
            </div>
            ]
        } 
        if (hshds) {
            arr = hshds.data[0].map(function (el) {
                return el.btrim;
            });
            console.log(arr);
        }
        return <div className="drop-down">
            <label for="households">Choose a household:</label>
            <select name="households" onChange={this.onTrigger}>
                {arr.map((option, key) => <option key={key}>{option}</option>)}
            </select>
            </div>;
    }
}

const mapStateToProps = (state) => ({
    hshds: state.hshd.items,
    hshdsloading: state.hshd.loading,
    hshdserror: state.hshd.error,
});

export default connect(mapStateToProps)(DropDown);