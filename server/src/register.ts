import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'ace-editor',
    plugin: 'strapi-ace-custom-field',
    type: 'text',
  });
};

export default register;
