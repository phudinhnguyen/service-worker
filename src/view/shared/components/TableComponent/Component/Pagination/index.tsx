import { Select } from "antd";
import React from "react";
import { IPagination } from "../../interface";

interface IProps {
  pagination: IPagination;
  onChange: (pagination: IPagination) => void;
}

const Pagination = (props: IProps) => {
  const { pagination, onChange } = props;
  const { total, current, pageSize } = pagination;

  const handleDisplay = () => {
    if (current == -1) {
      return `Error Current == -1`;
    }
    return `Display ${pageSize * (current - 1) + 1}-${
      pageSize * (current - 1) + total
    } of ${total} entries`;
  };
  return (
    <div className="table-function">
      <div className={`active Showing`}>
        <span>{handleDisplay()}</span>
      </div>
      {total > 10 && (
        <div className="pagesize">
          <Select
            defaultValue={pageSize}
            className="pagesize--select"
            onChange={(value) => {
              onChange({
                ...pagination,
                pageSize: value,
              });
            }}
          >
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={20}>20</Select.Option>
            <Select.Option value={50}>50</Select.Option>
            <Select.Option value={100}>100</Select.Option>
          </Select>
          <span className="pagesize--entries">entries/ page</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
