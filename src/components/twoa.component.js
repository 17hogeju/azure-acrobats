import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTwoA } from "../actions/twoa";
import BarChart from "./bar-chart.component";

class OneB extends Component {


    getById(obj, property, name){
        let i;
        let j = 0;
        let array = [];
        let validMonths = ["8","9","10","11","12","1","2","3","4","5","6","7","8","9","10","11","12","1","2","3","4","5","6","7","8"];
        if(name){
            for(i = 0; i < obj.length; i++){
                if(String(obj[i]["commodity"]) == name){
                    if(obj[i]["month/year"].startsWith(validMonths[j])){
                        array.push(obj[i][property]);
                    } else{
                        array.push(0);
                        array.push(obj[i][property]);

                        j = j + 1;
                    }
                    j = j + 1;
                }
            }
        } else {
            for(i = 0; i < obj.length; i++){
                array.push(obj[i][property]);
            }
        }
        return array;
    }

    componentDidMount() {
        this.props.dispatch(fetchTwoA());
    }

    render() {
        let twoaerror = this.props.twoaerror;
        let twoaloading = this.props.twoaloading;
        let twoa = this.props.twoa;
        let labels = [];
        let values = [];
        console.log(twoa);
        if (twoaloading) {
            return [
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                </div>
            ]
        }
        if (twoaerror) {
            return [
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div>Error! {twoaerror.message}</div>
                </div>
            </div>
            ]
        } 
        if (twoa) {
            labels = twoa.data[0].map(function (el) {
                return el.category;
            });

            values = twoa.data[0].map(function (el) {
                return el.average_household_spending;
            });
            console.log(labels);
            console.log(values);
        }
            return (
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h2>Two A</h2>
                        <h4> How do demographic factors affect customer engagement within certain categories?</h4>
                        <BarChart labels={labels} data={values} yaxis="Average Household Spending in USD" xaxis="Category" title="Demographic Factors Affecting Customer Engagement"/>
                    </div>
                </div>
            );
        
    }
}

const mapStateToProps = (state) => ({
    twoa: state.twoa.items,
    twoaloading: state.twoa.loading,
    twoaerror: state.twoa.error
});

export default connect(mapStateToProps)(OneB);