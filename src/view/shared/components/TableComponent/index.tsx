import { useAsync } from "@hook/useAsync";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Pagination from "./Component/Pagination";
import { InitPagination, IPagination } from "./interface";
import { IBEPaginationTable, InitOption, IOption } from "./interface";
import { TableProps  } from 'rc-table/lib/Table';

interface IState  {
  pagination: IPagination;
  option: any;
  selection: Array<any>;
  rowKey?: any;
}

const TableComponent = (props: IBEPaginationTable) => {
  let {
    apiServices,
    columns = [],
    register,
    defaultOption,
  } = props;

  const [ { execute: getListData, value: listData, status } ] = useAsync(
    apiServices
  );

  const [ state, setState ] = useState<IState>({
    pagination: InitPagination,
    option: { ...defaultOption, ...InitOption },
    selection: [],
  });

  useEffect(() => {
    getDataWithCurrentState();
  }, []);

  const getDataWithCurrentState = (_state?: {
    pagination?: IPagination;
    option?;
  }) => {
    const currentState = {
      pagination: state.pagination,
      option: state.option,
    };

    let { pagination = state.pagination, option = state.option } = _state || currentState;

    pagination = {
      current: pagination?.current || state.pagination.current,
      pageSize: pagination?.pageSize || state.pagination.pageSize,
      total: pagination?.total || state.pagination.total,
    };
    

    let prepareOption = {};

    for (let key in option) {
      if (option[ key ] == "") {
        prepareOption[ key ] = "";
      } else {
        prepareOption[ key ] = option[ key ] || state.option[ key ];
      }
    }

    setState((prev) => ({ ...prev, option: prepareOption }));
    getListData(pagination, prepareOption).then((res) => {
      setState((prev) => {
        console.log(pagination, "pagination")
        console.log(res?.info, "res?.info");
        
        return { 
          ...prev,
            pagination: {
              ...pagination,
              ...res?.info
            } 
        }
      });
    });
  };

  const handleChangePage = (newPagination: IPagination, _filter?, _sorter?) => {
    let option = state.option;
    if (_sorter) {
      option.sorter = {
        sortOrder: _sorter.order || "",
        sortField: _sorter.field,
      };
    }
    getDataWithCurrentState({
      pagination: newPagination,
      option,
    });
    setState((prev) => ({ ...prev, selection: [] }));
  };

  const getData = () => {
    return {
      data: listData?.data || [],
      ...state,
    };
  };

  if (register) {
    register.getData = getData;
    register.fetchData = getDataWithCurrentState;
    register.setOption = (value) =>
      setState((prev) => ({ ...prev, option: { ...prev.option, ...value } }));
    register.setPagination = (value) =>
      setState((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, ...value },
      }));
    register.setSelection = (value) =>
      setState((prev) => ({ ...prev, selection: value }));
  }


  
  return (
    <div className="BE-pagination-table">
      <Table
        {...props}
        className="main-table"
        dataSource={listData?.data || []}
        columns={columns}
        loading={status == "loading"}
        pagination={state.pagination}
        onChange={handleChangePage}
      />
      <Pagination pagination={state.pagination} onChange={handleChangePage} />
    </div>
  );
};

export default TableComponent;
