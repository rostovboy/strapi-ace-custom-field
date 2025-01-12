import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { FieldIcon } from './components/Field/Icon';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';

export default {
  register(app: any) {

    // Register custom field
    app.customFields.register({
      name: 'ace-editor',
      pluginId: PLUGIN_ID,
      type: 'text',
      icon: FieldIcon,
      intlLabel: {
        id: getTranslation('ace-editor.label'),
        defaultMessage: 'Ace code editor',
      },
      intlDescription: {
        id: getTranslation('ace-editor.description'),
        defaultMessage: 'Ace Code Editor custom field',
      },
      components: {
        Input: async () =>
          import('./components/Field/Input').then((module) => ({
            default: module.AceEditorInput,
          })),
      },
      options: {
        advanced: [
          {
            intlLabel: {
              id: getTranslation('ace-editor.options.advanced.regex'),
              defaultMessage: 'RegExp pattern',
            },
            name: 'regex',
            type: 'text',
            defaultValue: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
            description: {
              id: getTranslation('ace-editor.options.advanced.regex.description'),
              defaultMessage: 'The text of the regular expression',
            },
          },
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('ace-editor.options.advanced.requiredField'),
                  defaultMessage: 'Required field',
                },
                description: {
                  id: getTranslation('ace-editor.options.advanced.requiredField.description'),
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      }
    });


    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, PLUGIN_ID),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
