import React, { Component } from "react";
import { connect } from "react-redux";
import { CSVReader, jsonToCSV } from 'react-papaparse';
import { postHouseholds } from "../actions/uploadCsv";
import { postTransactions } from "../actions/uploadCsv";
import { postProducts } from "../actions/uploadCsv";


const n = 3;
const mylabel = ["households", "products", "transactions"];



class ImportData extends Component {

    constructor() {
        super();
        this.state = {
            householdData: null,
            headerItems: ["null", "null", "null"],
            headerData: [["null", "null", "null"], ["null", "null", "null"], ["null", "null", "null"]],
            checkboxes: new Array(n).fill().map((_, i) => !i),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBuildTable = this.handleBuildTable.bind(this);
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
        this.setState(state => ({
            householdData: data
        }));
    };

    handleOnError = (err, file, inputElem, reason) => {
        alert(err);
    };


    handleBuildTable() {

        const data = this.state.householdData;
        let head = data[0];
        let [, ...body] = data;

        console.log(body);
        let arr = [];

        for (let i = 0; i < 10 && i < body.length - 1; i++) {
            console.log(body[i]);
            arr.push(body[i].data);
        }

        this.setState(state => ({
            headerItems: head.data,
            headerData: arr,
        }));


    }


    handleSubmit(event) {
        const data = this.state.householdData;
        
        if (!this.state.householdData) {
            alert("Please add a data set");
        } else {
            let [, ...body] = data;
            let arr = { data: [], table: ""};
            body.forEach(function(item) {
                console.log(item.data);
                if(item.data.length !== 0 && !(item.data.length == 1 && item.data[0] == "")){
                    item.data.forEach(function (element, index, array) {
                        array[index] = array[index].trim();
                    });
                    arr.data.push(item);
                }
            })

            // const csv = jsonToCSV({
            //     "fields": data[0].data,
            //     "data": myarr
            // });
            if (this.state.checkboxes[0] == true) {
                this.handleBuildTable();
                arr.table = "households";
                this.props.dispatch(postHouseholds(arr));

            } else if (this.state.checkboxes[1] == true) {
                this.handleBuildTable();
                arr.table = "products";
                this.props.dispatch(postHouseholds(arr));

            } else {
                this.handleBuildTable();
                arr.table = "transactions";
                this.props.dispatch(postHouseholds(arr));
            }
        }

    }


    render() {
        const { checkboxes } = this.state;
        let herror = this.props.herror;
        let hloading = this.props.hloading;
        let hdata = this.props.hdata;
        console.log(this.props);
        if (hloading) {
        }
        if (herror) {
            // alert("There was an error while uploading your data. You may have duplicates in your data.");
        }
        if (hdata.length !== 0) {
            // alert("Data uploaded successfully");
        }
        return (
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h2>Import New Data</h2>
                    <p>Please input one file at a time and select destination. The data uploaded will populate after submitting the file. Do not enter data with ids that are already present in the database. </p>
                    <CSVReader
                        onDrop={this.handleOnDrop}
                        onError={this.handleOnError}
                        addRemoveButton>
                        <span>Drop CSV file here or click to upload.</span>
                    </CSVReader>
                    <form onSubmit={this.handleSubmit} className="mt-5">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="d-flex flex-column align-items-start">
                                {checkboxes.map((item, i) => (
                                    <label className="d-flex flex-row justify-content-between align-items-center">
                                        <input
                                            key={i}
                                            type="checkbox"
                                            checked={item}
                                            onChange={e => this.onChange(e, i) /* notice passing an index. we will use it */}
                                        />  {mylabel[i]}
                                    </label>
                                ))}
                            </div>
                            <input className="btn btn-primary btn-block mt-3" type="submit" value="Submit" />
                        </div>
                        <div className="col-4"></div>
                    </form>
                    <table className="table table-striped mt-3">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                {this.state.headerItems.map((item) => {
                                    return (
                                        <th scope="col">{item}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.headerData.map((row, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        {
                                            row.map((item) => {
                                                return (
                                                    <td>{item}</td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    hdata: state.upload.items,
    hloading: state.upload.loading,
    herror: state.upload.error,
});

export default connect(mapStateToProps)(ImportData);