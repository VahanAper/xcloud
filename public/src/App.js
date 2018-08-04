import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn,
} from 'react-bootstrap-table';
import _ from 'lodash';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const baseURL = 'http://localhost:8080/api';

class App extends Component {
  state = {
    servers: [],
  };

  componentDidMount() {
    fetch(`${baseURL}/servers`)
      .then(response => {
        response.json().then(res => {
          this.setState({ servers: res.data });
        });
      });
  }

  formatIPAddress = (address) => {
    if (!address.IPAddressId) {
      return '';
    }

    return `${address.serverIPAddress} ${address.serverIPType === 'anycast' ? '[ANYCAST]' : ''}`;
  }

  getIPAddresses = (cell) => {
    const addresses = cell.map((address, i) => (
      <p key={i}>{this.formatIPAddress(address)}</p>
    ));

    return (
      <div>{addresses}</div>
    );
  }

  getPorts = (cell) => {
    const ports = cell.map((port, i) => (
      <div key={i} style={{ marginBottom: 10 }}>
        <div>{this.formatPort(port)}</div>
        <div className="label label-danger">{this.formatBGPinfo(port)}</div>
      </div>
    ));

    return (
      <div>{ports}</div>
    );
  }

  formatPort = ({ portId, portDescription, portName, switchName }) => {
    if (!portId) {
      return '';
    }

    return `${portDescription}(${portName})@${switchName}`;
  }

  formatBGPinfo = ({ portId, bgpState, bgpPrefix, bgpUptime }) => {
    if (!portId) {
      return '';
    }

    return `bgp: ${bgpState}; prefix: ${bgpPrefix}; time: ${bgpUptime}`;
  }

  getFilterValueForIPAddresses = (ips) => {
    return ips.reduce((acc, val) => {
      return `${acc} ${this.formatIPAddress(val)}`;
    }, '');
  }

  getFilterValueForPorts = (ports) => {
    return ports.reduce((acc, val) => {
      return `${acc} ${this.formatPort(val)} ${this.formatBGPinfo(val)}`;
    }, '');
  }

  getDeleteButton = (id) => {
    return (
      <button className="btn btn-danger" onClick={() => this.deleteServer(id)}>DELETE</button>
    );
  }

  deleteServer = (id) => {
    fetch(`${baseURL}/servers/${id}`, {
      method: 'DELETE',
    }).then(response => {
      response.json().then(res => {
        if (res.success) {
          const servers = _.filter(this.state.servers, (server) => server.id !== id);

          this.setState({ servers });
        }
      })
    });
  }

  render() {
    return (
      <BootstrapTable data={this.state.servers} striped hover>
        <TableHeaderColumn isKey dataField='id' hidden>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='serverName' filter={{ type: 'TextFilter', delay: 0 }}>Name</TableHeaderColumn>
        <TableHeaderColumn
          dataField='IPAddresses'
          filterValue={this.getFilterValueForIPAddresses}
          dataFormat={this.getIPAddresses}
          filter={{
            type: 'TextFilter',
            delay: 0,
          }}
        >
          IP Address
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='ports'
          filterValue={this.getFilterValueForPorts}
          filter={{ type: 'TextFilter', delay: 0 }}
          dataFormat={this.getPorts}
        >
          Ports
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="id"
          dataFormat={this.getDeleteButton}
        />
      </BootstrapTable>
    );
  }
}

export default App;
