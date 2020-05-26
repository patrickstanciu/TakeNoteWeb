// Polyfills
import "@babel/polyfill";

/**
 * Dependencies
 */

// Bootstrap
// import "bootstrap";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/modal";

/**
 * Import
 */

// Components
import Header from "./components/header.js";

// Templates
import Homepage from "./templates/homepage.js";

/**
 * Initiate
 * components and templates
 */

new Header();
new Homepage();
