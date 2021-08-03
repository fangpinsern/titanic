import { Table, Tag, Space } from "antd";

const TableComponent = (props) => {
  return (
    <Table
      columns={props.columns}
      dataSource={props.data}
      expandable={{ expandedRowRender: props.expandable }}
      pagination={
        props.pagination === false
          ? false
          : {
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }
      }
      scroll={{ x: "max-content" }}
    />
  );
};

export default TableComponent;
