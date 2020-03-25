import React, { Component } from "react";
import API from "../utils/API";

class Employee extends Component {
  state = {
    employees: [],
    searchTerm: "",
    filteredEmp: [],
    filterOrder: true
  };

  handleChange = e => {
    const val = e.target.value.toLowerCase();
    const filtered = this.state.employees.filter(
      employee =>
        employee.name.first.toLowerCase().includes(val) ||
        employee.name.last.toLowerCase().includes(val) ||
        employee.email.toLowerCase().includes(val)
    );
    this.setState({ searchTerm: e.target.value, filteredEmp: filtered });
  };

  handleSort = e => {
    const type = e.target.getAttribute("name");
    if (type === "name") {
      const sorted = this.state.employees.sort((a, b) => {
        let num1 = a.name.last[0];
        let num2 = b.name.last[0];

        return this.state.filterOrder
          ? num1 < num2
            ? -1
            : num1 > num2
            ? 1
            : a.name.last[1] < b.name.last[1]
          : num1 > num2
          ? -1
          : num1 < num2
          ? 1
          : a.name.last[1] < b.name.last[1];
      });

      this.setState({ filterOrder: !this.state.filterOrder });
      this.setState({ filteredEmp: sorted });
    } else {
      const sorted = this.state.employees.sort((a, b) => {
        let num1 = a[type];
        let num2 = b[type];

        return this.state.filterOrder
          ? num1 < num2
            ? -1
            : num1 > num2
            ? 1
            : a[type][1] < b[type][1]
          : num1 > num2
          ? -1
          : num1 < num2
          ? 1
          : a[type][1] < b[type][1];
      });

      this.setState({ filterOrder: !this.state.filterOrder });
      this.setState({ filteredEmp: sorted });
    }
  };

  componentDidMount() {
    API().then(data =>
      this.setState({
        employees: data.data.results,
        filteredEmp: data.data.results
      })
    );
  }

 

  render() {
    
    return (
      <React.Fragment>
        <div>
        <p>Search by name, phone, or email</p>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          ></input>
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th onClick={this.handleSort} name="name" scope="col">
                Name
              </th>
              <th onClick={this.handleSort} name="phone" scope="col">
                Phone
              </th>
              <th onClick={this.handleSort} name="email" scope="col">
                Email
              </th>
              <th onClick={this.handleSort} name="dob" scope="col">
                DOB
              </th>
            </tr>
            {this.state.filteredEmp.map(employee => {
              return (
                <tr className="table-dark" key={employee.email}>
                  <th scope="row">
                    <img alt="pic" src={employee.picture.thumbnail} />
                  </th>
                  <td>
                    {employee.name.first} {employee.name.last}
                  </td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dob.date}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </React.Fragment>
    );
  }
}

export default Employee;
