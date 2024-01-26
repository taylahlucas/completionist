// import '@babel/polyfill';
// import PossibleTypesData from '../html/config/react/interfaces/PossibleTypes';
// const fs = require('fs');

// const OUTPUT = 'html/config/react/apollo/typePolicies.ts';
// const TEMPLATE = `
//   import { TypedTypePolicies } from './apolloHelpers';

//   const typePolicies: TypedTypePolicies = {content}
  
//   export default typePolicies;
// `;
// let typePolicies = [];

// const buildFromGraphqlTypes = (): string[] => {
//   const GRAPHQL_TYPES_PATH = 'html/config/react/interfaces/GraphqlTypes.ts';
//   let content;

//   try {
//     content = fs.readFileSync(GRAPHQL_TYPES_PATH, 'utf8');
//   } catch (err) {
//     console.error(err);
//   }

//   if (!content) {
//     throw 'Error! Invalid GraphqlTypes.ts content';
//   }

//   const matches = content.match(/{.*?}/gims);
//   const results = [];
//   for (const item of matches) {
//     if (item.indexOf('__typename') !== -1) {
//       const matches = item.match(/typename.*'(.*)'/);
//       if (matches[1]) {
//         results.push(`${matches[1]}: { merge: true }`);
//       }
//     }
//   }
//   return results;
// };

// const buildFromPossibleTypes = (): string[] => {
//   const keys = Object.keys(PossibleTypesData.possibleTypes);
//   return keys.map((key: string) => `${key}: { merge: true }`);
// };

// typePolicies = typePolicies.concat(buildFromPossibleTypes()).concat(buildFromGraphqlTypes());

// if (!typePolicies.length) {
//   console.warn('typePolicies is empty');
// }

// const result = TEMPLATE.replace('content', typePolicies.join(', '));
// fs.writeFileSync(OUTPUT, result);
// console.log(`Generated typePolicies into ${OUTPUT}`);
