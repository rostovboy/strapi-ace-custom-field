import React from "react";
import { Field, Flex } from "@strapi/design-system";
import AceEditor from "react-ace";

import { useIntl } from "react-intl";
import { getTranslation } from "../../utils/getTranslation";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

interface AceEditorInputProps {
  intlLabel: Record<any, any>;
  onChange: (e: { target: { name: string; value: string } }) => void;
  attribute: Record<any, any>;
  name: string;
  disabled?: boolean;
  error?: string;
  labelAction?: Record<any, any>;
  required?: boolean;
  value?: any;
  [key: string]: any;
}

export const AceEditorInput = ({
                                 attribute,
                                 name,
                                 onChange,
                                 value,
                                 intlLabel,
                                 intlDescription,
                               }: AceEditorInputProps) => {
  const { formatMessage } = useIntl();

  console.log('test')
  console.log(intlLabel)

  const fieldLabel = intlLabel
    ? formatMessage(intlLabel)
    : formatMessage({ id: getTranslation("ace-editor.label"), defaultMessage: "Ace code editor" });

  const fieldDescription = intlDescription
    ? formatMessage(intlDescription)
    : formatMessage({ id: getTranslation("ace-editor.title"), defaultMessage: "Ace Code Editor custom field" });

  const fieldPlaceholder = formatMessage({
    id: getTranslation("ace-editor.placeholder"),
    defaultMessage: "Let's code",
  });

  return (
    <div>
      <Field.Label>{fieldLabel}</Field.Label>
      <Flex>
        <AceEditor
          mode="java"
          theme="github"
          onChange={(newValue) => onChange({ target: { name, value: newValue } })} // Передача изменений вверх
          name={name}
          placeholder={fieldPlaceholder}
          fontSize={14}
          lineHeight={19}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={value}
          editorProps={{ $blockScrolling: true }}
        />
      </Flex>
    </div>
  );
};

export default AceEditorInput;
