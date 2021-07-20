import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    // console.log(data);

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column, i) => {
              // console.log(`${column}`);
              // console.log(`${item._id || column.key}-${i}`);
              return (
                <td key={item._id + (column.path || column.key)}>
                  {this.renderCell(item, column)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
