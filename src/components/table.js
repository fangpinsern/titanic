import { Table, Tag, Space } from "antd";

const TableComponent = (props) => {
  return <Table columns={props.columns} dataSource={props.data} />;
};

export default TableComponent;
