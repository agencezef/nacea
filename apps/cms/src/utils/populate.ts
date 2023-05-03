import {
  AlertType,
  ButtonType,
  CheckedType,
  ImageType,
  InputType,
  SectionType,
  SelectType,
  TagType,
} from "utils";

const reorderDynamicZone = (propValue, config) => {
  const res = propValue.map((item, i) => {
    const matchingConfig = config.find((c) => item.__component.match(c.name));

    if (matchingConfig) {
      return (propValue[i] = matchingConfig.reorder(item));
    } else {
      return null;
    }
  });

  return res;
};

export const reorderComponentKeys = (
  res: Record<string, any>,
  entries: Record<string, any>
) => {
  Object.entries(entries).forEach(([prop, config]) => {
    const propValue = res[prop];

    if (!propValue) {
      return;
    }

    if (Array.isArray(propValue)) {
      if (Array.isArray(config)) {
        // ------------- DYNAMICS ZONES -------------
        reorderDynamicZone(propValue, config);
      } else {
        // ------------- REPEATABLE COMPONENTS -------------
        res[prop] = res[prop].map((item: any) => {
          return config.reorder(item);
        });
      }
    } else {
      // ------------- SIMPLE COMPONENTS -------------
      res[prop] = config.reorder(res[prop]);
    }
  });

  return res;
};

export function deleteProps(obj: any, props: string[]) {
  for (const prop of props) {
    delete obj[prop];
  }
}

// BUTTON
export const ButtonConfig = {
  name: "button",
  populate: {
    fields: ["label", "link", "newWindow"],
    populate: {
      color: { fields: ["code"] },
    },
  },
  reorder: (res: OriginalButtonType): ButtonType => ({
    label: res.label,
    link: res.link,
    newWindow: res.newWindow,
    color: res.color ? ColorConfig.reorder(res.color) : null,
  }),
};
// TAG
export const TagConfig = {
  name: "tag",
  populate: {
    fields: ["label"],
    populate: {
      color: { fields: ["code"] },
    },
  },
  reorder: (res: OriginalTagType): TagType => ({
    label: res.label,
    color: res.color ? ColorConfig.reorder(res.color) : null,
  }),
};

// SECTION
export const SectionConfig = {
  name: "section",
  populate: { fields: ["name"] },
  reorder: (res: { name: string }): SectionType => ({
    type: res.name,
  }),
};

// IMAGE
export const ImageConfig = {
  name: "image",
  populate: true,
  reorder: (res: OriginalImageType): ImageType => ({
    url: res.url,
    format: {
      small: res.formats.small?.url,
      medium: res.formats.medium?.url,
      thumbnail: res.formats.thumbnail?.url,
    },
  }),
};

// Color
export const ColorConfig = {
  name: "color",
  populate: {
    color: { fields: ["code"] },
  },
  reorder: (res: OriginalColorType): string => res.code,
};

// ALERT
export const AlertConfig = {
  name: "alert",
  populate: {
    fields: ["id"],
    populate: {
      message: {
        fields: ["text"],
        populate: {
          color: { fields: ["code"] },
        },
      },
    },
  },

  reorder: (res: OriginalAlertType): AlertType => ({
    text: res.message ? res.message.text : null,
    color: res.message ? ColorConfig.reorder(res.message.color) : null,
  }),
};

function stringToSlug(str: string) {
  const slug = str
    ?.replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return slug;
}

// INPUT
export const InputConfig = {
  name: "input",
  populate: {
    fields: ["label", "placeholder", "type"],
    populate: {
      options: {
        fields: ["label"],
      },
    },
  },

  reorder: (res: OriginalInputType): InputType => ({
    label: res.label,
    placeholder: res.placeholder,
    name: stringToSlug(res.label),
    type: res.type,
  }),
};

// SELECT
export const SelectConfig = {
  name: "select",
  populate: {
    fields: ["label"],
    populate: {
      options: {
        fields: ["label"],
      },
    },
  },

  reorder: (res: OriginalSelectType): SelectType => ({
    label: res.label,
    name: stringToSlug(res.label),
    type: "select",
    options: res.options.map((option: OriginalOptionType) => option.label),
  }),
};

// SELECT
export const CheckboxConfig = {
  name: "checkbox",
  populate: {
    fields: ["label", "defaultChecked"],
  },

  reorder: (res: OriginalCheckedType): CheckedType => ({
    label: res.label,
    type: "checkbox",
    name: stringToSlug(res.label),
    defaultChecked: res.defaultChecked,
  }),
};
// FORM
export const FormConfig = {
  name: "form",
  populate: {
    populate: {
      attributes: {
        on: {
          "assets.input": InputConfig.populate,
          "assets.select": SelectConfig.populate,
          "assets.checkbox": CheckboxConfig.populate,
        },
      },
      button: ButtonConfig.populate,
    },
  },

  reorder: (res: OriginalFormType) => ({
    attributes: res.attributes
      ? reorderDynamicZone(res.attributes, [
          InputConfig,
          SelectConfig,
          CheckboxConfig,
        ])
      : null,
    button: res.button ? ButtonConfig.reorder(res.button) : null,
  }),
};

// ORIGNALS TYPES
interface OriginalInputType {
  label: string;
  placeholder: string;
  type: string;
  options?: any;
}

interface OriginalSelectType {
  label: string;
  options?: OriginalOptionType[];
}

interface OriginalOptionType {
  label: string;
}
interface OriginalCheckedType {
  label: string;
  defaultChecked: boolean;
}

interface OriginalFormType {
  button: OriginalButtonType;
  attributes: any;
}

interface OriginalButtonType {
  link: string;
  color: OriginalColorType;
  label: string;
  newWindow: boolean;
}

interface OriginalTagType {
  label: string;
  color: OriginalColorType;
}

interface OriginalColorType {
  code: string;
}

interface OriginalAlertType {
  message: {
    text: string;
    color: OriginalColorType;
  };
}

interface OriginalImageType {
  url: string;
  formats: {
    small: { url: string };
    medium: { url: string };
    thumbnail: { url: string };
  };
}
