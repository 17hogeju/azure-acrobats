import React, { Component } from "react";
import { connect } from "react-redux";
import { CSVReader, jsonToCSV} from 'react-papaparse';
import { postHouseholds } from "../actions/uploadCsv";


const n = 3;
const mylabel = ["households", "products", "transactions"];



class ImportData extends Component {

    constructor() {
        super();
        this.state = {
            checkboxes: new Array(n).fill().map((_, i) => !i),
        };
    }

    onChange(e, changedIndex) {
        // it is a good habit to extract things from event variable
        const { checked } = e.target;

        this.setState(state => ({
            // this lets you unselect all.
            // but selected can be anly one at a time
            checkboxes: state.checkboxes.map((_, i) => i === changedIndex ? checked : false),
        }));
    }

    handleOnDrop = (data) => {
        console.log(data);
        let myarr = [];
        for (let i = 1; i < data.length - 1; i++){
            myarr.push(data[i].data);
        }
        console.log(data[0].data);
        console.log(myarr);
        const csv = jsonToCSV({
            "fields": data[0].data,
            "data": myarr
        });
        console.log(csv);
        if (this.state.checkboxes[0] == true) {
            this.props.dispatch(postHouseholds(csv));

        } else if (this.state.checkboxes[1] == true) {
            // verifyAndFormatProducts(data);
        } else {
            // verifyAndFormatTransactions(data);
        }
    };

    handleOnError = (err, file, inputElem, reason) => {
        alert(err);
    };

    handleOnRemoveFile = (data) => {
        //do nothing
    };


    render() {
        const { checkboxes } = this.state;
        return (
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h2>Import New Data</h2>
                    <p>Please input one file at a time and select destination</p>
                    <CSVReader
                        onDrop={this.handleOnDrop}
                        onError={this.handleOnError}
                        addRemoveButton
                        onRemoveFile={this.handleOnRemoveFile}>
                        <span>Drop CSV file here or click to upload.</span>
                    </CSVReader>
                    <div className="d-flex flex-column align-items start">
                        {checkboxes.map((item, i) => (
                            <label>
                                <input
                                    key={i}
                                    type="checkbox"
                                    checked={item}
                                    onChange={e => this.onChange(e, i) /* notice passing an index. we will use it */}
                                />  {mylabel[i]}</label>
                        ))}
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(ImportData);