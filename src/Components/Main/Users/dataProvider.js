import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import axios from 'axios'

const apiUrl = 'http://localhost/myproject/public/api/v1';
// const apiUrl = 'https://jsonplaceholder.typicode.com';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
      console.log('-----------resource', resource)
      console.log('-----------params', params)

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify(params.filter),
            sort: order,
            column: field,
            // page:
        };
        // console.log('-----------query', query)
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // const url = `${apiUrl}/${resource}`;

        // console.log('-----------url', params)

        return axios.get(url).then(response => {
          console.log(response)
          const { data } = response.data

          return {
            data,
            total: data.length,
          }

        }).catch((rejec) => {
          return rejec.message
        })
        // return httpClient(url).then(({ headers, json }) => {
        //   console.log('-----------headers', headers)
        //   console.log('-----------json', json)

        //   return {
        //     data: json,
        //     total: json.length
        //   }
        // })
    },

    getOne: (resource, params) => {
      httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
        data: json,
      }))
    },

    getMany: (resource, params) => {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};
