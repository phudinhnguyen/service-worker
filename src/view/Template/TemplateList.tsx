import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import React, { useEffect } from "react";
import RepositoryTemplate from "@modules/template/repository";
const dataTable = require("../TestHoa/data.json");
const data = [
  {
    name: "Templates",
  },
];
const TemplateList = ({}) => {
  const columns = [
    {
      title: "Template Name",
      dataIndex: "templateName",
      className: "main-column",
    },
    {
      title: "Ratio",
      dataIndex: "",
      render: (item, record) => {
        return (
          <span>
            {record.templateRatioX} / {record.templateRatioY}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <MainTitleComponent
        breadcrumbs={data}
        title="Template List"
        classBreadcumb={null}
        classTitle={null}
      />
      <TableComponent
        apiServices={RepositoryTemplate.getListTemplate}
        columns={columns}
      />
    </div>
  );
};
export default React.memo(TemplateList);
