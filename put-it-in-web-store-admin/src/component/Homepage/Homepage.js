import React from "react";
function Homepage() {
    return (
        <main>
            <div className="container-fluid">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-primary text-white mb-4">
                            <div className="card-body">Primary Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-warning text-white mb-4">
                            <div className="card-body">Warning Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-success text-white mb-4">
                            <div className="card-body">Success Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-danger text-white mb-4">
                            <div className="card-body">Danger Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                                DataTable Example
                            </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                        <td>Tiger Nixon</td>
                                        <td>System Architect</td>
                                        <td>Edinburgh</td>
                                        <td>61</td>
                                        <td>2011/04/25</td>
                                        <td>$320,800</td>
                                    </tr>
                                    <tr>
                                        <td>Garrett Winters</td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>63</td>
                                        <td>2011/07/25</td>
                                        <td>$170,750</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Homepage;
