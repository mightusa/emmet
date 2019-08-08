import abbreviation, { Abbreviation, AbbreviationNode } from '@emmetio/abbreviation';
import attributes from './attributes';
import snippets from './snippets';
import implicitTag from './implicit-tag';
import lorem from './lorem';
import jsx from './addon/jsx';
import xsl from './addon/xsl';
import bem from './addon/bem';
import html from './format/html';
import haml from './format/haml';
import slim from './format/slim';
import pug from './format/pug';
import { Config } from '../config';
import { walk, Container } from './utils';

type Formatter = (abbr: Abbreviation, config: Config) => string;

const formatters: { [syntax: string]: Formatter } = { html, haml, slim, pug };

/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 */
export default function parse(abbr: string | Abbreviation, config: Config): Abbreviation {
    if (typeof abbr === 'string') {
        abbr = abbreviation(abbr, config);
    }

    walk(abbr, transform, config);
    return abbr;
}

/**
 * Converts given abbreviation to string according to provided `config`
 */
export function stringify(abbr: Abbreviation, config: Config): string {
    const formatter: Formatter = formatters[config.syntax] || html;
    return formatter(abbr, config);
}

/**
 * Modifies given node and prepares it for output
 */
function transform(node: AbbreviationNode, ancestors: Container[], config: Config) {
    snippets(node, ancestors, config);
    implicitTag(node, ancestors, config);
    attributes(node);
    lorem(node, ancestors, config);

    if (config.syntax === 'xsl') {
        xsl(node);
    }

    if (config.syntax === 'jsx' || config.options['jsx.enabled']) {
        jsx(node);
    }

    if (config.options['bem.enabled']) {
        bem(node, ancestors, config);
    }
}
