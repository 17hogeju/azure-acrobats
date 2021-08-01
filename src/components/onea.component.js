import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOneA } from "../actions/onea";
import DropDown from "./dropdown.component";
import LineGraph from "./line-graph.component";


class OneA extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: "0029"
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchOneA("0029"));
    }


    fetchHousehold = (childData) => {
        this.setState({data: childData});
        this.props.dispatch(fetchOneA(childData));
    }

    render() {
        let oneaerror = this.props.oneaerror;
        let onealoading = this.props.onealoading;
        let onea = this.props.onea;
        let labels = [];
        let values = [];
        let title = "Cusomter Engagement for Household: " + 29;
        if (onealoading) {
            return [
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                </div>
            ]
        }
        if (oneaerror) {
            return [
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div>Error! {oneaerror.message}</div>
                    </div>
                </div>
            ]
        } 
        console.log(onea.data[0]);
        if(onea){
            let data = onea.data[0];
            console.log(data);
            title = "Cusomter Engagement for Household: " + data[0].hshd_num;
            for(let i = 0; i < data.length; i++){
                console.log(data[i].weekly_spending);
                labels.push(data[i].purchase_week);
                values.push(data[i].weekly_spending);
            }
        }
        return (
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h2>One A</h2>
                    <h4>Customer Engagement Over Time</h4>
                    <DropDown onSelectHousehold={this.fetchHousehold} />
                    <LineGraph labels={labels} data={values} yaxis="Total Amount Spent in US Dollars" xaxis="Transaction Date and Time" title={title}/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    onea: state.onea.items,
    onealoading: state.onea.loading,
    oneaerror: state.onea.error,
});

export default connect(mapStateToProps)(OneA);