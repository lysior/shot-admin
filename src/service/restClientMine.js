// in src/restClient
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';

const API_URL = 'http://localhost:8080';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const { queryParameters } = fetchUtils;
    const options = {};
    console.log("type(" + JSON.stringify(type) +")");
    console.log("params(" + JSON.stringify(params) +")");
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            page: JSON.stringify(page-1),
            size: JSON.stringify(perPage),
            sort: field + "," + order
        }
        url = `${API_URL}/${resource}?${queryParameters(query)}`;
        break;
    }
    case GET_ONE:
        url = `${API_URL}/${resource}/${params.id}`;
        break;
    case GET_MANY: {
        if(!params.filter) {

        }
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        url = `${API_URL}/${resource}?${queryParameters(query)}`;
        console.log("url(" + JSON.stringify(url) +")");
        break;
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        var query = {};
        if(!params.filter) {
          // -> GET_LIST
          query = {
              page: JSON.stringify(page-1),
              size: JSON.stringify(perPage),
              sort: field + "," + order
          }
          url = `${API_URL}/${resource}?${queryParameters(query)}`;
        } else {
          var filterParam = "shotlistid";
          var filterParamValue = "59106";
          var filterName = "search/findBy" + filterParam.charAt(0).toUpperCase() + filterParam.slice(1);
          query[filterParam] = filterParamValue;
          url = `${API_URL}/${resource}/${filterName}?${queryParameters(query)}`;
        }
        console.log("url(" + JSON.stringify(url) +")");
        break;
    }
    case UPDATE:
        url = `${API_URL}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
    case CREATE:
        url = `${API_URL}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
    case DELETE:
        url = `${API_URL}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    //const { headers, json } = response;
    const {  json } = response;
    //console.log("headers(" +  JSON.stringify(headers) +")");
    //console.log("Json(" + JSON.stringify(json) +")");
    console.log("responseType(" + JSON.stringify(type) +")");
    switch (type) {
    case GET_MANY_REFERENCE:
    case GET_LIST:
        var    data = json._embedded[resource];
        var    total;
        if (json.page) {
          total = parseInt(json.page.totalElements,10);
        } else  {
          total = json._embedded[resource].length;
        }
		    //console.log("total(" + JSON.stringify(total) +")");
        return {
            data: data,
            total: total
        };
    case DELETE:
    return { data: params };
    case CREATE:
        return { data: { ...params.data, id: json.id } };
    default:
        //console.log("response(" + JSON.stringify(response) +")");
        //console.log("type(" + JSON.stringify(type) +")");
        //console.log("resource(" + JSON.stringify(resource) +")");
        //console.log("params(" + JSON.stringify(params) +")");
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
};
