/**
 * @fileoverview Centralizes API base URLs and endpoint paths.
 * Import `Constants` to get the correct full URLs for the current environment.
 *
 * @example
 * import Constants from "./Utilities/Constants";
 * fetch(Constants.API_URL_GET_ALL_POSTS);
 */

/** Base URL for the local development backend. */
const API_BASE_URL_DEVELOPMENT = "https://localhost:7048";
/** Base URL for the deployed production backend. */
const API_BASE_URL_PRODUCTION = "https://appname.azurewebsites.net";

/** Relative path segments for each API route. */
const ENDPOINTS = {
    GET_ALL_POSTS: "get-all-posts",
    GET_POST_BY_ID: "get-post-by-id",
    CREATE_POST: "create-post",
    UPDATE_POST: "update-post",
    DELETE_POST: "delete-post-by-id"
};

/** Full API URLs used when NODE_ENV === 'development'. */
const DEVELOPMENT = {
    API_URL_GET_ALL_POSTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_POST_BY_ID}`,
    API_URL_CREATE_POST: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POST_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_POST_BY_ID}`,
};

/** Full API URLs used in production builds. */
const PRODUCTION = {
    API_URL_GET_ALL_POSTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_POST_BY_ID}`,
    API_URL_CREATE_POST: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POST_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.DELETE_POST_BY_ID}`,
};

/**
 * Environment-aware API URL map.
 * Resolves to `DEVELOPMENT` locally and `PRODUCTION` in all other environments.
 *
 * @type {{ API_URL_GET_ALL_POSTS: string, API_URL_GET_POST_BY_ID: string,
 *          API_URL_CREATE_POST: string, API_URL_UPDATE_POST: string,
 *          API_URL_DELETE_POST_BY_ID: string }}
 */
const Constants = process.env.NODE_ENV === 'development' ? DEVELOPMENT : PRODUCTION;

export default Constants;