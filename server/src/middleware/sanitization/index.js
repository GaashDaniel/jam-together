export {
  sanitizeHtml,
  removeDangerousAttributes,
  sanitizeHtmlFormatting,
} from "./htmlSanitization.js";
export {
  sanitizeSql,
  sanitizeNoSql,
  hasSqlInjectionPatterns,
  sanitizeQueryParams,
} from "./sqlSanitization.js";
export {
  sanitizePath,
  sanitizeCommand,
  sanitizeUrl,
  sanitizeFilename,
  hasDangerousPathPatterns,
  sanitizeDirectoryPath,
} from "./pathSanitization.js";
export {
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
  sanitizeName,
  sanitizeUsername,
  sanitizeDescription,
  sanitizeObjectText,
} from "./textSanitization.js";
export {
  sanitizeRequest,
  sanitizeUserInput,
  sanitizeAdminInput,
  sanitizeSearchInput,
  sanitizeFileInput,
  validateContentType,
  validateRequest,
} from "./middlewareSanitization.js";
import htmlSanitizers from "./htmlSanitization.js";
import sqlSanitizers from "./sqlSanitization.js";
import pathSanitizers from "./pathSanitization.js";
import textSanitizers from "./textSanitization.js";
import middlewareSanitizers from "./middlewareSanitization.js";
export default {
  html: htmlSanitizers,
  sql: sqlSanitizers,
  path: pathSanitizers,
  text: textSanitizers,
  middleware: middlewareSanitizers,
  ...htmlSanitizers,
  ...sqlSanitizers,
  ...pathSanitizers,
  ...textSanitizers,
  ...middlewareSanitizers,
};