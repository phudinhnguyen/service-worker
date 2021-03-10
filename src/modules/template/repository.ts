import httpRepository from "@modules/core/repository/http";
import TemplateEntity from "./entity";
import PaginationInfo from "@modules/pagination/entity";

const getListTemplate = async () => {
  const dataTemplate = await httpRepository.execute({
    path: "/api/template",
    method: "get",
    config: { isPrivate: true },
  });
  return {
    data: TemplateEntity.createListTemplateEntity(dataTemplate.pagedData),
    info: new PaginationInfo({
      total: dataTemplate.pageInfo.totalCount
    }),
  };
};

export default {
  getListTemplate,
};
