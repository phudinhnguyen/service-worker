class TemplateDetailEntity {
  templateId: string = "";
  templateDetailId: string = "";
  mediaId: string = "";
  zindex: number = 0;
  tempPointHeight: number = 0;
  tempPointWidth: number = 0;
  tempRatioX: number = 0;
  tempRatioY: number = 0;
  temp_rotate: number = 0;

  constructor(template) {
    if (!template) return;
    Object.keys(this).forEach((key) => {
      if (template[key]) {
        this[key] = template[key] || this[key];
      }
    });
  }

  static createListTemplateDetailEntity(listTemplateDetail) {
    if (!Array.isArray(listTemplateDetail)) return [];
    return listTemplateDetail.map((template) => {
      return new TemplateDetailEntity(template);
    });
  }
}

class TemplateEntity {
  templateId: string = "";
  templateName: string = "";
  templateDetails: TemplateDetailEntity[] = [];
  templateRatioX: number = 0;
  templateRatioY: number = 0;
  templateRotate: number = 0;

  constructor(template) {
    if (!template) return;
    Object.keys(this).forEach((key) => {
      switch (key) {
        case "templateDetails":
          this[
            "templateDetails"
          ] = TemplateDetailEntity.createListTemplateDetailEntity(
            template.templateDetails || []
          );
          break;
        default:
          this[key] = template[key] || this[key];
          break;
      }
    });
  }

  static createListTemplateEntity(listTemplate) {
    if (!Array.isArray(listTemplate)) return [];
    return listTemplate.map((template) => {
      return new TemplateEntity(template);
    });
  }
}

export default TemplateEntity;
