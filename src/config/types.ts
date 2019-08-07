export type SyntaxType = 'markup' | 'stylesheet';
export type FieldOutput = (index: number, placeholder: string, offset: number, line: number, column: number) => string;
export type StringCase = '' | 'lower' | 'upper';
export interface SnippetsMap {
    [name: string]: string;
}

/**
 * Raw config which contains per-syntax options. `markup` and `syntax` keys are
 * reserved for global settings for all markup and stylesheet syntaxes
 */
export interface GlobalConfig {
    [syntax: string]: RawConfig;
}

export interface BaseConfig {
    /* Type of abbreviation context, default is `markup` */
    type: SyntaxType;

    /** Options for abbreviation output */
    options: Partial<Options>;

    /** Substitutions for variable names */
    variables: SnippetsMap;

    /** Abbreviation name to snippets mapping */
    snippets: SnippetsMap;
}

export interface Config extends BaseConfig {
    /** Host syntax */
    syntax: string;

    /** Options for abbreviation output */
    options: Options;

    /** Text to wrap with abbreviation */
    text?: string | string[];
}

export type RawConfig = Partial<BaseConfig>;

export interface Options {
    /////////////////////
    // Generic options //
    /////////////////////

    /** A list of inline-level elements */
    inlineElements: string[];

    ////////////////////
    // Output options //
    ////////////////////

    /** A string for one level indent */
    'output.indent': string;

    /**
     * A string for base indent, e.g. context indentation which will be added
     * for every generated line
     */
    'output.baseIndent': string;

    /** A string to use as a new line */
    'output.newline': string;

    /** Tag case: lower, upper or '' (keep as-is) */
    'output.tagCase': StringCase;

    /** Attribute name case: lower, upper or '' (keep as-is) */
    'output.attributeCase': StringCase;

    /** Attribute value quotes: 'single' or 'double' */
    'output.attributeQuotes': 'single' | 'double';

    /** Enable output formatting (indentation and line breaks) */
    'output.format': boolean;

    /** A list of tag names that should not get inner indentation */
    'output.formatSkip': string[];

    /** A list of tag names that should *always* get inner indentation. */
    'output.formatForce': string[];

    /**
     * How many inline sibling elements should force line break for each tag.
     * Set to `0` to output all inline elements without formatting.
     * Set to `1` to output all inline elements with formatting (same as block-level).
     */
    'output.inlineBreak': number;

    /**
     * Produce compact notation of boolean attributes: attributes which doesn’t have value.
     * With this option enabled, outputs `<div contenteditable>` instead of
     * `<div contenteditable="contenteditable">`
     */
    'output.compactBoolean': boolean;

    /** A list of boolean attributes */
    'output.booleanAttributes': string[];

    /** Style of self-closing tags: html (`<br>`), xml (`<br/>`) or xhtml (`<br />`) */
    'output.selfClosingStyle': 'html' | 'xml' | 'xhtml';

    /**
     * A function that takes field index and optional placeholder and returns
     * a string field (tabstop) for host editor. For example, a TextMate-style
     * field is `$index` or `${index:placeholder}`
     * @param index Field index
     * @param placeholder Field placeholder (default value), if any
     * @param offset Current character offset from the beginning of generated content
     * @param line Current line of generated output
     * @param column Current column in line
     */
    'output.field': FieldOutput;

    ////////////////////////////////
    // Element commenting options //
    ////////////////////////////////

    /**
     * Enable/disable element commenting: generate comments before open and/or
     * after close tag
     */
    'comment.enabled': boolean;

    /**
     * Attributes that should trigger node commenting on specific node,
     * if commenting is enabled
     */
    'comment.trigger': string[];

    /**
     * Template string for comment to be placed *before* opening tag
     */
    'comment.before': string;

    /**
     * Template string for comment to be placed *after* closing tag.
     * Example: `\n<!-- /[#ID][.CLASS] -->`
     */
    'comment.after': string;

    /////////////////
    // BEM options //
    /////////////////

    /** Enable/disable BEM addon */
    'bem.enabled': boolean;

    /** A string for separating elements in output class */
    'bem.element': string;

    /** A string for separating modifiers in output class */
    'bem.modifier': string;

    /////////////////
    // JSX options //
    /////////////////

    /** Enable/disable JSX addon */
    'jsx.enabled': boolean;

    ////////////////////////
    // Stylesheet options //
    ////////////////////////

    /** Use short hex notation where possible, e.g. `#000` instead of `#000000` */
    'stylesheet.shortHex': boolean;

    /** A string between property name and value */
    'stylesheet.between': string;

    /** A string after property value */
    'stylesheet.after': string;

    /** A unit suffix to output by default after integer values, 'px' by default */
    'stylesheet.intUnit': string;

    /** A unit suffix to output by default after float values, 'em' by default */
    'stylesheet.floatUnit': string;

    /**
     * Aliases for custom units in abbreviation. For example, `r: 'rem'` will
     * output `10rem` for abbreviation `10r`
     */
    'stylesheet.unitAliases': SnippetsMap;

    /**
     * A float number between 0 and 1 to pick fuzzy-matched abbreviations.
     * Lower value will pick more abbreviations (and less accurate)
     */
    'stylesheet.fuzzySearchMinScore': number;
}
